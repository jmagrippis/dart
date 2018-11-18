import React, { PureComponent, createRef } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { MutationUpdaterFn } from 'apollo-boost'

import { CONVERSATION } from '../Conversation'
import { ReactComponent as Send } from './send.svg'
import { AddMessage, Conversation } from '../../../../types'
import styled from 'styled-components'
import { colors, shadow, easings } from '../../../../theme'

class AddMessageMutation extends Mutation<
  AddMessage.Mutation,
  AddMessage.Variables
> {}

const ADD_MESSAGE = gql`
  mutation AddMessage(
    $content: String!
    $conversationId: ID!
    $interviewerId: ID
  ) {
    addMessage(
      content: $content
      conversationId: $conversationId
      interviewerId: $interviewerId
    ) {
      id
      content
      sender {
        id
      }
    }
  }
`

const Container = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`

const Input = styled.input`
  flex: 1;
  margin-right: 20px;
  align-self: stretch;
  font-size: 16px;
  border: none;
  box-shadow: ${shadow.depth1};
  transition: box-shadow 0.3s ${easings.outQuart};

  &:focus {
    outline: 0 solid transparent;
    box-shadow: ${shadow.depth2};
  }
`

const StyledSend = styled(Send)`
  width: 24px;
  display: block;
  fill: ${colors.accent};
  background-color: #ffffff;
  padding: 6px;
  border-radius: 50%;
  box-shadow: ${shadow.depth1};
`

interface Props {
  subjectId: string
  conversationId: string
  interviewerId: string
}

export class InputBar extends PureComponent<Props> {
  input = createRef<HTMLInputElement>()

  update: MutationUpdaterFn<AddMessage.Mutation> = (cache, { data }) => {
    if (!data) return
    const { interviewerId, subjectId } = this.props
    const variables = { interviewerId, subjectId }
    const cachedData: {
      conversation: Conversation.Conversation
    } | null = cache.readQuery({
      query: CONVERSATION,
      variables
    })

    if (!cachedData) return
    const { addMessage } = data
    const { conversation } = cachedData

    const nextConversation = {
      ...conversation,
      messages: [...conversation.messages, addMessage]
    }

    cache.writeQuery({
      query: CONVERSATION,
      data: {
        conversation: nextConversation
      },
      variables
    })
  }

  onSubmit = (
    addMessage: MutationFn<AddMessage.Mutation, AddMessage.Variables>
  ) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = this.input.current
    if (!input) return

    const content = input.value.trim()
    if (!content) return

    const { interviewerId, conversationId } = this.props
    addMessage({
      variables: {
        interviewerId,
        conversationId,
        content
      }
    })
    input.value = ''
  }

  render() {
    return (
      <AddMessageMutation mutation={ADD_MESSAGE} update={this.update}>
        {(addMessage) => (
          <Container onSubmit={this.onSubmit(addMessage)}>
            <Input innerRef={this.input} data-test="question-input" />
            <button data-test="question-submit" type="submit">
              <StyledSend />
            </button>
          </Container>
        )}
      </AddMessageMutation>
    )
  }
}

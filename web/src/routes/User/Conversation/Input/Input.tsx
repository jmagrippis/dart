import React, { PureComponent, createRef } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { CONVERSATION, Conversation, Message } from '../Conversation'
import { MutationUpdaterFn } from 'apollo-boost'

interface Data {
  addMessage: Message
}

interface Variables {
  content: string
  interviewerId?: string
}

class AddMessageMutation extends Mutation<Data, Variables> {}

const ADD_MESSAGE = gql`
  mutation AddMessage($content: String!, $interviewerId: ID) {
    addMessage(content: $content, interviewerId: $interviewerId) {
      id
      content
      sender {
        id
      }
    }
  }
`

interface Props {
  subjectUsername: string
  interviewerId: string
}

export class Input extends PureComponent<Props> {
  input = createRef<HTMLInputElement>()

  update: MutationUpdaterFn<Data> = (cache, { data }) => {
    if (!data) return
    const { interviewerId, subjectUsername } = this.props
    const variables = { interviewerId, username: subjectUsername }
    const cachedData: { conversation: Conversation } | null = cache.readQuery({
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

  onSubmit = (addMessage: MutationFn<Data, Variables>) => (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    const input = this.input.current
    if (!input) return

    addMessage({
      variables: {
        content: input.value,
        interviewerId: this.props.interviewerId
      }
    })
    input.value = ''
  }

  render() {
    return (
      <AddMessageMutation mutation={ADD_MESSAGE} update={this.update}>
        {addMessage => (
          <div>
            <form onSubmit={this.onSubmit(addMessage)}>
              <input ref={this.input} data-test="question-input" />
              <button data-test="question-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </AddMessageMutation>
    )
  }
}

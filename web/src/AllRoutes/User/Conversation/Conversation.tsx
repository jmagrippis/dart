import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import store from 'store2'
import uuid from 'uuid/v4'
import styled from 'styled-components'

import { InputBar } from './InputBar/InputBar'
import { Loading } from '../../../Loading/Loading'
import { Conversation as ConversationTypes } from '../../../types'
import { Messages } from './Messages/Messages'

class ConversationQuery extends Query<
  ConversationTypes.Query,
  ConversationTypes.Variables
> {}

export const CONVERSATION = gql`
  query Conversation($subjectId: ID!, $interviewerId: ID) {
    conversation(subjectId: $subjectId, interviewerId: $interviewerId) {
      id
      messages {
        id
        content
        sender {
          id
        }
      }
    }
  }
`

const getOrGenerateUserId = () => {
  const existingUserId = store('interviewerId')
  if (existingUserId) return existingUserId

  const interviewerId = uuid()
  store('interviewerId', interviewerId)
  return interviewerId
}

interface Props {
  subjectId: string
}

interface State {
  interviewerId: string
}

const Container = styled.div`
  max-width: 700px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5px;
`

export class Conversation extends PureComponent<Props, State> {
  state = {
    interviewerId: getOrGenerateUserId()
  }

  render() {
    const { subjectId } = this.props
    const { interviewerId } = this.state
    return (
      <ConversationQuery
        query={CONVERSATION}
        variables={{ subjectId, interviewerId }}
        pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error || !data) return `Error!: ${error}`

          const {
            conversation: { id, messages }
          } = data
          return (
            <Container>
              <Messages messages={messages} interviewerId={interviewerId} />
              <InputBar
                conversationId={id}
                subjectId={subjectId}
                interviewerId={interviewerId}
              />
            </Container>
          )
        }}
      </ConversationQuery>
    )
  }
}

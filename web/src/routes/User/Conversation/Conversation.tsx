import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import uuid from 'uuid/v4'
import { Loading } from '../../../Loading/Loading'
import { Input } from './Input/Input'

export interface Message {
  id: string
  content: string
  sender: {
    id: string
  }
}

export interface Conversation {
  id: string
  messages: Message[]
}

interface Data {
  conversation: Conversation
}

interface Variables {
  subjectId: string
  interviewerId?: string
}

class ConversationQuery extends Query<Data, Variables> {}

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
  const existingUserId = localStorage.getItem('interviewerId')
  if (existingUserId) return existingUserId

  const interviewerId = uuid()
  localStorage.setItem('interviewerId', interviewerId)
  return interviewerId
}

interface Props {
  subjectId: string
}

interface State {
  interviewerId: string
}

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
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error || !data) return `Error!: ${error}`

          const {
            conversation: { id, messages }
          } = data
          return (
            <div>
              <ul>
                {messages.map((message: Message) => (
                  <li
                    key={message.id}
                    data-test={
                      message.sender.id === interviewerId
                        ? 'request'
                        : 'response'
                    }
                  >
                    {message.content}
                  </li>
                ))}
              </ul>
              <Input
                conversationId={id}
                subjectId={subjectId}
                interviewerId={interviewerId}
              />
            </div>
          )
        }}
      </ConversationQuery>
    )
  }
}

import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import uuid from 'uuid/v4'
import { Loading } from '../../../Loading/Loading'

const CONVERSATION = gql`
  query Conversation($username: String!, $interviewerId: String) {
    conversation(username: $username, interviewerId: $interviewerId) {
      messages {
        id
        content
        sender {
          ... on User {
            username
          }
          ... on AnonymousUser {
            id
          }
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
  username: string
}

interface State {
  interviewerId: string
}

interface Message {
  id: string
  content: string
  sender: {
    id: string
    username?: string
  }
}

export class Conversation extends PureComponent<Props, State> {
  state = {
    interviewerId: getOrGenerateUserId()
  }

  render() {
    const { username } = this.props
    const { interviewerId } = this.state
    return (
      <Query query={CONVERSATION} variables={{ username, interviewerId }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loading />
          if (error) return `Error!: ${error}`

          const {
            conversation: { messages }
          } = data
          return (
            <div>
              <ul>
                {messages.map((message: Message) => (
                  <li
                    key={message.id}
                    data-test={message.sender.username ? 'response' : 'request'}
                  >
                    {message.content}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  refetch()
                }}
              >
                Submit
              </button>
            </div>
          )
        }}
      </Query>
    )
  }
}

import React, { PureComponent, createRef } from 'react'
import styled from 'styled-components'

import { colors, shadow } from '../../../../theme'
import { Conversation } from '../../../../types'

const Container = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
`

const Message = styled.li<{ isOutgoing: boolean }>`
  background-color: ${({ isOutgoing }) =>
    isOutgoing ? colors.accent : '#ffffff'};
  ${({ isOutgoing }) => (isOutgoing ? 'align-self: flex-end' : '')};
  border-radius: 10px;
  padding: 5px 10px;
  margin: 4px 2px;
  box-shadow: ${shadow.depth1};

  &:first-child {
    margin-top: 10px;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

interface Props {
  messages: Conversation.Messages[]
  interviewerId: string
  refetch: () => void
}

export class Messages extends PureComponent<Props> {
  container = createRef<HTMLUListElement>()

  interval: number | undefined

  componentDidUpdate(prevProps: Props) {
    const { messages, interviewerId, refetch } = this.props
    if (
      prevProps.messages.length !== messages.length &&
      this.container.current
    ) {
      this.container.current.scrollTop = this.container.current.scrollHeight
    }

    if (
      !this.interval &&
      messages[messages.length - 1].sender.id === interviewerId
    ) {
      // @ts-ignore
      this.interval = setInterval(() => refetch(), 1000)
    }

    if (messages[messages.length - 1].sender.id !== interviewerId) {
      clearInterval(this.interval)
      this.interval = undefined
    }
  }

  render() {
    const { messages, interviewerId } = this.props

    return (
      <Container innerRef={this.container}>
        {messages.map((message) => (
          <Message
            key={message.id}
            data-test={
              message.sender.id === interviewerId ? 'request' : 'response'
            }
            isOutgoing={message.sender.id === interviewerId}
          >
            {message.content}
          </Message>
        ))}
      </Container>
    )
  }
}

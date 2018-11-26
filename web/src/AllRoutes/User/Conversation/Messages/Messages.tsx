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
}

export class Messages extends PureComponent<Props> {
  container = createRef<HTMLUListElement>()

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.messages.length !== this.props.messages.length &&
      this.container.current
    ) {
      this.container.current.scrollTop = this.container.current.scrollHeight
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

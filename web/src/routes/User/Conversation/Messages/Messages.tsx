import React from 'react'
import styled from 'styled-components'

import { Conversation } from '../../../../types'

const Container = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Message = styled.li<{ isOutgoing: boolean }>`
  background-color: ${({ isOutgoing }) => (isOutgoing ? '#d7e8ce' : '#ffffff')};
  ${({ isOutgoing }) => (isOutgoing ? 'align-self: flex-end' : '')};
  border-radius: 10px;
  padding: 5px 10px;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);

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

export const Messages = ({ messages, interviewerId }: Props) => (
  <Container>
    {messages.map((message) => (
      <Message
        key={message.id}
        data-test={message.sender.id === interviewerId ? 'request' : 'response'}
        isOutgoing={message.sender.id === interviewerId}
      >
        {message.content}
      </Message>
    ))}
  </Container>
)

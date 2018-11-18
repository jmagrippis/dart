import React from 'react'
import styled from 'styled-components'

import { colors, shadow } from '../../../../theme'
import { Conversation } from '../../../../types'

const Container = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
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

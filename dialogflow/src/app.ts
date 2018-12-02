import {
  dialogflow,
  Suggestions,
  RichResponse,
  SimpleResponse
} from 'actions-on-google'

import { findUserByEmail } from './queries/findUserByEmail'
import { findTopicsByUserId } from './queries/findTopicsByUserId'
import { findUserByName } from './queries/findUserByName'
import { findUserByUsername } from './queries/findUserByUsername'
import { findResponses } from './queries/findResponses'
import { getValuesFromContexts } from './getValuesFromContexts'

export const app = dialogflow()

export const CONTEXTS = {
  SUBJECT: 'subject',
  TOPICS: 'topics',
  RESPONSES: 'responses'
}

const EVENTS = {
  IDENTIFY_SUBJECT: 'identify_subject',
  CAPTURE_SUBJECT_NAME: 'capture_subject_name',
  CAPTURE_SUBJECT_EMAIL: 'capture_subject_email',
  CAPTURE_SUBJECT_USERNAME: 'capture_subject_username',
  CAPTURE_RESPONSE_BY_NAME: 'capture_response_by_name'
}

app.intent(
  'capture interview subject name',
  async (
    conv,
    {
      subjectGivenName,
      subjectLastName
    }: { subjectGivenName: string; subjectLastName: string }
  ) => {
    const subject = await findUserByName({
      givenName: subjectGivenName,
      lastName: subjectLastName
    })

    if (!subject) {
      conv.ask(`I could not find ${subjectGivenName} ${subjectLastName}!`)
      conv.followup(EVENTS.CAPTURE_SUBJECT_NAME)
      return
    }

    conv.contexts.set(CONTEXTS.SUBJECT, 5, { subject })

    conv.followup(EVENTS.IDENTIFY_SUBJECT)
  }
)

app.intent(
  'capture interview subject email',
  async (conv, { subjectEmail }: { subjectEmail: string }) => {
    const subject = await findUserByEmail(subjectEmail)

    if (!subject) {
      conv.ask(`I could not find someone with the email ${subjectEmail}...`)
      conv.followup(EVENTS.CAPTURE_SUBJECT_EMAIL)
      return
    }

    conv.contexts.set(CONTEXTS.SUBJECT, 5, { subject })

    conv.followup(EVENTS.IDENTIFY_SUBJECT)
  }
)

app.intent(
  'capture interview subject username',
  async (conv, { subjectUsername }: { subjectUsername: string }) => {
    const subject = await findUserByUsername(subjectUsername)

    if (!subject) {
      conv.ask(
        `I could not find someone with the username ${subjectUsername}...`
      )
      conv.followup(EVENTS.CAPTURE_SUBJECT_USERNAME)
      return
    }

    conv.contexts.set(CONTEXTS.SUBJECT, 5, { subject })

    conv.followup(EVENTS.IDENTIFY_SUBJECT)
  }
)

const getTopicsPrompt = ({ displayName, topics }) =>
  topics.reduce(
    (acc, { name }, i) =>
      `${acc} ${i < topics.length - 1 ? `my ${name}, ` : `or my ${name}?`}`,
    `Hi! I am the Digital Auto Response Tool for ${displayName}. Would you like to learn about`
  )

app.intent('identify subject', async (conv) => {
  const { subject } = getValuesFromContexts(conv)

  const topics = await findTopicsByUserId(subject.id)

  if (!topics) return

  conv.contexts.set(CONTEXTS.TOPICS, 5, { topics })

  conv.ask(getTopicsPrompt({ topics, displayName: subject.displayName }))

  if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    conv.ask(new Suggestions(topics.map(({ name }) => name)))
  }
})

const getResponsesPrompt = (responses) =>
  responses.reduce(
    (acc, { name }, i) =>
      `${acc} ${
        i < responses.length - 1
          ? `${name}, <break time="300ms" />`
          : `and ${name}. <break time="300ms" />Would you like to hear more about one of those?</speak>`
      }`,
    '<speak>I can tell you about '
  )

app.intent('capture topic', async (conv, { topicName }) => {
  const { subject, topics } = getValuesFromContexts(conv)
  const userId = subject.id
  const topicId = topics.find(({ name }) => name === topicName).id

  const responses = await findResponses({ userId, topicId })

  if (!responses) return

  conv.contexts.set(CONTEXTS.RESPONSES, 5, { responses })

  conv.ask(new SimpleResponse({ speech: getResponsesPrompt(responses) }))

  if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    conv.ask(new Suggestions(responses.map(({ name }) => name)))
  }
})

app.intent('capture response by name', async (conv, { responseName }) => {
  // @ts-ignore
  const { topics, responses } = getValuesFromContexts(conv)

  const requestedResponse = responses.find(({ name }) => name === responseName)

  if (!requestedResponse) {
    conv.ask(`I could not find an answer for ${responseName}...`)
    conv.followup(EVENTS.CAPTURE_RESPONSE_BY_NAME)
    return
  }

  if (requestedResponse.__typename === 'LeafResponse') {
    const parentName = topics.find(
      ({ id }) => id === requestedResponse.topic.id
    ).name

    conv.ask(
      new RichResponse([
        requestedResponse.content,
        `Would you like to keep going with ${parentName}?`
      ])
    )
  }

  if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    conv.ask(new Suggestions('yes', 'no'))
  }
})

import { dialogflow, Suggestions } from 'actions-on-google'
import { findUserByEmail } from './queries/findUserByEmail'
import { findTopicsByUserId } from './queries/findTopicsByUserId'
import { findUserByName } from './queries/findUserByName'
import { FindUserByEmail, FindTopicsByUserId } from './types'
import { findUserByUsername } from './queries/findUserByUsername'

export const app = dialogflow()

const CONTEXTS = {
  SUBJECT: 'subject',
  TOPICS: 'topics'
}

const EVENTS = {
  IDENTIFY_SUBJECT: 'identify_subject',
  CAPTURE_SUBJECT_NAME: 'capture_subject_name',
  CAPTURE_SUBJECT_EMAIL: 'capture_subject_email',
  CAPTURE_SUBJECT_USERNAME: 'capture_subject_username'
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
    `Hi! I am the Digital Automated Response Tool for ${displayName}. Would you like to learn about`
  )

app.intent('identify subject', async (conv) => {
  // @ts-ignore
  const subject: FindUserByEmail.FindUserByEmail = conv.contexts.get(
    CONTEXTS.SUBJECT
  ).parameters.subject

  const topics = await findTopicsByUserId(subject.id)

  if (!topics) return

  conv.contexts.set(CONTEXTS.TOPICS, 5, { topics })

  conv.ask(getTopicsPrompt({ topics, displayName: subject.displayName }))

  if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    conv.ask(new Suggestions(topics.map(({ name }) => name)))
  }
})

app.intent('capture topic', (conv, { topicName }) => {
  // @ts-ignore
  const topics: FindTopicsByUserId.FindTopicsByUserId[] = conv.contexts.get(
    CONTEXTS.TOPICS
  ).parameters.topics

  const topicId = topics.find(({ name }) => name === topicName).id

  conv.ask(`I will tell you all about ${topicName}! Its id is ${topicId}`)
})

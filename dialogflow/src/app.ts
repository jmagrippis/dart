import { dialogflow, DialogflowConversation } from 'actions-on-google'
import { findUserByEmail } from './queries/findUserByEmail'
import { findTopicsByUserId } from './queries/findTopicsByUserId'
import { FindUserByEmail, FindTopicsByUserId } from './types'

export const app = dialogflow()

const CONTEXTS = {
  SUBJECT: 'subject',
  TOPICS: 'topics'
}

const EVENTS = {
  IDENTIFY_SUBJECT: 'identify_subject'
}

app.intent(
  'identify interview subject by number',
  (conversation, { subjectNumber }) => {
    console.log('find user by subjectNumber:', subjectNumber)

    const subject_id = 'a4a8cc63-0bdd-4cf2-840d-ba4a6e58440c'

    conversation.contexts.set(CONTEXTS.SUBJECT, 5, { subject_id })

    conversation.followup(EVENTS.IDENTIFY_SUBJECT)
  }
)

app.intent(
  'identify interview subject by email',
  async (conversation, { subjectEmail }: { subjectEmail: string }) => {
    const subject = await findUserByEmail(subjectEmail)

    if (!subject) return

    conversation.contexts.set(CONTEXTS.SUBJECT, 5, { subject })

    conversation.followup(EVENTS.IDENTIFY_SUBJECT)
  }
)

const getTopicsPrompt = ({ displayName, topics }) =>
  topics.reduce(
    (acc, { name }, i) =>
      `${acc} ${i < topics.length - 1 ? `my ${name}, ` : `or my ${name}?`}`,
    `Hi! I am the Digital Automated Response Tool for ${displayName}. Would you like to learn about`
  )

app.intent('identify subject', async (conversation) => {
  // @ts-ignore
  const subject: FindUserByEmail.FindUserByEmail = conversation.contexts.get(
    CONTEXTS.SUBJECT
  ).parameters.subject

  const topics = await findTopicsByUserId(subject.id)

  if (!topics) return

  conversation.contexts.set(CONTEXTS.TOPICS, 5, { topics })

  conversation.ask(
    getTopicsPrompt({ topics, displayName: subject.displayName })
  )
})

app.intent('identify topic', (conversation, { topic }) => {
  // @ts-ignore
  const topics: FindTopicsByUserId.FindTopicsByUserId[] = conversation.contexts.get(
    CONTEXTS.TOPICS
  ).parameters.topics

  const topicId = topics.find(({ name }) => name === topic).id

  conversation.ask(`I will tell you all about ${topic}! Its id is ${topicId}`)
})

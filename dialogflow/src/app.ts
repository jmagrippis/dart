import { dialogflow, DialogflowConversation } from 'actions-on-google'

export const app = dialogflow()

const CONTEXTS = {
  SUBJECT_ID: 'subject_id'
}

const EVENTS = {
  IDENTIFY_SUBJECT: 'identify_subject'
}

app.intent(
  'identify interview subject by number',
  (conversation, { subjectNumber }) => {
    console.log('find user by subjectNumber:', subjectNumber)

    const subject_id = 'a4a8cc63-0bdd-4cf2-840d-ba4a6e58440c'

    conversation.contexts.set(CONTEXTS.SUBJECT_ID, 5, { subject_id })

    conversation.followup(EVENTS.IDENTIFY_SUBJECT)
  }
)

app.intent(
  'identify interview subject by email',
  (conversation, { subjectEmail }) => {
    console.log('find user by subjectEmail:', subjectEmail)

    const subject_id = 'a4a8cc63-0bdd-4cf2-840d-ba4a6e58440c'

    conversation.contexts.set(CONTEXTS.SUBJECT_ID, 5, { subject_id })

    conversation.followup(EVENTS.IDENTIFY_SUBJECT, { subject_id })
  }
)

app.intent('identify subject', (conversation) => {
  conversation.ask(
    'Hi! I am the Digital Automated Response Tool for Johnny. Would you like to learn about my skills? My projects? My current role?'
  )
})

app.intent('identify topic', (conversation, { topic }) => {
  conversation.ask(`I will tell you all about ${topic}!`)
})

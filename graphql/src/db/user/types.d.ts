interface DbUser {
  id: string
  username: string
  data: {
    displayName: string
    email: string
  }
  createdAt: string
}

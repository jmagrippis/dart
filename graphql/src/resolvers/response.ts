import { find } from '../db/responses/find'

export const response = async (_, { id }) => {
  const dbResponse = await find(id)
  if (!dbResponse) return null

  return dbResponse
}

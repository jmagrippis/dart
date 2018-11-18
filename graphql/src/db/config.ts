const host =
  process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production'
    ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    : undefined

export const config = {
  host,
  database: process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
}

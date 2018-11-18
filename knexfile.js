module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'dev'
    },
    migrations: {
      tableName: 'migrations'
    },
    seeds: {
      directory: './seeds/dev'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'prod'
    },
    migrations: {
      tableName: 'migrations'
    }
  }
}

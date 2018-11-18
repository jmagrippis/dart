module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'dev'
    },
    migrations: {
      tableName: 'migrations'
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

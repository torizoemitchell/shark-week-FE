module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/tempo_users'
  },
  test: {
    client: 'pg',
  connection: 'postgres://localhost/tempo_users'
  },
  production: {
    client: 'pg',
    connection: 'postgres://localhost/tempo_users'
  }
}

const { Cypress, cy } = global

// You need a valid token for the e2e user for the login flow to work.
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56VTJOemRCTVRNNE56UkZPRFF4T1VWR1JEYzVNamhDTkRnNE1UTXhSalUyTnpaRU56QkVNdyJ9.eyJlbWFpbCI6ImUyZUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kYXJ0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YmVmMjlkN2IzMjMyMzJlMzM1MWMzNDciLCJhdWQiOiJUTkRSTlhiLVlpWmpjbWczeU83cHlVNTdlTF9CWXI0dCIsImlhdCI6MTU0MzEzNDY2MiwiZXhwIjoxNTQzMTcwNjYyLCJhdF9oYXNoIjoiZ1phUHluNmd3elBBMUVHOEdsbGZTdyIsIm5vbmNlIjoidzBIYlBWNWxnRDVIN25tcjBnQnZmZGN1WmowUnQ4UmQifQ.XNFhD66Y0hdCczZJsX-32esI9PDublzxbCv1w7PmBWT8tO1cAr3QB117wl2k5kApa6jgQzxRVjdchQadTG2Y69MTvztObUR1bw3A8TYcEg5uFDSsbejzZ6aqYk5-8fHKmh4X29WQo7q3DBDU5ddsFNMxxbqVUduVqmY9g7BXv6-RgeqZSGmJTiRbmQI6OGDgDPUOpIxqXMHF_8eCNplVOnDNEv7xp463j3z2yGuEwxDJ9iBryBednHPMR_Y-lyOfwUJvjSZQGINM1evubeMqrvgK-s8b4aYp2V8D0QU_J_jaKpuOvKBZ5_5Yw4hLjZAM0HHPG-QRX1chguSzMqJM-w'

Cypress.Commands.add('login', (overrides = {}) => {
  Cypress.log({ name: 'login' })

  const options = {
    method: 'GET',
    url: 'http://localhost:3000/auth'
  }

  // allow us to override defaults with passed in overrides

  cy.request(options).then((res) => {
    expect(res.status).to.eq(200)

    window.localStorage.setItem('token', token)
  })
})

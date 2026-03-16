import client from './client'

export const sendMessage = (data) =>
  client.post('/contact', data).then(r => r.data)
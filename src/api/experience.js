import client from './client'

export const getExperience = () =>
  client.get('/experience').then(r => r.data)
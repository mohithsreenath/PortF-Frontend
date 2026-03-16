import client from './client'

export const getSkills = () =>
  client.get('/skills').then(r => r.data)

export const getCategories = () =>
  client.get('/categories').then(r => r.data)
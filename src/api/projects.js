import client from './client'

export const getProjects = (featured) =>
  client.get('/projects', { params: featured !== undefined ? { featured } : {} }).then(r => r.data)

export const getProject = (slug) =>
  client.get(`/projects/${slug}`).then(r => r.data)
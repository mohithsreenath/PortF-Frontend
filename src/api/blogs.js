import client from './client'

export const getBlogs = () =>
  client.get('/blogs').then(r => r.data)

export const getBlog = (slug) =>
  client.get(`/blogs/${slug}`).then(r => r.data)
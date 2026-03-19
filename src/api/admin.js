import client from './client'

// Auth
export const adminLogin = (data) =>
  client.post('/admin/login', data).then(r => r.data)

// Projects
export const createProject = (data) =>
  client.post('/projects', data).then(r => r.data)

export const updateProject = (id, data) =>
  client.put(`/projects/${id}`, data).then(r => r.data)

export const deleteProject = (id) =>
  client.delete(`/projects/${id}`)

// Skills
export const createSkill = (data) =>
  client.post('/skills', data).then(r => r.data)

export const deleteSkill = (id) =>
  client.delete(`/skills/${id}`)

// Categories
export const createCategory = (data) =>
  client.post('/categories', data).then(r => r.data)

export const deleteCategory = (id) =>
  client.delete(`/categories/${id}`)

// Experience
export const createExperience = (data) =>
  client.post('/experience', data).then(r => r.data)

export const updateExperience = (id, data) =>
  client.put(`/experience/${id}`, data).then(r => r.data)

export const deleteExperience = (id) =>
  client.delete(`/experience/${id}`)

// Blogs
export const createBlog = (data) =>
  client.post('/blogs', data).then(r => r.data)

export const updateBlog = (id, data) =>
  client.put(`/blogs/${id}`, data).then(r => r.data)

export const deleteBlog = (id) =>
  client.delete(`/blogs/${id}`)

// Contact
export const getMessages = () =>
  client.get('/contact').then(r => r.data)

export const markMessageRead = (id) =>
  client.patch(`/contact/${id}/read`).then(r => r.data)

export const deleteMessage = (id) =>
  client.delete(`/contact/${id}`)
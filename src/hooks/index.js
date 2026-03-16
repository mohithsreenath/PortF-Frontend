import { useQuery } from '@tanstack/react-query'
import { getProjects, getProject } from '../api/projects'
import { getSkills, getCategories } from '../api/skills'
import { getExperience } from '../api/experience'
import { getBlogs, getBlog } from '../api/blogs'

export const useProjects = (featured) =>
  useQuery({ queryKey: ['projects', featured], queryFn: () => getProjects(featured) })

export const useProject = (slug) =>
  useQuery({ queryKey: ['project', slug], queryFn: () => getProject(slug), enabled: !!slug })

export const useSkills = () =>
  useQuery({ queryKey: ['skills'], queryFn: getSkills })

export const useCategories = () =>
  useQuery({ queryKey: ['categories'], queryFn: getCategories })

export const useExperience = () =>
  useQuery({ queryKey: ['experience'], queryFn: getExperience })

export const useBlogs = () =>
  useQuery({ queryKey: ['blogs'], queryFn: getBlogs })

export const useBlog = (slug) =>
  useQuery({ queryKey: ['blog', slug], queryFn: () => getBlog(slug), enabled: !!slug })

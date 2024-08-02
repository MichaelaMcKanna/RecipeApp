import { useRuntimeConfig } from 'nuxt/app'
import { useAuthStore } from '../store/auth'

export const useUserService = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${config.public.apiBase}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      throw error
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(`${config.public.apiBase}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      throw error
    }
  }

  return { login, register }
}

// stores/auth.ts
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
}
const API_BASE_URL = 'http://localhost:8080'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.user = null
      this.token = null
      // If you're using client-side storage, clear it here
      localStorage.removeItem('token')
    },
    async login(email: string, password: string): Promise<boolean> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        if (response.ok) {
          const data = await response.json()
          this.setUser(data.user)
          this.setToken(data.token)
          // If you want to persist the token
          localStorage.setItem('token', data.token)
          return true
        }
        return false
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async register(email: string, password: string): Promise<boolean> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        if (response.ok) {
          await this.login(email, password)
          return true
        } else {
          const errorData = await response.json()
          console.error('Registration failed:', response.status, errorData)
          return false
        }
      } catch (error) {
        console.error('Registration error:', error)
        return false
      }
    },
  },
})

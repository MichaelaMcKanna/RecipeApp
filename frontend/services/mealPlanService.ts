import { useRuntimeConfig } from 'nuxt/app'
import { useAuthStore } from '../store/auth'
import { MealPlan } from '../types'

export const useMealPlanService = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const URL = `${config.public.apiBase}/users/${authStore.user?.id}/mealPlans`

  const getMealPlans = async () => {
    try {
      const response = await fetch(`${URL}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching meal plans:', error)
      throw error
    }
  }

  const createMealPlan = async (mealPlan: MealPlan) => {
    try {
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlan),
      })
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      throw error
    }
  }

  return { getMealPlans, createMealPlan }
}

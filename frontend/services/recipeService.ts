import { useRuntimeConfig } from 'nuxt/app'

export const useRecipeService = () => {
  const config = useRuntimeConfig()

  const getRecipes = async () => {
    try {
      const response = await fetch(`${config.public.apiBase}/recipes`)
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      throw error
    }
  }

  const createRecipe = async (recipe: any) => {
    try {
      const response = await fetch(`${config.public.apiBase}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      })
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      throw error
    }
  }

  return { getRecipes, createRecipe }
}
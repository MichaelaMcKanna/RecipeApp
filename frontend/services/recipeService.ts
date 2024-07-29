import { useRuntimeConfig } from 'nuxt/app'

const config = useRuntimeConfig()

export const getRecipes = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/recipes`)
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export const createRecipe = async (recipe: any) => {
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
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

// export const useRecipeService = () => {
//   const getRecipes = async () => {
//     try {
//       const recipes = await $fetch('/api/recipes')
//       return recipes || []
//     } catch (error) {
//       console.error('Error fetching recipes:', error)
//       return []
//     }
//   }

//   const addRecipe = async (recipe: { name: string }) => {
//     try {
//       const newRecipe = await $fetch('/api/recipes', {
//         method: 'POST',
//         body: recipe,
//       })
//       return newRecipe
//     } catch (error) {
//       console.error('Error adding recipe:', error)
//       throw error
//     }
//   }

//   return { getRecipes, addRecipe }
// }

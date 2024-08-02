<!-- RecipeList.vue -->
<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Recipe List</h1>
      <NuxtLink 
        to="/add-recipe" 
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add New Recipe
      </NuxtLink>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink 
        v-for="recipe in recipes" 
        :key="recipe._id" 
        :to="`/recipe/${recipe._id}`"
        class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ recipe.title }}</h2>
          <p class="text-gray-600 mb-2">Servings: {{ recipe.servings }}</p>
          <p class="text-gray-600 mb-2">Prep Time: {{ recipe.prepTime }} minutes</p>
          <p class="text-gray-600 mb-2">Cook Time: {{ recipe.cookTime }} minutes</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <span v-for="tag in recipe.tags" :key="tag" class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {{ tag }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRecipeService } from '../services/recipeService'
import type { Recipe } from '../types'

const recipes = ref<Recipe[]>([])
const { getRecipes } = useRecipeService()

onMounted(async () => {
  try {
    recipes.value = await getRecipes()
  } catch (error) {
    console.error('Error fetching recipes:', error)
  }
})
</script>

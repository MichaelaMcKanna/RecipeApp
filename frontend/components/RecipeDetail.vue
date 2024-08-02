<!-- RecipeDetails.vue -->
<template>
  <div v-if="recipe" class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">{{ recipe.title }}</h1>
    <div class="bg-white shadow-md rounded-lg overflow-hidden p-6">
      <div class="mb-4">
        <p class="text-gray-600">Servings: {{ recipe.servings }}</p>
        <p class="text-gray-600">Prep Time: {{ recipe.prepTime }} minutes</p>
        <p class="text-gray-600">Cook Time: {{ recipe.cookTime }} minutes</p>
      </div>
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul class="list-disc list-inside">
          <li
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.name"
            class="mb-1"
          >
            {{ ingredient.quantity }} {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-2">Instructions</h2>
        <ol class="list-decimal list-inside">
          <li
            v-for="(instruction, index) in recipe.instructions"
            :key="index"
            class="mb-2"
          >
            {{ instruction }}
          </li>
        </ol>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2">Tags</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in recipe.tags"
            :key="tag"
            class="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container mx-auto p-4">
    <p>Loading recipe...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Recipe } from '../types'

const route = useRoute()
const recipe = ref<Recipe | null>(null)

onMounted(async () => {
  const recipeId = route.params.id
  try {
    const data = await $fetch(`/api/recipes/${recipeId}`)
    recipe.value = data as Recipe
  } catch (error) {
    console.error('Error fetching recipe:', error)
  }
})
</script>

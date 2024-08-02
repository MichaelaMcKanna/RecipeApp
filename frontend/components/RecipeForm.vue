<!-- AddRecipeForm.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Add New Recipe</h1>
    <form @submit.prevent="submitRecipe" class="space-y-4">
      <div>
        <label for="title" class="block mb-2 font-semibold">Title</label>
        <input
          v-model="recipe.title"
          id="title"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label class="block mb-2 font-semibold">Ingredients</label>
        <div
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
          class="flex space-x-2 mb-2"
        >
          <input
            v-model="ingredient.name"
            type="text"
            placeholder="Name"
            class="flex-1 p-2 border rounded"
          />
          <input
            v-model="ingredient.quantity"
            type="text"
            placeholder="Quantity"
            class="flex-1 p-2 border rounded"
          />
          <button
            @click="removeIngredient(index)"
            type="button"
            class="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
        <button
          @click="addIngredient"
          type="button"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Ingredient
        </button>
      </div>

      <div>
        <label class="block mb-2 font-semibold">Instructions</label>
        <div
          v-for="(instruction, index) in recipe.instructions"
          :key="index"
          class="flex space-x-2 mb-2"
        >
          <input
            v-model="recipe.instructions[index]"
            type="text"
            class="flex-1 p-2 border rounded"
          />
          <button
            @click="removeInstruction(index)"
            type="button"
            class="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
        <button
          @click="addInstruction"
          type="button"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Instruction
        </button>
      </div>

      <div>
        <label for="servings" class="block mb-2 font-semibold">Servings</label>
        <input
          v-model="recipe.servings"
          id="servings"
          type="number"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label for="prepTime" class="block mb-2 font-semibold"
          >Prep Time (minutes)</label
        >
        <input
          v-model="recipe.prepTime"
          id="prepTime"
          type="number"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label for="cookTime" class="block mb-2 font-semibold"
          >Cook Time (minutes)</label
        >
        <input
          v-model="recipe.cookTime"
          id="cookTime"
          type="number"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label for="tags" class="block mb-2 font-semibold"
          >Tags (comma-separated)</label
        >
        <input
          v-model="tagInput"
          id="tags"
          type="text"
          class="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
        Submit Recipe
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecipeService } from '../services/recipeService'
import { useRouter } from 'vue-router'
import type { Recipe } from '../types'

const recipe = ref<Recipe | null>(null)

const tagInput = ref('')
const { createRecipe } = useRecipeService()

const addIngredient = () => {
  recipe.value?.ingredients.push({ name: '', quantity: '' })
}

const removeIngredient = (index: number) => {
  recipe.value?.ingredients.splice(index, 1)
}

const addInstruction = () => {
  recipe.value?.instructions.push('')
}

const removeInstruction = (index: number) => {
  recipe.value?.instructions.splice(index, 1)
}

const router = useRouter()

const submitRecipe = async () => {
  if (recipe.value) {
    recipe.value.tags = tagInput.value.split(',').map((tag) => tag.trim())
  }

  try {
    await createRecipe(recipe.value)
    // Reset form
    recipe.value = null
    tagInput.value = ''
    // Return to home page
    router.push('/')
  } catch (error) {
    console.error('Error adding recipe:', error)
    alert('An error occurred while adding the recipe. Please try again.')
  }
}
</script>

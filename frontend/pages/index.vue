<template>
  <div>
    <h1>Recipes</h1>

    <!-- Display recipes -->
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        {{ recipe.title }}
      </li>
    </ul>

    <!-- Form to add a new recipe -->
    <form @submit.prevent="addRecipe">
      <input v-model="newRecipe.title" placeholder="Recipe Title" required />
      <input
        v-model="newRecipe.ingredients"
        placeholder="Ingredients (comma separated)"
        required
      />
      <input
        v-model="newRecipe.instructions"
        placeholder="Instructions (comma separated)"
        required
      />
      <button type="submit">Add Recipe</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface Recipe {
  _id: string
  title: string
  ingredients: string[]
  instructions: string[]
}

export default defineComponent({
  setup() {
    const recipes = ref<Recipe[]>([])
    const newRecipe = ref({
      title: '',
      ingredients: '',
      instructions: '',
    })

    const fetchRecipes = async () => {
      try {
        recipes.value = await $fetch<Recipe[]>('/recipes')
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }

    const addRecipe = async () => {
      try {
        const recipeToAdd = {
          title: newRecipe.value.title,
          ingredients: newRecipe.value.ingredients
            .split(',')
            .map((i) => i.trim()),
          instructions: newRecipe.value.instructions
            .split(',')
            .map((i) => i.trim()),
        }
        await $fetch('/recipes', {
          method: 'POST',
          body: recipeToAdd,
        })
        await fetchRecipes() // Refresh the recipe list
        // Clear the form
        newRecipe.value = { title: '', ingredients: '', instructions: '' }
      } catch (error) {
        console.error('Error adding recipe:', error)
      }
    }

    onMounted(fetchRecipes)

    return {
      recipes,
      newRecipe,
      addRecipe,
    }
  },
})
</script>

<!-- //  <template>
//   <div class="container mx-auto p-4">
//     <h1 class="text-2xl font-bold mb-4">Recipes</h1>
//     <ul class="list-disc pl-5 mb-4">
//       <li v-for="recipe in recipes" :key="recipe.id" class="mb-2">
//         {{ recipe.name }}
//       </li>
//     </ul>
//     <form @submit.prevent="addNewRecipe" class="mb-4">
//       <input
//         v-model="newRecipe.name"
//         placeholder="Recipe Name"
//         class="border p-2 mr-2"
//       >
//       <button
//         type="submit"
//         class="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add Recipe
//       </button>
//     </form>
//   </div>
// </template>

// <script setup lang="ts">
// import { ref } from 'vue'
// import { useRecipeService } from '../services/recipeService'

// const { getRecipes, addRecipe } = useRecipeService()

// const { data: recipes, refresh: refreshRecipes } = await useAsyncData('recipes', () => getRecipes())

// const newRecipe = ref({ name: '' })

// const addNewRecipe = async () => {
//   await addRecipe(newRecipe.value)
//   await refreshRecipes()
//   newRecipe.value.name = ''
// }
// </script> -->
-->

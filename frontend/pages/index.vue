<template>
  <div>
    <h1>Recipes</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">{{ recipe.name }}</li>
    </ul>
    <form @submit.prevent="addRecipe">
      <input v-model="newRecipe.name" placeholder="Recipe Name">
      <button type="submit">Add Recipe</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import recipeService from '../services/recipeService';

const recipes = ref([]);
const newRecipe = ref({ name: '' });

const addRecipe = async () => {
  // await recipeService.addRecipe(newRecipe.value);
  const response = await recipeService.getRecipes();
  console.log(response);
  // recipes.value = response.data;
  // newRecipe.value.name = '';
};

onMounted(async () => {
  const response = await recipeService.getRecipes();
  recipes.value = response.data;
});

</script>

<style scoped>
/* Add your Tailwind CSS styles here */
</style>

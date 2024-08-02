<!-- components/MealPlanList.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Meal Plans</h1>
    <NuxtLink
      to="/create-meal-plan"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block"
    >
      Create New Meal Plan
    </NuxtLink>
    <div v-if="mealPlans" class="space-y-6">
      <div
        v-for="mealPlan in mealPlans"
        :key="mealPlan._id"
        class="border p-4 rounded"
      >
        <h2 class="text-2xl font-semibold mb-2">
          {{ dateFormatter(mealPlan.startDate) }} -
          {{ dateFormatter(mealPlan.endDate) }}
        </h2>
        <div v-for="(meal, index) in mealPlan.meals" :key="index" class="mb-4">
          <h3 class="text-xl font-semibold mb-2">
            {{ dateFormatter(meal.date) }} ({{ getDayOfWeek(meal.date) }})
          </h3>
          <div class="border p-2 rounded">
            <h4 class="font-semibold">Meal</h4>
            <p>{{ meal.name || 'No recipe selected' }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No meal plans found. Create your first meal plan!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { useMealPlanService } from '../services/mealPlanService'
import { useRecipeService } from '../services/recipeService'
import { formatDate, getDateWithoutTimeZoneAdjustment } from '../utils/date'
import type { MealRecipe, MealPlan } from '../types'

const authStore = useAuthStore()
const router = useRouter()

const mealPlans = ref<MealPlan[]>([])
// const recipes = ref<MealRecipe[]>([]);
const { getMealPlans } = useMealPlanService()
// const { getRecipes } = useRecipeService();
const dateFormatter = formatDate
const timezoneCorrector = getDateWithoutTimeZoneAdjustment

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  try {
    mealPlans.value = await getMealPlans()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

function getDayOfWeek(dateString: string): string {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return days[new Date(dateString).getDay()]
}
</script>

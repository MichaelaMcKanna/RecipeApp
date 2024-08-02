<!-- components/CreateMealPlan.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Create Meal Plan</h1>
    <form @submit.prevent="submitMealPlan" class="space-y-4">
      <div>
        <label for="startDate" class="block mb-2 font-semibold"
          >Start Date</label
        >
        <input
          v-model="startDate"
          type="date"
          id="startDate"
          required
          class="w-full p-2 border rounded"
          @change="updateMealDates"
        />
      </div>
      <div
        v-for="(day, index) in weekDays"
        :key="index"
        class="border p-4 rounded"
      >
        <h2 class="text-xl font-semibold mb-2">
          {{ day.name }} ({{ formatDate(day.date) }})
        </h2>
        <div class="space-y-2">
          <div>
            <label :for="`meal-${index}`" class="block mb-1 capitalize"
              >Meal</label
            >
            <select
              v-model="selectedRecipes[index]"
              :id="`meal-${index}`"
              required
              class="w-full p-2 border rounded"
              @change="updateMeal(index)"
            >
              <option value="">Select a recipe</option>
              <option
                v-for="recipe in recipes"
                :key="recipe._id"
                :value="recipe._id"
              >
                {{ recipe.title }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Meal Plan
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { useMealPlanService } from '../services/mealPlanService'
import { useRecipeService } from '../services/recipeService'
import { getDateWithoutTimeZoneAdjustment, formatDate } from '../utils/date'
import type { MealRecipe, Meal, MealPlan } from '../types'

const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const authStore = useAuthStore()
const router = useRouter()
const { createMealPlan } = useMealPlanService()
const { getRecipes } = useRecipeService()

const recipes = ref<MealRecipe[]>([])
const startDate = ref('')
const meals = ref<Meal[]>([])
const selectedRecipes = ref<(string | null)[]>(new Array(7).fill(null))

const weekDays = computed(() => {
  if (!startDate.value) return []

  const start = getDateWithoutTimeZoneAdjustment(startDate.value)
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return {
      name: daysOfTheWeek[date.getDay()],
      date: date,
    }
  })
})

onMounted(async () => {
  try {
    recipes.value = await getRecipes()
  } catch (error) {
    console.error('Error fetching recipes:', error)
  }
})

function updateMealDates() {
  if (startDate.value) {
    const start = new Date(startDate.value)
    meals.value = weekDays.value.map((day) => ({
      date: day.date,
      recipe: '',
    }))
  }
}

function updateMeal(index: number) {
  if (meals.value[index] && selectedRecipes.value[index]) {
    meals.value[index].recipe = selectedRecipes.value[index] as string
  }
}
watch(startDate, updateMealDates)

const submitMealPlan = async () => {
  if (!authStore.isAuthenticated || !startDate.value) {
    if (!authStore.isAuthenticated) {
      router.push('/login')
    } else {
      console.error('User start date not set')
    }
    return
  }

  const start = new Date(startDate.value)
  const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)

  const mealPlan: MealPlan = {
    startDate: start,
    endDate: end,
    name: `Week of ${start}`,
    meals: meals.value.filter((meal) => meal.recipe !== ''),
    userId: authStore.user?.id ?? '',
  }

  try {
    await createMealPlan(mealPlan)

    router.push('/meal-plans')
  } catch (error) {
    console.error('Error creating meal plan:', error)
  }
}
</script>

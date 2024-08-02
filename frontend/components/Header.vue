<!-- components/Header.vue -->
<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto py-4 px-6">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center">
          Schafer Meal Planning
        </NuxtLink>
        <nav>
          <ul class="flex space-x-4 items-center">
            <li>
              <NuxtLink to="/" class="text-blue-500 hover:text-blue-700">
                Recipes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/meal-plans"
                class="text-blue-500 hover:text-blue-700"
              >
                Meal Plans
              </NuxtLink>
            </li>
            <li v-if="authStore.isAuthenticated">
              <button
                @click="handleLogout"
                class="text-blue-500 hover:text-blue-700"
              >
                Logout
              </button>
            </li>
            <li v-else>
              <NuxtLink
                to="/login"
                class="text-blue-500 hover:text-blue-700"
              >
                Login
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
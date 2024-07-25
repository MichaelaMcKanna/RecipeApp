import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getRecipes() {
    return apiClient.get('/recipes');
  },
  addRecipe(recipe: any) {
    return apiClient.post('/recipes', recipe);
  },
  // Add other service methods as needed
};

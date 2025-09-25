// src/composables/useAuth.ts
import { ref, computed } from 'vue'

const stored = localStorage.getItem('user')
const user = ref(stored ? JSON.parse(stored) : null)

function setUser(u: any) {
  user.value = u
  localStorage.setItem('user', JSON.stringify(u))
}

function clearUser() {
  user.value = null
  localStorage.removeItem('user')
}

export function useAuth() {
  return {
    user,
    isLogged: computed(() => !!user.value),
    setUser,
    clearUser
  }
}

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // user: Cookies.get('user'),
    user: JSON.parse(localStorage.getItem('user')),
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    company: JSON.parse(localStorage.getItem('company'))
  }),

  getters: {
    isLogged () {
      return (this.user !== null)
    }

  },

  actions: {
    setUser (userData) {
      // Cookies.set('user', JSON.stringify(userData), options)
      localStorage.setItem('user', JSON.stringify(userData))
      this.user = userData
    },
    setUserInfo (userInfo) {
      const currentUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
      const updatedUserInfo = { ...currentUserInfo, ...userInfo }

      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))
      this.userInfo = updatedUserInfo
    },
    setCompany (company) {
      const currentCompany = JSON.parse(localStorage.getItem('company')) || {}
      const updatedCompany = { ...currentCompany, ...company }

      localStorage.setItem('company', JSON.stringify(updatedCompany))
      this.company = updatedCompany
    },
    deleteSession () {
      // Cookies.remove('user', options)
      localStorage.removeItem('user')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('company')
      this.user = null
      this.userInfo = null
      this.company = null
    }
  }
})

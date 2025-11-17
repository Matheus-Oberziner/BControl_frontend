import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    company: JSON.parse(localStorage.getItem('company')),
    // temporary in-memory CPF used during reset flow
    resetCpf: null,
    // list of companies returned by the API
    companyList: JSON.parse(localStorage.getItem('companyList')) || [],
    // currently selected company (object)
    companySelected: JSON.parse(localStorage.getItem('companySelected')) || null
  }),

  getters: {
    isLogged () {
      return (this.user !== null)
    }

  },

  actions: {
    setUser (userData) {
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
    setCompanyList (list) {
      const arr = Array.isArray(list) ? list : []
      localStorage.setItem('companyList', JSON.stringify(arr))
      this.companyList = arr
    },
    setCompanySelected (company) {
      // store selected company as full object
      localStorage.setItem('companySelected', JSON.stringify(company || null))
      this.companySelected = company || null
     
      // keep legacy `company` key (used elsewhere) in sync with selected
      if (company) {
        // replace whole company entry with selected
        localStorage.setItem('company', JSON.stringify(company))
        this.company = company
      } else {
        localStorage.removeItem('company')
        this.company = null
      }
    },
    // Password reset CPF handling
    setResetCpf (cpf) {
      // keep only digits to be safe
      this.resetCpf = cpf ? String(cpf) : null
    },
    clearResetCpf () {
      this.resetCpf = null
    },
    deleteSession () {
      localStorage.removeItem('user')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('company')
      localStorage.removeItem('companyList')
      localStorage.removeItem('companySelected')
      this.user = null
      this.userInfo = null
      this.company = null
      this.companyList = []
      this.companySelected = null
    }
  }
})

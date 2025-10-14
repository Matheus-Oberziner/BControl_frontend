const routes = [
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'resultado-financeiro', component: () => import('src/pages/ResultadoFinanceiroPage.vue') },
      { path: 'fluxo-financeiro', component: () => import('src/pages/FluxoFinanceiro.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('src/pages/loginPage.vue') ,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    beforeEnter: (to, from, next) => {
      // Se for diretório raiz direciona para página de login
      if (to.path === '/') {
        next('/login')
      } else {
        next()
      }
    }
  }
]

export default routes

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
  {
    path: '/redefinir-senha',
    children: [
      { path: '', component: () => import('src/pages/ResetPasswordPage.vue') },
      { path: 'verificar-codigo', component: () => import('src/pages/VerifyCodePage.vue') },
      //{ path: 'criar-nova-senha', component: () => import('src/pages/CreateNewPassword.vue') }
    ]
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

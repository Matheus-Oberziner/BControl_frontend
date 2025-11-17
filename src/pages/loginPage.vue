<template>
  <div class="login-page">
    <div class="row full-height">
      <!-- Lado esquerdo - Formulário -->
      <div class="col-6 flex column flex-center">
        <div class="login-form">
          <!-- Logo -->
          <div class="logo-container q-mb-xl">
            <img src="/syrus-logo.png" alt="Syrus Systems" class="logo" />
          </div>

          <!-- Título -->
          <h1 class="login-title q-mb-sm">Login</h1>
          <p class="login-subtitle q-mb-xl">Insira suas credenciais para continuar</p>

          <!-- Formulário -->
          <q-form ref="restLoginForm" class="login-form-fields">
            <div class="q-mb-md">
              <label class="form-label">Login</label>
              <q-input 
                v-model="id" 
                outlined 
                dense 
                class="custom-input" 
                :input-style="{ color: '#fff' }"
                mask="###.###.###-##"
                unmasked-value
                :rules="[ val => val && val.length !== 14 || 'Campo obrigatório']" />
            </div>

            <div class="q-mb-md">
              <label class="form-label">Senha</label>
              <q-input v-model="password" type="password" outlined dense class="custom-input"
                :input-style="{ color: '#fff' }" :rules="[ val => val && val.length > 5 || 'Campo obrigatório']" 
                @keyup.enter="submit()"/>
            </div>

            <div class="row justify-between items-center q-mb-xl">
              <q-checkbox v-model="keepConnected" label="Manter Conectado" color="white" keep-color dense 
                class="checkbox-custom" />
              <a href="#" @click.prevent="forgotPassword" class="forgot-password">Esqueci minha senha</a>
            </div>

            <q-btn label="Entrar" color="positive" size="lg" class="full-width login-btn q-mb-lg" no-caps
              @click="submit()" />

            <!-- Link para não cliente -->
            <div class="text-center">
              <span class="not-customer">Ainda não é cliente? </span>
              <a href="#" class="request-quote">Solicite um orçamento conosco</a>
            </div>
          </q-form>
        </div>
      </div>

      <!-- Lado direito - Syrus -->
      <div class="col-6 flex justify-center items-center right-side">
        <img src="/syrus.png" alt="Syrus" class="syrus-image" />
      </div>
    </div>
  </div>
</template>

<script>
import { sendLogin, getCompany } from 'boot/axios'
import { useUserStore } from 'stores/user'
import { notify } from '../helpers/notify.js'
import { parseJwt } from '../helpers/parseJwt.js'
export default {
  setup () {
    const store = useUserStore()

    return {
      store
    }
  },

  data () {
    return {
      id: null,
      password: null,
      accept: false,
      keepConnected: false
    }
  },

  methods: {
    submit () {
      this.$refs.restLoginForm.validate().then(valid => {
        if (valid) {
          this.$q.loading.show()

          sendLogin({
            id: this.id,
            password: this.password
          })
            .then(data => {
              const accessTokenPayload = parseJwt.parse(data.accessToken)
              const userInfo = {
                id: accessTokenPayload.sub,
                name: accessTokenPayload.name,
                email: accessTokenPayload.email,
                role: accessTokenPayload.role,
              }

              this.store.setUserInfo(userInfo)
              this.store.setUser(data)

              // getCompany now returns a list of available companies
              getCompany().then(companyData => {
                // Expecting an array; save to store
                if (Array.isArray(companyData)) {
                  this.store.setCompanyList(companyData)

                  if (companyData.length === 1) {
                    // apenas uma empresa -> seleciona e vai direto ao dashboard
                    this.store.setCompanySelected(companyData[0])
                    this.$q.loading.hide()
                    this.$router.push({ path: '/dashboard/fluxo-financeiro' })
                    return
                  }

                  if (companyData.length > 1) {
                    this.$q.loading.hide()
                    this.$router.push({ path: '/home/clients' })
                    return
                  }

                  // lista vazia -> segue pra seleção
                  this.$q.loading.hide()
                  this.$router.push({ path: '/home/clients' })
                  return
                } else {
                  // resposta inesperada
                  this.store.deleteSession()
                  this.$q.loading.hide()
                  notify.show('Erro ao obter lista de empresas.', 'negative')
                  return
                }
              }).catch((error) => {
                this.store.deleteSession()
                this.$q.loading.hide()
                notify.showFromHttp(error)
              })

            })
            .catch((error) => {
              this.store.deleteSession()
              this.$q.loading.hide()
              notify.showFromHttp(error)
            })
        }
      })
    },
    forgotPassword () {
      // ensure CPF is filled before navigating to reset flow
      const cpf = this.id
      if (!cpf) {
        notify.show('Por favor preencha o CPF antes de solicitar redefinição de senha.', 'warning')
        return
      }

      // Accept masked or unmasked CPF (###.###.###-## => 14 chars, or only digits => 11)
      const len = String(cpf).length
      if (len !== 11 && len !== 14) {
        notify.show('CPF inválido. Verifique se está completo.', 'warning')
        return
      }

      // Save CPF in store (temporary) and navigate to reset page
      try {
        this.store.setResetCpf(cpf)
        this.$router.push({ path: '/redefinir-senha' })
      } catch (err) {
        notify.showFromHttp(err)
      }
    },
  }

}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #0a0f0d 0%, #0d2818 50%, #000000 100%);
  min-height: 100vh;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Grid pattern overlay */
.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
}

.full-height {
  min-height: 100vh;
  margin: 0;
}

.login-form {
  max-width: 480px;
  width: 100%;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.logo-container {
  margin-bottom: 48px;
}

.logo {
  height: 80px;
}

.login-title {
  color: white;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 8px;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 48px;
}

.form-label {
  color: white;
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
}

.custom-input {
  margin-bottom: 0;
}

.custom-input :deep(.q-field__control) {
  background: rgba(16, 185, 129, 0.05);
  border: 1.5px solid rgba(16, 185, 129, 0.4);
  border-radius: 8px;
  color: white;
  min-height: 48px;
}

.custom-input :deep(.q-field__control):before {
  border: none;
}

.custom-input :deep(.q-field__control):after {
  border: none;
}

.custom-input :deep(.q-field__native) {
  color: white !important;
  padding: 12px 16px;
}

.custom-input :deep(.q-field__control):hover {
  border-color: rgba(16, 185, 129, 0.6);
  background: rgba(16, 185, 129, 0.08);
}

.custom-input :deep(.q-field--focused .q-field__control) {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  background: rgba(16, 185, 129, 0.08);
}

.checkbox-custom {
  font-size: 14px;
}

.checkbox-custom :deep(.q-checkbox__label) {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 400;
}

.checkbox-custom :deep(.q-checkbox__inner) {
  width: 18px;
  height: 18px;
}

.checkbox-custom :deep(.q-checkbox__bg) {
  background: transparent !important;
  border: 2px solid rgba(16, 185, 129, 0.5);
  border-radius: 4px;
}

.checkbox-custom :deep(.q-checkbox__inner--truthy .q-checkbox__bg) {
  background: #10b981 !important;
  border-color: #10b981 !important;
}

.checkbox-custom :deep(.q-checkbox__svg) {
  stroke: #000;
  stroke-width: 3;
}

.forgot-password {
  color: #10b981;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.3s ease;
}

.forgot-password:hover {
  color: #0ea972;
  text-decoration: none;
}

.login-btn {
  background: #10b981 !important;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  height: 50px;
  text-transform: none;
  letter-spacing: 0;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #0ea972 !important;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
  transform: translateY(-1px);
}

.not-customer {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
}

.request-quote {
  color: #10b981;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.request-quote:hover {
  color: #0ea972;
  text-decoration: none;
}

.right-side {
  position: relative;
}

.syrus-image {
  max-height: 75vh;
  max-width: 90%;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .col-6 {
    width: 100%;
  }

  .login-form {
    padding-top: 40px;
  }

  .right-side {
    display: none;
  }

  .login-title {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .login-form {
    max-width: 100%;
    padding: 20px;
  }

  .login-title {
    font-size: 36px;
  }

  .login-subtitle {
    font-size: 14px;
  }
}
</style>
<template>
  <div class="login-page">
    <div class="row full-height">
      <!-- Lado esquerdo - Formulário -->
      <div class="col-6 flex column flex-center">
        <div class="login-form">
          <!-- Logo -->
          <div>
            <img src="/syrus-logo.png" alt="Syrus Systems" class="logo" />
          </div>

          <!-- Título -->
          <h1 class="login-title q-mb-md">Login</h1>
          <p class="login-subtitle q-mb-md">Insira suas credenciais de e-mail para continuar</p>

          <!-- Formulário -->
          <q-form ref="restLoginForm" class="login-form-fields">
            <div class="q-mb-md">
              <label class="form-label">Login</label>
              <q-input v-model="id" outlined dense class="custom-input" :input-style="{ color: '#fff' }"
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório']" />
            </div>

            <div class="q-mb-lg">
              <label class="form-label">Senha</label>
              <q-input v-model="password" type="password" outlined dense class="custom-input"
                :input-style="{ color: '#fff' }" :rules="[ val => val && val.length > 5 || 'Campo obrigatório']" 
                @keyup.enter="submit()"/>
            </div>

            <div class="row justify-between items-center q-mb-lg">
              <q-checkbox v-model="keepConnected" label="Manter conectado" color="white" keep-color dense size="20px"
                class="checkbox-custom" />
              <a href="#" class="forgot-password">Esqueci minha senha</a>
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
      <div class="col-6 flex justify-center items-center">
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
      accept: false
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
                  // choose the first company by default (if any)
                  if (companyData.length > 0) {
                    console.log('companyData[0]:', companyData[0]);
                    this.store.setCompanySelected(companyData[0])
                  }
                } else if (companyData) {
                  // fallback: old single-object response
                  this.store.setCompany(companyData)
                  this.store.setCompanyList([companyData])
                  this.store.setCompanySelected(companyData)
                }

                this.$q.loading.hide()
                this.$router.push({ path: '/dashboard/fluxo-financeiro' })
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
  }

}
</script>

<style scoped>
.login-page {
  background: linear-gradient(90deg, #5d61e1 0%, black 100%);
  min-height: 100vh;
  height: 100vh;
  font-family: 'Inter', sans-serif;
}

.login-form {
  max-width: 400px;
  width: 100%;
}

.logo {
  height: 60px;
}

.login-title {
  color: white;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.2;
}

.login-subtitle {
  color: white;
  font-size: 16px;
}

.form-label {
  color: white;
  font-size: 16px;
  display: block;
  margin-bottom: 8px;
}

.custom-input {
  margin-bottom: 0;
}

.custom-input :deep(.q-field__control) {
  background: transparent;
  border: 2px solid #10b981;
  border-radius: 8px;
  color: white;
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
  border-color: #10b981;
}

.custom-input :deep(.q-field--focused .q-field__control) {
  border-color: #10b981;
  box-shadow: 0 0 0 1px #10b981;
}

.checkbox-custom :deep(.q-checkbox__label) {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

.checkbox-custom :deep(.q-checkbox__inner) {
  width: 20px;
  height: 20px;
}

.checkbox-custom :deep(.q-checkbox__bg) {
  background: transparent !important;
  box-shadow: none !important;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  /* cantos arredondados como na imagem */
}

.checkbox-custom :deep(.q-checkbox__inner--truthy .q-checkbox__bg) {
  background: #fff !important;
  border-color: #fff !important;
}

.checkbox-custom :deep(.q-checkbox__svg) {
  stroke: #1c1c1c;
  stroke-width: 3;
}

.forgot-password {
  color: #23c91b;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  background: #23c91b !important;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  height: 48px;
}

.not-customer {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.request-quote {
  color: #10b981;
  text-decoration: none;
  font-size: 14px;
}

.request-quote:hover {
  text-decoration: underline;
}

.syrus-image {
  max-height: 80vh;
  max-width: 100%;
  object-fit: contain;
}

/* Responsividade */
@media (max-width: 1024px) {
  .col-6 {
    width: 100%;
  }

  .login-form {
    padding-top: 24px;
    /* ajuste o valor se quiser mais espaço */
  }

  .robot-image {
    display: none;
  }
}
</style>
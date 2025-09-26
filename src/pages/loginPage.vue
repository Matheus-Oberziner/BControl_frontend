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
          <q-form @submit="onSubmit" ref="form" class="login-form-fields">
            <div class="q-mb-md">
                <label class="form-label">Login</label>
                <q-input
                v-model="login"
                outlined
                dense
                class="custom-input"
                :input-style="{ color: '#fff' }"
                :rules="[rules.required, rules.email]"
                />
            </div>

            <div class="q-mb-lg">
                <label class="form-label">Senha</label>
                <q-input
                v-model="password"
                type="password"
                outlined
                dense
                class="custom-input"
                :input-style="{ color: '#fff' }"
                :rules="[rules.required, rules.min6]"
                />
            </div>

            <div class="row justify-between items-center q-mb-lg">
                <q-checkbox
                v-model="keepConnected"
                label="Manter conectado"
                color="white"
                keep-color
                dense
                size="20px"
                class="checkbox-custom"
                />
                <a href="#" class="forgot-password">Esqueci minha senha</a>
            </div>

            <q-btn
                type="submit"
                label="Entrar"
                color="positive"
                size="lg"
                class="full-width login-btn q-mb-lg"
                no-caps
                :loading="loading"
                :disable="loading"
            />
            
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
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuth } from 'src/composables/useAuth'  // novo

export default {
  name: 'LoginPage',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const { setUser } = useAuth()                 // novo

    const USERS = {
      'bcontrol@syrus.dev': { password: '123456', role: 'BCONTROL' },
      'demo@syrus.dev':     { password: '123456', role: 'Demo' }
    }

    const login = ref('')
    const password = ref('')
    const keepConnected = ref(false)
    const loading = ref(false)
    const user = ref(null)
    const form = ref(null)

    const rules = {
      required: v => !!v || 'Required',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email',
      min6: v => (v && v.length >= 6) || 'Min. 6 characters'
    }

    const sleep = (ms) => new Promise(r => setTimeout(r, ms))

    const onSubmit = async () => {
        const valid = await form.value?.validate()
        if (!valid) return

        loading.value = true
        try {
            const email = login.value.trim().toLowerCase()
            const found = USERS[email]
            if (!found || found.password !== password.value) {
            $q.notify({ type: 'negative', message: 'Invalid email or password' })
            return
            }

            const notif = $q.notify({
              type: 'ongoing',
              message: 'Carregando informações do Dashboard...',
              position: 'top'
            })
            await sleep(10000) // simula rede

            const payload = { role: found.role, email }
            setUser(payload)
            user.value = payload
            notif() 
            await router.push('/dashboard/fluxo-financeiro')
        } finally {
            loading.value = false
        }
    }


    return { login, password, keepConnected, loading, user, form, rules, onSubmit }
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
  border: 2px solid rgba(255,255,255,0.9);
  border-radius: 6px;   /* cantos arredondados como na imagem */
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
    padding-top: 24px; /* ajuste o valor se quiser mais espaço */
  }

  .robot-image {
    display: none;
  }
}
</style>
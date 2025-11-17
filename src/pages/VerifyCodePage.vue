<template>
  <div class="verify-page">
    <div class="row full-height">
      <!-- Lado esquerdo - Formulário -->
      <div class="col-6 flex column flex-center">
        <div class="verify-form">
          <!-- Logo -->
          <div class="logo-container q-mb-xl">
            <img src="/syrus-logo.png" alt="Syrus Systems" class="logo" />
          </div>

          <!-- Botão Voltar -->
          <div class="col-12 q-mb-md">
            <q-btn
              no-caps
              flat
              dense
              icon="chevron_left"
              label="Voltar"
              class="back-btn"
              @click="$router.push({ path: '/redefinir-senha' })"
            />
          </div>

          <!-- Título -->
          <h1 class="verify-title q-mb-sm">Redefinir Senha</h1>
          <p class="verify-subtitle q-mb-xl">Insira o código que você recebeu e escolha uma nova senha:</p>

          <form autocomplete="off" @submit.prevent="submitCode">
            <!-- Campos de Código -->
            <div class="code-inputs q-mb-sm">
              <q-input
                v-for="(digit, index) in 4"
                :key="index"
                v-model="code[index]"
                outlined
                class="code-input"
                input-class="text-center"
                mask="#"
                maxlength="1"
                @keyup="handleKeyup($event, index)"
                :ref="`input${index}`"
                :input-attrs="{ autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off', spellcheck: false, inputmode: 'numeric', name: 'code' + index }"
              />
            </div>

            <!-- Campos de Senha -->
            <div class="password-section q-mb-md">
              <label class="form-label">Nova senha</label>
              <q-input
                v-model="password"
                type="password"
                outlined
                dense
                :input-style="{ color: '#fff' }"
                :rules="[val => !!val || 'Senha é obrigatória', val => (val && val.length >= 6) || 'Mínimo 6 caracteres']"
                class="q-mb-sm custom-input"
                :input-attrs="{ autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off', spellcheck: false}"
              />
              <label class="form-label">Confirmar senha</label>
              <q-input
                v-model="confirmPassword"
                type="password"
                dense
                outlined
                class="custom-input"
                :rules="[val => !!val || 'Confirmação é obrigatória', val => val === password || 'As senhas não coincidem']"
                :input-attrs="{ autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off', spellcheck: false}"
              />
            </div>

            <!-- Link de Reenviar -->
            <div class="q-mb-lg text-center">
              <span class="resend-text">
                Não recebeu o código?
                <a class="resend-link" @click="resendCode">
                  Reenviar código
                </a>
              </span>
            </div>

            <!-- Botão Enviar -->
            <q-btn
              no-caps
              type="submit"
              label="Redefinir senha"
              class="submit-btn full-width"
              :disable="!isFormValid || loading"
              :loading="loading"
            />
          </form>
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
import axios from 'axios'
import { useUserStore } from 'stores/user'

export default {
  data() {
    return {
      code: ["", "", "", ""],
      password: '',
      confirmPassword: '',
      loading: false,
    };
  },

  computed: {
    codeString() {
      return this.code.join("");
    },
    isCodeComplete() {
      return this.code.every(d => d !== "");
    }
    , passwordValid() {
      return this.password && this.password.length >= 6
    }
    , passwordsMatch() {
      return this.password === this.confirmPassword
    }
    , isFormValid() {
      return this.isCodeComplete && this.passwordValid && this.passwordsMatch
    }
  },

  methods: {
    handleKeyup(event, index) {
      const value = event.target.value;
      const key = event.key;

      // Move para o próximo campo se digitou um número
      if (/^\d$/.test(value) && index < 3) {
        this.$nextTick(() => {
          const nextInput = this.$refs[`input${index + 1}`];
          if (nextInput && nextInput[0]) {
            nextInput[0].$el.querySelector('input').focus();
          }
        });
      }

      // Volta para o campo anterior se apertar backspace em campo vazio
      if (key === "Backspace" && !value && index > 0) {
        this.$nextTick(() => {
          const prevInput = this.$refs[`input${index - 1}`];
          if (prevInput && prevInput[0]) {
            prevInput[0].$el.querySelector('input').focus();
          }
        });
      }
    },

    async submitCode() {
      if (!this.isFormValid) {
        this.$q.notify({ message: 'Preencha corretamente o código e as senhas.', color: 'negative' })
        return
      }

      this.loading = true
      try {
        // Pega o id salvo pela tela de reset (ResetPasswordPage)
        const store = useUserStore()
        const id = store.resetCpf

        if (!id) {
          this.$q.notify({ message: 'Não foi possível identificar o usuário. Volte e tente novamente.', color: 'negative' })
          this.$router.push({ path: '/redefinir-senha' })
          return
        }

        // Ajuste o endpoint abaixo conforme a API real
        const endpoint = '/auth/reset-password'
        const payload = {
          id: id,
          code: this.codeString,
          newPassword: this.password,
          confirmPassword: this.confirmPassword
        }

        const res = await axios.post(endpoint, payload)

        this.$q.notify({ message: res.data?.message || 'Senha redefinida com sucesso!', color: 'positive' })
        // Redireciona para login ou página desejada
        this.$router.push({ path: '/login' })
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || 'Ocorreu um erro'
        this.$q.notify({ message: msg, color: 'negative' })
      } finally {
        this.loading = false
      }
    },

    resendCode() {
      this.$router.push({ path: '/redefinir-senha' })
    }
  }
}
</script>

<style scoped>
.verify-page {
  background: linear-gradient(135deg, #0a0f0d 0%, #0d2818 50%, #000000 100%);
  min-height: 100vh;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Grid pattern overlay */
.verify-page::before {
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

.verify-form {
  max-width: 520px;
  width: 100%;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.logo-container {
  margin-bottom: 32px;
}

.logo {
  height: 80px;
}

.back-btn {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  padding: 8px 12px;
  margin-left: -12px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.back-btn :deep(.q-icon) {
  font-size: 20px;
}

.verify-title {
  color: white;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 8px;
}

.verify-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 48px;
  line-height: 1.5;
}

.code-inputs {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
}

.code-input {
  width: 80px;
  height: 80px;
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

.code-input :deep(.q-field__control) {
  background: rgba(16, 185, 129, 0.05);
  border: 1.5px solid rgba(16, 185, 129, 0.4);
  border-radius: 12px;
  color: white;
  height: 80px;
  width: 80px;
}

.code-input :deep(.q-field__control):before {
  border: none;
}

.code-input :deep(.q-field__control):after {
  border: none;
}

.code-input :deep(.q-field__native) {
  color: white !important;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  padding: 0;
}

.code-input :deep(.q-field__control):hover {
  border-color: rgba(16, 185, 129, 0.6);
  background: rgba(16, 185, 129, 0.08);
}

.code-input :deep(.q-field--focused .q-field__control) {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  background: rgba(16, 185, 129, 0.08);
}

.resend-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 400;
}

.resend-link {
  color: #10b981;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.resend-link:hover {
  color: #0ea972;
  text-decoration: underline;
}

.submit-btn {
  height: 50px;
  background: #10b981 !important;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #0ea972 !important;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: rgba(16, 185, 129, 0.3) !important;
  opacity: 0.5;
  cursor: not-allowed;
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

  .verify-form {
    padding-top: 40px;
    max-width: 100%;
  }

  .right-side {
    display: none;
  }

  .verify-title {
    font-size: 40px;
  }

  .code-inputs {
    gap: 12px;
  }

  .code-input {
    width: 70px;
    height: 70px;
  }

  .code-input :deep(.q-field__control) {
    height: 70px;
    width: 70px;
  }

  .code-input :deep(.q-field__native) {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .verify-form {
    padding: 20px;
  }

  .verify-title {
    font-size: 36px;
  }

  .verify-subtitle {
    font-size: 14px;
  }

  .code-inputs {
    gap: 8px;
  }

  .code-input {
    width: 60px;
    height: 60px;
  }

  .code-input :deep(.q-field__control) {
    height: 60px;
    width: 60px;
  }

  .code-input :deep(.q-field__native) {
    font-size: 24px;
  }

  .resend-text {
    font-size: 14px;
  }
}
</style>
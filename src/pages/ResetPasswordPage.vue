<template>
  <div class="reset-page">
    <div class="row full-height">
      <!-- Lado esquerdo - Formulário -->
      <div class="col-6 flex column flex-center">
        <div class="reset-form">
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
              label="Voltar para tela de login"
              class="back-btn"
              @click="$router.push({ path: '/login' })"
            />
          </div>

          <!-- Título -->
          <h1 class="reset-title q-mb-sm">Redefinir senha</h1>
          <p class="reset-subtitle q-mb-xl">Escolha a melhor opção para enviar a redefinição de senha.</p>

          <!-- Opções de Reset -->
          <div class="reset-options">
            <!-- Opção Email -->
            <div class="reset-option q-mb-lg" :class="{ 'option-selected': radio === 'email' }">
              <q-radio
                v-model="radio"
                color="primary"
                val="email"
                class="custom-radio"
              >
                <template #default>
                  <div class="option-content">
                    <div class="option-left">
                      <q-icon name="email" size="24px" class="option-icon" />
                      <span class="option-label">Email</span>
                    </div>
                    <span class="option-value">******@gmail.com</span>
                  </div>
                </template>
              </q-radio>
            </div>

            <!-- Opção SMS -->
            <div class="reset-option" :class="{ 'option-selected': radio === 'sms' }">
              <q-radio
                v-model="radio"
                color="primary"
                val="sms"
                class="custom-radio"
              >
                <template #default>
                  <div class="option-content">
                    <div class="option-left">
                      <q-icon name="sms" size="24px" class="option-icon" />
                      <span class="option-label">SMS</span>
                    </div>
                    <span class="option-value">(55) +11 ****-5212</span>
                  </div>
                </template>
              </q-radio>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="action-buttons q-mt-xl">
            <q-btn
              no-caps
              label="Cancelar"
              outline
              class="cancel-btn"
              @click="$router.push({ path: '/login' })"
            />

            <q-btn
              no-caps
              label="Solicitar Código"
              class="submit-btn"
              @click="$router.push({ path: '/redefinir-senha/verificar-codigo' })"
            />
          </div>
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
import { ref } from 'vue';

export default {
  setup () {
    return {
      radio: ref('email')
    }
  }
}
</script>

<style scoped>
.reset-page {
  background: linear-gradient(135deg, #0a0f0d 0%, #0d2818 50%, #000000 100%);
  min-height: 100vh;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Grid pattern overlay */
.reset-page::before {
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

.reset-form {
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

.reset-title {
  color: white;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 8px;
}

.reset-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 48px;
  line-height: 1.5;
}

.reset-options {
  width: 100%;
  margin-top: 24px;
}

.reset-option {
  background: rgba(16, 185, 129, 0.05);
  border: 1.5px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.reset-option:hover {
  border-color: rgba(16, 185, 129, 0.5);
  background: rgba(16, 185, 129, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.reset-option.option-selected {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.custom-radio {
  width: 100%;
}

.custom-radio :deep(.q-radio__label) {
  width: 100%;
  color: white;
}

.custom-radio :deep(.q-radio__inner) {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-radio :deep(.q-radio__bg) {
  border: 2px solid rgba(16, 185, 129, 0.5);
  border-radius: 50% !important;
}

.custom-radio :deep(.q-radio__inner--truthy .q-radio__bg) {
  background: #10b981 !important;
  border-color: #10b981 !important;
}

.custom-radio :deep(.q-radio__check) {
  color: #000;
}

.custom-radio :deep(.q-radio__svg) {
  width: 15px;
  height: 12px;
  display: block;
}

.option-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 12px;
}

.option-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.option-icon {
  color: #10b981;
}

.option-label {
  color: white;
  font-size: 16px;
  font-weight: 500;
}

.option-value {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 48px;
}

.cancel-btn {
  flex: 1;
  height: 50px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.submit-btn {
  flex: 1;
  height: 50px;
  background: #10b981 !important;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #0ea972 !important;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
  transform: translateY(-1px);
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

  .reset-form {
    padding-top: 40px;
    max-width: 100%;
  }

  .right-side {
    display: none;
  }

  .reset-title {
    font-size: 40px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .reset-form {
    padding: 20px;
  }

  .reset-title {
    font-size: 36px;
  }

  .reset-subtitle {
    font-size: 14px;
  }

  .option-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .option-value {
    padding-left: 36px;
  }
}
</style>
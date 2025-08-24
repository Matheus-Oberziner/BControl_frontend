<template>
  <div class="progress-container">
    <div class="text-20 weight-300 text-blue" style="position: absolute; top: -35px; z-index: 2;">
      Performance
    </div>

    <div class="progress-wrapper q-mt-md">
      <!-- Barra de progresso -->
      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>

      <!-- Bolinha de progresso -->
      <div
        class="progress-label"
        :style="{ left: progressPercent + '%' }"
      >
        {{ progressPercent }}%
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    const progress = ref(0.5)

    return {
      progress
    }
  },
  computed: {
    progressPercent () {
      return Math.round(this.progress * 100)
    }
  }
}
</script>
<style scoped>
.progress-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-wrapper {
  position: relative;
  width: 370px;
  height: 25px;
}

.progress-track {
  background: repeating-linear-gradient(
    45deg,
    #f5f5f5,
    #f5f5f5 2px,
    #ffffff 2px,
    #ffffff 4px
  );
  border-radius: 20px;
  height: 100%;
  overflow: hidden;
}

.progress-fill {
  background-color: #0047A1; /* azul do design */
  height: 100%;
  border-radius: 20px 0 0 20px;
  transition: width 0.4s ease;
}

/* Bolinha */
.progress-label {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* gradiente branco → azul suave à esquerda */
  background: radial-gradient(
    circle at left,
    #5b8bd9 0%,
    #ffffff 80%
  );
  border-radius: 50%;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);

  font-weight: bold;
  font-size: 24px;
  color: #0047A1;

  /* stroke branco */
  -webkit-text-stroke: 0.1px #ffffff; /* Chrome, Safari */
  text-shadow:
    -1px -1px 0 #ffffff,
     1px -1px 0 #ffffff,
    -1px  1px 0 #ffffff,
     1px  1px 0 #ffffff; /* fallback cross-browser */
}
</style>

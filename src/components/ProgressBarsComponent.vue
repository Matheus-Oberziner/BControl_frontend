<template>
  <q-intersection>
    <div class="chart-container">
      <div 
        v-for="(item, index) in chartData" 
        :key="index"
        class="bar-wrapper"
      >
        <!-- Label do valor rotacionado -->
        <div class="value-label">
          {{ formatCurrency(item.value) }}
        </div>
        
        <!-- Container da barra -->
        <div class="bar-container">
          <!-- Fundo da barra (capacidade máxima) -->
          <div class="bar-background"></div>
          
          <!-- Barra com valor real -->
          <q-tooltip v-if="item.value > 0" class="bg-blue-8">
            Dia {{ item.day }}: {{ formatCurrency(item.value) }}
          </q-tooltip>
          <div 
            v-if="item.value > 0"
            class="bar"
            :style="{ height: calculateHeight(item.value) + '%' }"
          ></div>
        </div>
        
        <!-- Label do dia -->
        <div class="day-label">{{ item.day }}</div>
      </div>
    </div>
  </q-intersection>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'ProgressiveBarChart',

   props: {
    chartData: {
      type: Array,
      required: true,
      default: () => []
    },
    maxValue: {
      type: Number,
      default: 20000
    }
  },
  
  setup(props, { emit }) {

    // Calcula a altura da barra baseado no valor máximo
    const calculateHeight = (value) => {
      return (value / props.maxValue) * 100
    }
    
    // Você pode adicionar métodos para atualizar os dados dinamicamente
    const updateChartData = (newData) => {
      emit('update:chartData', newData)
    }
    
    // Método para formatar valores em Real
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    }
    
    // Lifecycle hooks
    onMounted(() => {
    })
    
    return {
      calculateHeight,
      updateChartData,
      formatCurrency
    }
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 40px 20px 20px;
  position: relative;
  border-radius: 8px;
}

.bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  height: 100%;
  position: relative;
}

.value-label {
  position: absolute;
  top: -35px;
  font-size: 10px;
  color: #757575;
  white-space: nowrap;
  transform: rotate(-70deg);
  transform-origin: bottom left;
  left: 50%;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.bar-container {
  width: 100%;
  height: 400px;
  width: 15px;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.bar-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    145deg,
    #dadada,
    #dadada 1px,
    transparent 2px,
    transparent 5px
  );
  border-radius: 20px;
  opacity: 0.4;
  border: 1px solid #e8e8e8;
}

.bar {
  width: 100%;
  background: linear-gradient(180deg, #1976d2 0%, #0047A1 100%);
  /* background: #0047A1; */
  border-radius: 20px;
  position: relative;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 -2px 8px rgba(33, 150, 243, 0.2);
}

.bar:hover {
  background: linear-gradient(180deg, #42a5f5 0%, #1976d2 100%);
  transform: translateY(-3px);
  box-shadow: 0 -4px 12px rgba(33, 150, 243, 0.3);
}

.day-label {
  margin-top: 12px;
  font-size: 11px;
  color: #616161;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Animação de entrada */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.bar {
  animation: slideUp 0.6s ease-out;
  animation-fill-mode: both;
}

.bar-wrapper:nth-child(1) .bar { animation-delay: 0.05s; }
.bar-wrapper:nth-child(2) .bar { animation-delay: 0.1s; }
.bar-wrapper:nth-child(3) .bar { animation-delay: 0.15s; }
.bar-wrapper:nth-child(4) .bar { animation-delay: 0.2s; }
.bar-wrapper:nth-child(5) .bar { animation-delay: 0.25s; }
.bar-wrapper:nth-child(6) .bar { animation-delay: 0.3s; }
.bar-wrapper:nth-child(7) .bar { animation-delay: 0.35s; }
.bar-wrapper:nth-child(8) .bar { animation-delay: 0.4s; }
.bar-wrapper:nth-child(9) .bar { animation-delay: 0.45s; }
.bar-wrapper:nth-child(10) .bar { animation-delay: 0.5s; }
.bar-wrapper:nth-child(11) .bar { animation-delay: 0.55s; }
.bar-wrapper:nth-child(12) .bar { animation-delay: 0.6s; }
.bar-wrapper:nth-child(13) .bar { animation-delay: 0.65s; }
.bar-wrapper:nth-child(14) .bar { animation-delay: 0.7s; }
.bar-wrapper:nth-child(15) .bar { animation-delay: 0.75s; }
.bar-wrapper:nth-child(16) .bar { animation-delay: 0.8s; }
.bar-wrapper:nth-child(17) .bar { animation-delay: 0.85s; }
.bar-wrapper:nth-child(18) .bar { animation-delay: 0.9s; }
.bar-wrapper:nth-child(19) .bar { animation-delay: 0.95s; }
.bar-wrapper:nth-child(20) .bar { animation-delay: 1s; }
</style>
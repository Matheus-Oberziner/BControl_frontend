<template>
  <div class="chart-container">
    <div class="chart-content" :style="sideTitle && !onlyBar ? 'margin-left: 60px;' : ''">
      
      <!-- Label lateral -->
      <div v-if="sideTitle && !onlyBar" class="chart-title text-23 text-grey-1">{{ sideTitle }}</div>

      <!-- Barra -->
      <div
        class="chart-bar"
      >
        <!-- Fundo projetado -->
        <div class="bar-bg"></div>
        
        <div
          v-for="(item, index) in chartData.filter(i => i.label !== 'Projetado')"
          :key="index"
          class="chart-fill"
          :class="{ 'hovered': hoveredIndex === (index + 1) }"
          :style="{
            height: calcHeight(item) + '%',
            backgroundColor: item.bgColor
          }"
          @mouseenter="hoveredIndex = (index + 1)"
          @mouseleave="hoveredIndex = null"
        ></div>
      </div>

      <!-- Legenda -->
      <div v-if="!onlyBar" class="chart-legend">
        <div 
          v-for="(item, index) in chartData" 
          :key="index"
          class="legend-item"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <div 
            class="legend-dot"
            :class="[item.color, { 'hovered': hoveredIndex === index }]"
          ></div>
          <div class="legend-content">
            <div class="weight-600">
              <span class="text-12 q-pr-xs">R$</span><span class="text-16">{{ formatCurrency(item.value) }}</span>
            </div>
            <div class="legend-label text-grey-1">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    sideTitle: {
      type: Object,
      required: false,
      default: null
    },
    onlyBar: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      hoveredIndex: null
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    },
    calcHeight(item) {
      const projetado = this.chartData.find(i => i.label === 'Projetado').value;

      if (item.label === 'Ponto de Equilíbrio') {
        return 30; // sempre 25% fixo
      }

      if (item.label === 'Faturamento') {
        return (item.value / projetado) * 70; 
        // proporcional ao projetado, mas limitado aos 75% da barra
      }

      return 0;
    }
  }
}
</script>
<style scoped>
.chart-container {
  background-color: transparent;
  width: 100%;
}

.chart-content {
  display: flex;
  align-items: center;
  position: relative; /* para o absolute funcionar */
  gap: 40px; /* só um respiro */
}

.chart-title {
  position: absolute;
  left: -50%;   /* regula a distância lateral do gráfico */
  top: 15%;
  transform: rotate(-90deg) translateX(-50%);
  z-index: 1;
}

/* --- barra --- */
.chart-bar {
  position: relative;
  width: 55px;
  height: 300px;
  border-radius: 28px;
  overflow: hidden;
  background: #f8f8f8;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* barras crescem de baixo pra cima */
}

.bar-bg {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    145deg,
    #dadada,
    #dadada 1px,
    transparent 2px,
    transparent 5px
  );
  opacity: 0.4;
  border: 1px solid #e8e8e8;
}

/* --- barras proporcionais --- */
.chart-fill {
  width: 100%;
  border-radius: 30px;
  /* transition: height 0.6s ease-in-out; */
  transition: height 0.6s ease-in-out, transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  z-index: 2;
}
.chart-fill.hovered {
  transform: scaleY(1.05); /* cresce levemente */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  filter: brightness(1.2); /* aumenta brilho da cor */
}

/* --- legenda --- */
.chart-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateX(20px);
  animation: slideIn 0.6s ease-out forwards;
}

.legend-item:nth-child(1) { animation-delay: 0.2s; }
.legend-item:nth-child(2) { animation-delay: 0.4s; }
.legend-item:nth-child(3) { animation-delay: 0.6s; }

.legend-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
}
.legend-dot.hovered {
  transform: scale(1.3);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  filter: brightness(1.2);
}

.legend-dot.gray {
  background-color: #f0f0f0;
  border: 2px solid #e0e0e0;
}

.legend-dot.blue {
  background-color: #0047A1;
}

.legend-dot.pink {
  background-color: #FF3CC7;
}

.legend-content {
  flex: 1;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

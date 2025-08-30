<template>
  <div class="q-px-md q-py-lg">
    <!-- Legendas -->
    <div class="legend-container">
      <div 
        v-for="item in data" 
        :key="item.label"
        class="legend-item q-mb-md"
      >
        <div class="legend-dot" :style="{ backgroundColor: item.color }"></div>
        <span class="legend-label text-grey-7">{{ item.label }}</span>
        <span class="legend-percentage text-weight-bold">{{ item.percentage }}%</span>
      </div>
    </div>

    <!-- Gráfico de Rosca -->
    <div class="chart-container">
      <svg 
        width="180" 
        height="180" 
        viewBox="0 0 200 200" 
        class="donut-chart"
      >
        <!-- Arcos do gráfico -->
        <g transform="translate(100, 100) rotate(-90)">
          <path
            v-for="(arc, index) in arcs"
            :key="index"
            :d="arc.path"
            fill="none"
            :stroke="arc.color"
            stroke-width="15"
            stroke-linecap="round"
          />
        </g>
      </svg>

      <div class="bottom-label row items-center justify-center">
        <span class="text-12 q-pr-xs weight-600 text-center">R$</span><span class="text-16 weight-600">{{ total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        <span class="text-center text-grey-1">Total em Vendas</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    default: 420000
  },
  gap: {
    type: Number,
    default: 14
  }
})

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = angleInDegrees * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

const arcs = computed(() => {
  let currentAngle = 0
  const radius = 65
  const gapAngle = props.gap
  const totalGaps = props.data.length * gapAngle
  const availableAngle = 360 - totalGaps
  
  return props.data.map((item, index) => {
    const startAngle = currentAngle + (index > 0 ? gapAngle : 0)
    const angleSize = (item.percentage / 100) * availableAngle
    const endAngle = startAngle + angleSize
    currentAngle = endAngle
    
    const startPoint = polarToCartesian(0, 0, radius, startAngle)
    const endPoint = polarToCartesian(0, 0, radius, endAngle)
    const largeArc = angleSize > 180 ? 1 : 0
    
    const pathData = [
      'M', startPoint.x, startPoint.y,
      'A', radius, radius, 0, largeArc, 1, endPoint.x, endPoint.y
    ].join(' ')
    
    return {
      path: pathData,
      color: item.color
    }
  })
})
</script>

<style scoped>
.my-card {
  max-width: 350px;
  margin: 0 auto;
  background: #fafafa;
}

.legend-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 200px;
  margin: 0 auto;
}

.legend-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-label {
  flex: 1;
  text-align: left;
  font-size: 14px;
}

.legend-percentage {
  font-size: 14px;
  color: #333;
}

.chart-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.donut-chart {
  max-width: 100%;
  height: auto;
}

.bottom-label {
  position: absolute;
  bottom: -25%;
}
</style>
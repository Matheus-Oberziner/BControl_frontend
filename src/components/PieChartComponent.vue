<template>
  <div class="q-px-md q-py-lg">
    <q-intersection
      once
      :threshold="[0.18]"
      root-margin="0px 0px -10%"
      transition="fade"
      :transition-duration="300"
      @visibility="onVis"
    >
      <!-- Legendas -->
      <div class="legend-container" :class="{ 'is-visible': play }">
        <div
          v-for="(item, i) in data"
          :key="item.label"
          class="legend-item q-mb-md"
          :style="{ transitionDelay: (i * 100) + 'ms' }"
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
          <g transform="translate(100, 100) rotate(-82)">
            <path
              v-for="(seg, index) in segments"
              :key="index"
              :d="seg.path"
              fill="none"
              :stroke="seg.color"
              stroke-width="15"
              stroke-linecap="round"
              class="donut-arc"
              :style="{
                'stroke-dasharray': seg.length + ' ' + seg.length,
                'stroke-dashoffset': play ? 0 : seg.length,
                'transition-delay': (index * 120) + 'ms'
              }"
            />
          </g>
        </svg>

        <slot name="bottom-label" />
      </div>
    </q-intersection>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
  total: { type: Number, default: 420000 },
  gap: { type: Number, default: 14 }
})

/* Geometria base */
const R = 65 // raio do arco
const polarToCartesian = (cx, cy, r, angleDeg) => {
  const a = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

/* Segmentos com path + comprimento (pra animar stroke-dashoffset) */
const segments = computed(() => {
  let currentAngle = 0
  const gapAngle = props.gap
  const totalGaps = props.data.length * gapAngle
  const availableAngle = Math.max(0, 360 - totalGaps)

  return props.data.map((item, index) => {
    const startAngle = currentAngle + (index > 0 ? gapAngle : 0)
    const angleSize = (item.percentage / 100) * availableAngle
    const endAngle = startAngle + angleSize
    currentAngle = endAngle

    const p0 = polarToCartesian(0, 0, R, startAngle)
    const p1 = polarToCartesian(0, 0, R, endAngle)
    const largeArc = angleSize > 180 ? 1 : 0

    const path = [
      'M', p0.x, p0.y,
      'A', R, R, 0, largeArc, 1, p1.x, p1.y
    ].join(' ')

    // Comprimento de arco circular: L = r * θ (θ em rad)
    const length = (Math.PI * R * angleSize) / 180

    return { path, color: item.color, length }
  })
})

/* Intersection -> dispara a animação uma vez */
const play = ref(false)
const onVis = v => {
  if (!v || play.value) return
  // 2x rAF garante aplicação do estilo inicial antes do destino
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { play.value = true })
  })
}
</script>

<style scoped>
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
  opacity: 0;
  transform: translateX(10px);
  transition: opacity .35s ease, transform .35s ease;
}
.legend-container.is-visible .legend-item {
  opacity: 1;
  transform: translateX(0);
}
.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.legend-label { flex: 1; text-align: left; font-size: 14px; }
.legend-percentage { font-size: 14px; color: #333; }

.chart-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.donut-chart { max-width: 100%; height: auto; }

/* Arcos: transição do traçado */
.donut-arc {
  transition: stroke-dashoffset 900ms cubic-bezier(.2,.9,.2,1);
}

/* slot posicionado */
:deep(.bottom-label) { position: absolute; bottom: -25%; }

/* A11y: reduz movimento */
@media (prefers-reduced-motion: reduce) {
  .donut-arc { transition: none !important; }
  .legend-item { transition: none !important; opacity: 1 !important; transform: none !important; }
}
</style>

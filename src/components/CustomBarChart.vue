<template>
  <div class="chart-container">
    <!-- O QIntersection controla quando o conteúdo monta/aparece -->
    <q-intersection
      class="chart-io"
      once
      transition="fade"
      :transition-duration="400"
      :threshold="[0.15]"
      root-margin="0px 0px -10%"
    >
      <div class="chart-content" :style="sideTitle && !onlyBar ? 'margin-left: 60px;' : ''">
        <!-- Label lateral -->
        <div v-if="sideTitle && !onlyBar" class="chart-title text-23 text-grey-1">{{ sideTitle }}</div>

        <!-- Barra -->
        <div
          class="chart-bar"
          :style="{ width: width, height: height }"
        >
          <!-- Fundo projetado -->
          <div class="bar-bg"></div>

          <!-- BARRAS: agora usamos CSS var --bar-h e animamos no mount do Intersection -->
          <div
            v-for="(item, index) in chartData.filter(i => i.label !== 'Projetado')"
            :key="index"
            class="chart-fill"
            :class="{ 'hovered': hoveredIndex === (index + 1) }"
            :style="{
              '--bar-h': calcHeight(item) + '%',
              backgroundColor: item.bgColor
            }"
            @mouseenter="hoveredIndex = (index + 1)"
            @mouseleave="hoveredIndex = null"
          />
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
            />
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
    </q-intersection>
  </div>
</template>

<script>
export default {
  props: {
    height: { type: String, default: '300px' },
    width: { type: String, default: '55px' },
    chartData: { type: Array, required: true },
    sideTitle: { type: Object, default: null },
    onlyBar: { type: Boolean, default: false }
  },
  data () {
    return {
      hoveredIndex: null
    }
  },
  methods: {
    formatCurrency (value) {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value)
    },
    calcHeight (item) {
      const projetado = Number(this.chartData.find(i => i.label === 'Projetado')?.value) || 0
      // if (!projetado) return 0

      const hasPE = this.chartData.some(i => i.label === 'Ponto de Equilíbrio')
      const reserve = hasPE ? 30 : 0
      const span = 100 - reserve

      if (item.label === 'Ponto de Equilíbrio') return reserve

      if (projetado > 0) {
        const percent = (Number(item.value / projetado) * span)
        return Math.max(0, Math.min(percent, span))
      }

      const others = this.chartData.filter(i => i.label !== 'Projetado' && i.label !== 'Ponto de Equilíbrio')
      const maxVal = Math.max(...others.map(o => Number(o.value) || 0), 0)

      // se nem as outras têm valor, fica 0 mesmo
      if (!maxVal) return 0

      const percent = (Number(item.value) / maxVal) * span
      return Math.max(0, Math.min(percent, span))
    }
  },
  mounted () {
    console.log(this.chartData)
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
  justify-content: center;
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
/* Agora a altura final vem da CSS var --bar-h, e a animação dispara quando o slot do QIntersection monta */
.chart-fill {
  width: 100%;
  border-radius: 30px;
  z-index: 2;
  /* sem height inline; ela será animada de 0 -> var(--bar-h) */
}

/* Quando dentro de .chart-io (conteúdo do QIntersection), anima ao entrar em view */
.chart-io .chart-fill {
  height: 0;
  animation: growBar 800ms ease-out forwards;
}

@keyframes growBar {
  from { height: 0; }
  to   { height: var(--bar-h, 0%); }
}

/* foco/hover */
.chart-fill.hovered {
  transform: scaleY(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
  filter: brightness(1.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
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

.legend-dot.gray { background-color: #f0f0f0; border: 2px solid #e0e0e0; }
.legend-dot.blue { background-color: #0047A1; }
.legend-dot.pink { background-color: #FF3CC7; }

.legend-content { flex: 1; }

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Respeita acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .chart-io .chart-fill { animation: none; height: var(--bar-h, 0%); }
  .legend-item { animation: none; opacity: 1; transform: none; }
}
</style>

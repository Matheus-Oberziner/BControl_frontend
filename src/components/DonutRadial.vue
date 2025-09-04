<template>
  <!-- dispara montagem e animação só quando entrar na tela -->
  <q-intersection
    class="donut-io"
    once
    transition="fade"
    :transition-duration="850"
    :threshold="[0.15]"
    root-margin="0px 0px -10%"
  >
    <div class="donut-row">
      <div class="chart-wrapper" :style="{ width: size + 'px', height: svgHeight + 'px' }">
        <svg
          :width="size"
          :height="svgHeight"
          :viewBox="viewBoxStr"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Pattern do restante (se habilitado) -->
          <defs v-if="usePattern">
            <pattern
              :id="patternId"
              :width="patternSize"
              :height="patternSize"
              patternUnits="userSpaceOnUse"
              :patternTransform="patternTransform"
            >
              <rect :width="stripeWidth" :height="patternSize" :fill="restPatternColor" />
            </pattern>
          </defs>

          <!-- Arco restante -->
          <path
            v-if="darkPath"
            :d="darkPath"
            :stroke="restStroke"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
            class="rest-arc"
            pathLength="100"
          />

          <!-- Arco de progresso (animado) -->
          <path
            v-if="lightPath"
            :d="lightPath"
            :stroke="progressColor"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
            class="progress-arc"
            pathLength="100"
          />

          <!-- Dots para ângulos muito pequenos -->
          <circle
            v-if="drawLightDot"
            :cx="dotPos.x"
            :cy="dotPos.y"
            :r="strokeWidth / 2"
            :fill="progressColor"
            class="progress-dot"
          />
          <circle
            v-if="drawDarkDot"
            :cx="dotPosDark.x"
            :cy="dotPosDark.y"
            :r="strokeWidth / 2"
            :fill="usePattern ? restPatternColor : restColor"
            class="rest-dot"
          />
        </svg>

        <!-- slots posicionados -->
        <div class="label-left">
          <slot name="left-label" />
        </div>
        <div class="info-right">
          <slot name="info-right" />
        </div>
      </div>

      <div class="right-label">
        <slot name="right-label" />
      </div>

      <slot name="top-label" />
      <slot name="center-label" />
      <slot name="bottom-label" />
    </div>
  </q-intersection>
</template>

<script>
export default {
  name: "DonutRadial",
  props: {
    value: { type: Number, required: true, validator: v => v >= 0 && v <= 100 },
    size: { type: Number, default: 100 },
    strokeWidth: { type: Number, default: 14 },
    progressColor: { type: String, default: "#4090F2" },
    restColor: { type: String, default: "#0047A1" },
    startAngle: { type: Number, default: 87 },

    /* pattern opcional */
    restUsePattern: { type: Boolean, default: false },
    restPatternColor: { type: String, default: "#dadada" },
    restPatternAngle: { type: Number, default: 145 },
    restPatternStripe: { type: Number, default: 1 },
    restPatternGap: { type: Number, default: 5 },

    /* semicircular / arco custom */
    semicircle: { type: Boolean, default: false },
    arcSpan: { type: Number, default: null },
    startAngleSemi: { type: Number, default: 270 }
  },

  computed: {
    radius () { return (this.size / 2) - (this.strokeWidth / 2) },
    circumference () { return 2 * Math.PI * this.radius },
    gapPx () {
      const min = 1
      const max = Math.max(1, this.circumference * 0.05)
      return Math.min(max, Math.max(min, this.strokeWidth))
    },
    gapAngle () { return (this.gapPx / this.circumference) * 360 },

    arcSpanDeg () { return this.arcSpan != null ? this.arcSpan : (this.semicircle ? 180 : 360) },
    startAngleEff () { return this.semicircle ? this.startAngleSemi : this.startAngle },
    svgHeight () { return this.semicircle ? Math.ceil(this.size / 2 + this.strokeWidth) : this.size },
    viewBoxStr () { return `0 0 ${this.size} ${this.svgHeight}` },

    valueAngle () { return (this.value / 100) * this.arcSpanDeg },

    drawLightDot () { return this.value > 0 && this.valueAngle <= this.gapAngle + 0.0001 },
    drawDarkDot () { return this.value < 100 && (this.arcSpanDeg - this.valueAngle) <= this.gapAngle + 0.0001 },

    lightPath () {
      if (this.value <= 0) return null
      if (this.value >= 100) {
        return this.describeArc(this.center, this.center, this.radius, this.startAngleEff + 0.001, this.startAngleEff + this.arcSpanDeg - 0.001)
      }
      if (this.drawLightDot) return null
      const start = this.startAngleEff + (this.gapAngle / 2)
      const end   = this.startAngleEff + this.valueAngle - (this.gapAngle / 2)
      return this.describeArc(this.center, this.center, this.radius, start, end)
    },

    darkPath () {
      if (this.value >= 100) return null
      if (this.value <= 0) {
        return this.describeArc(this.center, this.center, this.radius, this.startAngleEff + 0.001, this.startAngleEff + this.arcSpanDeg - 0.001)
      }
      if (this.drawDarkDot) return null
      const start = this.startAngleEff + this.valueAngle + (this.gapAngle / 2)
      const end   = this.startAngleEff + this.arcSpanDeg - (this.gapAngle / 2)
      return this.describeArc(this.center, this.center, this.radius, start, end)
    },

    dotPos () {
      const angle = this.startAngleEff + (this.valueAngle / 2)
      return this.polarToCartesian(this.center, this.center, this.radius, angle)
    },
    dotPosDark () {
      const remainingAngle = this.arcSpanDeg - this.valueAngle
      const angle = this.startAngleEff + this.valueAngle + (remainingAngle / 2)
      return this.polarToCartesian(this.center, this.center, this.radius, angle)
    },

    center () { return this.size / 2 },

    /* pattern */
    usePattern () { return this.restUsePattern || this.restColor === "" },
    patternId () { return `donut-rest-pattern-${this._uid}` },
    patternSize () { return Number(this.restPatternGap) || 5 },
    stripeWidth () { return Number(this.restPatternStripe) || 1 },
    patternTransform () { return `rotate(${this.restPatternAngle})` },
    restStroke () { return this.usePattern ? `url(#${this.patternId})` : this.restColor }
  },

  methods: {
    polarToCartesian (cx, cy, radius, angleDeg) {
      const angleRad = (angleDeg - 90) * Math.PI / 180
      return {
        x: +(cx + (radius * Math.cos(angleRad))).toFixed(3),
        y: +(cy + (radius * Math.sin(angleRad))).toFixed(3)
      }
    },
    describeArc (cx, cy, radius, startAngle, endAngle) {
      let s = startAngle % 360; if (s < 0) s += 360
      let e = endAngle % 360;   if (e < 0) e += 360
      if (e <= s) e += 360
      const start = this.polarToCartesian(cx, cy, radius, s)
      const end   = this.polarToCartesian(cx, cy, radius, e)
      const largeArcFlag = (e - s) <= 180 ? '0' : '1'
      return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y].join(' ')
    }
  }
}
</script>

<style scoped>
.donut-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
}

.chart-wrapper { position: relative; display: inline-block; }
.label-left { position: absolute; top: -10px; left: -20px; font-weight: 300; color: #666; font-size: 16px; user-select: none; }
.info-right { position: absolute; top: -5px; right: -70px; }
.right-label { display: flex; align-items: center; gap: 4px; }

/* --- ANIMAÇÕES (acionadas quando o conteúdo monta via QIntersection) --- */

/* 1) “desenhando” o arco de progresso */
.progress-arc {
  /* normaliza o comprimento do path (ver pathLength="100" no template) */
  stroke-dasharray: 100;
  stroke-dashoffset: 100; /* totalmente escondido inicialmente */
  animation: drawArc 900ms cubic-bezier(.2,.9,.2,1) 120ms forwards;
}

/* 2) resto aparece levemente depois */
.rest-arc {
  opacity: 0;
  animation: fadeIn 350ms ease 80ms forwards;
}

/* 3) dots em caso de ângulos curtos */
.progress-dot, .rest-dot {
  opacity: 0;
  transform: scale(.7);
  transform-origin: center;
  animation: dotIn 300ms ease 250ms forwards;
}

/* pequeno pop da peça inteira */
.donut-io .chart-wrapper {
  animation: popIn 300ms ease-out both;
}

@keyframes drawArc {
  from { stroke-dashoffset: 100; }
  to   { stroke-dashoffset: 0; }
}
@keyframes fadeIn {
  to { opacity: 1; }
}
@keyframes dotIn {
  to { opacity: 1; transform: scale(1); }
}
@keyframes popIn {
  from { transform: translateY(6px); opacity: 0; }
  to   { transform: translateY(0);  opacity: 1; }
}

/* acessibilidade: reduz movimento */
@media (prefers-reduced-motion: reduce) {
  .donut-io .chart-wrapper,
  .progress-arc,
  .rest-arc,
  .progress-dot,
  .rest-dot { animation: none !important; }
  .progress-arc { stroke-dashoffset: 0; }
}

/* slots utilitários (mantidos) */
.right-label :deep(.percent-box) {
  display: inline-block;
  padding: 4px 6px;
  border: 1px solid #4090F2;
  border-radius: 8px;
  color: #4090F2;
  font-weight: 500;
  user-select: none;
}
:deep(.label-top) { position: absolute; top: -50%; }
:deep(.label-center) { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
:deep(.label-bottom) { position: absolute; bottom: -50%; }
</style>

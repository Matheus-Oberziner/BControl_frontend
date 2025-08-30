<template>
  <div class="donut-row">
    <div class="chart-wrapper" :style="{ width: size + 'px', height: svgHeight + 'px' }">
      <svg
        :width="size"
        :height="svgHeight"
        :viewBox="viewBoxStr"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Definição do pattern somente se estiver usando pattern -->
        <defs v-if="usePattern">
          <pattern
            :id="patternId"
            :width="patternSize"
            :height="patternSize"
            patternUnits="userSpaceOnUse"
            :patternTransform="patternTransform"
          >
            <!-- faixa clara (stripe) -->
            <rect :width="stripeWidth" :height="patternSize" :fill="restPatternColor" />
            <!-- o resto é transparente por padrão -->
          </pattern>
        </defs>

        <!-- Dark arc (restante) - usa cor sólida ou pattern -->
        <path
          v-if="darkPath"
          :d="darkPath"
          :stroke="restStroke"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />

        <!-- Light arc (progresso) -->
        <path
          v-if="lightPath"
          :d="lightPath"
          :stroke="progressColor"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          class="progress-arc"
        />

        <!-- Caso de progresso muito pequeno: desenha um dot -->
        <circle
          v-if="drawLightDot"
          :cx="dotPos.x"
          :cy="dotPos.y"
          :r="strokeWidth / 2"
          :fill="progressColor"
        />

        <!-- Caso de restante muito pequeno: desenha um dot escuro -->
        <circle
          v-if="drawDarkDot"
          :cx="dotPosDark.x"
          :cy="dotPosDark.y"
          :r="strokeWidth / 2"
          :fill="usePattern ? restPatternColor : restColor"
        />
      </svg>

      <!-- slots posicionados (mesma estrutura que você tinha) -->
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

    <!-- labels de layout (top / center / bottom) -->
    <slot name="top-label" />
    <slot name="center-label" />
    <slot name="bottom-label" />
  </div>
</template>

<script>
export default {
  name: "DonutRadial",
  props: {
    value: { type: Number, required: true, validator: v => v >= 0 && v <= 100 },
    size: { type: Number, default: 100 },
    strokeWidth: { type: Number, default: 14 },
    progressColor: { type: String, default: "#4090F2" },

    // comportamento antigo: se você passar uma string vazia para restColor (rest-color=""),
    // o componente irá usar o pattern. Caso contrário, usará a cor sólida.
    restColor: { type: String, default: "#0047A1" },

    // ângulo padrão para o donut completo
    startAngle: { type: Number, default: 87 },

    /* PROPS DO PATTERN (opcionais) */
    restUsePattern: { type: Boolean, default: false },
    restPatternColor: { type: String, default: "#dadada" },
    restPatternAngle: { type: Number, default: 145 },
    restPatternStripe: { type: Number, default: 1 },
    restPatternGap: { type: Number, default: 5 },

    /* NOVO: modo semicircular */
    semicircle: { type: Boolean, default: false }, // ativa 180°
    arcSpan: { type: Number, default: null },      // opcional: span custom em graus
    startAngleSemi: { type: Number, default: 270 } // início padrão do semi (metade superior)
  },

  computed: {
    // --- geometria / lógica existente (mantida/adaptada) ---
    radius() {
      return (this.size / 2) - (this.strokeWidth / 2);
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    gapPx() {
      const min = 1;
      const max = Math.max(1, this.circumference * 0.05);
      return Math.min(max, Math.max(min, this.strokeWidth));
    },
    gapAngle() {
      return (this.gapPx / this.circumference) * 360;
    },

    /* NOVOS: ângulo efetivo, start efetivo, e altura do SVG */
    arcSpanDeg() {
      if (this.arcSpan != null) return this.arcSpan;
      return this.semicircle ? 180 : 360;
    },
    startAngleEff() {
      return this.semicircle ? this.startAngleSemi : this.startAngle;
    },
    svgHeight() {
      // No semi, mostramos metade do círculo + a espessura pra não cortar os caps
      return this.semicircle ? Math.ceil(this.size / 2 + this.strokeWidth) : this.size;
    },
    viewBoxStr() {
      return `0 0 ${this.size} ${this.svgHeight}`;
    },

    valueAngle() {
      return (this.value / 100) * this.arcSpanDeg;
    },

    drawLightDot() {
      return this.value > 0 && this.valueAngle <= this.gapAngle + 0.0001;
    },
    drawDarkDot() {
      return this.value < 100 && (this.arcSpanDeg - this.valueAngle) <= this.gapAngle + 0.0001;
    },

    lightPath() {
      if (this.value <= 0) return null;
      if (this.value >= 100) {
        return this.describeArc(
          this.center,
          this.center,
          this.radius,
          this.startAngleEff + 0.001,
          this.startAngleEff + this.arcSpanDeg - 0.001
        );
      }
      if (this.drawLightDot) return null;

      const start = this.startAngleEff + (this.gapAngle / 2);
      const end   = this.startAngleEff + this.valueAngle - (this.gapAngle / 2);

      return this.describeArc(this.center, this.center, this.radius, start, end);
    },

    darkPath() {
      if (this.value >= 100) return null;
      if (this.value <= 0) {
        return this.describeArc(
          this.center,
          this.center,
          this.radius,
          this.startAngleEff + 0.001,
          this.startAngleEff + this.arcSpanDeg - 0.001
        );
      }
      if (this.drawDarkDot) return null;

      const start = this.startAngleEff + this.valueAngle + (this.gapAngle / 2);
      const end   = this.startAngleEff + this.arcSpanDeg - (this.gapAngle / 2);

      return this.describeArc(this.center, this.center, this.radius, start, end);
    },

    dotPos() {
      const angle = this.startAngleEff + (this.valueAngle / 2);
      return this.polarToCartesian(this.center, this.center, this.radius, angle);
    },
    dotPosDark() {
      const remainingAngle = this.arcSpanDeg - this.valueAngle;
      const angle = this.startAngleEff + this.valueAngle + (remainingAngle / 2);
      return this.polarToCartesian(this.center, this.center, this.radius, angle);
    },

    center() {
      return this.size / 2;
    },

    // --- lógica do pattern (mantida) ---
    usePattern() {
      // usa pattern se for forçado ou se restColor for string vazia (rest-color="")
      return this.restUsePattern || this.restColor === "";
    },
    patternId() {
      // usa _uid para gerar id único por instância (evita colisões)
      return `donut-rest-pattern-${this._uid}`;
    },
    patternSize() {
      // tile (px) = gap total (ex: 5)
      return Number(this.restPatternGap) || 5;
    },
    stripeWidth() {
      return Number(this.restPatternStripe) || 1;
    },
    patternTransform() {
      // rotate(angle)
      return `rotate(${this.restPatternAngle})`;
    },
    restStroke() {
      return this.usePattern ? `url(#${this.patternId})` : this.restColor;
    },
  },

  methods: {
    polarToCartesian(cx, cy, radius, angleDeg) {
      const angleRad = (angleDeg - 90) * Math.PI / 180.0;
      return {
        x: +(cx + (radius * Math.cos(angleRad))).toFixed(3),
        y: +(cy + (radius * Math.sin(angleRad))).toFixed(3),
      };
    },
    describeArc(cx, cy, radius, startAngle, endAngle) {
      // normaliza para que endAngle > startAngle (varrendo sentido horário)
      let s = startAngle % 360;
      if (s < 0) s += 360;
      let e = endAngle % 360;
      if (e < 0) e += 360;
      if (e <= s) e += 360;

      const start = this.polarToCartesian(cx, cy, radius, s);
      const end = this.polarToCartesian(cx, cy, radius, e);

      const largeArcFlag = (e - s) <= 180 ? "0" : "1";
      return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
      ].join(" ");
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

.chart-wrapper {
  position: relative;
  display: inline-block;
}

.label-left {
  position: absolute;
  top: -10px;
  left: -20px;
  font-weight: 300;
  color: #666;
  font-size: 16px;
  user-select: none;
}

.info-right {
  position: absolute;
  top: -5px;
  right: -70px;
}

.right-label {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* animação suave do arco claro */
.progress-arc {
  transition: stroke-dashoffset 0.4s ease, d 0.4s ease;
}

/* aplica a classe percent-box mesmo quando vinda via slot (scoped styles) */
.right-label :deep(.percent-box) {
  display: inline-block;
  padding: 4px 6px;
  border: 1px solid #4090F2;
  border-radius: 8px;
  color: #4090F2;
  font-weight: 500;
  user-select: none;
}

/* posições auxiliares caso use os três slots de layout */
:deep(.label-top) {
  position: absolute;
  top: -50%;
}

:deep(.label-center) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

:deep(.label-bottom) {
  position: absolute;
  bottom: -50%;
}
</style>

<template>
  <div class="donut-row">
    <div class="chart-wrapper" :style="{ width: size + 'px', height: size + 'px' }">
      <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" xmlns="http://www.w3.org/2000/svg">
        <!-- Dark arc (restante) - desenhado por path -->
        <path
          v-if="darkPath"
          :d="darkPath"
          :stroke="darkColor"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
        <!-- Light arc (progresso) - desenhado por path -->
        <path
          v-if="lightPath"
          :d="lightPath"
          :stroke="lightColor"
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
          :fill="lightColor"
        />

        <!-- Caso de restante muito pequeno: desenha um dot escuro -->
        <circle
          v-if="drawDarkDot"
          :cx="dotPosDark.x"
          :cy="dotPosDark.y"
          :r="strokeWidth / 2"
          :fill="darkColor"
        />
      </svg>

      <!-- label e ícone (mesmo do seu layout) -->
      <div class="label-left">{{ (100 - value).toFixed(1).replace('.', ',') }}%</div>
      <div class="info-right">
        <!-- seu ícone -->
        <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/>
          <path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
        </svg>
      </div>
    </div>

    <div class="right-label">
      <q-icon name="chevron_left" size="md" />
      <span class="percent-box">{{ value.toFixed(1).replace('.', ',') }}%</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RobustDonut",
  props: {
    value: { type: Number, required: true, validator: v => v >= 0 && v <= 100 },
    size: { type: Number, default: 100 },        // px do svg
    strokeWidth: { type: Number, default: 14 },  // espessura do traço
    lightColor: { type: String, default: "#4090F2" },
    darkColor: { type: String, default: "#0047A1" },
    // startAngle em graus (0 = top). Para começar à direita (3h) use startAngle = 90
    startAngle: { type: Number, default: 87 } // por padrão começa na direita (3h)
  },

  computed: {
    // raio calculado para caber no SVG
    radius() {
      // center = size/2, queremos stroke centrado dentro do viewbox
      return (this.size / 2) - (this.strokeWidth / 2);
    },

    circumference() {
      return 2 * Math.PI * this.radius;
    },

    // gap em px (evita que os caps se sobreponham). Escolhi gap = strokeWidth (seguro)
    gapPx() {
      // limite mínimo de 1px e não maior que ~5% do perímetro
      const min = 1;
      const max = Math.max(1, this.circumference * 0.05);
      return Math.min(max, Math.max(min, this.strokeWidth));
    },

    gapAngle() {
      return (this.gapPx / this.circumference) * 360;
    },

    // ângulo que corresponde ao progresso
    valueAngle() {
      return (this.value / 100) * 360;
    },

    // Flags para casos extremos
    drawLightDot() {
      // pequeno progresso — desenhar um dot em vez de arco muito pequeno
      return this.value > 0 && this.valueAngle <= this.gapAngle + 0.0001;
    },

    drawDarkDot() {
      // restante muito pequeno (próximo de 0% restante)
      return this.value < 100 && (360 - this.valueAngle) <= this.gapAngle + 0.0001;
    },

    // path strings (ou null)
    lightPath() {
      if (this.value <= 0) return null;
      if (this.value >= 100) {
        // full circle -> single full path (special: use circle element? aqui criamos caminho de 359.999 para evitar 'full circle' limitações)
        return this.describeArc(this.center, this.center, this.radius, this.startAngle + 0.001, this.startAngle + 359.999);
      }
      if (this.drawLightDot) return null;

      // Normal: retiramos small gaps em ambas as pontas (gapAngle / 2)
      const start = this.startAngle + (this.gapAngle / 2);
      const end = this.startAngle + this.valueAngle - (this.gapAngle / 2);

      return this.describeArc(this.center, this.center, this.radius, start, end);
    },

    darkPath() {
      // if value==100: no dark arc
      if (this.value >= 100) return null;
      if (this.value <= 0) {
        // full dark circle
        return this.describeArc(this.center, this.center, this.radius, this.startAngle + 0.001, this.startAngle + 359.999);
      }
      if (this.drawDarkDot) return null;

      const start = this.startAngle + this.valueAngle + (this.gapAngle / 2);
      const end = this.startAngle + 360 - (this.gapAngle / 2);

      return this.describeArc(this.center, this.center, this.radius, start, end);
    },

    // posições dos dots (quando necessário)
    dotPos() { // para o dot do progresso (light)
      const angle = this.startAngle + (this.valueAngle / 2); // coloca entre 0 e valueAngle
      return this.polarToCartesian(this.center, this.center, this.radius, angle);
    },

    dotPosDark() { // para o dot do restante (dark)
      const remainingAngle = 360 - this.valueAngle;
      const angle = this.startAngle + this.valueAngle + (remainingAngle / 2);
      return this.polarToCartesian(this.center, this.center, this.radius, angle);
    },

    center() {
      return this.size / 2;
    }
  },

  methods: {
    // converte ângulo (graus) em coordenadas (0º = top). usamos formula padrão (angle - 90)
    polarToCartesian(cx, cy, radius, angleDeg) {
      const angleRad = (angleDeg - 90) * Math.PI / 180.0;
      return {
        x: +(cx + (radius * Math.cos(angleRad))).toFixed(3),
        y: +(cy + (radius * Math.sin(angleRad))).toFixed(3),
      };
    },

    // Gera um path "A" (arc) do SVG entre startAngle e endAngle (clockwise).
    describeArc(cx, cy, radius, startAngle, endAngle) {
      // normaliza para que endAngle > startAngle (se necessário adiciona 360)
      let s = startAngle % 360;
      if (s < 0) s += 360;
      let e = endAngle % 360;
      if (e < 0) e += 360;
      if (e <= s) e += 360;

      const start = this.polarToCartesian(cx, cy, radius, s);
      const end = this.polarToCartesian(cx, cy, radius, e);

      const largeArcFlag = (e - s) <= 180 ? "0" : "1";
      // sweepFlag = 1 desenha no sentido horário
      const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
      ].join(" ");
      return d;
    }
  }
});
</script>

<style scoped>
.donut-row {
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

.percent-box {
  display: inline-block;
  padding: 4px 6px;
  border: 1px solid #4090F2;
  border-radius: 8px;
  color: #4090F2;
  font-weight: 500;
  user-select: none;
}

/* animação suave do arco claro */
.progress-arc {
  transition: stroke-dashoffset 0.4s ease, d 0.4s ease;
}

/* ícone quasar */
.q-icon {
  color: #4090F2;
}
</style>

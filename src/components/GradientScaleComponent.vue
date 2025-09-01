<template>
  <div class="q-pa-md">
    <!-- Cabeçalho -->
    <div class="row no-wrap items-center justify-between header-row">
      <div class="font-1 text-20">Alto</div>
      <div class="font-1 text-20">Médio</div>
      <div class="font-1 text-20">Baixo</div>
    </div>

    <!-- Wrapper da faixa + thumb (thumb não é filho da faixa, para não ser clipado) -->
    <div class="track-wrap q-mt-sm">
      <div class="gradient-track"></div>
      <div class="thumb" :style="thumbStyle"></div>
    </div>

    <!-- Linha inferior -->
    <div class="row items-center q-mt-sm" style="position: relative;">
      <div class="row items-center" style="position: absolute; left: -70px;">
        <div style="border-radius: 10px; padding: 5px 10px; border: 1px solid #0047A1;">
          <span class="text-blue">Mês</span>
        </div>
  
        <q-icon name="chevron_right" size="24px" color="blue" />
      </div>

      <div class="numbers-grid">
        <span v-for="n in 12" :key="n" class="font-1 text-18 text-grey-1">{{ n }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradientScaleStatic',
  props: {
    value: { type: Number, default: 3.2 }, // 1..12
    min: { type: Number, default: 1 },
    max: { type: Number, default: 12 }
  },
  computed: {
    percent () {
      const clamped = Math.min(this.max, Math.max(this.min, this.value))
      // distribuir igualmente 1..12 ao longo da faixa
      const steps = this.max - this.min
      return steps > 0 ? ((clamped - this.min) / steps) * 100 : 0
    },
    thumbStyle () {
      return { left: `calc(${this.percent}% - 17px)` } // 17px = metade do diâmetro (34px)
    }
  }
}
</script>

<style scoped>
.header-row { padding: 20px 15%; }

/* Wrapper da faixa (sem overflow) */
.track-wrap {
  position: relative;
}

/* Faixa com gradiente e cantos arredondados */
.gradient-track {
  height: 30px;
  border-radius: 999px;
  overflow: hidden; /* aqui pode, o thumb é irmão e não será clipado */
  background: linear-gradient(90deg,
    #C64D6A 0%,
    #FFA30F 35%,
    #3FB855 70%,
    #0E6FEB 100%
  );
}

/* Marcador "vidro" translúcido, maior que a faixa */
.thumb {
  position: absolute;
  top: 50%;
  left: 0;                 /* deslocamento vem via :style (thumbStyle) */
  width: 70px;
  height: 70px;
  transform: translateY(-50%);
  border-radius: 50%;

  /* transparência + blur para deixar o gradiente aparecer */
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);

  /* contorno e sombra */
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 18px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12);
  z-index: 1;
  pointer-events: none;
}

/* brilho/sombreamento interno conforme os prints (F3F3F3 → FFFFFF → D4D4D4) */
.thumb::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(243,243,243,0.9) 0%,
    rgba(255,255,255,0.7) 54%,
    rgba(212,212,212,0.9) 100%
  );
}

/* faixa central ligeiramente mais translúcida para reforçar o efeito vidro */
.thumb::after {
  content: '';
  position: absolute;
  left: 8%; right: 8%;
  top: 50%; height: 38%;
  transform: translateY(-50%);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0), rgba(0,0,0,0.10));
  opacity: .22;
}

/* Números 1..12 */
.numbers-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
  padding: 20px 0;
}
.numbers-grid span { text-align: center; }
</style>

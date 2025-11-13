<template>
  <div class="progress-container">
    <div class="text-20 weight-300 text-blue" style="position: absolute; top: -35px; z-index: 2;">
      Performance
    </div>

    <!-- monta/mostra só quando entrar na tela -->
    <q-intersection
      class="progress-io"
      once
      transition="fade"
      :transition-duration="500"
      :threshold="[0.2]"
      root-margin="0px 0px -10%"
      @visibility="onVis"
    >
      <div class="progress-wrapper q-mt-md">
        <!-- Trilha -->
        <div class="progress-track">
          <div
            class="progress-fill"
            :style="{ width: progressPercent + '%' }"
          />
        </div>

        <!-- Bolinha/label que acompanha -->
        <div
          class="progress-label"
          :style="{ left: progressPercent + '%' }"
        >
          {{ progressPercent }}%
        </div>
      </div>
    </q-intersection>
  </div>
</template>

<script>

export default {
  // valor 0..1
  props: {
    progress: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data () {
    return {
      animated: 0, // 0..1 controlado pela animação
      seen: false
    }
  },

  computed: {
    progressPercent () {
      // arredonda pra exibir e para width/left
      return Math.round((this.animated ?? this.progress) * 100)
    }
  },

  watch: {
    // se o valor mudar depois de visível, continua animado acompanhando
    progress (v) {
      if (this.seen) this.animated = v
    }
  },

  methods: {
    onVis (isVisible) {
      if (!isVisible) return
      this.seen = true
      this.animated = 0 // começa do zero
      // garante um frame antes de ir ao destino para o CSS animar
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.animated = this.progress
          })
        })
      })
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
  width: 350px;
  height: 25px;
  /* pequena entrada quando monta via QIntersection */
  animation: popIn 260ms ease-out both;
}

.progress-track {
  background: repeating-linear-gradient(
    45deg,
    #f5f5f5,
    #f5f5f5 1px,
    #ffffff 2px,
    #ffffff 4px
  );
  border-radius: 20px;
  height: 100%;
  overflow: hidden;
}

.progress-fill {
  background-color: #0047A1;
  height: 100%;
  border-radius: 20px 0 0 20px;
  /* anima a largura quando o valor aparece/muda */
  transition: width 900ms cubic-bezier(.2,.9,.2,1);
}

/* Bolinha */
.progress-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: transparent;
  overflow: hidden;

  font-weight: bold;
  font-size: 24px;
  color: #0047A1;
  letter-spacing: -0.7px;
  -webkit-text-stroke: 0.005px #ffffff;
  text-shadow:
    -1px -1px 0 #ffffff,
     1px -1px 0 #ffffff,
    -1px  1px 0 #ffffff,
     1px  1px 0 #ffffff;

  isolation: isolate;
  z-index: 0;

  /* acompanha suavemente a barra */
  transition: left 900ms cubic-bezier(.2,.9,.2,1), transform 250ms ease;
}

.progress-label:active,
.progress-label:hover {
  transform: translate(-50%, -50%) scale(1.04);
}

/* FILL: Linear 40% + blur + sombra (look de vidro) */
.progress-label::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;

  background: linear-gradient(
    180deg,
    rgba(232, 232, 234, 0.40) 39%,
    rgba(172, 174, 175, 0.40) 100%
  );

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  box-shadow:
    0 8px 18px rgba(0,0,0,0.18),
    0 2px 4px  rgba(0,0,0,0.12);

  pointer-events: none;
  z-index: -1;
}

/* STROKE: traçado vidro */
.progress-label::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;

  background: linear-gradient(180deg, #E8E8EA 39%, #ACAEAF 100%) border-box;

  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;

  pointer-events: none;
  z-index: -1;
}

/* se usar número dentro, mantenha nítido */
.progress-label > span { position: relative; z-index: 2; }

/* entrada do wrapper */
@keyframes popIn {
  from { transform: translateY(6px); opacity: 0; }
  to   { transform: translateY(0);  opacity: 1; }
}

/* acessibilidade: menos movimento */
@media (prefers-reduced-motion: reduce) {
  .progress-wrapper { animation: none !important; }
  .progress-fill, .progress-label { transition: none !important; }
}
</style>

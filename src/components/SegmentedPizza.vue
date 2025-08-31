<!-- SegmentedPizza.vue -->
<template>
  <div class="segmented-pizza" :style="{ margin: space + 'px', padding: pad + 'px' }" @mouseleave="hideTooltip">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" role="img">
      <defs>
        <!-- MÁSCARA: recorta os gaps com ponta arredondada -->
        <mask :id="maskId" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
          <!-- branco mantém; preto recorta -->
          <rect :width="size" :height="size" fill="white" />
          <g stroke="black" :stroke-width="gapWidth" stroke-linecap="round" vector-effect="non-scaling-stroke">
            <line
              v-for="(ang, i) in boundaryAngles"
              :key="'m-'+i"
              :x1="polar(innerRadius - gapWidth, ang).x"
              :y1="polar(innerRadius - gapWidth, ang).y"
              :x2="polar(outerRadius + gapWidth, ang).x"
              :y2="polar(outerRadius + gapWidth, ang).y"
            />
          </g>
        </mask>
      </defs>

      <!-- Grupo com a máscara aplicada (atributo + CSS para máxima compatibilidade) -->
      <g :mask="`url(#${maskId})`" :style="{ mask: `url(#${maskId})`, WebkitMask: `url(#${maskId})` }">
        <path
          v-for="(seg, i) in segmentsWithGeom"
          :key="'slice-'+i+'-'+animKey"
          class="svg-slice"
          :d="seg.path"
          :fill="seg.color"
          :style="sliceStyle(i)"
          @mouseenter="showTooltipFromMouse($event, seg)"
        />
      </g>

      <!-- Labels por cima -->
      <text
        v-for="(seg, i) in segmentsWithGeom"
        :key="'lbl-'+i"
        class="slice-label"
        :x="seg.labelX"
        :y="seg.labelY"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {{ seg.percent.toFixed(0) }}%
      </text>

      <!-- Furo central (mesma cor do separador) -->
      <circle :cx="center" :cy="center" :r="innerRadius" :fill="separatorColor" />
    </svg>

    <div class="tooltip" :class="{ show: tooltip.show }" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
      <div v-html="tooltip.html"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SegmentedPizza',
  props: {
    size: { type: Number, default: 300 },
    hole: { type: Number, default: 0.30 },         // 30% do diâmetro
    gapWidth: { type: Number, default: 10 },       // grossura do gap (define o “arredondado”)
    separatorColor: { type: String, default: '#FFFFFF' },
    space: { type: Number, default: 16 },
    pad: { type: Number, default: 0 },
    animate: { type: Boolean, default: true },
    segments: {
      type: Array,
      default: () => ([
        { label: 'Segmento A', percent: 5,  color: '#1976d2' },
        { label: 'Segmento B', percent: 15, color: '#42a5f5' },
        { label: 'Segmento C', percent: 20, color: '#ff9f43' },
        { label: 'Segmento D', percent: 15, color: '#26a69a' },
        { label: 'Segmento E', percent: 15, color: '#66bb6a' },
        { label: 'Segmento F', percent: 10, color: '#ab47bc' },
        { label: 'Segmento G', percent: 10, color: '#ce93d8' },
        { label: 'Segmento H', percent: 10, color: '#ec407a' }
      ])
    }
  },
  data () {
    return {
      tooltip: { show: false, x: 0, y: 0, html: '' },
      animKey: 0,
      maskId: 'mask-' + Math.random().toString(36).slice(2, 8)
    }
  },
  computed: {
    center () { return this.size / 2 },
    outerRadius () { return this.size / 2 },
    innerRadius () { return this.size * (this.hole / 2) },
    total () { return this.segments.reduce((s, v) => s + Number(v.percent || 0), 0) },

    // fatias clássicas (sem cortar ângulo); o espaço arredondado vem da MÁSCARA
    segmentsWithGeom () {
      let cursor = -90
      return this.segments.map(s => {
        const percent = (Number(s.percent) / (this.total || 1)) * 100
        const sweep = (percent / 100) * 360
        const a0 = cursor
        const a1 = cursor + sweep
        cursor += sweep

        const mid = a0 + sweep / 2
        const labelR = this.innerRadius + (this.outerRadius - this.innerRadius) * 0.6
        const lp = this.polar(labelR, mid)

        return {
          ...s,
          percent,
          path: this.wedgePath(a0, a1),
          labelX: lp.x, labelY: lp.y
        }
      })
    },

    // ângulos de fronteira (onde ficam os gaps arredondados)
    boundaryAngles () {
      const out = []
      let cursor = -90
      this.segments.forEach(s => {
        const sweep = (Number(s.percent) / (this.total || 1)) * 360
        cursor += sweep
        out.push(cursor)
      })
      return out
    }
  },
  watch: {
    segments: { deep: true, handler () { this.animKey++ } }
  },
  methods: {
    degToRad (d) { return (Math.PI / 180) * d },
    polar (radius, angleDeg) {
      const a = this.degToRad(angleDeg)
      return { x: this.center + radius * Math.cos(a), y: this.center + radius * Math.sin(a) }
    },
    wedgePath (a0, a1) {
      const large = a1 - a0 > 180 ? 1 : 0
      const O0 = this.polar(this.outerRadius, a0)
      const O1 = this.polar(this.outerRadius, a1)
      const I1 = this.polar(this.innerRadius, a1)
      const I0 = this.polar(this.innerRadius, a0)
      return [
        `M ${O0.x.toFixed(3)} ${O0.y.toFixed(3)}`,
        `A ${this.outerRadius} ${this.outerRadius} 0 ${large} 1 ${O1.x.toFixed(3)} ${O1.y.toFixed(3)}`,
        `L ${I1.x.toFixed(3)} ${I1.y.toFixed(3)}`,
        `A ${this.innerRadius} ${this.innerRadius} 0 ${large} 0 ${I0.x.toFixed(3)} ${I0.y.toFixed(3)}`,
        'Z'
      ].join(' ')
    },
    showTooltipFromMouse (e, seg) {
      this.tooltip = {
        show: true,
        x: e.pageX + 10,
        y: e.pageY - 30,
        html: `<strong>${seg.label}</strong><br>Valor: ${seg.percent}<br>Porcentagem: ${seg.percent.toFixed(1)}%`
      }
    },
    hideTooltip () { this.tooltip.show = false },
    sliceStyle (i) {
      const base = { transformBox: 'fill-box', transformOrigin: '50% 50%', transition: 'transform .25s, filter .25s', cursor: 'pointer' }
      if (this.animate) base.animation = `spinIn 1s ease-out ${i * 0.1}s both`
      return base
    }
  }
}
</script>

<style scoped>
.segmented-pizza { display: inline-block; box-sizing: border-box; }
.svg-slice:hover { transform: scale(1.04); filter: brightness(1.1); }
.slice-label { fill:#fff; font-weight:700; font-size:14px; text-shadow:0 1px 2px rgba(0,0,0,.2); pointer-events:none; }
.tooltip { position:fixed; background:rgba(0,0,0,.85); color:#fff; padding:8px 12px; border-radius:6px; font-size:12px; pointer-events:none; opacity:0; transition:opacity .2s; z-index:1000; }
.tooltip.show { opacity:1; }
@keyframes spinIn { from{ transform:rotate(0) scale(.8); opacity:0 } to{ transform:rotate(360deg) scale(1); opacity:1 } }
</style>

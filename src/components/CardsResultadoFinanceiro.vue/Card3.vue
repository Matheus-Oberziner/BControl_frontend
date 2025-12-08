<template>
  <div class="col-12 row shadow-5" style="border-radius: 20px; padding: 25px 0px; margin: 60px 0px;">
    <div class="col-12 row items-start justify-between" :style="$q.screen.width > 1200 ? 'padding: 0px 70px;' : 'padding: 0px 30px;'">
      <div class="row items-center q-py-sm q-px-md topic-style">
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_185_6049" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M59.25 59.25V0.75H0.75V59.25H59.25Z" fill="white" stroke="white" stroke-width="1.5"/></mask><g mask="url(#mask0_185_6049)"><path d="M43.301 21.7432H54.4049C55.7123 21.7432 56.5288 20.3272 55.874 19.1956L45.765 1.72623C45.1114 0.596658 43.4806 0.596658 42.8269 1.72623L35.7397 13.9736" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M44.2959 7.91038V14.3965" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M44.2954 17.8945C44.3379 17.8945 44.356 17.8866 44.3579 17.8857C44.3597 17.8849 44.3603 17.8838 44.3628 17.8809C44.3716 17.8706 44.3949 17.8322 44.395 17.7656C44.3951 17.6988 44.3723 17.6593 44.3638 17.6494C44.3614 17.6467 44.36 17.6464 44.3579 17.6455C44.3554 17.6444 44.3374 17.6367 44.2954 17.6367C44.2532 17.6368 44.2358 17.6446 44.2339 17.6455C44.2319 17.6464 44.2306 17.6474 44.228 17.6504C44.2191 17.6611 44.1969 17.6998 44.1968 17.7656C44.1967 17.832 44.2194 17.8707 44.228 17.8809C44.2306 17.8838 44.2318 17.8848 44.2339 17.8857C44.2371 17.8872 44.2547 17.8945 44.2954 17.8945Z" fill="black" stroke="#0047A1" stroke-width="1.5"/><path d="M25.8994 6.7782V10.3789" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.7822 10.377V6.77777" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.0352 12.2527C16.872 10.9562 20.0237 10.2333 23.341 10.2333C35.7266 10.2333 45.8028 20.3097 45.8028 32.6951C45.8028 35.0174 45.4487 37.2585 44.7914 39.3672" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.7124 55.0977C10.084 54.2606 0.878906 44.5321 0.878906 32.6942C0.878906 25.2719 4.49778 18.6788 10.0636 14.5867" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.7123 51.5703C12.0109 50.7445 4.39453 42.6082 4.39453 32.6931C4.39453 22.2293 12.877 13.7468 23.3407 13.7468C33.8045 13.7468 42.287 22.2293 42.287 32.6931C42.287 35.0788 41.846 37.3617 41.0411 39.4644" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.2964 6.77734H19.3852C18.4896 6.77734 17.7637 6.05137 17.7637 5.15582C17.7637 4.26027 18.4896 3.53429 19.3852 3.53429H27.2964C28.192 3.53429 28.9179 4.26027 28.9179 5.15582C28.9179 6.05137 28.192 6.77734 27.2964 6.77734Z" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.3403 17.5468V18.8369" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.7671 19.5771L16.4121 20.6943" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.2241 25.1215L11.3414 25.7666" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.19434 32.6943H9.48445" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.2241 40.2666L11.3414 39.6216" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.7671 45.8115L16.4121 44.6943" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M38.4864 32.6943H37.1963" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M36.4581 25.1215L35.3408 25.7666" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M30.9131 19.5771L30.2681 20.6943" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.3203 31.0205L28.2725 24.272" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.329 34.7119C22.2375 34.7119 21.3496 33.824 21.3496 32.7325C21.3496 31.641 22.2375 30.7531 23.329 30.7531C24.4204 30.7531 25.3084 31.641 25.3084 32.7325C25.3084 33.824 24.4204 34.7119 23.329 34.7119Z" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M56.5516 39.4649H24.282C22.8628 39.4649 21.7124 40.6153 21.7124 42.0344V56.5515C21.7124 57.9707 22.8628 59.1211 24.282 59.1211H56.5516C57.9707 59.1211 59.1211 57.9707 59.1211 56.5515V42.0344C59.1211 40.6153 57.9707 39.4649 56.5516 39.4649Z" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M28.097 39.466C28.097 42.9921 25.2385 45.8506 21.7124 45.8506" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M59.1214 45.8506C55.5953 45.8506 52.7368 42.9921 52.7368 39.466" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M52.7368 59.1211C52.7368 55.5949 55.5954 52.7365 59.1214 52.7365" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.7124 52.7365C25.2386 52.7365 28.097 55.595 28.097 59.1211" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M46.1041 51.7689C46.4334 51.0096 46.6169 50.1723 46.6169 49.2917C46.6169 45.8576 43.8413 43.0736 40.4175 43.0736C36.9935 43.0736 34.2178 45.8576 34.2178 49.2917C34.2178 52.7259 36.9935 55.5098 40.4175 55.5098C41.3464 55.5098 42.227 55.3034 43.018 54.9361" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M41.5272 46.8207C41.5272 46.8207 40.8952 46.2353 39.9211 46.53C39.0266 46.8005 38.8045 48.0296 39.4124 48.5083C39.7614 48.7832 40.2865 49.0093 40.9942 49.2605C42.5782 49.8228 41.9927 52.0661 40.3814 52.0769C39.7526 52.0811 39.4587 52.041 38.9062 51.6782" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M40.3813 52.0776V52.8965" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M40.3813 45.689V46.4463" stroke="#0047A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></g>
        </svg>
        <span class="font-1 text-28 weight-500 text-blue q-pl-md text-center">Inadimplência</span>
      </div>

      <div class="row items-center q-gutter-md" :class="$q.screen.width > 1350 ? 'offset-md-1' : 'q-pl-md'">
        <span class="text-16 text-grey-7">Quantidade:</span>
        <q-input
          :model-value="inadimplenciaData.totalQtde ?? 0"
          outlined
          dense
          input-class="text-center"
          style="text-transform: uppercase; max-width: 150px;"
        />
        <span class="text-16 text-grey-7">Valor Total:</span>
        <q-input
          :model-value="`R$ ${inadimplenciaData.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`"
          outlined
          dense
          input-class="text-center"
          style="text-transform: uppercase; max-width: 150px;"
        />
        <span class="text-16 text-grey-7">Sobre o Faturamento:</span>
        <DonutRadial
          :value="inadimplenciaData.percTotal"
          :size="110"
          :stroke-width="16"
          semicircle
          progress-color="#0047A1"
          rest-color=""
          :rest-pattern-angle="110"
          rest-pattern-color="#dadada"
          :rest-pattern-stripe="1"
          :rest-pattern-gap="3"
        >
          <template #center-label>
            <div class="label-center q-pt-lg">
              <span class="text-18 weight-600" :style="{ color: '#0047A1' }">{{ inadimplenciaData.percTotal }}%</span>
            </div>
          </template>
        </DonutRadial>
      </div>
    </div>

    <!-- ===== Risco por Tempo de Atraso ===== -->
    <div class="col-12 row" style="padding: 40px 70px;">
      <CardComponent title="Risco por Tempo de Atraso" :with-icon="true">
        <template #content>
          <div class="col-12 row justify-center items-start risk-grid">
            <div
              v-for="(r, idx) in riscoTempo"
              :key="idx"
              class="risk-card"
            >
              <!-- Cabeçalho -->
              <div class="risk-title">
                <div class="title-top">{{ r.title }}</div>
                <div class="subtitle" :class="r.levelClass">{{ r.level }}</div>
              </div>

              <!-- Corpo (pílula + eixos + badge %) -->
              <div class="risk-body">
                <!-- Pílula + hachuras + barra (CustomBarChart) -->
                <div class="pill-wrap">
                  <CustomBarChart
                    class="pill-chart"
                    height="220px"
                    width="50px"
                    :onlyBar="true"
                    :sideTitle="null"
                    :chartData="[
                      { value: 100, label: 'Projetado', color: '#e7e7e7', bgColor: '#f6f6f6' },
                      { value: r.percent, label: 'Faturamento', color: '#0047A1', bgColor: r.fill }
                    ]"
                  />
                </div>

                <!-- Chevron e badge % -->
                <div class="percent-wrap">
                  <span class="chevron">&lt;</span>
                  <div class="percent-badge" :style="{ borderColor: r.fill }">
                    <span class="badge-text">{{ formatPercentLabel(r.percent) }}</span>
                  </div>
                </div>

                <!-- Linhas de eixo -->
                <div class="axes">
                  <div class="axis-v" />
                  <div class="axis-h" />
                </div>

                <!-- Rótulos dos eixos -->
                <div class="axis-labels">
                  <span class="tick">{{ r.tick }}</span>
                  <span class="amount">R$ {{ r.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CardComponent>
    </div>

    <!-- ===== Faturamento por Modalidade de Venda (inalterado) ===== -->
    <div class="col-12 row" style="padding: 40px 70px;">
      <CardComponent
        title="Faturamento por Modalidade de Venda"
        :with-icon="true"
      >
        <template #content>
          <div class="col-12 row items-start justify-center" style="padding: 60px 20px; overflow-x: auto; flex-wrap: nowrap;">
            <div class="col-2 row justify-center" style="height: 100%;">
              <PieChartComponent
                :data="arrayPieInadimplencia"
              />
            </div>
            <div
              v-for="(item, index) in arrayInadimplenciaVenda"
              :key="index"
              class="col"
              :class="$q.screen.lt.lg ? 'q-mx-xs' : 'q-mx-md'"
            >
              <CardComponent
                :title="item.title"
                title-position="center"
                :theme-color="item.color"
                :title-color="item.color"
                :stroke="1"
              >
                <template #content>
                  <div class="col-12 row justify-center" style="padding: 20px 10px;">
                    <div class="col-12 row justify-between">
                      <div class="legend-dot" :style="{ backgroundColor: item.color}" style="width: 15px; height: 15px; border-radius: 50%; flex-shrink: 0;"></div>

                      <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/>
                        <path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
                      </svg>
                    </div>
                    <div
                      class="col-12 row justify-center q-pt-md q-pb-sm q-mb-md"
                      :class="{ 'q-px-md' : !$q.screen.lt.lg }"
                      :style="{ borderBottom: `2px solid ${item.color}` }"
                    >
                      <div
                        v-for="(card, index) in item.cards"
                        :key="index"
                        class="col-4"
                      >
                        <CustomBarChart
                          height="150px"
                          width="37px"
                          :onlyBar="true"
                          :sideTitle="null"
                          :chartData="[
                            { value: 100, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
                            { value: card.perc, label: 'Faturamento', color: 'blue', bgColor: card.color }
                          ]"
                        />
                      </div>
                    </div>
                    <div
                      v-for="(card, index) in item.cards"
                      :key="index"
                      class="col-12 row justify-center items-center text-grey-2 q-py-md q-my-sm"
                      style="border-radius: 10px; position: relative;"
                      :style="{ border: `1px solid ${card.color}`}"
                    >
                      <span class="text-12 q-pr-xs weight-600 text-center">R$</span><span class="text-16 weight-600">{{ card.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
                      <span class="col-12 text-center">Quantidade: {{ card.qtde }}</span>
                    </div>
                  </div>
                </template>
              </CardComponent>
            </div>
          </div>
        </template>
      </CardComponent>
    </div>
  </div>
</template>

<script>
import CardComponent from '../CardComponent.vue'
import CustomBarChart from '../CustomBarChart.vue'
import DonutRadial from '../DonutRadial.vue'
import PieChartComponent from '../PieChartComponent.vue'

export default {
  props: {
    inadimplenciaData: {
      type: Object,
      required: true
    }
  },
  components: {
    CardComponent,
    CustomBarChart,
    DonutRadial,
    PieChartComponent
  },
  computed: {
    riscoTempo () {
      return [
        {
          title: 'Até 7 Dias',
          level: 'Baixo Risco',
          levelClass: 'level-low',
          fill: '#7ED9AE',
          percent: this.inadimplenciaData.riscoPorTempo.ate7Dias.perc ?? 0,
          current: this.inadimplenciaData.riscoPorTempo.ate7Dias.valor ?? 0,
          tick: this.inadimplenciaData.riscoPorTempo.ate7Dias.qtde ?? 0,
          amount: this.inadimplenciaData.riscoPorTempo.ate7Dias.valor ?? 0
        },
        {
          title: 'Até 30 Dias',
          level: 'Médio Risco',
          levelClass: 'level-mid',
          fill: '#EFE27A',
          percent: this.inadimplenciaData.riscoPorTempo.ate30Dias.perc ?? 0,
          current: this.inadimplenciaData.riscoPorTempo.ate30Dias.valor ?? 0,
          tick: this.inadimplenciaData.riscoPorTempo.ate30Dias.qtde ?? 0,
          amount: this.inadimplenciaData.riscoPorTempo.ate30Dias.valor ?? 0
        },
        {
          title: '+ 31 Dias',
          level: 'Alto Risco',
          levelClass: 'level-high',
          fill: '#FF9F9F',
          percent: this.inadimplenciaData.riscoPorTempo.acima31Dias.perc ?? 0,
          current: this.inadimplenciaData.riscoPorTempo.acima31Dias.valor ?? 0, // exemplo proporcional
          tick: this.inadimplenciaData.riscoPorTempo.acima31Dias.qtde ?? 0,
          amount: this.inadimplenciaData.riscoPorTempo.acima31Dias.valor ?? 0
        }
      ]
    },

    arrayPieInadimplencia () {
      const array = []
      const modalidades = this.inadimplenciaData.porModalidade ?? []

      modalidades.forEach(modalidade => {
        array.push({
          label: modalidade.label,
          percentage: modalidade.perc,
          color: modalidade.color
        })
      })

      return array
    },

    arrayInadimplenciaVenda () {
      const array = []
      const modalidades = this.inadimplenciaData.porModalidade ?? []
      
      modalidades.forEach(modalidade => {
        array.push({
          title: modalidade.label,
          percent: modalidade.perc,
          color: modalidade.color,
          cards: [
            {
              qtde: modalidade.buckets.ate7.qtde,
              value: modalidade.buckets.ate7.valor,
              color: '#B0F2C2'
            },
            {
              qtde: modalidade.buckets.ate30.qtde,
              value: modalidade.buckets.ate30.valor,
              color: '#F2F298'
            },
            {
              qtde: modalidade.buckets.acima31.qtde,
              value: modalidade.buckets.acima31.valor,
              color: '#FFB6AF'
            }
          ]
        })
      })

      return array
    } 
  },
  methods: {
    formatPercentLabel (value) {
      const num = Number(value)

      // Tratamento de valores inválidos
      if (!Number.isFinite(num)) return '0%'

      // Formata com duas casas
      const formatted = num.toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    
      return `${formatted}%`
    }
  }
}
</script>
<style scoped>
/* ===== Risco por Tempo de Atraso ===== */
.risk-grid {
  padding: 60px 20px;
  gap: 40px;
  flex-wrap: wrap;
}
.risk-card {
  position: relative;
  width: 320px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* Cabeçalho do card (título + selo de risco) */
.risk-title {
  position: absolute;
  top: 10%;
  right: 25%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}
.title-top {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.subtitle {
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  width: fit-content;
  padding: 2px 6px;
  line-height: 1;
}
.level-low { background: #e8f8ef; color: #2e7d32; }
.level-mid { background: #fff9e1; color: #7a6200; }
.level-high { background: #ffe9ea; color: #b71c1c; }

/* Corpo: pílula + eixos + percent badge */
.risk-body {
  position: relative;
  padding-top: 6px;
}

/* Wrapper da pílula (usa CustomBarChart por baixo) */
.pill-wrap {
  position: relative;
  width: 62px;
  border-radius: 40px;
  overflow: hidden;
  margin: 6px 0 18px 86px; /* deixa espaço para a linha vertical à esquerda e o badge */
}

/* Hachuras no topo da pílula */
.pill-hatch {
  position: absolute;
  inset: 0 0 60% 0;       /* hachuras só na parte superior ~40% */
  background: repeating-linear-gradient(
    135deg,
    #e5e5e5 0px,
    #e5e5e5 2px,
    transparent 2px,
    transparent 6px
  );
  pointer-events: none;
  z-index: 2;
}

/* Chevron + badge % à direita da pílula */
.percent-wrap {
  position: absolute;
  left: 158px;
  bottom: 100px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.chevron {
  color: #8a8a8a;
  font-weight: 700;
  font-size: 16px;
}
.percent-badge {
  background: #fff;
  border: 2px solid;
  border-radius: 12px;
  min-width: 38px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
}
.badge-text {
  font-size: 11px;
  font-weight: 700;
  color: #4a4a4a;
}

/* Linhas de eixo (vertical cruza a horizontal) */
.axes {
  position: relative;
  height: 0;
}
.axis-v {
  position: absolute;
  left: 65px;
  top: -240px;
  width: 2px;
  height: 260px;
  background: #0047A1;
  border-radius: 2px;
}
.axis-h {
  position: absolute;
  left: 65px;
  top: -5px;
  right: 0;
  height: 2px;
  background: #0047A1;
  border-radius: 2px;
}

/* Rótulos “15  R$ 25.000,00” etc */
.axis-labels {
  display: flex;
  align-items: center;
  gap: 40px;
  padding-left: 80px;
  margin-top: 16px;
}
.tick {
  font-size: 16px;
  font-weight: 700;
  color: #2f2f2f;
}
.amount {
  font-size: 16px;
  color: #7a7a7a;
}

/* Responsivo */
@media (max-width: 1200px) {
  .risk-card { width: 280px; min-width: 280px; }
  .percent-wrap { left: 140px; }
  .axis-v, .axis-h { left: 65px; }
  .pill-wrap { margin-left: 74px; }
  .axis-labels { padding-left: 54px; }
}
</style>

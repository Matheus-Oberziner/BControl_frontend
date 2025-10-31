<template>
  <div class="projection">
    <!-- Coluna fixa da esquerda -->
    <div class="left-legend">
      <!-- A RECEBER -->
      <div class="legend-row">
        <div class="legend-chip legend-receber shadow-3">
          <span>A Receber</span>
        </div>
        <span class="legend-arrow">
          <q-icon name="chevron_right" color="orange" size="32px" />
        </span>
      </div>

      <!-- Resultado Projetado (sem chip/ícone) -->
      <div class="legend-middle">
        <div class="text-16 weight-300 text-grey-1 text-caption">
          Resultado<br>Projetado
        </div>
      </div>

      <!-- A PAGAR -->
      <div class="legend-row">
        <div class="legend-chip legend-pagar shadow-3">
          <span>A Pagar</span>
        </div>
        <span class="legend-arrow">
          <q-icon name="chevron_right" color="purple" size="32px" />
        </span>
      </div>

      <!-- SALDO -->
      <div class="legend-row">
        <div class="legend-chip legend-saldo shadow-3">
          <span>Saldo</span>
        </div>
        <span class="legend-arrow">
          <q-icon name="chevron_right" color="grey-7" size="32px" />
        </span>
      </div>
    </div>

    <!-- Área rolável -->
    <div class="scroller" style="--proj-line-top: 196px;">
      <!-- Linha horizontal (resultado projetado) -->
      <div class="projected-line"></div>

      <!-- Grade dos meses (com a barra vertical via ::before) -->
      <div class="months">
        <div v-for="(m, idx) in months" :key="idx" class="col">
          <div class="cap cap-top">{{ brl(m.topCap) }}</div>

          <!-- A RECEBER -->
          <div class="bar-wrap">
            <CustomBarChart
              height="150px"
              width="40px"
              :onlyBar="true"
              :sideTitle="null"
              :chartData="[
                { value: m.topCap, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
                { value: m.receber.value, label: 'Faturamento', color: 'blue', bgColor: m.receber.color }
              ]"
            />
            <div class="bar-label label-receber">{{ brl(m.receber.value) }}</div>
          </div>

          <div class="sep-space"></div>

          <!-- A PAGAR (invertida + label em cima) -->
          <div class="bar-wrap lower">
            <div class="bar-flip">
              <CustomBarChart
                height="150px"
                width="40px"
                :onlyBar="true"
                :sideTitle="null"
                :chartData="[
                  { value: m.bottomCap, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
                  { value: m.pagar.value, label: 'Faturamento', color: 'blue', bgColor: m.pagar.color }
                ]"
              />
            </div>
            <div class="bar-label label-pagar">{{ brl(m.pagar.value) }}</div>
          </div>

          <!-- Máximo da barra inferior (AGORA PRÓXIMO) -->
          <div class="cap cap-bottom">{{ brl(m.bottomCap) }}</div>

          <div class="saldo-chip">{{ brl(m.saldo) }}</div>
          <div class="month-label font-1">{{ m.month }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomBarChart from './CustomBarChart.vue'

export default {
  name: 'FinancialFluxChart',
  components: { CustomBarChart },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    months () { return this.items || [] }
  },
  methods: {
    brl (n) {
      return typeof n === 'number'
        ? n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : n
    }
  }
}
</script>

<style scoped>
.projection {
  display: grid;
  grid-template-columns: 160px 1fr;
}

/* coluna fixa da esquerda */
.left-legend {
  position: sticky;
  left: 0; top: 0;
  display: grid;
  grid-template-rows: 160px 70px 200px auto;
  z-index: 2;
}

/* linha com chip + ícone FORA do chip */
.legend-row {
  display: flex;
  align-items: center;
  gap: 10px;                 /* distância entre chip e ícone externo */
  padding-left: 8px;
}

/* chip */
.legend-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 110px;
  border-radius: 10px;
  background: #fff;
  font-weight: 400;
  font-size: 16px;
  white-space: nowrap;
}

/* ícone EXTERNO ao chip */
.legend-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  margin-right: 4px;         /* leve respiro com a barra vertical */
}

/* cores de texto dos chips */
.legend-receber { color: #FE721C; }
.legend-pagar   { color: #680059; }
.legend-saldo   { color: #383838; }

/* título do meio */
.legend-middle { display: flex; align-items: center; padding-left: 16px; }

/* área rolável */
.scroller { position: relative; overflow-x: auto; padding-bottom: 8px; }

/* linha horizontal (resultado projetado) */
.projected-line {
  position: absolute; left: 0; right: 0;
  top: var(--proj-line-top, 192px);
  height: 2px; background: #FE721C; z-index: 0;
}

/* grade de meses com a barra vertical */
.months {
  position: relative;
  display: grid; grid-auto-flow: column; grid-auto-columns: 140px;
  gap: 28px; padding: 8px 0 8px 0;
  z-index: 1;
}
.months::before {
  content: "";
  position: absolute;
  left: 0px;        /* encosta após a legenda */
  top: 10px;        /* começa acima das barras superiores */
  bottom: 107px;    /* termina abaixo das barras inferiores */
  width: 2px;
  background: #FE721C;
  z-index: -1;
}

/* colunas/mês */
.col {
  display: grid;
  grid-template-rows: 17px 170px 24px 170px auto auto auto;
  justify-items: center; align-items: start;
}

/* tetos/pisos */
.cap { color: #383838; font-size: 13px; font-weight: 400; }
.cap-top { margin-top: -2px; }

/* >>> AJUSTE pedida: aproximar o rótulo do máximo inferior da barra */
.cap-bottom {
  margin-top: -18px;    /* puxa para perto da barra inferior */
}

/* barras + labels */
.bar-wrap { position: relative; display: flex; flex-direction: column; align-items: center; }
.bar-label { position: absolute; font-weight: 500; font-size: 13px; white-space: nowrap; }
.label-receber { bottom: -18px; color: #ff7a00; }

/* bloco de baixo (A Pagar) */
.bar-wrap.lower { margin-bottom: 0; }
.bar-wrap.lower .bar-flip { transform: rotate(180deg); }
.bar-wrap.lower .bar-label { top: -18px; color: #680059; }

.sep-space { height: 14px; }

/* saldo e mês */
.saldo-chip {
  margin-top: 36px;
  padding: 6px 14px;
  border: 2px solid #e4e4e4;
  border-radius: 999px;
  font-weight: 500;
  font-size: 13px;
  color: #383838;
}
.month-label {
  margin-top: 6px;
  font-weight: 700;
  font-size: 14px;
  color: #383838;
  text-align: center;
}

/* scrollbar */
.months::-webkit-scrollbar { height: 8px; }
.months::-webkit-scrollbar-thumb { background: #d9d9d9; border-radius: 8px; }
</style>

<template>
  <div class="dashboard-charts">
    <div class="legend-1 row items-center">
      <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/><path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
      </svg>

      <div class="shadow-4 q-ml-sm row justify-center items-center" style="width: 120px; height: 48px; border-radius: 15px; background-color: #FDFAFA;">
        <span class="text-16 text-blue">Projetado</span>
      </div>

      <q-icon name="chevron_right" size="md" color="blue" />
    </div>
    <div class="legend-2 row items-center">
      <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/><path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
      </svg>

      <div class="shadow-4 q-ml-sm row justify-center items-center" style="width: 120px; height: 48px; border-radius: 15px; background-color: #FDFAFA;">
        <span class="text-16 text-center" style="color: #FF3CC7; line-height: 0.9;">Ponto de Equilíbrio</span>
      </div>

      <q-icon name="chevron_right" size="md" style="color: #FF3CC7;" />
    </div>

    <div class="vertical-line"></div>
    <div class="horizontal-line"></div>
    <div class="col-12 horizontal-line"></div>
    <div
      v-for="(mes, index) in mesesMuted"
      :key="index"
      class="chart-item"
    >
      <div class="chart-wrapper">
        <!-- Label Projetado em cima -->
        <div class="value-top text-14 text-grey-7 weight-300 q-pb-sm">
          <span class="text-12 q-pr-xs">R$</span><span class="text-14">{{ mes.chartData.find(i => i.label === 'Projetado').value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>

        <!-- Gráfico -->
        <div class="bar-area">
          <CustomBarChart
            :onlyBar="true"
            :sideTitle="null"
            :chartData="mes.chartData"
          />

          <!-- Label Faturamento (ao lado da barra azul) -->
          <div class="value-middle text-blue weight-500">
            <span class="text-12 q-pr-xs">R$</span><span class="text-14">{{ mes.chartData.find(i => i.label === 'Faturamento').value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
            <span class="text-12 text-grey-7" style="display: block;">Faturamento</span>
          </div>

          <!-- Label Ponto de Equilíbrio (embaixo da barra rosa) -->
          <div class="value-bottom">
            <span class="text-12 q-pr-xs">R$</span><span class="text-14">{{ mes.chartData.find(i => i.label === 'Ponto de Equilíbrio').value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
          </div>
        </div>
      </div>

      <!-- Mês -->
      <div class="month-label font-1 weight-700">
        {{ mes.label }}
      </div>
    </div>
  </div>
</template>

<script>
import CustomBarChart from './CustomBarChart.vue'

export default {
  components: { CustomBarChart },

  props: {
    meses: {
      type: Array,
      required: true
    }
  },

  computed: {
    mesesMuted () {
      if (!Array.isArray(this.meses)) return []

      return this.meses.map(mesItem => {
        return {
          label: mesItem.label,
          chartData: [
            {
              value: mesItem.projetado,
              label: 'Projetado',
              color: 'gray',
              bgColor: '#f0f0f0'
            },
            {
              value: mesItem.faturamento,
              label: 'Faturamento',
              color: 'blue',
              bgColor: '#0047A1'
            },
            {
              value: mesItem.equilibrio,
              label: 'Ponto de Equilíbrio',
              color: 'pink',
              bgColor: '#FF3CC7'
            }
          ]
        }
      })
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
  }
}
</script>

<style scoped>
.dashboard-charts {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 130px;
  padding: 25px 90px 10px;
}

.chart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.vertical-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 40px;
  width: 2px;
  background-color: #0047A1;
  opacity: 0.7;
  z-index: 0;
}
.horizontal-line {
  position: absolute;
  left: 40px;
  right: 0;
  bottom: 50px; /* ajuste para altura da linha, por exemplo alinhada com o ponto de equilíbrio */
  height: 2px;
  background-color: #0047A1; /* ou a cor que você quiser */
  opacity: 0.4;
  z-index: 0; /* atrás das barras */
}

.bar-area {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1; /* barras por cima da linha */
}

.value-middle {
  position: absolute;
  top: 50%;
  left: 110%;
  transform: translateY(-50%);
}

.value-bottom {
  position: absolute;
  bottom: -25px;
  text-align: center;
  color: #FF3CC7;
  font-weight: 500;
}

.month-label {
  margin-top: 60px;
  font-size: 16px;
}

.legend-1 {
  position: absolute;
  top: 30%;
  left: -13%;
  transform: translateY(-50%);
}

.legend-2 {
  position: absolute;
  top: 70%;
  left: -13%;
  transform: translateY(-50%);
}
</style>

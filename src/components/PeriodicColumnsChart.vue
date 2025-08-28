<template>
  <div class="dashboard-charts">
    <div class="vertical-line"></div>
    <div class="horizontal-line"></div>
    <div class="col-12 horizontal-line"></div>
    <div
      v-for="(mes, index) in meses"
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
  data () {
    return {
      meses: [
        {
          label: 'JUN / 2025',
          chartData: [
            { value: 420000, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
            { value: 420000, label: 'Faturamento', color: 'blue', bgColor: '#0047A1' },
            { value: 300000, label: 'Ponto de Equilíbrio', color: 'pink', bgColor: '#FF3CC7' }
          ]
        },
        {
          label: 'JUL / 2025',
          chartData: [
            { value: 420000, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
            { value: 430000, label: 'Faturamento', color: 'blue', bgColor: '#0047A1' },
            { value: 305000, label: 'Ponto de Equilíbrio', color: 'pink', bgColor: '#FF3CC7' }
          ]
        },
        {
          label: 'AGO / 2025',
          chartData: [
            { value: 420000, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
            { value: 415000, label: 'Faturamento', color: 'blue', bgColor: '#0047A1' },
            { value: 310000, label: 'Ponto de Equilíbrio', color: 'pink', bgColor: '#FF3CC7' }
          ]
        },
        {
          label: 'SET / 2025',
          chartData: [
            { value: 420000, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
            { value: 400000, label: 'Faturamento', color: 'blue', bgColor: '#0047A1' },
            { value: 310000, label: 'Ponto de Equilíbrio', color: 'pink', bgColor: '#FF3CC7' }
          ]
        },
        {
          label: 'OUT / 2025',
          chartData: [
            { value: 420000, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
            { value: 415000, label: 'Faturamento', color: 'blue', bgColor: '#0047A1' },
            { value: 315000, label: 'Ponto de Equilíbrio', color: 'pink', bgColor: '#FF3CC7' }
          ]
        }
      ]
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
  padding: 25px 0px 10px;
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
  left: -15px;
  width: 2px;
  background-color: #0047A1;
  z-index: 0;
}
.horizontal-line {
  position: absolute;
  left: -15px;
  right: 0;
  bottom: 50px; /* ajuste para altura da linha, por exemplo alinhada com o ponto de equilíbrio */
  height: 2px;
  background-color: #0047A1; /* ou a cor que você quiser */
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
</style>

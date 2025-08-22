<template>
  <apexchart 
    type="radialBar" 
    width="230"
    height="230"
    :options="chartOptions" 
    :series="[value]"
  />
</template>

<script>
import VueApexCharts from "vue3-apexcharts"

export default {
  name: "GaugeChart",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    value: { type: Number, default: 50 }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
              size: "60%"
            },
            track: {
              background: "#ECECEA",
              strokeWidth: "100%",
            },
            dataLabels: {
              name: { show: false },
              value: {
                show: true,
                fontSize: "26px",
                fontWeight: 500,
                offsetY: -10,
                color: "#0047A1",
                formatter: (val) => `${val}%`
              }
            }
          }
        },
        stroke: {
          lineCap: "butt",
          dashArray: 2
        },
        labels: [],
        colors: ["#0047A1"],
      }
    }
  }
}
</script>

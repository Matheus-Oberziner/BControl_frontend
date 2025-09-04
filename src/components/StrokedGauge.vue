<template>
  <q-intersection
    once
    transition="fade"
    :transition-duration="400"
    :threshold="[0.15]"
    root-margin="0px 0px -10%"
  >
    <apexchart 
      type="radialBar" 
      width="230"
      height="230"
      :options="chartOptions" 
      :series="[value]"
    />
  </q-intersection>
</template>

<script>
import VueApexCharts from "vue3-apexcharts"
export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    value: {
      type: Number,
      required: true
    }
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

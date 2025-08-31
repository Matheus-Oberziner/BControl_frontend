<template>
  <div class="col-12 row justify-center shadow-5" style="border-radius: 20px; margin: 0 0 60px;">
    <div class="col-12 bg-blue text-center text-white font-1 weight-500 text-31 q-pa-md" style="border-radius: 20px 20px 0 0;">
      DRE - Demonstração de Resultados do Exercício
    </div>

    <!-- ocupa 100% -->
    <div class="col-12">
      <DRETableComponent class="col-12" />
    </div>
  </div>
</template>

<script>
import DRETableComponent from '../DRETableComponent.vue'
export default { components: { DRETableComponent } }
</script>

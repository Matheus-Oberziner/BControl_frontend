<template>
  <div class="col-12 row justify-center shadow-5" style="border-radius: 20px; padding: 25px 0px; margin: 0px 0px 60px;">
    <div class="col-12 row items-start justify-between" :style="$q.screen.width > 1200 ? 'padding: 0px 70px;' : 'padding: 0px 30px;'">
      <div class="row items-center q-py-sm q-px-md topic-style">
        <svg width="45" height="45" viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.2992 0.809457C38.1471 0.787927 37.992 0.799189 37.8446 0.84249C37.6971 0.88579 37.5606 0.960129 37.4442 1.06052C37.3278 1.1609 37.2342 1.28502 37.1697 1.42454C37.1053 1.56405 37.0714 1.71575 37.0703 1.86945V24.5076C37.0704 24.7918 37.1833 25.0643 37.3842 25.2652L53.3953 41.2758C53.5046 41.3836 53.6358 41.4668 53.7799 41.5198C53.924 41.5728 54.0778 41.5944 54.2309 41.5832C54.384 41.572 54.533 41.5282 54.6679 41.4548C54.8028 41.3814 54.9204 41.28 55.0129 41.1575C66.4945 26.1042 56.9977 3.41435 38.2992 0.809457ZM54.0094 38.8597L39.2132 24.064V3.14596C55.0342 6.14295 63.1983 25.5031 54.0094 38.8597Z" fill="#0047A1"/><path d="M35.5986 25.5633V1.59878C35.5986 1.31461 35.4857 1.0421 35.2847 0.841168C35.0838 0.640239 34.8113 0.527355 34.5271 0.527344C29.5263 0.539227 24.6388 2.01747 20.4696 4.77905C16.3005 7.54064 13.0328 11.4643 11.0711 16.0643C10.9666 16.3249 10.9685 16.616 11.0765 16.8752C11.1844 17.1343 11.3898 17.3407 11.6484 17.45C11.907 17.5593 12.1982 17.5627 12.4593 17.4596C12.7203 17.3564 12.9305 17.1549 13.0446 16.8983C14.77 12.8531 17.5995 9.37539 21.2092 6.86322C24.8189 4.35104 29.0629 2.90591 33.4556 2.69323V26.007C33.4557 26.2911 33.5686 26.5636 33.7696 26.7645L50.2525 43.2472C46.5847 46.5672 41.9618 48.6435 37.0437 49.1795C32.1257 49.7155 27.164 48.684 22.8672 46.2321C24.8386 44.8915 26.4524 43.0892 27.5682 40.9823C28.6839 38.8754 29.2676 36.5277 29.2686 34.1437C28.2864 14.3269 0.515511 15.2056 0.00379438 34.1437C-0.241178 44.5726 11.4249 51.9936 20.7388 47.4252C25.0892 50.2178 30.1848 51.6241 35.3517 51.458C40.5187 51.2919 45.5134 49.5612 49.6754 46.4949C50.687 45.7412 51.6446 44.9179 52.5414 44.0308C52.7429 43.8294 52.8564 43.5566 52.8573 43.2718C52.8582 42.987 52.7463 42.7135 52.5461 42.5109L35.5986 25.5633ZM20.2858 45.286C13.04 48.8004 2.59985 45.078 2.1466 34.1436C2.15032 30.8323 3.46737 27.6577 5.80879 25.3163C8.15022 22.9749 11.3248 21.6578 14.6361 21.6541C28.1666 21.872 31.5449 39.7352 20.2858 45.286Z" fill="#0047A1"/><path d="M19.353 28.1387C19.6335 28.1332 19.9007 28.0179 20.0972 27.8176C20.2937 27.6173 20.4038 27.3479 20.4038 27.0673C20.4038 26.7866 20.2937 26.5172 20.0973 26.3169C19.9008 26.1165 19.6336 26.0012 19.353 25.9958H15.7075V24.7087C15.702 24.4282 15.5866 24.1611 15.3863 23.9646C15.1859 23.7682 14.9166 23.6582 14.636 23.6582C14.3554 23.6582 14.086 23.7682 13.8857 23.9647C13.6854 24.1611 13.5701 24.4283 13.5645 24.7088V25.9958C7.40961 26.0515 7.29738 35.0178 13.4568 35.2137H13.5645V40.1458H9.91901C9.63845 40.1513 9.37122 40.2666 9.17473 40.4669C8.97824 40.6672 8.86817 40.9367 8.86816 41.2173C8.86816 41.4979 8.97821 41.7673 9.17469 41.9677C9.37116 42.168 9.63838 42.2833 9.91895 42.2888H13.5645V43.5758C13.5701 43.8564 13.6854 44.1235 13.8857 44.3199C14.0861 44.5164 14.3555 44.6264 14.6361 44.6264C14.9166 44.6264 15.186 44.5163 15.3863 44.3199C15.5867 44.1235 15.702 43.8563 15.7075 43.5758V42.2889C21.8617 42.2335 21.9753 33.2668 15.8153 33.0708H15.7075V28.1387H19.353ZM13.5645 33.0708C13.2344 33.0808 12.9056 33.0244 12.5976 32.905C12.2897 32.7856 12.0088 32.6055 11.7718 32.3755C11.5347 32.1456 11.3462 31.8703 11.2175 31.5661C11.0888 31.2619 11.0225 30.935 11.0225 30.6047C11.0225 30.2744 11.0888 29.9475 11.2176 29.6433C11.3463 29.3391 11.5348 29.0639 11.7718 28.8339C12.0089 28.6039 12.2897 28.4239 12.5977 28.3044C12.9057 28.185 13.2345 28.1287 13.5646 28.1387L13.5645 33.0708ZM15.7075 40.1458L15.7075 35.2137C16.0379 35.2034 16.367 35.2595 16.6752 35.3787C16.9835 35.498 17.2646 35.678 17.502 35.908C17.7393 36.138 17.9281 36.4134 18.0569 36.7178C18.1858 37.0221 18.2522 37.3493 18.2522 37.6798C18.2522 38.0103 18.1858 38.3375 18.0569 38.6418C17.928 38.9462 17.7393 39.2216 17.5019 39.4516C17.2646 39.6816 16.9834 39.8616 16.6752 39.9808C16.3669 40.1001 16.0378 40.1562 15.7075 40.1458Z" fill="#0047A1"/>
        </svg>

        <span class="font-1 text-28 weight-500 text-blue q-pl-md text-center">Margem de Contribuição</span>
      </div>
    </div>

    <div class="row justify-center items-center col" style="padding: 40px 10px;">
      <div class="row justify-center q-gutter-sm">
        <div class="text-grey-2">
          <span class="text-12 q-pr-xs weight-500 text-center">R$</span><span class="text-16 weight-500">{{ (416000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>

        <CustomBarChart
          height="220px"
          width="50px"
          :onlyBar="true"
          :sideTitle="null"
          :chartData="[
            { value: 500000, label: 'Projetado', color: '#e7e7e7', bgColor: '#f6f6f6' },
            { value: 416000, label: 'Faturamento', color: '#0047A1', bgColor: '#7C0187' }
          ]"
        />

        <div class="text-grey-7">
          <span>Receita Bruta</span>
        </div>
      </div>

      <div class="row justify-center q-gutter-sm">
        <div class="text-grey-2">
          <span class="text-12 q-pr-xs weight-500 text-center">R$</span><span class="text-16 weight-500">{{ (62400).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>

        <CustomBarChart
          height="220px"
          width="50px"
          :onlyBar="true"
          :sideTitle="null"
          :chartData="[
            { value: 200000, label: 'Projetado', color: '#e7e7e7', bgColor: '#f6f6f6' },
            { value: 62400, label: 'Faturamento', color: '#0047A1', bgColor: '#CF00E2' }
          ]"
        />

        <div class="text-grey-7">
          <span>Devolução Venda + Impostos</span>
        </div>
      </div>

      <div class="row justify-center q-gutter-sm">
        <div class="text-grey-2">
          <span class="text-12 q-pr-xs weight-500 text-center">R$</span><span class="text-16 weight-500">{{ (166400).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>

        <CustomBarChart
          height="220px"
          width="50px"
          :onlyBar="true"
          :sideTitle="null"
          :chartData="[
            { value: 250000, label: 'Projetado', color: '#e7e7e7', bgColor: '#f6f6f6' },
            { value: 166400, label: 'Faturamento', color: '#0047A1', bgColor: '#CF00E2' }
          ]"
        />

        <div class="text-grey-7">
          <span>Custos Variáveis</span>
        </div>
      </div>

      <svg class="q-mr-xl" width="60" height="38" viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.05857 14.7134H22.8571H37.1429H52.9414C56.8229 14.7134 60 11.4534 60 7.57059C60 3.68773 56.8229 0.427734 52.9414 0.427734H37.1429H22.8571H7.05857C3.17714 0.427734 0 3.68773 0 7.57059C0 11.4534 3.17714 14.7134 7.05857 14.7134Z" fill="#797979"/><path d="M52.9414 23.2852H37.1429H22.8571H7.05857C3.17714 23.2852 0 26.5452 0 30.428C0 34.3109 3.17714 37.5709 7.05857 37.5709H22.8571H37.1429H52.9414C56.8229 37.5709 60 34.3109 60 30.428C60 26.5452 56.8229 23.2852 52.9414 23.2852Z" fill="#797979"/>
      </svg>

      <DonutRadial
        :value="45"
        :size="235"
        :stroke-width="30"
        semicircle
        progress-color="#7C0187"
        rest-color="#CF00E2"
      >
        <!-- Center label -->
        <template #center-label>
          <div class="label-center q-pt-lg">
            <span class="text-32 weight-600 text-blue">{{ 45 }}%</span>
          </div>
        </template>
      </DonutRadial>
    </div>
  </div>
</template>
<script>
import CustomBarChart from '../CustomBarChart.vue'
import DonutRadial from '../DonutRadial.vue'
export default {
  components: {
    CustomBarChart,
    DonutRadial
  }
}
</script>
<style scoped>
</style>

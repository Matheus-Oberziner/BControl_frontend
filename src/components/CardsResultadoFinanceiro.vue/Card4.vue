<template>
  <div class="col-12 row shadow-5" style="border-radius: 20px; padding: 25px 0px; margin: 0px 0px 60px;">
    <div class="col-12 row items-start justify-between" :style="$q.screen.width > 1200 ? 'padding: 0px 70px;' : 'padding: 0px 30px;'">
      <div class="row items-center q-py-sm q-px-md topic-style">
        <svg width="45" height="45" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1989 21.26H26.6653L26.3821 21.5432C26.1308 21.7859 26.03 22.1453 26.1185 22.4833C26.207 22.8213 26.4709 23.0851 26.8088 23.1736C27.1468 23.2621 27.5062 23.1613 27.7489 22.91L29.6822 20.9767C30.0595 20.5992 30.0595 19.9873 29.6822 19.6099L27.7489 17.6766C27.3696 17.3103 26.7667 17.3155 26.3938 17.6884C26.021 18.0612 26.0157 18.6641 26.3821 19.0435L26.6653 19.3267H23.1989C19.1615 19.3262 15.4141 21.4251 13.3054 24.8682C11.1967 28.3114 11.0301 32.6032 12.8655 36.1995C13.1171 36.6577 13.6874 36.8329 14.1528 36.5949C14.6182 36.357 14.8102 35.7921 14.5861 35.3199C13.8893 33.9605 13.528 32.454 13.5325 30.9264C13.5383 25.5902 17.8628 21.2659 23.1989 21.26Z" fill="#0047A1"/><path fill-rule="evenodd" clip-rule="evenodd" d="M33.5327 25.6529C33.3817 25.3347 33.0697 25.1238 32.7182 25.1024C32.3667 25.081 32.0313 25.2524 31.8429 25.5498C31.6544 25.8473 31.6426 26.2238 31.8121 26.5325C32.509 27.8919 32.8703 29.3983 32.8658 30.9259C32.8599 36.2621 28.5355 40.5865 23.1993 40.5923H19.733L20.0162 40.3091C20.3826 39.9298 20.3773 39.327 20.0045 38.954C19.6316 38.5812 19.0287 38.5759 18.6494 38.9423L16.7161 40.8756C16.3388 41.2531 16.3388 41.865 16.7161 42.2424L18.6494 44.1757C19.0287 44.542 19.6315 44.5368 20.0045 44.164C20.3774 43.7911 20.3826 43.1882 20.0162 42.8089L19.733 42.5256H23.1993C27.2368 42.5261 30.9842 40.4272 33.0929 36.9841C35.2016 33.541 35.3681 29.2491 33.5327 25.6529Z" fill="#0047A1"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.1989 36.7267C23.7327 36.7267 24.1656 36.2939 24.1656 35.76V35.5821C25.4962 35.1135 26.2948 33.7534 26.0557 32.363C25.8167 30.9726 24.6097 29.9575 23.1989 29.9601C22.7298 29.9596 22.3288 29.6226 22.2477 29.1607C22.1666 28.6988 22.4288 28.2453 22.8694 28.085C23.3102 27.9248 23.8024 28.104 24.0369 28.5102C24.3118 28.9545 24.89 29.1 25.3425 28.8386C25.7949 28.5773 25.9578 28.0036 25.7102 27.5436C25.3597 26.9556 24.8126 26.5104 24.1655 26.287V26.0936C24.1655 25.5598 23.7327 25.127 23.1988 25.127C22.6648 25.127 22.2321 25.5597 22.2321 26.0936V26.2715C20.9014 26.7402 20.1029 28.1002 20.3419 29.4906C20.581 30.881 21.7879 31.8962 23.1988 31.8935C23.6678 31.894 24.0688 32.231 24.1499 32.6929C24.231 33.1548 23.9689 33.6084 23.5282 33.7686C23.0874 33.9288 22.5952 33.7496 22.3607 33.3434C22.1938 33.0332 21.8713 32.8383 21.5189 32.8349C21.1666 32.8315 20.8403 33.0199 20.6674 33.3268C20.4944 33.6337 20.5021 34.0105 20.6875 34.31C21.0384 34.8985 21.5863 35.3436 22.2341 35.5666V35.76C22.2342 36.2931 22.6658 36.7255 23.1989 36.7267Z" fill="#0047A1"/><path d="M46.399 32.9084V8.69301C46.3958 6.02501 44.2337 3.86298 41.5657 3.85974H40.599V2.89305C40.599 1.29147 39.3007 -0.00683594 37.6992 -0.00683594C36.0976 -0.00683594 34.7992 1.29147 34.7992 2.89314V3.85984H30.9326V2.89314C30.9326 1.29147 29.6343 -0.00683594 28.0327 -0.00683594C26.4311 -0.00683594 25.1327 1.29147 25.1327 2.89314V3.85984H21.2662V2.89314C21.2662 1.29147 19.9679 -0.00683594 18.3663 -0.00683594C16.7647 -0.00683594 15.4663 1.29147 15.4663 2.89314V3.85984H11.5997V2.89314C11.5997 1.29147 10.3013 -0.00683594 8.69975 -0.00683594C7.09817 -0.00683594 5.79986 1.29147 5.79986 2.89314V3.85984H4.83317C2.16518 3.86298 0.00314914 6.02501 0 8.69301V45.4256C0.00314914 48.0936 2.16528 50.2556 4.83327 50.2588H33.8327C36.2046 55.9686 42.3774 59.1047 48.3875 57.6533C54.3974 56.202 58.4589 50.5945 57.9636 44.4315C57.4683 38.2685 52.5636 33.3814 46.399 32.9084ZM36.7325 2.89314C36.7325 2.35932 37.1652 1.92645 37.6992 1.92645C38.233 1.92645 38.6659 2.35922 38.6659 2.89314V6.75972C38.6659 7.29355 38.2331 7.72641 37.6992 7.72641C37.1653 7.72641 36.7325 7.29364 36.7325 6.75972V2.89314ZM27.066 2.89314C27.066 2.35932 27.4988 1.92645 28.0327 1.92645C28.5665 1.92645 28.9994 2.35922 28.9994 2.89314V6.75972C28.9994 7.29355 28.5666 7.72641 28.0327 7.72641C27.4989 7.72641 27.066 7.29364 27.066 6.75972V2.89314ZM17.3996 2.89314C17.3996 2.35932 17.8324 1.92645 18.3663 1.92645C18.9002 1.92645 19.333 2.35922 19.333 2.89314V6.75972C19.333 7.29355 18.9002 7.72641 18.3663 7.72641C17.8324 7.72641 17.3996 7.29364 17.3996 6.75972V2.89314ZM7.73315 2.89314C7.73315 2.35932 8.16592 1.92645 8.69984 1.92645C9.23377 1.92645 9.66654 2.35922 9.66654 2.89314V6.75972C9.66654 7.29355 9.23377 7.72641 8.69984 7.72641C8.16592 7.72641 7.73315 7.29364 7.73315 6.75972V2.89314ZM4.83317 5.79303H5.79986V6.75972C5.79986 8.3613 7.09817 9.6597 8.69984 9.6597C10.3015 9.6597 11.5998 8.36139 11.5998 6.75972V5.79303H15.4664V6.75972C15.4664 8.3613 16.7647 9.6597 18.3664 9.6597C19.9681 9.6597 21.2664 8.36139 21.2664 6.75972V5.79303H25.1329V6.75972C25.1329 8.3613 26.4312 9.6597 28.0329 9.6597C29.6345 9.6597 30.9329 8.36139 30.9329 6.75972V5.79303H34.7995V6.75972C34.7995 8.3613 36.0978 9.6597 37.6994 9.6597C39.3011 9.6597 40.5994 8.36139 40.5994 6.75972V5.79303H41.5661C43.1677 5.79303 44.4661 7.09133 44.4661 8.69301V11.593H1.93329V8.69301C1.93329 7.09143 3.23159 5.79303 4.83317 5.79303ZM4.83317 48.3255C3.23159 48.3255 1.93319 47.0272 1.93319 45.4255V13.5262H44.4656V32.9084C40.7994 33.1751 37.436 35.0411 35.2693 38.0107C33.1026 40.9802 32.3519 44.7526 33.2167 48.3254H4.83317V48.3255ZM45.4323 56.0586C39.5598 56.0586 34.7992 51.298 34.7992 45.4255C34.7992 39.553 39.5598 34.7923 45.4323 34.7923C51.3048 34.7923 56.0654 39.553 56.0654 45.4255C56.0585 51.2951 51.3019 56.0516 45.4323 56.0586Z" fill="#0047A1"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.9825 40.8758C49.605 40.4984 48.9931 40.4984 48.6157 40.8758L45.4325 44.059L42.2493 40.8758C41.87 40.5094 41.2672 40.5147 40.8942 40.8875C40.5214 41.2603 40.5162 41.8633 40.8825 42.2426L44.0657 45.4258L40.8825 48.6089C40.6312 48.8516 40.5305 49.211 40.6189 49.549C40.7074 49.887 40.9713 50.1509 41.3093 50.2393C41.6472 50.3278 42.0067 50.227 42.2493 49.9757L45.4325 46.7925L48.6157 49.9757C48.995 50.3421 49.5978 50.3368 49.9707 49.964C50.3437 49.5912 50.3488 48.9882 49.9825 48.6089L46.7993 45.4258L49.9825 42.2426C50.3598 41.8651 50.3598 41.2532 49.9825 40.8758Z" fill="#0047A1"/>
        </svg>

        <span class="font-1 text-28 weight-500 text-blue q-pl-md text-center">Perda de Receita Recorrente</span>
      </div>
    </div>

    <div class="col-12 row" style="padding: 40px 70px;">
      <div
        v-for="(a, index) in array"
        :key="index"
        class="col q-mx-sm"
      >
        <CardComponent
          :title="a.title"
          title-position="center"
          title-color="#797979"
        >
          <template #content>
            <div class="col-12 row items-center justify-center q-pa-md">
              <template v-if="index === 0 || index === 1">
                <div class="col-6 row justify-center items-center">
                  <DonutRadial
                    :size="120"
                    :stroke-width="16"
                    :value="a.percent"
                    :progress-color="a.color1"
                    :rest-color="a.color2"
                  />
                </div>
  
                <div class="col-6 row justify-center">
                  <div
                    v-for="(c, index) in a.cards"
                    :key="index"
                    class="col-12 row justify-center items-center q-my-sm q-py-sm"
                    style="border: 1px solid #2583FF; border-radius: 15px;"
                  >
                    <span class="col-12 text-center text-grey-1">{{c.label}}</span>
                    <span class="text-12 q-pr-xs weight-600 text-center">R$</span><span class="text-16 weight-600">{{ c.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
                  </div>
                </div>
              </template>

              <template v-if="index === 2">
                <div class="col-6 row justify-center">
                  <div
                    v-for="(c, index) in a.charts"
                    :key="index"
                    class="col"
                  >
                    <CustomBarChart
                      height="150px"
                      width="37px"
                      :onlyBar="true"
                      :sideTitle="null"
                      :chartData="[
                        { value: 50000, label: 'Projetado', color: 'gray', bgColor: '#f0f0f0' },
                        { value: c.value, label: 'Faturamento', color: 'blue', bgColor: c.color }
                      ]"
                    />
                  </div>
                </div>

                <div class="col-6 row justify-center">
                  <div
                    v-for="(c, index) in a.cards"
                    :key="index"
                    class="col-12 row justify-center items-center q-my-sm q-py-sm"
                    style="border: 1px solid #2583FF; border-radius: 15px;"
                  >
                    <span class="col-12 text-center text-grey-1">{{c.label}}</span>
                    <span class="text-12 q-pr-xs weight-600 text-center">R$</span><span class="text-16 weight-600">{{ c.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </CardComponent>
      </div>
    </div>

    <div class="col-12 row justify-between items-center" style="padding: 40px 70px;">
      <div class="col-9">
        <TreeComponent />
      </div>

      <div class="q-pl-md" style="width: 25%;">
        <CardComponent
          title="Perda Sob Venda"
          title-position="center"
          title-color="#797979"
          :stroke="1"
        >
          <template #content>
            <div class="col-12 row justify-center" style="padding: 20px 10px;">
              <div class="col-12 row justify-end">
                <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/>
                  <path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
                </svg>
              </div>
  
              <div class="col-12 row justify-center q-px-md q-pt-lg">
                <DonutRadial
                  :value="25"
                  :size="120"
                  :stroke-width="14"
                  semicircle
                  progress-color="#50D577"
                  rest-color="#B74345"
                >
                  <!-- Center label -->
                  <template #center-label>
                    <div class="label-center q-pt-lg">
                      <span class="text-18 weight-600 text-blue">{{ 25 }}%</span>
                    </div>
                  </template>
                </DonutRadial>
              </div>
  
              <div
                v-for="(a, index) in arrayPerdaVenda"
                :key="index"
                class="col-12 row justify-center items-center q-py-sm q-my-xs"
                style="border-radius: 10px; position: relative;"
                :style="{
                  border: `1px solid ${a.color}`
                }"
              >
                <span class="q-pb-xs text-center weight-500 text-blue" style="white-space: pre-line;">{{ a.label }}</span>
                <div class="col-12 text-grey-2 weight-600 text-center">
                  <span class="text-16 q-pr-md">{{ a.qtde }}</span><span class="text-12 q-pr-xs">R$</span><span class="text-16 weight-600">{{ a.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
                </div>
              </div>
            </div>
          </template>
        </CardComponent>
      </div>
    </div>

    <div class="col-12" style="padding: 40px 70px;">
      <CardComponent
        title="Risco Sob Esforço de Venda"
        title-position="center"
        :with-icon="true"
      >
        <template #content>
          <div class="col-12 row justify-center" style="padding: 40px 10px;">
            <div class="q-pb-lg" style="width: 85%;">
              <GradientScaleComponent
                :value="3.2"
              />
            </div>

            <div class="col-12 row justify-center q-gutter-md">
              <div
                class="border-gradient q-pa-sm"
                style="width: 230px;"
                :class="$q.screen.width < 1500 ? 'q-mt-md' : ''"
              >
                <div class="col-12 row justify-center">
                  <q-space />
                  <div class="row items-center">
                    <span class="text-16 weight-300 text-blue q-pl-sm">CAC Médio</span>
                  </div>

                  <q-space />
                  <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/>
                    <path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
                  </svg>
                </div>

                <div class="col-12 row justify-center q-pb-sm ">
                  <span class="text-12 text-grey-2 text-center">Custo Aquisição Cliente</span>
                </div>

                <div class="col-12 row justify-center items-center weight-600">
                  <span class="text-12 q-pr-xs">R$</span><span class="text-16">4.000,00</span>
                </div>
              </div>
              <div
                class="border-gradient q-pa-sm"
                style="width: 230px;"
                :class="$q.screen.width < 1500 ? 'q-mt-md' : ''"
              >
                <div class="col-12 row justify-center">
                  <q-space />
                  <div class="row items-center">
                    <span class="text-16 weight-300 text-blue q-pl-sm">Período Crítico</span>
                  </div>

                  <q-space />
                  <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/>
                    <path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
                  </svg>
                </div>

                <div class="col-12 row justify-center q-pb-sm ">
                  <span class="text-12 text-grey-2 text-center">Total Perdido</span>
                </div>

                <div class="col-12 row justify-center items-center weight-600">
                  <span class="text-16 q-pr-md">02</span><span class="text-12 q-pr-xs">R$</span><span class="text-16">20.000,00</span>
                </div>
              </div>
              <div
                class="border-gradient q-pa-sm"
                style="width: 230px;"
                :class="$q.screen.width < 1500 ? 'q-mt-md' : ''"
              >
                <div class="col-12 row justify-center">
                  <q-space />
                  <div class="row items-center">
                    <span class="text-16 weight-300 text-blue q-pl-sm">Esforço Venda</span>
                  </div>

                  <q-space />
                  <svg width="15" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7.5" r="6.75" fill="white" stroke="#797979" stroke-width="0.5"/>
                    <path d="M7.925 3.5L7.76251 9.03134H6.23755L6.07089 3.5H7.925ZM7.00003 11.5C6.72504 11.5 6.48893 11.41 6.29172 11.23C6.0945 11.0474 5.99728 10.8288 6.00006 10.5743C5.99728 10.3222 6.0945 10.1062 6.29172 9.92623C6.48893 9.74622 6.72504 9.65622 7.00003 9.65622C7.26391 9.65622 7.49585 9.74622 7.69584 9.92623C7.89584 10.1062 7.99722 10.3222 8 10.5743C7.99722 10.744 7.94861 10.8996 7.85417 11.041C7.76251 11.1798 7.64168 11.2917 7.49168 11.3766C7.34169 11.4589 7.1778 11.5 7.00003 11.5Z" fill="#ED0000"/>
                  </svg>
                </div>

                <div class="col-12 row justify-center q-pb-sm ">
                  <span class="text-12 text-grey-2 text-center">Total Perdido</span>
                </div>

                <div class="col-12 row justify-center items-center weight-600">
                  <span class="text-12 q-pr-xs">R$</span><span class="text-16">10.000,00</span>
                </div>
              </div>
            </div>

            <div class="col-12 row justify-center items-start risk-grid">
              <div
                v-for="(r, idx) in arrayRiscoCharts"
                :key="idx"
                class="risk-card"
              >
                <!-- Corpo (pílula + eixos + badge %) -->
                <div class="risk-body">
                  <!-- Pílulas lado a lado -->
                    <div class="pills-row">
                      <div 
                        v-for="(c, idx) in r.charts"
                        :key="idx"
                        class="pill-wrap"
                      >
                        <CustomBarChart
                          height="220px"
                          width="50px"
                          :onlyBar="true"
                          :sideTitle="null"
                          :chartData="[
                            { value: 15000, label: 'Projetado', color: '#e7e7e7', bgColor: '#f6f6f6' },
                            { value: c.val, label: 'Faturamento', color: '#0047A1', bgColor: c.color }
                          ]"
                        />
                      </div>
                    </div>

                  <!-- Linhas de eixo -->
                  <div class="axes">
                    <div class="axis-v" />
                    <div class="axis-h" />
                  </div>

                  <!-- Rótulos dos eixos -->
                  <div class="axis-labels row">
                    <div class="col-12 row justify-center">
                      <span class="text-grey-2">Perda -</span><span>&nbsp;Ticket {{ r.type }}</span>
                    </div>

                    <span class="tick text-grey-2 q-pr-md">{{ r.qtde }}</span>
                    <span class="amount">R$ {{ r.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CardComponent>
    </div>
    
    <div class="col-12" style="padding: 40px 70px;">
      <CardComponent
        title="TICKET's - Classificação e Quantidade"
        title-position="center"
        :with-icon="true"
      >
        <template #content>
          <div class="col-12 row" style="padding: 40px 10px;">
            <div class="col-12 row justify-center items-start risk-grid">
              <div
                v-for="(r, idx) in arrayCharts"
                :key="idx"
                class="risk-card"
              >
                <div class="type-title">
                  <span class="text-16">{{ r.type }}</span>
                </div>

                <div class="percent-1">
                  <span class="text-16 weight-300">{{ r.percentMax }}%</span>
                </div>

                <div class="percent-2">
                  <span class="text-16 weight-300">{{ r.percentMin }}%</span>
                </div>

                <div class="risk-title">
                  <div class="text-12 text-grey-2">R$ {{ r.valueMax.toLocaleString('pt-BR',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
                </div>

                <div class="risk-title-2">
                  <div class="text-12 text-grey-2">R$ {{ r.valueMin.toLocaleString('pt-BR',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
                </div>

                <!-- Corpo (pílula + eixos + badge %) -->
                <div class="risk-body">
                  <!-- Pílula + hachuras + barra (CustomBarChart) -->
                  <div class="pill-wrap" style="margin: 6px 0 18px 86px;">
                    <CustomBarChart
                      height="220px"
                      width="50px"
                      :onlyBar="true"
                      :sideTitle="null"
                      :chartData="[
                        { value: r.valueMax - r.valueMin, label: 'Projetado', color: '#e7e7e7', bgColor: '#f6f6f6' },
                        { value: r.currentValue - r.valueMin, label: 'Faturamento', color: '#0047A1', bgColor: '#50D577' }
                      ]"
                    />
                  </div>

                  <!-- Chevron e badge % -->
                  <div class="percent-wrap">
                    <span class="chevron">&lt;</span>
                    <div class="percent-badge" :style="{ borderColor: '#50D577', borderRadius: '12px' }">
                      <span class="badge-text">R$ {{ r.currentValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
                    </div>
                    <div class="percent-badge" style="border-color: #50D577; border-radius: 50%;">
                      <span class="badge-text">{{ r.qtde }}</span>
                    </div>
                  </div>

                  <!-- Linhas de eixo -->
                  <div class="axes">
                    <div class="axis-v" />
                    <div class="axis-h" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CardComponent>
    </div>
  </div>
</template>
<script>
import CardComponent from '../CardComponent.vue'
import CustomBarChart from '../CustomBarChart.vue';
import DonutRadial from '../DonutRadial.vue';
import GradientScaleComponent from '../GradientScaleComponent.vue';
import TreeComponent from '../TreeComponent.vue';
export default {
  components: {
    CardComponent,
    DonutRadial,
    CustomBarChart,
    TreeComponent,
    GradientScaleComponent
  },
  data () {
    return {
      array: [
        {
          title: 'Entrada Clientes',
          percent: 50,
          color1: '#50D577',
          color2:'#3EB461',
          cards: [
            {
              label: '97 Retidos',
              value: 670000
            },
            {
              label: '10 Novos',
              value: 200000
            }
          ]
        },
        {
          title: 'Saída Clientes',
          percent: 30,
          color1: '#B74345',
          color2: '#3EB461',
          cards: [
            {
              label: '03 Perdidos',
              value: 30000
            }
          ]
        },
        {
          title: 'Saldo Final Clientes',
          cards: [
            {
              label: '104 Saldo',
              value: 840000
            }
          ],
          charts: [
            {
              value: 35000,
              color: '#50D577'
            },
            {
              value: 20000,
              color: '#B74345'
            },
            {
              value: 25000,
              color: '#0E6FEB'
            }
          ]
        }
      ],
      arrayPerdaVenda: [
        {
          value: 200000,
          label: 'Novas Vendas',
          qtde: 10,
          color: '#B0F2C2'
        },
        {
          value: 30000,
          label: 'Perda de Clientes',
          qtde: 3,
          color: '#FFB6AF'
        },
        {
          value: 70000,
          label: 'Saldo\n Entrada X Perda',
          qtde: 7,
          color: '#0E6FEB'
        }
      ],
      arrayRiscoCharts: [
        {
          type: 'Alto',
          qtde: 1,
          value: 12000,
          charts: [
            {
              val: 6000,
              color: '#FFB6AF'
            },
            {
              val: 9000,
              color: '#F2F298'
            },
            {
              val: 4000,
              color: '#B0F2C2'
            },
            {
              val: 6000,
              color: '#83AAFD'
            }
          ]
        },
        {
          type: 'Médio',
          qtde: 1,
          value: 10000,
          charts: [
            {
              val: 6000,
              color: '#FFB6AF'
            },
            {
              val: 9000,
              color: '#F2F298'
            },
            {
              val: 4000,
              color: '#B0F2C2'
            },
            {
              val: 6000,
              color: '#83AAFD'
            }
          ]
        },
        {
          type: 'Baixo',
          qtde: 1,
          value: 8000,
          charts: [
            {
              val: 6000,
              color: '#FFB6AF'
            },
            {
              val: 9000,
              color: '#F2F298'
            },
            {
              val: 4000,
              color: '#B0F2C2'
            },
            {
              val: 6000,
              color: '#83AAFD'
            }
          ]
        }
      ],
      arrayCharts: [
        {
          type: 'Alto',
          percentMax: 100,
          percentMin: 68,
          valueMax: 12000,
          valueMin: 8160,
          currentValue: 11000,
          qtde: 18
        },
        {
          type: 'Médio',
          percentMax: 67,
          percentMin: 32,
          valueMax: 7040,
          valueMin: 4080,
          currentValue: 6500,
          qtde: 32
        },
        {
          type: 'Baixo',
          percentMax: 31,
          percentMin: 0,
          valueMax: 3040,
          valueMin: 0,
          currentValue: 3000,
          qtde: 20
        }
      ]
    }
  }
}
</script>
<style scoped>
/* ===== Risco por Tempo de Atraso ===== */
.risk-grid {
  padding: 60px 20px 10px;
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

.type-title {
  position: absolute;
  top: -15%;
  left: 20%;
}

.percent-1 {
  position: absolute;
  top: 5%;
  left: 5%;
}

.percent-2 {
  position: absolute;
  bottom: 0;
  left: 5%;
}

/* Cabeçalho do card (título + selo de risco) */
.risk-title {
  position: absolute;
  top: 10%;
  right: 27%;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.risk-title-2 {
  position: absolute;
  bottom: 10%;
  right: 27%;
  display: flex;
  flex-direction: column;
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
}

.pills-row {
  position: relative;
  display: flex;
  gap: 12px;                 /* espaço entre as barras */
  flex-wrap: nowrap;         /* ou wrap, se quiser quebrar linha */
  margin: 6px 0 18px 86px;   /* reserva espaço para o eixo vertical/badge */
  z-index: 1;                /* acima dos eixos */
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
  justify-content: center;
  padding-left: 80px;
  margin-top: 40px;
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


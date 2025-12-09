<template>
  <div class="recorrentes-wrapper">
    <!-- topo: título central + “abraçadeiras” (orientação corrigida) -->
    <div class="top-area">
      <div class="brace brace-left"></div>
    
      <div class="titles">
        <div class="text-18 weight-600 text-blue">Receitas Recorrentes</div>
        <div class="text-12 text-grey-1">Churn Rate</div>
      </div>
    
      <div class="brace brace-right"></div>
    </div>

    <!-- três colunas alinhadas em 5 linhas -->
    <div class="grid-3cols">
      <!-- esquerda -->
      <div class="col-block">
        <div class="col-title text-16 weight-700 text-blue">Antes da Perda</div>

        <div class="pill light">
          <span class="money-prefix">R$</span> {{ data.antesPerda.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>

        <div class="pill light">{{ data.antesPerda.qtdeClientes }}</div>

        <div class="pill light">
          <span class="money-prefix">R$</span> {{ data.antesPerda.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>

        <div class="pill light">
          <span class="money-prefix">R$</span> {{ data.antesPerda.maiorTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>

        <div class="pill light">
          <span class="money-prefix">R$</span> {{ data.antesPerda.menorTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>
      </div>

      <!-- centro (labels) -->
      <div class="col-block center-col">
        <div class="label-pill">
          <span class="chev">&lt;</span>
          <span class="text">Faturamento</span>
          <span class="chev">&gt;</span>
        </div>

        <div class="label-pill">
          <span class="chev">&lt;</span>
          <span class="text">Quantidade Clientes</span>
          <span class="chev">&gt;</span>
        </div>

        <div class="label-pill">
          <span class="chev">&lt;</span>
          <span class="text">Ticket Médio</span>
          <span class="chev">&gt;</span>
        </div>

        <div class="label-pill">
          <span class="chev">&lt;</span>
          <span class="text">Maior Ticket</span>
          <span class="chev">&gt;</span>
        </div>

        <div class="label-pill">
          <span class="chev">&lt;</span>
          <span class="text">Menor Ticket</span>
          <span class="chev">&gt;</span>
        </div>
      </div>

      <!-- direita -->
      <div class="col-block">
        <div class="col-title text-16 weight-700 text-blue">Após a Perda</div>

        <div class="pill light">
          <span><span class="money-prefix">R$</span> {{ data.aposPerda.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>

        <div class="pill light">
          <span>{{ data.aposPerda.qtdeClientes }}</span>
        </div>

        <div class="pill light">
          <span class="money-prefix">R$</span> {{ data.aposPerda.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>

        <div class="pill light">
          <span class="money-prefix">R$</span> {{ data.aposPerda.maiorTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>

        <div class="pill light">
          <span class="money-prefix">R$</span> {{ data.aposPerda.menorTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReceitasRecorrentes',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.recorrentes-wrapper{
  max-width: 1100px;
  margin: 0 auto;
  color:#1E1E1E;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
}

/* topo */
.top-area{
  position: relative;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  margin-bottom: 18px;
  min-height: 60px;
}
.titles{ text-align:center; }
.brace{
  position:absolute;
  top:0;
  width:180px;
  height:60px;
}
.brace.left{ left:0px; }
.brace.right{ right:0px; }

/* grid de 3 colunas e 5 linhas */
.grid-3cols{
  display:grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  gap: 10px 40px;
  align-items:start;
}
.col-block{
  display:grid;
  grid-auto-rows:min-content;
  row-gap: 14px;
}
.col-title{
  text-align:center;
  margin-bottom:6px;
}

/* pílulas (valores e labels) */
.pill{
  height:34px;
  border-radius: 18px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0 16px;
  font-size:14px;
  font-weight:600;
  white-space:nowrap;
}
.pill.light{
  border: 1px solid #616161;
  color:#3A3D46;
}
.money-prefix{
  font-weight:700;
  font-size:11px;
  margin-right:6px;
  color:#7C859F;
}

/* coluna central */
.center-col{
  align-items:center;
  margin-top: 45px;
}
.label-pill{
  height:34px;
  border: 1px solid #2F66D5;
  border-radius:18px;
  color:#2F66D5;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 10px;
  padding:0 14px;
  min-width: 280px;
}
.label-pill .text{ font-size:13px; font-weight:600; }
.label-pill .chev{ font-size:22px; font-weight:700; line-height:1; }

/* gauge na coluna direita */
.with-gauge{
  justify-content:space-between;
  gap:8px;
  padding-left:16px;
  padding-right:8px;
}
.sg{
  position:relative;
  width:42px;
  height:28px;
}
.sg-text{
  position:absolute;
  bottom:-8px;
  right:-4px;
  font-size:10px;
  color:#7C859F;
  font-weight:600;
}

/* “abraçadeiras” com borda: esquerda = canto superior DIREITO,
   direita = canto superior ESQUERDO (como no design) */
.brace{
  position: absolute;
  top: 0;
  width: 160px;         /* ajuste fino se quiser maior/menor */
  height: 60px;
  border-color: #2F66D5;
  border-width: 3px;
  border-style: solid;
  pointer-events: none;
}

/* Esquerda: topo + direita, raio no topo-direito */
.brace-left{
  right: 15%;           /* ajuste a distância das colunas */
  border-left: 0;
  border-bottom: 0;
  border-top-right-radius: 42px;
}

/* Direita: topo + esquerda, raio no topo-esquerdo */
.brace-right{
  left: 15%;
  border-right: 0;
  border-bottom: 0;
  border-top-left-radius: 42px;
}

@media (max-width: 1020px){
  .brace{ display: none; } /* como no mock responsivo */
}

/* responsivo */
@media (max-width: 1020px){
  .grid-3cols{
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .center-col .label-pill{ width:100%; }
  .brace{ display:none; }
  .col-title{ text-align:left; }
}
</style>

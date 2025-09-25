<template>
  <div class="dre-wrapper col-12">
    <!-- ===== BLOCO 1 (principal) ===== -->
    <div class="dre-table">
      <!-- Coluna fixa (labels) -->
      <div class="dre-left">
        <div class="pill pill-header-left">Estrutura</div>
        <div v-for="r in rows" :key="r.key" class="pill pill-left">
          {{ r.label }}
        </div>
      </div>

      <!-- Colunas de meses -->
      <div class="dre-right" ref="r1" @scroll="syncScroll('r1')">
        <div class="dre-cols">
          <div v-for="(m, i) in monthsToUse" :key="'m-'+i" class="dre-col">
            <div class="pill pill-month-header">{{ m.label }}</div>
            <div v-for="r in rows" :key="r.key" class="pill pill-value">
              <span>R$ {{ formatBRL(m[r.key]) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divisória -->
    <div class="dre-divider"></div>

    <!-- ===== BLOCO 2 (resumo) ===== -->
    <div class="dre-table is-summary">
      <!-- Coluna fixa (labels) - sem cabeçalho -->
      <div class="dre-left">
        <div v-for="r in summaryRows" :key="'s-'+r.key" class="pill pill-left">
          {{ r.label }}
        </div>
      </div>

      <!-- Colunas de meses - sem cabeçalho -->
      <div class="dre-right" ref="r2" @scroll="syncScroll('r2')">
        <div class="dre-cols">
          <div v-for="(m, i) in monthsToUse" :key="'sm-'+i" class="dre-col">
            <div v-for="r in summaryRows" :key="r.key" class="pill pill-value">
              <span>R$ {{ formatBRL(m[r.key]) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DRETableComponent',
  props: {
    months: { type: Array, default: () => [] }
  },
  data () {
    return {
      syncing: false,
      rows: [
        { key: 'receitaBruta',   label: 'Receita Bruta' },
        { key: 'impostos',       label: '(-) Impostos + Devoluções' },
        { key: 'receitaLiquida', label: 'Receita Líquida' },
        { key: 'custosVariaveis',label: '(-) Custos Variáveis' },
        { key: 'margemContrib',  label: 'Margem de Contribuição' },
        { key: 'despesasFixas',  label: '(-) Despesas Fixas' },
        { key: 'ebitda',         label: 'EBITDA / Resultado Op.' },
        { key: 'jurosIR',        label: '(-) Outros (Juros/IR)' },
        { key: 'lucroLiquido2',   label: 'Lucro Líquido' }
      ],
      summaryRows: [
        { key: 'margemContrib2', label: 'Margem de Contribuição' },
        { key: 'ebitda',         label: 'Resultado Operacional (EBITDA)' },
        { key: 'lucroLiquido',  label: 'Lucro Líquido' }
      ],
      // dados exemplo (some quando você passar "months")
      sampleMonths: []
    }
  },
  created() {
    JSON.parse(localStorage.getItem("user")) ? this.user = JSON.parse(localStorage.getItem("user")) : this.$router.push('/login');
    if (this.user.role === "BCONTROL")  {
      this.sampleMonths = [
        { 
          label: 'Janeiro / 2025',
          receitaBruta: 0.00,
          impostos: 0.00,
          receitaLiquida: 0.00,
          custosVariaveis: 5580.94,
          margemContrib: -5580.94,
          despesasFixas: 18813.60,
          ebitda: -7958.11,
          margemContrib2: 1812.90,
          jurosIR: 0.00,
          lucroLiquido: 1857.90,
          lucroLiquido2: 0
        },
        { 
          label: 'Fevereiro / 2025',
          receitaBruta: 1928.94,
          impostos: 0.00,
          receitaLiquida: 1928.94,
          custosVariaveis: 5326.94,
          margemContrib: -3398.00,
          despesasFixas: 14690.27,
          ebitda: -14774.14,
          margemContrib2: -300.83,
          jurosIR: 0.00,
          lucroLiquido: 679.25,
          lucroLiquido2: 0
        },
        { 
          label: 'Março / 2025',
          receitaBruta: 2507.80,
          impostos: 0.00,
          receitaLiquida: 2507.80,
          custosVariaveis: 6038.41,
          margemContrib: -3530.61,
          despesasFixas: 22595.85,
          ebitda: -12669.69,
          margemContrib2: 2642.00,
          jurosIR: 0.00,
          lucroLiquido: 2642.00,
          lucroLiquido2: 0
        }
      ]
    } else {
      this.sampleMonths = [
        { label: 'Janeiro / 2025',  receitaBruta: 420000, impostos: 63000,  receitaLiquida: 357000, custosVariaveis: 168000, margemContrib: 189000, despesasFixas: 104000, ebitda: 85000, margemContrib2: 1812.90, jurosIR: 2000, lucroLiquido: 83000, lucroLiquido2: 0 },
        { label: 'Fevereiro / 2025',receitaBruta: 415000, impostos: 62250,  receitaLiquida: 352750, custosVariaveis: 166000, margemContrib: 186750, despesasFixas: 104000, ebitda: 82750, margemContrib2: 1812.90, jurosIR: 2000, lucroLiquido: 80000, lucroLiquido2: 0 },
        { label: 'Março / 2025',    receitaBruta: 400000, impostos: 60000,  receitaLiquida: 340000, custosVariaveis: 160000, margemContrib: 180000, despesasFixas: 104000, ebitda: 76000, margemContrib2: 1812.90, jurosIR: 2000, lucroLiquido: 74000, lucroLiquido2: 0 }
      ]
    }
  },
  computed: {
    monthsToUse () {
      return this.months && this.months.length ? this.months : this.sampleMonths
    }
  },
  methods: {
    formatBRL (v) {
      return Number(v || 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    // sincroniza a rolagem horizontal dos dois blocos
    syncScroll (who) {
      if (this.syncing) return
      const a = who === 'r1' ? this.$refs.r1 : this.$refs.r2
      const b = who === 'r1' ? this.$refs.r2 : this.$refs.r1
      if (!a || !b) return
      this.syncing = true
      b.scrollLeft = a.scrollLeft
      this.$nextTick(() => { this.syncing = false })
    }
  }
}
</script>

<style scoped>
/* ocupa 100% do container pai */
.dre-wrapper { width: 100%; }

/* layout: coluna fixa + colunas roláveis */
.dre-table {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 18px;
  border-radius: 20px;
}

/* coluna da esquerda */
.dre-left {
  flex: 0 0 320px;
  width: 320px;
  max-width: 320px;
}
@media (max-width: 1200px) {
  .dre-left { flex-basis: 280px; width: 280px; max-width: 280px; }
}

/* área de meses ocupa o resto */
.dre-right {
  flex: 1 1 auto;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 6px;
  border-radius: 16px;
}
.dre-cols { display: flex; gap: 18px; }
.dre-col  { flex: 1 1 320px; min-width: 280px; }

/* pills */
.pill {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 9999px;
  padding: 0 18px;
  margin: 10px 0;
  font-weight: 700;
}

/* BLOCO DE CIMA: cores pedidas */
.pill-header-left  { background: #0047A1; color: #fff; } /* "Estrutura" */
.pill-month-header { background: #0047A1; color: #fff; } /* cabeçalho Meses */
.pill-left         { background: #4889DA; color: #fff; } /* linhas da 1ª coluna */
.pill-value {
  background-color: #ffffff;     /* valores brancos */
  color: #3a3a3a;
  border: 1px solid #E5EAF2;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,0.03);
  text-align: center;
}

/* BLOCO DE BAIXO: sem coluna superior e TODO fundo #ECECEA */
.dre-table.is-summary .pill-left,
.dre-table.is-summary .pill-value {
  background: #ECECEA !important;
  color: #3a3a3a;
  border: 1px solid #E0E0E0;
  box-shadow: none;
}

/* divisória entre blocos */
.dre-divider {
  height: 8px;
  background: #9E9E9E;
  border-radius: 4px;
  margin: 14px 0 18px;
}

/* scrollbar sutil (webkit) */
.dre-right::-webkit-scrollbar { height: 8px; }
.dre-right::-webkit-scrollbar-thumb { background: #0047A1; border-radius: 6px; }
.dre-right::-webkit-scrollbar-track { background: rgba(0,0,0,0.08); border-radius: 6px; }
</style>

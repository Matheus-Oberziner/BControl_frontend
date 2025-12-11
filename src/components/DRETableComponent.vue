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
    months: {
      type: Array,
      required: true
    }
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
        { key: 'lucroLiquido',   label: 'Lucro Líquido' }
      ],
      summaryRows: [
        { key: 'margemContrib', label: 'Margem de Contribuição' },
        { key: 'ebitda',        label: 'Resultado Operacional (EBITDA)' },
        { key: 'lucroLiquido',  label: 'Lucro Líquido' }
      ]
    }
  },
  computed: {
    monthsToUse () {
      const src = this.months && this.months.length
        ? this.months
        : []

      return src.map(m => {
        return {
          label: this.formatReferencia(m.referencia),
          receitaBruta:   m.receita_bruta           ?? 0,
          impostos:       m.impostos_devolucoes     ?? 0,
          receitaLiquida: m.receita_liquida         ?? 0,
          custosVariaveis:m.custos_variaveis        ?? 0,
          margemContrib:  m.margem_contribuicao     ?? 0,
          despesasFixas:  m.despesas_fixas          ?? 0,
          ebitda:         m.ebitda_resultado_oper   ?? 0,

          // API ainda não manda isso – mantemos 0 para não quebrar o componente
          jurosIR:        m.juros_ir        ?? 0,
          lucroLiquido:   m.lucro_liquido   ?? 0
        }
      })
    }
  },
  methods: {
    formatBRL (v) {
      return Number(v || 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },

    formatReferencia (ref) {
      // espera algo tipo "2025-01", "0001-01", etc.
      if (!ref || typeof ref !== 'string' || ref.length < 7) {
        return ref || '-'
      }

      const ano = ref.substring(0, 4)
      const mes = ref.substring(5, 7)

      const monthLabelsPt = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const idx = Number(mes) - 1

      const mesLabel = monthLabelsPt[idx] || mes
      return `${mesLabel} / ${ano}`
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

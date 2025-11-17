<template>
  <q-dialog v-model="show" @hide="onHide">
    <q-card style="min-width: 700px; max-width: 900px; border-radius: 16px;">
      <!-- Header com gradiente -->
      <q-card-section 
        class="row items-center justify-between q-pb-md" 
        :style="headerStyle"
      >
        <div class="row items-center">
          <q-icon name="receipt_long" size="32px" color="white" />
          <span class="text-h6 text-white weight-500 q-pl-md">
            Detalhes do Título {{ isRecebimento ? '- Recebimento' : '- Pagamento' }}
          </span>
        </div>
        <q-btn 
          flat 
          round 
          dense 
          icon="close" 
          color="white"
          v-close-popup 
          size="md"
        />
      </q-card-section>

      <!-- Loading State -->
      <q-card-section v-if="loading" class="q-py-xl text-center">
        <q-spinner-dots size="56px" :color="isRecebimento ? 'orange' : 'purple'" />
        <div class="text-grey-6 q-mt-md text-16">Carregando informações...</div>
      </q-card-section>

      <!-- Content -->
      <q-card-section v-else-if="titulo" class="q-pa-lg">
        <!-- Badge de Status e Tipo -->
        <div class="row q-mb-md q-gutter-sm">
          <q-chip 
            :color="getStatusColor(titulo.status)" 
            text-color="white"
            size="md"
            icon="check_circle"
          >
            <span class="text-weight-medium">{{ getStatusLabel(titulo.status) }}</span>
          </q-chip>
          
          <q-chip 
            :color="isRecebimento ? 'orange-3' : 'purple-3'"
            :text-color="isRecebimento ? 'orange-9' : 'purple-9'"
            size="md"
            :icon="isRecebimento ? 'arrow_downward' : 'arrow_upward'"
          >
            <span class="text-weight-medium">{{ titulo.tipo || 'N/A' }}</span>
          </q-chip>

          <q-chip 
            v-if="titulo.liquidado"
            color="green-3"
            text-color="green-9"
            size="md"
            icon="paid"
          >
            <span class="text-weight-medium">Liquidado</span>
          </q-chip>
        </div>

        <!-- Card Valor Principal -->
        <div :class="['info-card-destaque', 'q-pa-md', 'text-center', 'q-mb-lg', isRecebimento ? 'destaque-orange' : 'destaque-purple']">
          <div class="text-caption text-grey-7 q-mb-xs">Valor do Título</div>
          <div class="row items-baseline justify-center">
            <span class="text-h4 weight-600" :class="isRecebimento ? 'text-orange' : 'text-purple'">
              R$ {{ formatCurrency(titulo.valorTitulo) }}
            </span>
          </div>
          <div v-if="titulo.valorLiquido !== titulo.valorTitulo" class="text-caption text-grey-6 q-mt-xs">
            Valor Líquido: R$ {{ formatCurrency(titulo.valorLiquido) }}
          </div>
        </div>

        <!-- Código Boleto/PIX para Pagamento -->
        <div v-if="titulo.numeroBoleto" class="q-mb-lg">
          <div class="code-card q-pa-md">
            <div class="row items-center justify-between">
              <div class="col">
                <div class="text-caption text-grey-6 q-mb-xs">
                  Código {{ getTipoCodigoPagamento(titulo.tipo) }}
                </div>
                <div class="text-body1 text-weight-medium text-grey-9 code-text">
                  {{ titulo.numeroBoleto }}
                </div>
              </div>
              <div>
                <q-btn
                  flat
                  round
                  dense
                  icon="content_copy"
                  :color="isRecebimento ? 'orange' : 'purple'"
                  @click="copiarCodigo(titulo.numeroBoleto)"
                  size="sm"
                >
                  <q-tooltip>Copiar código</q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Informações do Cliente/Fornecedor -->
        <div class="section-title q-mb-md">
          <q-icon name="person" size="20px" :color="isRecebimento ? 'orange' : 'purple'" />
          <span class="q-ml-sm text-subtitle1 text-weight-medium">
            {{ isRecebimento ? 'Dados do Cliente' : 'Dados do Fornecedor' }}
          </span>
        </div>

        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-8">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Nome</div>
              <div class="text-body1 text-weight-medium text-grey-9">
                {{ titulo.nomeClienteFornecedor || '-' }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">CPF/CNPJ</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ titulo.cpfCnpjClienteFornecedor || '-' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Informações do Título -->
        <div class="section-title q-mb-md">
          <q-icon name="description" size="20px" :color="isRecebimento ? 'orange' : 'purple'" />
          <span class="q-ml-sm text-subtitle1 text-weight-medium">Informações do Título</span>
        </div>

        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-4">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Nº Parcela</div>
              <div class="text-body1 text-weight-medium text-grey-9">
                {{ titulo.numeroParcela || '-' }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Nº Título</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ titulo.numeroTitulo || '-' }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Categoria</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ titulo.codigoCategoria || '-' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Datas -->
        <div class="section-title q-mb-md">
          <q-icon name="calendar_today" size="20px" :color="isRecebimento ? 'orange' : 'purple'" />
          <span class="q-ml-sm text-subtitle1 text-weight-medium">Datas</span>
        </div>

        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-3">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Emissão</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ formatarData(titulo.dataEmissao) }}
              </div>
            </div>
          </div>

          <div class="col-3">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Vencimento</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ formatarData(titulo.dataVencimento) }}
              </div>
            </div>
          </div>

          <div class="col-3">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Previsão</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ formatarData(titulo.dataPrevisao) }}
              </div>
            </div>
          </div>

          <div class="col-3">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">
                {{ isRecebimento ? 'Recebimento' : 'Pagamento' }}
              </div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ formatarData(titulo.dataPagamento) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Valores Detalhados -->
        <div class="section-title q-mb-md">
          <q-icon name="account_balance_wallet" size="20px" :color="isRecebimento ? 'orange' : 'purple'" />
          <span class="q-ml-sm text-subtitle1 text-weight-medium">Valores Detalhados</span>
        </div>

        <div class="row q-col-gutter-sm q-mb-lg">
          <div class="col-3">
            <div class="info-card-secondary q-pa-sm">
              <div class="text-caption text-grey-6">Valor Pago</div>
              <div class="text-body2 text-weight-medium text-green-7">
                R$ {{ formatCurrency(titulo.valorPago) }}
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="info-card-secondary q-pa-sm">
              <div class="text-caption text-grey-6">Desconto</div>
              <div class="text-body2 text-weight-medium text-blue-7">
                R$ {{ formatCurrency(titulo.valorDesconto) }}
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="info-card-secondary q-pa-sm">
              <div class="text-caption text-grey-6">Juros</div>
              <div class="text-body2 text-weight-medium text-red-7">
                R$ {{ formatCurrency(titulo.valorJuros) }}
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="info-card-secondary q-pa-sm">
              <div class="text-caption text-grey-6">Multa</div>
              <div class="text-body2 text-weight-medium text-red-7">
                R$ {{ formatCurrency(titulo.valorMulta) }}
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="info-card-secondary q-pa-sm">
              <div class="text-caption text-grey-6">Saldo em Aberto</div>
              <div class="text-body2 text-weight-medium text-orange-7">
                R$ {{ formatCurrency(titulo.saldoAberto) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Retenções (se houver alguma) -->
        <template v-if="temRetencoes">
          <div class="section-title q-mb-md">
            <q-icon name="receipt" size="20px" :color="isRecebimento ? 'orange' : 'purple'" />
            <span class="q-ml-sm text-subtitle1 text-weight-medium">Retenções</span>
          </div>

          <div class="row q-col-gutter-sm q-mb-lg">
            <div v-if="titulo.retencaoIR" class="col-2">
              <div class="info-card-secondary q-pa-sm">
                <div class="text-caption text-grey-6">IR</div>
                <div class="text-body2 text-weight-medium">
                  R$ {{ formatCurrency(titulo.retencaoIR) }}
                </div>
              </div>
            </div>

            <div v-if="titulo.retencaoINSS" class="col-2">
              <div class="info-card-secondary q-pa-sm">
                <div class="text-caption text-grey-6">INSS</div>
                <div class="text-body2 text-weight-medium">
                  R$ {{ formatCurrency(titulo.retencaoINSS) }}
                </div>
              </div>
            </div>

            <div v-if="titulo.retencaoISS" class="col-2">
              <div class="info-card-secondary q-pa-sm">
                <div class="text-caption text-grey-6">ISS</div>
                <div class="text-body2 text-weight-medium">
                  R$ {{ formatCurrency(titulo.retencaoISS) }}
                </div>
              </div>
            </div>

            <div v-if="titulo.retencaoPIS" class="col-2">
              <div class="info-card-secondary q-pa-sm">
                <div class="text-caption text-grey-6">PIS</div>
                <div class="text-body2 text-weight-medium">
                  R$ {{ formatCurrency(titulo.retencaoPIS) }}
                </div>
              </div>
            </div>

            <div v-if="titulo.retencaoCOFINS" class="col-2">
              <div class="info-card-secondary q-pa-sm">
                <div class="text-caption text-grey-6">COFINS</div>
                <div class="text-body2 text-weight-medium">
                  R$ {{ formatCurrency(titulo.retencaoCOFINS) }}
                </div>
              </div>
            </div>

            <div v-if="titulo.retencaoCSLL" class="col-2">
              <div class="info-card-secondary q-pa-sm">
                <div class="text-caption text-grey-6">CSLL</div>
                <div class="text-body2 text-weight-medium">
                  R$ {{ formatCurrency(titulo.retencaoCSLL) }}
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Informações Adicionais -->
        <div class="section-title q-mb-md">
          <q-icon name="info" size="20px" :color="isRecebimento ? 'orange' : 'purple'" />
          <span class="q-ml-sm text-subtitle1 text-weight-medium">Informações Adicionais</span>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-4">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Sistema</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ titulo.sistema || '-' }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Origem</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ titulo.origem || '-' }}
              </div>
            </div>
          </div>

          <div class="col-4">
            <div :class="['info-card', 'q-pa-md', isRecebimento ? 'card-orange' : 'card-purple']">
              <div class="text-caption text-grey-6 q-mb-xs">Natureza</div>
              <div class="text-body2 text-weight-medium text-grey-9">
                {{ getNaturezaLabel(titulo.natureza) }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Footer -->
      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none">
        <q-btn 
          flat
          label="Fechar" 
          color="grey-7" 
          v-close-popup 
          class="q-px-lg"
          no-caps
        />
        <q-btn 
          unelevated
          label="Imprimir Comprovante" 
          :color="isRecebimento ? 'orange' : 'purple'"
          icon-right="print"
          class="q-px-lg"
          @click="imprimir"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DetalheTituloDialog',
  
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    titulo: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    tipo: {
      type: String,
      default: 'RECEBIMENTO',
      validator: (value) => ['RECEBIMENTO', 'PAGAMENTO'].includes(value)
    }
  },

  emits: ['update:modelValue', 'imprimir'],

  computed: {
    show: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },

    isRecebimento() {
      return this.tipo === 'RECEBIMENTO'
    },

    headerStyle() {
      return this.isRecebimento
        ? 'background: linear-gradient(135deg, #FE721C 0%, #FF8940 100%);'
        : 'background: linear-gradient(135deg, #680059 0%, #8B0070 100%);'
    },

    temRetencoes() {
      if (!this.titulo) return false
      return (
        this.titulo.retencaoIR > 0 ||
        this.titulo.retencaoINSS > 0 ||
        this.titulo.retencaoISS > 0 ||
        this.titulo.retencaoPIS > 0 ||
        this.titulo.retencaoCOFINS > 0 ||
        this.titulo.retencaoCSLL > 0
      )
    }
  },

  methods: {
    formatCurrency(value) {
      if (!value && value !== 0) return '0,00'
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value)
    },

    formatarData(data) {
      if (!data) return '-'
      try {
        return new Date(data).toLocaleDateString('pt-BR')
      } catch {
        return '-'
      }
    },

    getStatusColor(status) {
      const cores = {
        RECEBIDO: 'green-6',
        PAGO: 'green-6',
        A_VENCER: 'orange-7',
        ATRASADO: 'red-6',
        CANCELADO: 'grey-6',
        PARCIAL: 'blue-6'
      }
      return cores[status?.toUpperCase()] || 'grey-6'
    },

    getStatusLabel(status) {
      const labels = {
        RECEBIDO: 'Recebido',
        PAGO: 'Pago',
        A_VENCER: 'A Vencer',
        ATRASADO: 'Atrasado',
        CANCELADO: 'Cancelado',
        PARCIAL: 'Parcialmente Pago'
      }
      return labels[status?.toUpperCase()] || status || 'N/A'
    },

    getNaturezaLabel(natureza) {
      const labels = {
        P: 'Pagamento',
        R: 'Recebimento'
      }
      return labels[natureza] || natureza || '-'
    },

    getTipoCodigoPagamento(tipo) {
      const tipos = {
        PIX: 'PIX',
        BOLETO: 'Boleto',
        TRANSFERENCIA: 'Transferência',
        CARTAO: 'Cartão'
      }
      return tipos[tipo?.toUpperCase()] || 'Pagamento'
    },

    copiarCodigo(codigo) {
      navigator.clipboard.writeText(codigo).then(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Código copiado para área de transferência!',
          position: 'top',
          timeout: 2000
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao copiar código',
          position: 'top'
        })
      })
    },

    imprimir() {
      this.$emit('imprimir', this.titulo)
    },

    onHide() {
      // Limpa dados ao fechar (opcional)
    }
  }
}
</script>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 2px solid #F0F0F0;
}

/* Card destaque laranja */
.destaque-orange {
  background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);
  border: 2px solid #FE721C;
}

/* Card destaque roxo */
.destaque-purple {
  background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%);
  border: 2px solid #680059;
}

.info-card-destaque {
  border-radius: 12px;
}

/* Cards com borda laranja */
.card-orange {
  background: #FAFAFA;
  border-radius: 10px;
  border-left: 3px solid #FE721C;
  transition: all 0.2s ease;
  min-height: 60px;
}

.card-orange:hover {
  background: #F5F5F5;
  transform: translateX(2px);
}

/* Cards com borda roxa */
.card-purple {
  background: #FAFAFA;
  border-radius: 10px;
  border-left: 3px solid #680059;
  transition: all 0.2s ease;
  min-height: 60px;
}

.card-purple:hover {
  background: #F5F5F5;
  transform: translateX(2px);
}

.info-card-secondary {
  background: #F8F8F8;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  text-align: center;
  min-height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Card de código PIX/Boleto */
.code-card {
  background: linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%);
  border-radius: 12px;
  border: 2px dashed #BDBDBD;
}

.code-text {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  word-break: break-all;
  line-height: 1.5;
}
</style>
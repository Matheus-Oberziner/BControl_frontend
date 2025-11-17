<template>
  <div class="q-pa-md" style="border-radius: 40px;">

    <!-- Cabeçalho -->
    <div
      class="q-pa-sm q-mb-sm"
      :style="`display: grid; ${gridTemplate}`"
    >
      <div
        v-for="col in columns"
        :key="col.name"
        class="text-14"
        :class="[
          headerAlignClass(col),
          'text-black'
        ]"
        style="white-space: pre-line;"
      >
        {{ col.label }}
      </div>

      <div v-if="enableSearch" class="text-right">
        <q-input
          dense
          debounce="300"
          v-model="filter"
          placeholder="Pesquisar"
          filled
          style="width: 100%;"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- CONTÊINER COM SCROLL -->
    <div
      class="rows-scroll"
      :style="rowsScrollStyle"
    >
      <!-- Linhas -->
      <div
        v-for="(row, rowIndex) in filteredRows"
        :key="rowIndex"
        class="bg-white shadow-3 q-pa-sm q-mb-md"
        :style="`display: grid; ${gridTemplate}`"
        style="border-radius: 20px;"
      >
        <div
          v-for="col in columns"
          :key="col.name"
          class="text-15 text-grey-2 cell-wrapper"
          :class="cellAlignClass(col)"
        >
          <!-- slot do usuário -->
          <slot :name="`cell-${col.name}`" :row="row">
            <div
              class="cell-text"
              :ref="el => setCellRef(el, rowIndex, col.name)"
            >
              {{ getTruncatedValue(row, col) }}
            </div>

            <!-- tooltip aparece se cortou por caracteres OU por largura -->
            <q-tooltip v-if="shouldShowTooltip(row, col, rowIndex)">
              {{ getDisplayValue(row, col) }}
            </q-tooltip>
          </slot>
        </div>

        <!-- COLUNA DE AÇÕES POR LINHA -->
        <div v-if="enableSearch || showActions" class="text-center">
          <slot name="row-actions" :row="row" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CardTable',
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    enableSearch: { type: Boolean, default: true },

    maxVisibleRows: { type: Number, default: 10 },
    rowHeight: { type: Number, default: 68 },

    // padrão de corte por caracteres
    maxCharsPerCell: { type: Number, default: 35 },

    // NOVO: controla se existe coluna de ações mesmo sem search
    showActions: { type: Boolean, default: false }
  },
  data () {
    return {
      filter: '',
      // { '0-nome': true, '1-descricao': false, ... }
      overflowMap: Object.create(null),
      // vamos guardar refs por chave pra poder medir depois
      cellRefs: Object.create(null)
    }
  },
  computed: {
    gridTemplate () {
      // se tiver search ou actions, soma 1 coluna extra
      const extra = (this.enableSearch || this.showActions) ? 1 : 0
      const count = this.columns.length + extra
      return `grid-template-columns: repeat(${count}, 1fr); gap: 12px; align-items: center;`
    },
    filteredRows () {
      if (!this.filter) return this.rows
      const f = this.filter.toLowerCase()

      return this.rows.filter(row => {
        return this.columns.some(col => {
          const rawVal = row[col.name]
          const disp = this.getDisplayValue(row, col)

          const rawStr = rawVal == null ? '' : String(rawVal).toLowerCase()
          const dispStr = disp == null ? '' : String(disp).toLowerCase()

          return rawStr.includes(f) || dispStr.includes(f)
        })
      })
    },
    rowsScrollStyle () {
      const maxH = this.maxVisibleRows * (this.rowHeight + 16)
      return `max-height: ${maxH}px; overflow-y: auto; padding: 4px;`
    }
  },
  watch: {
    // quando muda o filtro, as linhas mudam => precisamos medir de novo
    filteredRows () {
      this.$nextTick(() => {
        this.measureAllCells()
      })
    },
    // quando muda rows direto
    rows () {
      this.$nextTick(() => {
        this.measureAllCells()
      })
    }
  },
  mounted () {
    // primeira medição
    this.$nextTick(() => {
      this.measureAllCells()
    })
    // se quiser ser mais rígido:
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      // na resize pode mudar quem está cortando
      this.measureAllCells()
    },
    makeKey (rowIndex, colName) {
      return `${rowIndex}-${colName}`
    },
    setCellRef (el, rowIndex, colName) {
      const key = this.makeKey(rowIndex, colName)
      if (el) {
        this.cellRefs[key] = el
      } else {
        // se o elemento foi desmontado
        delete this.cellRefs[key]
        delete this.overflowMap[key]
      }
    },
    measureAllCells () {
      // percorre todas as refs e mede overflow
      for (const key in this.cellRefs) {
        const el = this.cellRefs[key]
        if (!el) continue
        // se o conteúdo real for maior que o visível, está cortado
        const isOverflow = el.scrollWidth > el.clientWidth
        this.$set
          ? this.$set(this.overflowMap, key, isOverflow)
          : (this.overflowMap[key] = isOverflow)
      }
    },
    getDisplayValue (row, col) {
      const val = row[col.name]
      try {
        if (typeof col.format === 'function') {
          return col.format(val, row)
        }
      } catch (e) {
        console.error(e)
      }
      return val == null ? '' : val
    },
    // corte por caracteres
    getTruncatedValue (row, col) {
      const full = this.getDisplayValue(row, col)
      const max = col.maxChars || this.maxCharsPerCell
      const str = full == null ? '' : String(full)
      if (str.length <= max) return str
      return str.slice(0, max) + '…'
    },
    isTruncatedByChars (row, col) {
      const full = this.getDisplayValue(row, col)
      const max = col.maxChars || this.maxCharsPerCell
      const str = full == null ? '' : String(full)
      return str.length > max
    },
    isOverflowed (rowIndex, colName) {
      const key = this.makeKey(rowIndex, colName)
      return !!this.overflowMap[key]
    },
    shouldShowTooltip (row, col, rowIndex) {
      // se cortou por caracteres OU por largura, mostra
      return this.isTruncatedByChars(row, col) || this.isOverflowed(rowIndex, col.name)
    },
    headerAlignClass (col) {
      const align = col.align || 'text-center'
      return this.alignToClass(align)
    },
    cellAlignClass (col) {
      const align = col.align || 'text-center'
      return this.alignToClass(align)
    },
    alignToClass (align) {
      switch (align) {
        case 'left': return 'text-left'
        case 'right': return 'text-right'
        default: return 'text-center'
      }
    }
  }
}
</script>

<style scoped>
.rows-scroll::-webkit-scrollbar {
  width: 6px;
}
.rows-scroll::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.25);
  border-radius: 6px;
}

/* ESSENCIAL pra ellipsis funcionar com CSS grid */
.cell-wrapper {
  min-width: 0;
}

.cell-text {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

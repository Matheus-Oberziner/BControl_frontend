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

    <!-- Linhas -->
    <div
      v-for="(row, index) in filteredRows"
      :key="index"
      class="bg-white shadow-3 q-pa-sm q-mb-md"
      :style="`display: grid; ${gridTemplate}`"
      style="border-radius: 20px;"
    >
      <div
        v-for="col in columns"
        :key="col.name"
        class="text-15 text-grey-2"
        :class="cellAlignClass(col)"
      >
        <slot :name="`cell-${col.name}`" :row="row">
          {{ getDisplayValue(row, col) }}
        </slot>
      </div>

      <div v-if="enableSearch" class="text-right">
        <slot name="row-actions" :row="row" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Column API:
 * {
 *   name: string (obrigatório),
 *   label: string (obrigatório),
 *   format?: (val, row) => string,
 *   align?: 'left' | 'center' | 'right' // default center
 * }
 */
export default {
  name: 'CardTable',
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    enableSearch: { type: Boolean, default: true }
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    gridTemplate () {
      const count = this.columns.length + (this.enableSearch ? 1 : 0)
      return `grid-template-columns: repeat(${count}, 1fr); gap: 12px; align-items: center;`
    },
    filteredRows () {
      if (!this.filter) return this.rows
      const f = this.filter.toLowerCase()

      return this.rows.filter(row => {
        // busca em valores crus e também em formatados
        return this.columns.some(col => {
          const rawVal = row[col.name]
          const disp = this.getDisplayValue(row, col)

          const rawStr = rawVal == null ? '' : String(rawVal).toLowerCase()
          const dispStr = disp == null ? '' : String(disp).toLowerCase()

          return rawStr.includes(f) || dispStr.includes(f)
        })
      })
    }
  },
  methods: {
    // valor observado no slot default (aplica format se existir)
    getDisplayValue (row, col) {
      const val = row[col.name]
      try {
        if (typeof col.format === 'function') {
          return col.format(val, row)
        }
      } catch (e) {
        // se o format lançar erro, cai no fallback
        console.error(e)
      }
      return val == null ? '' : val
    },
    isLikelyNumeric (val) {
      // considera number ou string que vira number
      if (typeof val === 'number') return true
      if (typeof val === 'string') {
        const n = Number(val.replace?.(/[.\s]/g, '').replace?.(',', '.') ?? val)
        return !isNaN(n)
      }
      return false
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

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
        class="text-14 text-center"
        style="white-space: pre-line; color: #000000;"
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
        class="text-14 text-grey-2 text-center"
      >
        <slot :name="`cell-${col.name}`" :row="row">
          {{ row[col.name] }}
        </slot>
      </div>

      <div v-if="enableSearch" class="text-right">
        <slot name="row-actions" :row="row" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    enableSearch: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    filteredRows () {
      if (!this.filter) return this.rows
      const f = this.filter.toLowerCase()
      return this.rows.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(f)
        )
      )
    },
    gridTemplate () {
      // Gera grid dinamicamente com base no número de colunas + ações
      const count = this.columns.length + (this.enableSearch ? 1 : 0)
      return `grid-template-columns: repeat(${count}, 1fr); gap: 12px; align-items: center;`
    }
  }
}
</script>

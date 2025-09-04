<template>
  <div class="card-container" :style="{ border: `${stroke}px solid ${themeColor}` }">
    <div
      class="title-card font-1 text-18 weight-500 row"
      :class="titlePosition === 'start' ? 'start' : 'center'"
      :style="{ color: titleColor }"
    >
      <span class="q-pr-sm text-center">{{ title }}</span>

      <q-icon
        v-if="withIcon"
        :name="mdiChevronDownCircle"
        size="md"
        :style="{ color: titleColor }"
      />
    </div>

    <div class="row" style="height: 100%;">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
import { mdiChevronDownCircle } from '@quasar/extras/mdi-v4'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    titlePosition: {
      type: String,
      default: 'start'
    },
    withIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    themeColor: {
      type: String,
      default: '#2583FF'
    },
    titleColor: {
      type: String,
      default: '#0047A1'
    },
    stroke: {
      type: Number,
      default: 2
    }
  },
  setup () {
    return {
      mdiChevronDownCircle
    }
  }
}
</script>
<style scoped>
.card-container {
  position: relative;
  border: 2px solid;
  border-radius: 20px;
  width: 100%;
  height: 100%;
}

.title-card {
  position: absolute;
  top: -14px;
  padding: 0px 20px;
  background-color: white;
}
.start {
  left: 5%;
}
.center {
  left: 50%;
  transform: translateX(-50%);
}
</style>

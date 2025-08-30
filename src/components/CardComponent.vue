<template>
  <div class="card-container" :style="{ borderColor: themeColor }">
    <div
      class="title-card font-1 text-18 weight-500"
      :class="titlePosition === 'start' ? 'start' : 'center'"
      :style="{ color: themeColor }"
    >
      <span class="q-pr-sm">{{ title }}</span>

      <q-icon
        v-if="withIcon"
        :name="mdiChevronDownCircle"
        size="md"
        :style="{ color: themeColor }"
      />
    </div>

    <div class="row">
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

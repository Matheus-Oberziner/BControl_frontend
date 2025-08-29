<template>
  <div class="card-container">
    <div class="title-card font-1 text-18 weight-500 text-blue">
      <span class="q-pr-sm">{{ title }}</span>

      <q-icon
        v-if="withIcon"
        :name="mdiChevronDownCircle"
        size="md"
      />
    </div>

    <div class="row" style="padding: 40px 30px;">
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
    withIcon: {
      type: Boolean,
      required: false,
      default: false
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
  border: 2px solid #2583FF;
  border-radius: 20px;
  width: 100%;
}

.title-card {
  position: absolute;
  top: -14px;
  left: 5%;
  padding: 0px 20px;
  background-color: white;
}
</style>

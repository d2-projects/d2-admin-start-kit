<template>
  <div class="wg-item"
       :class="[item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle']"
       :style="item.style">
    <div class="flex-auto">
      <hr class="splitLine-hr"
          :style="item.style">
    </div>
  </div>
</template>

<script>
export default {
  name: 'splitPage',
  props: {
    item: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      default: null
    }
  }
}
</script>

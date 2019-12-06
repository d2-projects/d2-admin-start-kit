<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <span>{{item.value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'staticText',
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

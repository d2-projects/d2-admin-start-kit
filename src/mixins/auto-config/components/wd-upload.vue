<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <tao-upload v-model="model[item.prop]"
                  v-bind="item.config" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  props: {
    item: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleChangeEvent (data) {
      if (this.item.eventChange) {
        this.item.eventChange(data)
      }
    }
  }
}
</script>

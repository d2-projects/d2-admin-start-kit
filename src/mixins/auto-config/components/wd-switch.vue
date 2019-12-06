<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-switch v-model="model[item.prop]"
                 @change="handleChangeData"></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'switch',
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
    handleChangeData (data) {
      if (this.item.eventChange) {
        this.item.eventChange(data)
      }
    }
  }
}
</script>

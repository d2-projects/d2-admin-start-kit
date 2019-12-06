<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-input v-model="model[item.prop]"
                :placeholder="item.placeholder"
                @change="handleChangeData"
                type="textarea"
                :rows="item.rows"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'textarea',
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

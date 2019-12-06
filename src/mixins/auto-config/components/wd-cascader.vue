<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-cascader v-model="model[item.prop]"
                   ref="manbinBigcas"
                   clearable
                   filterable
                   :show-all-levels="false"
                   :options="item.options"
                   :props="item.config"
                   @change="handleChangeEvent"></el-cascader>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cascaderPage',
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

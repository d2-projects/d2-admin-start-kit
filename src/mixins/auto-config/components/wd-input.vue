<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-input v-model="model[item.prop]"
                :placeholder="item.placeholder"
                @change="handleChangeData">
        <template slot="append"
                  v-if="item.unit">{{ item.unit }}</template>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputPage',
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

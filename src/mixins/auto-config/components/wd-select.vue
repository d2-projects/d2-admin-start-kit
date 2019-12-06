<!--
 * @Description: select
 * @Author: zjx
 * @Date: 2019-07-09 15:55:22
 * @LastEditTime: 2019-07-17 09:53:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-select v-model="model[item.prop]"
                 :placeholder="item.placeholder"
                 @change="handleChangeData">
        <el-option v-for="(select, s) in item.options"
                   :key="s"
                   :label="select.label"
                   :value="select.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectPage',
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

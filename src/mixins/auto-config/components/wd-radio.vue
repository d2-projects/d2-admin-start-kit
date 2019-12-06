<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 15:55:22
 * @LastEditTime: 2019-07-17 09:53:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-radio-group v-model="model[item.prop]"
                      @change="handleChangeData"
                      :style="{ display: item.label.display }">
        <el-radio :label="itemRadio.value"
                  v-for="(itemRadio, index) in item.options"
                  :key="index">{{ itemRadio.label }}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'radioPage',
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

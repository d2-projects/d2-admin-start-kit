<!--
 * @Description: In User Settings Edit
 * @Author: zjx
 * @Date: 2019-07-09 15:55:22
 * @LastEditTime: 2019-07-17 09:53:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-checkbox-group v-model="model[item.prop]"
                         @change="handleChangeData"
                         :disabled="item.disabled">
        <el-checkbox v-for="(radio, r) in item.options"
                     :key="r"
                     :label="radio.value"
                     :disabled="radio.disabled">{{ radio.label }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    item: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
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

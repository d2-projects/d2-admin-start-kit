<template>
  <div class="wg-item"
       v-if="isShowCom"
       :class="[item.label.labelPosition==='top'?'flex-column':'align-middle']"
       :style="item.style">
    <div class="wg-title"
         :style="{width:item.label.labelWidth}"
         v-show="item.showLabel">{{item.label.labelTitle}}</div>
    <div class="flex-auto">
      <!-- <ap-uedit v-model="model[item.prop]" /> --> //组件暂定
    </div>
  </div>
</template>

<script>
export default {
  name: 'ueditPage',
  props: {
    item: {
      type: Object,
      default: null
    },
    model: {
      type: Object,
      default: null
    }
  },
  computed: {
    isShowCom () {
      if (this.item.isShow !== undefined) {
        return this.item.isShow
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

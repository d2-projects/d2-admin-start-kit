<template>
  <div class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-autocomplete v-model="model[item.prop]"
                       popper-class="my-autocomplete"
                       class="selectwidth"
                       clearable
                       @select="handleSelectChange"
                       :fetch-suggestions="item.querySearchAsync"
                       :placeholder="item.placeholder">
      </el-autocomplete>
    </div>
  </div>
</template>

<script>
/**
 * querySearchAsync(string,cb)  autocomplete 函数
 */
export default {
  name: 'autocompletePage',
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
    handleSelectChange (data) {
      if (this.item.eventChange) {
        this.item.eventChange(data)
      }
    }
  }
}
</script>

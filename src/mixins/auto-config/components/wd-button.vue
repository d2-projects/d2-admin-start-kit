<template>
  <div v-if="item.type === 'button'"
       class="wg-item"
       :style="item.style">
    <div class="flex-auto">
      <el-button @click="handleSubmit">submit</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'button',
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
    handleSubmit () {
      this.$emit('submit')
    }
  }
}
</script>

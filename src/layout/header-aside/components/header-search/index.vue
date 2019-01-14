<template>
  <Tooltip
    effect="dark"
    content="搜索"
    placement="bottom">
    <Button class="d2-mr btn-text can-hover" type="text" @click="handleClick">
      <d2-icon name="search" style="font-size: 18px;"/>
    </Button>
  </Tooltip>
</template>

<script>
import { Tooltip, Button } from 'element-ui'

export default {
  components: {
    Tooltip,
    Button
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

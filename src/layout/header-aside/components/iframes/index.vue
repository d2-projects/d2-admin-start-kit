<template>
  <d2-container>
    <iframe
      class="iframe-pane"
      frameborder="0"
      v-for="item in iframes"
      :key="item.key"
      :src="item.src"
      v-show="currentIframe === item.key"
      />
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'iframes',
  computed: {
    ...mapState('session', [
      'currentIframe',
      'iframes'
    ])
  }
}
</script>

<style lang="scss" scoped>
.iframe-pane {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>

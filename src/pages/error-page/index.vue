<template>
  <div class="page">
    <p class="page_title">{{code}} {{info.message}}</p>
    {{info.path}}
    <Button class="d2-mt" @click="$router.replace({ path: '/' })">
      返回首页
    </Button>
  </div>
</template>

<script>
import { Button } from 'element-ui'

export default {
  name: '',
  components: {
    Button
  },
  props: {
    code: {
      type: Number,
      require: true
    }
  },
  computed: {
    info () {
      let message
      let path = ''
      switch (this.code) {
        case 403:
          message = 'Forbidden'
          path = this.$route.params.path
          break
        case 404:
          message = 'page not found'
          path = this.$route.fullPath
          break
        default:
          message = '无效的错误码'
      }
      return { message, path }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: radial-gradient(at top center, #fff 0%, #abc 50%) #abc;
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
    color: #FFF;
  }
}
</style>

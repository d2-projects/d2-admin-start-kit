<template>
  <d2-container>
    <div class="page">
      <p class="page_title">无授权</p>
      您没有权限访问该地址（{{uri}}），如有疑问请联系管理员进行处理
    </div>
  </d2-container>
</template>

<script>
export default {
  name: '403',
  props: {
    uri: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
  }
}
</style>

<template>
  <d2-container :filename="filename">
    <template slot="header">Page 2 header</template>
    Hello World
  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

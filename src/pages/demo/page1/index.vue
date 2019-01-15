<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
import test from '../../../../modules/core'

export default {
  name: 'demo-page1',
  mounted () {
    console.log(test)
  }
}
</script>

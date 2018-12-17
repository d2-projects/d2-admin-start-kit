<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "page1"
})
export default class page1 extends Vue {}
</script>

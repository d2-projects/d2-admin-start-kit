<template>
  <d2-container>
    <template slot="header">Page 3 header</template>
    <h4> 动态子表单的构建</h4>
    <tao-subform v-bind="subFormTable" />
  </d2-container>
</template>

<script>
export default {
  name: 'page3',
  data () {
    return {
      subFormTable: {
        operate: ['add', 'del'],
        columns: [
          {
            prop: 'name',
            label: '多选',
            size: 'small',
            type: 'text'
          }
        ],
        data: [{ name: '嘻嘻嘻' }]
      }
    }
  }
}
</script>

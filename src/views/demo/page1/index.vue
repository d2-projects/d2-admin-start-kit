<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    <h4> 动态表格的构建</h4>
    <tao-table v-bind="table" />
    <h5> 配置文档</h5>
  </d2-container>
</template>

<script>
export default {
  name: 'page1',
  data () {
    return {
      action: ['add'], // 具体可根据权限判断action
      table: {
        columns: [
          { prop: 'name', label: '名称' },
          {
            prop: 'action',
            fixed: 'right',
            label: '操作',
            render: ({ row, column, index }) => {
              return (
                <tao-action
                  row={row}
                  action={this.action}
                  on-operate={this.onActionOperate}
                />
              )
            }
          }
        ],
        data: [{ name: '嘻嘻嘻' }]
      }
    }
  },
  methods: {
    onActionOperate (type, row) {
      console.log(type, row)
    }
  }
}
</script>

export default {
  name: 'tao-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  render (createElement) {
    const propsDefault = {
      stripe: true,
      rowKey: 'id',
      treeProps: {
        children: 'children_list'
      }
    }
    return createElement(
      'el-table', {
        ref: 'table',
        props: Object.assign(propsDefault, this.$attrs),
        on: this.$listeners,
        directives: [{
          name: 'loading',
          value: this.$attrs.loading || false
        }]
      },
      this.columns.map(column => {
        const scopedSlots = column.render
          ? {
            scopedSlots: {
              default: scope => column.render(scope)
            }
          }
          : null
        return createElement('el-table-column', {
          props: column,
          ...(scopedSlots || {})
        })
      })
    )
  },
  watch: {
    columns () {
      this.$nextTick(this.$refs.table.doLayout)
    }
  },
  methods: {
    // https://element.eleme.cn/#/zh-CN/component/table#table-methods
    method (methodName, ...arg) {
      const fn = this.$refs.table[methodName]
      if (fn) {
        fn(...arg)
      }
    }
  }
}

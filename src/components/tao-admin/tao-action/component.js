export default {
  name: 'tao-action',
  props: {
    action: {
      type: Array,
      default: () => {
        return []
      }
    },
    row: {
      type: Object,
      default: null
    }
  },
  render() {
    return (
      <div>
        {this.action.includes('del') && (
          <el-button
            size='mini'
            type='primary'
            on-click={() => this.$emit('operate', 'del', this.row)}
          >
            删除
          </el-button>
        )}
        {this.action.includes('add') && (
          <el-button
            size='mini'
            type='primary'
            on-click={() => this.$emit('operate', 'add', this.row)}
          >
            新增
          </el-button>
        )}
        {this.action.includes('edit') && (
          <el-button
            size='mini'
            type='primary'
            on-click={() => this.$emit('operate', 'edit', this.row)}
          >
            编辑
          </el-button>
        )}
        {this.action.includes('detail') && (
          <el-button
            size='mini'
            type='primary'
            on-click={() => this.$emit('operate', 'edit', this.row)}
          >
            详情
          </el-button>
        )}
      </div>
    )
  }
}

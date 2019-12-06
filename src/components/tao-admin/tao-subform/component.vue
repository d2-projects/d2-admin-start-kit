<template>
  <el-table :data="data"
            v-bind="config">
    <el-table-column align="center"
                     prop="#"
                     width="80">
      <template slot="header"
                v-if="operate.includes('add')"
                align="center"
                slot-scope="scope">
        <el-tooltip class="item"
                    effect="dark"
                    content="新增一项"
                    placement="top">
          <el-button size="mini"
                     type="primary"
                     plain
                     icon="el-icon-circle-plus-outline"
                     @click="handleOperateTable('add', scope.$index, scope.row)"></el-button>
        </el-tooltip>
      </template>
      <template slot-scope="scope">
        <el-tooltip class="item"
                    v-if="operate.includes('del')"
                    effect="dark"
                    content="删除"
                    placement="top">
          <el-button type="danger"
                     icon="el-icon-close"
                     size="mini"
                     @click="handleOperateTable('del', scope.$index, scope.row)"
                     circle></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column v-for="(item, index) in columns"
                     :key="index"
                     :prop="item.prop"
                     :label="item.label">
      <template slot-scope="scope">
        <div>
          <component :is="item.type + 'Page'"
                     :item="item"
                     :model="scope.row"
                     @showchange="handleGetChange(scope.row)"></component>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import autoConfig from '@/mixins/auto-config'
export default {
  name: 'tao-subform',
  mixins: [autoConfig],
  props: {
    operate: {
      type: Array,
      default: () => {
        return ['add', 'del']
      }
    },
    columns: {
      type: Array
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      config: {
        loading: false,
        stripe: true,
        border: true
      }
    }
  },
  methods: {
    handleGetChange (data) {
      this.$emit('subChange', data)
    },
    handleOperateTable (type, index, row) {
      if (type === 'add') {
        const temp = {}
        this.columns.some(item => {
          switch (item.type) {
            case 'checkbox':
              temp[item.en] = []
              break
            case 'upload':
              temp[item.en] = []
              break
            case 'select':
              if (item.config.multiple) {
                temp[item.en] = []
              } else {
                temp[item.en] = undefined
              }
              break
            default:
              temp[item.en] = undefined
              break
          }
        })
        this.data.push(temp)
      } else if (type === 'del') {
        this.data.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

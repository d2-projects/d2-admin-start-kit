<template>
  <Table
    :data="list"
    v-bind="table">
    <TableColumn
      prop="title"
      align="center"
      width="160"/>
    <TableColumn
      label="预览"
      width="120">
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundImage: `url(${$baseUrl}${scope.row.preview})`
        }">
      </div>
    </TableColumn>
    <TableColumn
      prop="address"
      align="center">
      <template slot-scope="scope">
        <Button
          v-if="activeName === scope.row.name"
          type="success"
          icon="el-icon-check"
          round>
          已激活
        </Button>
        <Button
          v-else
          round
          @click="handleSelectTheme(scope.row.name)">
          使用
        </Button>
      </template>
    </TableColumn>
  </Table>
</template>

<script>
import { Table, TableColumn, Button } from 'element-ui'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'd2-theme-list',
  components: {
    Table,
    TableColumn,
    Button
  },
  data () {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('d2admin/theme', [
      'list',
      'activeName'
    ])
  },
  methods: {
    ...mapActions('d2admin/theme', [
      'set'
    ]),
    handleSelectTheme (name) {
      this.set(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>

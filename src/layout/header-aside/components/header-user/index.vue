<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">你好 {{ info.name }}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5" />
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

const someModule = namespace('d2admin/user')
const accountModule = namespace('d2admin/account')
@Component({})
export default class LogOffMenu extends Vue {
  @someModule.State('info') info: any
  @accountModule.Action('logout') logout: any
  logOff() {
    this.logout({
      vm: this,
      confirm: true
    })
  }
}
</script>

<template>
  <Dropdown size="small" class="d2-mr">
    <span class="btn-text">你好 {{info.name}}</span>
    <DropdownMenu slot="dropdown">
      <DropdownItem @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        vm: this,
        confirm: true
      })
    }
  }
}
</script>

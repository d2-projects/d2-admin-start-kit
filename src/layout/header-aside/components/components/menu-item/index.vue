<template>
  <MenuItem :index="menu.path || uniqueId" v-if="showNoAuth || menu.auth" :disabled="!menu.auth">
    <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
    <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-file-o"></i>
    <d2-icon-svg v-if="menu.iconSvg" :name="menu.iconSvg"/>
    <span slot="title">{{menu.title || '未命名菜单'}}</span>
  </MenuItem>
</template>

<script>
import { MenuItem } from 'element-ui'
import { uniqueId } from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'd2-layout-header-aside-menu-item',
  components: {
    MenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      uniqueId: uniqueId('d2-menu-empty-')
    }
  },
  computed: {
    ...mapState('d2admin/menu', ['showNoAuth'])
  }
}
</script>

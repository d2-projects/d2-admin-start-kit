<template>
  <MenuItem :index="menu.path">
    <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
    <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-file-o"></i>
    <d2-icon-svg v-if="menu.iconSvg" :name="menu.iconSvg"/>
    <span slot="title">{{menu.title || '未命名菜单'}}</span>
  </MenuItem>
</template>

<script>
import { MenuItem } from 'element-ui'

export default {
  name: 'header-menu-sub',
  components: {
    MenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
}
</script>

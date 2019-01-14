<template>
  <Submenu :index="menu.path || uniqueId" v-if="showNoAuth || menu.auth" :disabled="!menu.auth">
    <template slot="title">
      <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
      <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-folder-o"></i>
      <d2-icon-svg v-if="menu.iconSvg" :name="menu.iconSvg"/>
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <d2-layout-header-aside-menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"/>
      <d2-layout-header-aside-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </Submenu>
</template>

<script>
import { uniqueId } from 'lodash'
import { mapState } from 'vuex'
import { Submenu } from 'element-ui'
import d2LayoutMainMenuItem from '../menu-item'

export default {
  name: 'd2-layout-header-aside-menu-sub',
  components: {
    Submenu,
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem
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

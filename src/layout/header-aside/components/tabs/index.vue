<template>
  <div class="d2-multiple-page-control-group" flex>
    <div class="d2-multiple-page-control-content" flex-box="1">
      <div class="d2-multiple-page-control-content-inner">
        <d2-contextmenu
          :visible.sync="contextmenuFlag"
          :x="contentmenuX"
          :y="contentmenuY">
          <d2-contextmenu-list
            :menulist="tagName === '/index' ? contextmenuListIndex : contextmenuList"
            @rowClick="contextmenuClick"/>
        </d2-contextmenu>
        <Tabs
          class="d2-multiple-page-control"
          :value="current"
          type="card"
          :closable="true"
          @tab-click="handleClick"
          @dblclick.native="handleDbclickTabs"
          @edit="handleTabsEdit"
          @contextmenu.native="handleContextmenu">
          <TabPane
            v-for="page in opened"
            :key="page.fullPath"
            :label="page.meta.title || '未命名'"
            :name="page.fullPath"/>
        </Tabs>
      </div>
    </div>
    <div
      class="d2-multiple-page-control-btn"
      flex-box="0">
      <D2HeaderFullscreen v-show="maximized" />
      <Tooltip
        effect="dark"
        :content="maximized ? '退出最大化' : '工作区最大化'"
        placement="bottom">
        <Button
          class="d2-ml-0 d2-mr btn-text can-hover"
          type="text"
          @click="handleControlBtnClick">
          <d2-icon :name="maximized ? 'window-restore' : 'window-maximize'"/>
        </Button>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import { Tooltip, Button, Tabs, TabPane } from 'element-ui'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Tooltip,
    Button,
    Tabs,
    TabPane,
    D2Contextmenu: () => import('../contextmenu'),
    D2ContextmenuList: () => import('../contextmenu/components/contentmenuList'),
    D2HeaderFullscreen: () => import('../header-fullscreen')
  },
  data () {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [
        { icon: 'times-circle', title: '关闭全部', value: 'all' }
      ],
      contextmenuList: [
        { icon: 'arrow-left', title: '关闭左侧', value: 'left' },
        { icon: 'arrow-right', title: '关闭右侧', value: 'right' },
        { icon: 'times', title: '关闭其它', value: 'other' },
        { icon: 'times-circle', title: '关闭全部', value: 'all' }
      ],
      tagName: '/index'
    }
  },
  computed: {
    ...mapState('d2admin/page', [
      'opened',
      'current',
      'maximized'
    ])
  },
  created () {
    this.clearSelection = window['getSelection'] ? function () {
      window.getSelection().removeAllRanges()
    } : function () {
      document.selection.empty()
    }
  },
  methods: {
    ...mapActions('d2admin/page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll',
      'maximizedToggle'
    ]),
    handleDbclickTabs () {
      this.maximizedToggle()
      this.clearSelection()
    },
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu (event) {
      let target = event.target
      // 解决 https://github.com/d2-projects/d2-admin/issues/54
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    /**
     * @description 右键菜单的row-click事件
     */
    contextmenuClick (command) {
      this.handleControlItemClick(command, this.tagName)
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     */
    handleControlItemClick (command, tagName = null) {
      if (tagName) {
        this.contextmenuFlag = false
      }
      const params = {
        pageSelect: tagName
      }
      switch (command) {
        case 'left':
          this.closeLeft(params)
          break
        case 'right':
          this.closeRight(params)
          break
        case 'other':
          this.closeOther(params)
          break
        case 'all':
          this.closeAll()
          break
        case 'max':
          this.maximizedToggle(this)
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },
    /**
     * @description 接收点击关闭控制上按钮的事件
     */
    handleControlBtnClick () {
      this.maximizedToggle(this)
    },
    /**
     * @description 接收点击 tab 标签的事件
     */
    handleClick (tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === tab.name)
      const { name, params, query } = page
      if (page) {
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
     */
    handleTabsEdit (tagName, action) {
      if (action === 'remove') {
        this.close({
          tagName
        })
      }
    }
  }
}
</script>

<template>
  <d2-container>
    <template slot="header">带参路由场景下，一个组件实例，同时管理多个页面的数据</template>
    <h3 class="d2-mt-0">组件名称：{{$options.name}}</h3>
    <h3 class="d2-mt-0">页面路由：{{$route.fullPath}}</h3>
    <h3 class="d2-mt-0">页面编号：{{id}}</h3>
    <p class="d2-mt-0">在下面的输入框输入任意字符后，切换到其它页面，再回到此页时输入框文字保留，证明每个页面的数据都能被有效管理</p>
    <Input v-model="text" placeholder="input here" />
  </d2-container>
</template>

<script>
import { Input } from 'element-ui'
import Page from '@/mixins/BasePage'
/**
 * 带参路由多组参数使用同一个组件实例，需要在组件内部对多个参数的情况进行统一处理
 */
export default {
  name: 'demo-params',
  mixins: [ Page ], // 这是实现本功能的核心代码，就这一行
  components: {
    Input
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>

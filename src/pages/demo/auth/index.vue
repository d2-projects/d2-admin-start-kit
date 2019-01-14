<template>
  <d2-container>
    <Row type="flex" align="stretch" :gutter="10">
      <Col :span="6">
        <Card shadow="hover" style="height:100%">
          <div slot="header">
            <span>已授权许可</span>
            <Tag style="float: right">当前用户：{{name}}</Tag>
          </div>
          <div class="d2-m-5" v-for="p in permissions" :key="p">
            <Tag>{{p}}</Tag>
          </div>
        </Card>
      </Col>
      <Col :span="6">
        <Card shadow="hover" style="height:100%">
          <div slot="header">
            <span>有权访问内容</span>
          </div>
          <div class="d2-m-5" v-for="p in pages" :key="p">
            <Button type="success" @click="$router.push(p)" v-if="checkPermission(p)">{{p}}</Button>
          </div>
          <div class="d2-m-5" v-for="i in items" :key="i">
            <Tag type="success" v-if="checkPermission(i)">{{i}}</Tag>
          </div>
        </Card>
      </Col>
      <Col :span="6">
        <Card shadow="hover" style="height:100%">
          <div slot="header">
            <span>无权访问内容</span>
          </div>
          <div class="d2-m-5" v-for="p in pages" :key="p">
            <Button type="danger" @click="$router.push(p)" v-if="!checkPermission(p)">{{p}}</Button>
          </div>
          <div class="d2-m-5" v-for="i in items" :key="i">
            <Tag type="danger" v-if="!checkPermission(i)">{{i}}</Tag>
          </div>
        </Card>
      </Col>
      <Col :span="6">
        <Card shadow="hover" style="height:100%">
          <div slot="header">
            <span>匹配算法性能对比</span>
            <Button style="float: right; padding: 5px" type="success"><d2-icon name="play" />测试</Button>
          </div>
        </Card>
      </Col>
    </Row>
  </d2-container>
</template>

<script>
import { Button, Card, Row, Col, Tag } from 'element-ui'
import { mapState } from 'vuex'

export default {
  name: 'demo-auth',
  components: {
    Button,
    Card,
    Row,
    Tag,
    Col
  },
  data () {
    return {
      pages: ['/demo/page1', '/demo/page2', '/demo/page3', '/demo/notfound'],
      items: ['/demo/test1', '/demo/test2', '/demo/test3', '/demo/test4']
    }
  },
  computed: {
    ...mapState('session', {
      name: state => state.user.name,
      permissions: state => state.user.permissions
    })
  }
}
</script>

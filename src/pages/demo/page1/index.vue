<template>
  <d2-container>
    <h1 class="d2-mt-0">权限测试</h1>
    <el-row class="d2-mb" v-if="checkPermission('/demo/test1')">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning" v-if="checkPermission('/demo/test2')">警告按钮</el-button>
      <el-button type="danger" v-if="checkPermission('/demo/test3')">危险按钮</el-button>
    </el-row>
    <el-row class="d2-mb"  v-if="checkPermission('/demo/test2')">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain v-if="checkPermission('/demo/test3')">危险按钮</el-button>
    </el-row>
    <el-row class="d2-mb" v-if="checkPermission('/demo/test3')">
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: 'page1'
}
</script>

<template>
  <el-form :model="model"
           :rules="rules"
           :inline="inline"
           :label-position="labelPosition"
           ref="ruleForm"
           style="width:100%;"
           :size="size"
           :label-width="labelWidth"
           class="demo-ruleForm">
    <template v-if="useRowCol">
      <el-row :gutter="20">
        <el-col v-for="(item, i) in ele"
                :span="item.span || 24"
                :key="i">
          <el-form-item :label="item.label"
                        :key="i"
                        :prop="item.prop">
            <component :is="item.type + 'Page'"
                       :item="item"
                       :model="model"></component>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <template v-for="(item, i) in ele">
        <el-form-item :label="item.label"
                      :key="i"
                      :prop="item.prop">
          <component :is="item.type + 'Page'"
                     :item="item"
                     :model="model"></component>
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <el-button v-if="btn.includes('search')"
                 v-loading="loading"
                 type="primary"
                 @click="onSearch('ruleForm')">检索</el-button>
      <el-button v-if="btn.includes('submit')"
                 type="primary"
                 @click="onSubmit('ruleForm')"
                 v-loading="loading">保 存</el-button>
      <el-button v-if="btn.includes('edit')"
                 type="primary"
                 @click="onSubmit('ruleForm')"
                 v-loading="loading">修 改</el-button>
      <el-button v-if="btn.includes('reset')"
                 @click="resetForm('ruleForm')">重 置</el-button>
      <el-button v-if="btn.includes('cancel')"
                 @click="cancelForm('ruleForm')">取 消</el-button>
      <el-button v-if="btn.includes('close')"
                 @click="cancelForm('ruleForm')">关 闭</el-button>
      <el-button v-if="btn.includes('create')"
                 @click="addForm('ruleForm')"
                 v-loading="loading">新 增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import autoConfig from '@/mixins/auto-config'
export default {
  name: 'tao-form',
  props: {
    model: {
      type: Object,
      default: null
    },
    ele: {
      type: Array,
      default: null
    },
    rules: {
      type: Object,
      default: null
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    useRowCol: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    size: {
      type: String,
      default: 'small'
    },
    inline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    btn: {
      type: Array,
      default () {
        return ['submit', 'reset', 'cancel', 'edit', 'create']
      }
    }
  },
  mixins: [autoConfig],
  methods: {
    onSearch () {
      this.$emit('submit', 'search', this.model)
    },
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submit', this.model)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate()
    },
    cancelForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate()
    },
    addForm (formName) {
      this.$emit('add')
    }
  }
}
</script>

<style lang="scss" scoped></style>

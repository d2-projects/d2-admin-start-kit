<template>
  <d2-container>
    <template slot="header">Page 2 header</template>
    <h4> 动态表单的构建</h4>
    <tao-form v-bind="formConfig"
              @submit="onSubmit" />
  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  data () {
    return {
      formConfig: {
        model: {
          username: 'admin',
          note: 'xx'
        },
        ele: [
          {
            prop: 'username',
            label: '姓 名',
            placeholder: '姓 名',
            prefix: 'md-contact',
            type: 'text'
          },
          {
            prop: 'note',
            label: '备 注',
            placeholder: '备注',
            prefix: 'md-contact',
            type: 'textarea'
          }
        ],
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        labelWidth: '100px',
        class: 'demo-ruleForm',
        inline: false,
        loading: false,
        btn: ['submit', 'reset', 'cancel']
      }
    }
  },
  methods: {
    onSubmit (formData) {
      console.log(formData)
    }
  }
}
</script>

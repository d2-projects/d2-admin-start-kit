<template>
  <d2-container>
    <template slot="header">输入校验</template>
    <Form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <FormItem
        label="年龄"
        prop="age"
        :rules="validNumber(1,100)"
      >
      <Input type="age" v-model.number="numberValidateForm.age" autocomplete="off"/>
      </FormItem>
      <FormItem
        label="金额"
        prop="money"
        :rules="validDecimal()"
      >
        <Input  v-model="numberValidateForm.money" autocomplete="off"/>
      </FormItem>
       <FormItem
        label="包含中文"
        prop="testChina"
        :rules="validMustIncludeChinese()"
      >
        <Input  v-model="numberValidateForm.testChina" autocomplete="off"/>
      </FormItem>
      <FormItem
        label="不包含中文"
        prop="testNoChina"
        :rules="validCannotIncludeChinese()"
      >
        <Input  v-model="numberValidateForm.testNoChina" autocomplete="off"/>
      </FormItem>
       <FormItem
        label="身份证号"
        prop="idCardNo"
        :rules="validIdCardNo()"
      >
        <Input  v-model="numberValidateForm.idCardNo" autocomplete="off"/>
      </FormItem>

       <FormItem
        label="手机号码"
        prop="mobilePhone"
        :rules="validMobilePhone()"
      >
        <Input  v-model="numberValidateForm.mobilePhone" autocomplete="off"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitForm('numberValidateForm')">提交</Button>
        <Button @click="resetForm('numberValidateForm')">重置</Button>
      </FormItem>
    </Form>
  </d2-container>
</template>

<script>
import { Form, Input, Button } from 'element-ui'
import FormItem from '@/components/extends/form-item'

export default {
  name: 'demo-validator',
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  data () {
    return {
      numberValidateForm: {
        age: '',
        money: 0.00,
        testChina: '',
        testNoChina: '',
        idCardNo: '',
        mobilePhone: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    valid_number (min, max) {
      // console.log(this, arguments)
      return { type: 'number', message: `年龄范围错误（${min}~${max}）`, min, max }
    }
  }

}
</script>

<template>
  <el-form
    ref="form"
    :model="p"
    :rules="rules"
    class="form"
    label-position="right"
    label-width="100px"
  >
    <el-form-item label="旧密码：" prop="password">
      <el-input v-model="p.password" type="password" />
    </el-form-item>
    <el-form-item label="新密码：" prop="newPassword">
      <el-input v-model="p.newPassword" type="password" />
    </el-form-item>
    <el-form-item label="确认密码：" prop="confirmPassword">
      <el-input v-model="p.confirmPassword" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary" @click="submit">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { changePassword } from '@/pages/system/user/api'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      p: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        password: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        newPassword: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (this.p.newPassword !== value) {
                callback(new Error('两次输入不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          debugger
          changePassword({
              ...this.p,
              ...{ id: this.user.id }
            })
            .then(response => {
              const res = response.data
              if (res.isSuccess) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs.form.clearValidate()
                this.$refs.form.resetFields()
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

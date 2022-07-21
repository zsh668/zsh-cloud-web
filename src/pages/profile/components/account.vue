<template>
  <el-form
    ref="form"
    :model="user"
    :rules="rules"
    class="form"
    label-position="right"
    label-width="100px"
  >
    <el-form-item label="姓名：" prop="userName">
      <el-input v-model="userInfo.userName" />
    </el-form-item>
    <el-form-item label="邮箱：" prop="email">
      <el-input v-model="userInfo.email" />
    </el-form-item>
    <el-form-item label="电话：" prop="mobile">
      <el-input v-model="userInfo.mobile" />
    </el-form-item>
    <el-form-item label="性别：" class="boxPt">
      <el-radio-group v-model="userInfo.gender">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="个人描述：" prop="workDescribe">
      <el-input v-model="userInfo.workDescribe" rows="3" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary" @click="submit">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validatePhone } from '@/utils/validate'

export default {
  components: { },
  props: {
    user: {}
  },
  data() {
    return {
      userInfo: {},
      rules: {
        email: {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        },
        mobile: {
          validator: validatePhone,
          trigger: 'blur'
        },
        gender: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        workDescribe: { max: 255, message: '内容超过255字符', trigger: 'blur' }
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
       this.userInfo = this.user
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const temp = {
            userName: this.userInfo.userName,
            email: this.userInfo.email,
            mobile: this.userInfo.mobile,
            gender: this.userInfo.gender,
            workDescribe: this.userInfo.workDescribe
          }
          this.editUserInfo({ ...temp }).then(response => {
            const res = response.data
            if (res.isSuccess) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
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
<style lang="scss" scoped>
.form {
  padding: 10px 0 0 0;
}
</style>

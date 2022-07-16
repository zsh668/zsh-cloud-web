<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="isVisible"
    :width="width"
    top="50px"
    class="userBox"
  >
    <el-form ref="form" :model="groupUser" :rules="rules" label-position="right" label-width="40px">
      <el-form-item prop="userIdList">
        <el-transfer
          v-model="groupUser.userIdList"
          :data="userList"
          :filter-method="filterMethod"
          :props="{
            key: 'id',
            label: 'userName'
          }"
          :render-content="renderFunc"
          :right-default-checked="groupUser.userIdList"
          :titles="['全部用户', '已选用户']"
          filter-placeholder="用户名"
          filterable
          style="text-align: left; display: inline-block"
        />
      </el-form-item>
    </el-form>
    <div class="subBox">
      <el-button @click="isVisible = false"> 取 消 </el-button>
      <el-button type="primary" :disabled="disabled" @click="submitForm">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addGroupUser } from '@/pages/system/user-group/api'
import { getUserList } from '@/pages/system/user/api'

export default {
  name: 'GroupUserEdit',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    groupData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      groupUser: this.initGroupUser(),
      screenWidth: 0,
      width: this.initWidth(),
      userList: [],
      userIdList: [],
      disabled: false,
      rules: {},
      renderFunc(h, option) {
        return h(
          'span',
          {
            attrs: {
              title: option.account + ' - ' + option.userName
            }
          },
          [option.account, ' - ', option.userName]
        )
      }
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.dialogVisible
      },
      set() {
        this.close()
        this.reset()
      }
    },
    title() {
      return '分配用户'
    }
  },
  watch: {},
  mounted() {
    this.initUserList()
    window.onresize = () => {
      return (() => {
        this.width = this.initWidth()
      })()
    }
  },
  methods: {
    initGroupUser() {
      return {
        groupId: '',
        userIdList: []
      }
    },
    initWidth() {
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth < 991) {
        return '90%'
      } else if (this.screenWidth < 1400) {
        return '45%'
      } else {
        return '800px'
      }
    },
    initUserList() {
      getUserList({ current: 1, size: 100000, status: true })
        .then(response => {
          const res = response.data
          this.userList = res.data.list
        })
        .catch(() => {
          this.$message({
            message: '获取数据失败',
            type: 'error'
          })
        })
    },
    close() {
      this.$emit('close')
    },
    reset() {
      // 先清除校验，再清除表单，不然有奇怪的bug
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
      this.groupUser = this.initGroupUser()
      this.disabled = false
    },
    submitForm() {
      const vm = this
      this.$refs.form.validate(valid => {
        if (valid) {
          vm.editSubmit()
        } else {
          return false
        }
      })
    },
    editSubmit() {
      const vm = this
      this.groupUser.groupId = this.groupData
      addGroupUser(this.groupUser).then(response => {
        const res = response.data
        if (res.isSuccess) {
          vm.isVisible = false
          vm.$message({
            message: '操作成功',
            type: 'success'
          })
          vm.$emit('success')
        }
      })
    },
    filterMethod(query, item) {
      return item.userName.indexOf(query) > -1 || item.account.indexOf(query) > -1
    }
  }
}
</script>
<style lang="scss" scoped>
.edit_dev {
  width: 800px;
}
.edit_dev > .el-form-item__content > .el-transfer > .el-transfer__buttons {

  display: inline-flex;

  .el-button {
    vertical-align: text-top;
  }
}
</style>

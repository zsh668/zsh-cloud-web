<template>
  <el-dialog
    class="user-unfreeze-dialog"
    :title="dialog.title + '用户组'"
    :type="dialog.type"
    :visible="dialog.isVisible"
    :before-close="handleClose"
  >
    <div class="unfreeze-form">
      <el-form
        ref="ruleForm"
        :rules="formRules"
        :model="userData"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户组名称：" prop="groupName">
          <el-input
            v-if="dialog.title === '添加'"
            v-model="userData.groupName"
            minlength="1" maxlength="12"
            autocomplete="off"
            placeholder="请输入"
          />
          <span v-else>{{ userData.groupName }}</span>
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-select v-model="userData.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :disabled="!item.status"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述：" prop="describe" class="textInfo">
          <el-input
            v-model="userData.describe"
            type="textarea"
            resize="none"
            maxlength="50"
            @input="descInput"
          />
          <span class="numInfo">{{ texNum }}/50</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="subBox">
      <el-button @click="handleClose"> 取 消 </el-button>
      <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { Tree as ElTree } from 'element-ui'
// 表单验证
import { validateAccounts, validateName } from '@/utils/validate'
// api
import { getAllStation } from '@/api/api'
import { addUserGroup, editUserGroup } from '@/pages/system/user-group/api'
// 公用组件
import SelectTree from '@/components/SelectTree/index.vue'
// import SelectTree from './tree.vue'
@Component({
  name: 'groupAddDialog',
  components: {
    SelectTree
  }
})
export default class extends Vue {
  // 角色验证
  private validateUser = (rule: any, value: any, callback: any) => {
    if (value === '' || value === undefined || value.length === 0) {
      callback(new Error('请选择成员'))
    } else {
      return callback()
    }
  }
  @Prop() private dialog!: any
  @Prop() private roleData!: []
  @Prop() private treeData!: {}
  @Prop() private userData!: any
  private userIds = [] as any
  private texNum: number = 0
  private formRules = {
    groupName: [{ validator: validateName, required: true, trigger: 'change' }],
    roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
  }
  private styles = {
    width: '300px'
  }
  private test = ''
  private values = []
  private selectParams = {
    clearable: true,
    placeholder: '请选择'
  }
  // 解决异步数据子组件获取不到数据
  @Watch('userData')
  getUserInfo(value: any) {
    this.userData = value
  }
  /// // 功能函数 /////
  // 添加用户
  private async addSave() {
    (this.userData as any).userIds = this.userIds
    const { data } = await addUserGroup(this.userData)
    if (data.isSuccess) {
      this.dialog.isVisible = false
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
      this.$emit('getList')
      ;(this.$refs.ruleForm as ElForm).resetFields()
    }
  }
  // 编辑用户
  private async updateSave() {
    const parent = {
      id: this.userData.id,
      groupName: this.userData.groupName, // 用户组名称
      roleId: this.userData.roleId, // 角色
      describe: this.userData.describe // 描述
    }
    const { data } = await editUserGroup(parent)
    if (data.isSuccess) {
      this.dialog.isVisible = false
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
      this.$emit('getList')
      ;(this.userData as any).id = ''
      ;(this.$refs.ruleForm as ElForm).resetFields()
    }
  }
  // 表单提交
  private handleSubmit() {
    (this.userData as any).userIds = this.userIds;
    (this.$refs.ruleForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        if (this.dialog.type === 'add') {
          await this.addSave()
        } else {
          await this.updateSave()
        }
        (this.userData as any).status = true
      } else {
        return false
      }
    })
  }
  // ui
  // 表单取消
  private handleClose() {
    (this.$refs.ruleForm as ElForm).resetFields()
    ;(this.userData as any).id = ''
    ;(this.userData as any).status = true
    this.dialog.isVisible = false
    this.values = []
  }
  // 获取组织树id
  getValue(value: string) {
    this.userIds = value
  }
  descInput() {
    let txtVal = (this.userData as any).describe.length
    this.texNum = 0 + txtVal
  }
}
</script>

<style lang="scss">
</style>

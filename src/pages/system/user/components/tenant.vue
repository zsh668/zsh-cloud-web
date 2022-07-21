<template>
  <div>
    <el-dialog
      class="user-unfreeze-dialog"
      :title="dialog.title"
      :type="dialog.type"
      :visible.sync="dialog.isVisible"
      :before-close="handleClose"
    >
      <div class="unfreeze-form dialogScroll">
        <el-form
          ref="ruleForm"
          :rules="formRules"
          :model="userData"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="所属租户：" prop="tenantId">
            <el-select v-model="userData.tenantId" placeholder="请选择">
              <el-option
                v-for="item in tenantData"
                :key="item.id"
                :disabled="item.disabled"
                :label="item.tenantName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="subBox">
        <el-button @click="handleClose"> 取 消 </el-button>
        <el-button type="primary" :disabled="isDisable" @click="handleSubmit">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
// api
import { editUserTenant } from '@/pages/system/user/api'
@Component({
  name: 'UserRoleDialog',
  components: {
  }
})
export default class extends Vue {
  // 租户验证
  private validateTenant = (rule: any, value: string, callback: Function) => {
    if (value === undefined || value === '' || value.length === 0) {
      callback(new Error('请选择租户'))
    } else {
      callback()
    }
  }
  @Prop() private dialog!: any
  @Prop() private tenantData!: []
  @Prop() private userData!: {}
  private formRules = {
    tenantId: [{ validator: this.validateTenant, required: true, trigger: 'change' }]
  }
  private styles = {
    width: '300px'
  }
  private el: any = this.$refs
  private isDisable: boolean = false

  // 功能函数
  created() {
  }

  /// // 功能函数 /////
  // 编辑用户
  private async updateSave() {
    const userId = (this.userData as any).id
    const tenantId = (this.userData as any).tenantId
    const { data } = await editUserTenant({ userId: userId, tenantId: tenantId })
    if (data.isSuccess) {
      this.dialog.isVisible = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.$emit('getList')
      ;(this.userData as any).id = ''
      ;(this.$refs.ruleForm as ElForm).resetFields()
    }
  }
  // 表单提交
  private handleSubmit() {
    this.isDisable = true
    setTimeout(() => {
      this.isDisable = false // 点击一次时隔两秒后才能再次点击
    }, 2000)
    ;(this.$refs.ruleForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        await this.updateSave()
      }
    })
  }
  // 表单取消
  handleClose() {
    const userData = this.userData as any
    (this.$refs.ruleForm as ElForm).resetFields()
    userData.id = ''
    this.dialog.isVisible = false
  }
}
</script>

<style lang="scss">
</style>

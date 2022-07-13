<template>
  <el-dialog
    v-if="dialog.isVisible"
    class="user-unfreeze-dialog"
    :title="dialog.title + '租户'"
    :visible.sync="dialog.isVisible"
    :before-close="handleClose"
  >
    <div class="unfreeze-form">
      <el-form
        ref="ruleForm"
        :rules="formRules"
        :model="baseData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="租户编码：" prop="tenantCode">
          <el-input v-model="baseData.tenantCode" placeholder="请输入" autocomplete="off" minlength="1" maxlength="12" />
        </el-form-item>
        <el-form-item label="租户名称：" prop="tenantName">
          <el-input v-model="baseData.tenantName" placeholder="请输入" autocomplete="off" minlength="1" maxlength="12" />
        </el-form-item>
        <el-form-item label="描述：" prop="describe" class="textInfo">
          <el-input
            v-model="baseData.describe"
            placeholder="请输入"
            type="textarea"
            resize="none"
            minlength="1"
            maxlength="50"
            @input="descInput"
          />
          <span class="numInfo">{{ texNum }}/50</span>
        </el-form-item>
        <el-form-item class="right">
          <el-button @click="handleClose"> 取 消 </el-button>
          <el-button type="primary" :disabled="isDisable" @click="handleSubmit">
            确 定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
// api
import { addTenant, editTenant } from '@/pages/system/tenant/api'

@Component({
  name: 'Dialog',
  components: {
  }
})
export default class extends Vue {
  @Prop() private dialog!: any
  @Prop() private editData!: {}
  private baseData= {
    tenantCode: '',
    tenantName: '',
    describe: ''
  } as any
  private texNum: number = 0
  private isDisable: boolean = false
  private formRules = {
    tenantCode: [{ required: true, message: '请输入租户编码', trigger: 'blur' }],
    tenantName: [{ required: true, message: '请输入租户名称', trigger: 'blur' }]
  }
  @Watch('editData')
  getUserData(val:any) {
    if (this.dialog.type !== 'add' && val.id !== undefined) {
      this.baseData = val
    }
  }
  // 功能函数
  // 添加用户
  private async addSave() {
    const { data } = await addTenant(this.baseData)
    if (data.isSuccess) {
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
      this.$emit('getList')
      this.handleClose()
    }
  }
  // 编辑用户
  private async updateSave() {
    const { data } = await editTenant(this.baseData)
    if (data.isSuccess) {
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
      this.$emit('getList')
      this.handleClose()
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
        if (!this.baseData.id) {
          await this.addSave()
        } else {
          await this.updateSave()
        }
      } else {
        return false
      }
    })
  }
  // ui
  // 表单取消
  private handleClose() {
    (this.$refs.ruleForm as ElForm).resetFields()
    this.$emit('close')
  }
  descInput() {
    let txtVal = (this.baseData as any).describe.length
    this.texNum = 0 + txtVal
  }
}
</script>

<style lang="scss">
</style>

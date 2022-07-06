<template>
  <el-dialog
    v-if="dialog.isVisible"
    class="user-unfreeze-dialog"
    :title="dialog.title + '岗位'"
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
        <el-form-item label="岗位名称：" prop="stationName">
          <el-input v-model="baseData.stationName" placeholder="请输入" autocomplete="off" minlength="1" maxlength="12" />
        </el-form-item>
        <el-form-item label="组织：" prop="orgId">
          <select-tree
            ref="treeSelect"
            v-model="values"
            popover-class="fas"
            :styles="styles"
            :select-params="selectParams"
            :tree-params="treeParams"
            :org-data="orgData"
            :org-id="baseData.orgId"
            @getValue="getValue($event)"
          />
        </el-form-item>
        <el-form-item label="排序：" prop="sortValue">
          <el-input-number v-model="baseData.sortValue" :min="0" />
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
import SelectTree from '@/components/SelectTree/index.vue'
// api
import { addPost, editPost, detailPost } from '@/pages/system/post/api'

@Component({
  name: 'Dialog',
  components: {
    SelectTree
  }
})
export default class extends Vue {
  @Prop() private dialog!: any
  @Prop() private editData!: {}
  @Prop() private orgData!: []
  @Prop() private treeData!: {}
  private baseData= {
    stationName: '',
    orgId: '',
    sortValue: '0',
    describe: ''
  } as any
  private texNum: number = 0
  private isDisable: boolean = false
  private el: any = this.$refs
  private formRules = {
    stationName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
    orgId: [{ required: true, message: '请选择组织', trigger: 'change' }]
  }
  private values = ''
  private styles = {
    width: '300px'
  }
  private selectParams = {
    clearable: true,
    placeholder: '请选择'
  }
  private treeParams = {
    clickParent: false,
    filterable: true,
    data: [],
    props: {
      children: 'children',
      label: 'orgName',
      disabled: 'disabled',
      value: 'id'
    }
  }
  @Watch('editData')
  getUserData(val:any) {
    if (this.dialog.type !== 'add' && val.id !== undefined) {
      this.baseData = val
    }
  }
  @Watch('orgData', { immediate: true })
  getOrg(value: any) {
    this.treeParams.data = value
  }
  // 功能函数
  // 添加用户
  private async addSave() {
    const { data } = await addPost(this.baseData)
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
    delete (this.baseData as any).createTime
    delete (this.baseData as any).updateTime
    const { data } = await editPost(this.baseData)
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
  // 获取组织树id
  getValue(value: string) {
    (this.baseData as any).orgId = value
  }
  descInput() {
    let txtVal = (this.baseData as any).describe.length
    this.texNum = 0 + txtVal
  }
}
</script>

<style lang="scss">
</style>

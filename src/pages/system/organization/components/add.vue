<template>
  <el-dialog
    class="user-unfreeze-dialog"
    :title="dialog.title + '组织'"
    :type="dialog.type"
    :visible.sync="dialog.isVisible"
    :before-close="handleClose"
  >
    <div class="unfreeze-form">
      <el-form
        ref="ruleForm"
        :rules="formRules"
        :model="userData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="上级组织：" prop="parentId">
          <el-input v-model="userData.parentName" readonly />
        </el-form-item>
        <el-form-item label="组织名称：" prop="orgName">
          <el-input v-model="userData.orgName" placeholder="请输入" autocomplete="off" minlength="1" maxlength="30" />
        </el-form-item>
        <el-form-item label="排序：" prop="sortValue">
          <el-input-number v-model="userData.sortValue" :min="0" />
        </el-form-item>
        <el-form-item label="描述：" prop="describe" class="textInfo">
          <el-input
            v-model="userData.describe"
            type="textarea"
            resize="none"
            maxlength="50"
            @input="descInput"
          />
          <span class="numInfo">{{ texNum }}/100</span>
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
import { addUser, edit } from '@/pages/system/organization/api'

// 公用组件
// 组织树
import SelectTree from '@/components/SelectTree/org-tree.vue'
@Component({
  name: 'AddDialog',
  components: {
    SelectTree
  }
})
export default class extends Vue {
  @Prop() private dialog!: any
  @Prop() private orgdata!:[]
  @Prop() private editdata!:{}
  @Prop() private parentid!:string
  @Prop() private parentname!:string
  private isDisable: boolean = false
  private el: any = this.$refs
  private values = ''
  private styles = {
    width: '300px'
  }
  private texNum: number = 0
  private userData={
    parentId: '',
    parentName: '',
    orgName: '',
    sortValue: '0',
    describe: ''
  } as any
  private isClearable=true // 可清空（可选）
  private isAccordion=true // 可收起（可选）
  // private parentInfo={
  //   valueId: '',
  //   parentName: ''
  // }
  private valueId =''
  private parentName =''
  private props={ // 配置项（必选）
        value: 'id',
        label: 'orgName',
        children: 'children'
        // disabled: true
      }
  private superiorData = [] // 组织负责人列表
  private formRules = {
    orgName: [{ required: true, message: '请输入组织名称', trigger: 'blur' }]
  }
  get optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.orgdata)) // 对源数据深度克隆
      return cloneData.filter((father:any) => { // 循环所有项，并添加children属性
          let branchArr = cloneData.filter((child:any) => father.id === child.parentId) // 返回每一项的子级数组
          // eslint-disable-next-line no-unused-expressions
          branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
          return String(father.parentId) === '0' // 返回第一层
      })
    }
    @Watch('editdata')
    getUserData(val:any) {
      if (this.dialog.type !== 'add' && val.id !== undefined) {
        this.userData = val
        this.userData.parentName = (val.parentName === null || val.parentName === '') ? '顶级组织' : val.parentName
      }
    }
    @Watch('parentid')
    getParentId(val:string) {
      this.userData.parentId = val
    }
    @Watch('parentname')
    getParentName(val:string) {
      this.userData.parentName = val
    }
  created() {
  }
  // 功能函数
  // 添加用户
  private async addSave() {
    const { data } = await addUser(this.userData)
    if (data.isSuccess) {
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
      this.$store.commit('updatedOrgTreeId', data.data.id) // 当前菜单数据存储到数据池
      this.$emit('getOrgList')
      this.handleClose()
    }
  }
  // 编辑用户
  private async updateSave() {
    delete (this.userData as any).createdTime
    delete (this.userData as any).updatedTime
    const { data } = await edit(this.userData)
    if (data.isSuccess) {
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
      this.$store.commit('updatedOrgTreeId', data.data.id) // 当前菜单数据存储到数据池
      this.$emit('getOrgList')
      this.handleClose()
    }
  }

  // 表单提交
  private handleSubmit() {
    this.isDisable = true
    setTimeout(() => {
      this.isDisable = false // 点击一次时隔两秒后才能再次点击
    }, 2000)
    if (this.userData.parentId === '') {
      this.userData.parentId = 0
    }
    (this.$refs.ruleForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        if (this.dialog.type === 'add') {
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
  handleNodeClick(data:Object) {
  }
  // 获取组织树id
  getValue(value: string) {
    (this.userData as any).parentId = value
  }
  // 表单取消
  private handleClose() {
    (this.$refs.ruleForm as ElForm).resetFields()
    this.$emit('cleardata')
    this.$emit('close')
  }
  descInput() {
    let txtVal = (this.userData as any).describe.length
    this.texNum = 0 + txtVal
  }
}
</script>

<style lang="scss">
</style>

<template>
  <el-dialog
    v-if="dialog.isViewVisible"
    class="user-unfreeze-dialog userView"
    title="查看"
    :visible.sync="dialog.isViewVisible"
    :before-close="handleClose"
  >
    <div class="detailBox">
      <ul v-if="editData.account !== undefined" class="dialogTable">
        <li>
          <label>账号：</label>{{ editData.account }}
        </li>
        <li>
          <label>姓名：</label>{{ editData.name }}
        </li>
        <li>
          <label>部门：</label>{{ editData.orgName }}
        </li>
        <li>
          <label>岗位：</label>{{ editData.stationName }}
        </li>
        <li>
          <label>上级领导：</label>{{ superiorName }}
        </li>
        <li>
          <label>性别：</label>{{ editData.sex.desc }}
        </li>
        <li>
          <label>状态：</label><span v-if="editData.status === true">启用</span><span v-else>禁用</span>
        </li>
        <li>
          <label>创建时间：</label>{{ editData.updateTime }}
        </li>
        <li style="width: 100% !important;">
          <label>最后登录时间：</label>{{ editData.lastLoginTime }}
        </li>
        <li style="width: 100% !important;">
          <label>用户组：</label>{{ editData.userGroupsNames?String(editData.userGroupsNames):'' }}
        </li>
        <li style="width: 100% !important;border: 0 none !important;">
          <label>人员关系图：</label>
          <org-tree :data="hierachyData" />
        </li>
      </ul>

      <div class="right subBox">
        <el-button @click="handleClose"> 取 消 </el-button>
        <el-button type="primary" @click="handleClose"> 确 定 </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import {
  detailUser,
  userHierarchy
} from '@/pages/system/user/api'
import OrgTree from '@/components/OrgTree/index.vue'
@Component({
  name: 'UserDetailDialog',
  components: {
    OrgTree
  }
})
export default class extends Vue {
  @Prop() private dialog!: any
  @Prop() private editData!: {}
  /// // 功能函数 /////
  private superiorName = ''
  private hierachyData = {}
  /// // ui /////
  // 表单取消
  private handleClose() {
    this.dialog.isViewVisible = false
  }
  @Watch('editData')
  getSuperior(value: any) {
    if (value.superior && value.superior !== '-1') {
      this.getSuperiorName(value.superior)
    }
  }
  /// // 功能函数 /////
  // 获取详情
  private async getSuperiorName(id: string) {
    const { data } = await detailUser(id)
    if (data.isSuccess === true) {
      if (data.data) {
        this.superiorName = data.data.name
      }
    }
  }
  // 初始化
  private init() {
    this.getUserHierarchy()
  }
  // 加载关系图数据
  private async getUserHierarchy() {
    const { data } = await userHierarchy((this.editData as any).id)
    if (data.isSuccess === true) {
      this.hierachyData = data.data
    }
  }
}
</script>

<style lang="scss">
</style>

<template>
  <div ref="getHeight" class="app-container">
    <div class="main">
      <h2 class="crumbsTitle">用户组管理</h2>
      <div class="container tabCon">
        <!-- 搜索框 -->
        <div class="conSearch">
          <div class="serchForm">
            <el-form ref="ruleForm" :inline="true" :model="searchData">
              <el-row :gutter="18">
                <el-col :span="6">
                  <el-form-item label="名称：" prop="groupName">
                    <el-input v-model="searchData.groupName" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="角色：" prop="roleId">
                    <el-select v-model="searchData.roleId" placeholder="请选择">
                      <el-option
                        v-for="item in roleData"
                        :key="item.id"
                        :disabled="!item.status"
                        :label="item.roleName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" class="f-right" @click="handleSearch">
                    搜索
                  </el-button>
                  <el-button @click="resetSearch"> 重置</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="operationData">
          <el-button v-if="$hasPermission('userGroup:add')" type="primary" @click="handleAdd">用户组添加</el-button>
        </div>
        <module-tip :data-table="dataTable.list" :list-loading="listLoading" />
        <div>
          <el-table
            ref="table"
            :data="dataTable.list"
            border
            fit
            stripe
            highlight-current-row
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @filter-change="filterData"
          >
            <el-table-column width="80" align="center" type="index" label="">
              <template slot="header">
                <span> | 序号 </span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span> | 用户组名称 </span>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.groupName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span> | 角色 </span>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.roleName }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span> | 用户数量 </span>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.userCount }}</span>
              </template>
            </el-table-column>
            <el-table-column class-name="status-col">
              <template slot="header">
                <span> | 描述 </span>
              </template>
              <template slot-scope="{ row }">
                <el-tooltip :content="row.describe" placement="top">
                  <span>{{ ellipsis(row.describe, 10) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              align="center"
              :filter-multiple="false"
              :filters="[
                { text: '启用', value: true },
                { text: '禁用', value: false }
              ]"
              column-key="status"
              :filter-method="filterHandler"
            >
              <template slot="header">
                <span>
                  | 状态
                  <i class="iconfont">&#xe62b;</i>
                </span>
              </template>
              <template slot-scope="{ row,$index }">
                <el-switch v-model="row.status" :disabled="!$hasPermission('userGroup:disable')"
                           @change="handleState(row,$index)"
                />
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span> | 操作 </span>
              </template>
              <template slot-scope="{ row }">
                <div class="operation">
                  <el-button v-if="$hasPermission('userGroup:get')" class="inputText" :disabled="!row.status"
                             @click="handleView(row.id)"
                  >
                    查看
                  </el-button>
                  <el-dropdown v-if="$hasPermission('userGroup:update') || $hasPermission('userGroup:delete') || $hasPermission('userGroup:reset')">
                    <span class="el-dropdown-link" style="color:#009EFF; font-size:12px">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$hasPermission('userGroup:update')" class="inputText" :disabled="!row.status"
                                        icon="el-icon-edit" style="color: #009EFF;" @click.native="handleEdit(row.id)"
                      >
                        修改
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$hasPermission('userGroup:delete')" class="inputText" :disabled="!row.status"
                                        icon="el-icon-delete" style="color: #E05635;" @click.native="handleDelete(row)"
                      >
                        删除
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$hasPermission('userGroup:update')" class="inputText" :disabled="!row.status"
                                        icon="el-icon-user" style="color: #009EFF;" @click.native="handleUser(row.id)"
                      >
                        分配用户
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="searchData.current"
            :limit.sync="searchData.size"
            @pagination="getList"
          />
          <!-- end -->
        </div>
      </div>
    </div>
    <!-- 用户组添加、编辑对话框 -->
    <user-add-dialog
      ref="userDialog"
      :dialog="dialog"
      :role-data="roleData"
      :user-data="editData"
      @close="handleClose"
      @getList="getList"
    />
    <!-- end -->
    <!-- 用户查看对话框 -->
    <user-detail-dialog
      ref="viewDialog"
      :edit-data="ivewData"
      :dialog="dialog"
    />
    <!-- end -->
    <!-- 用户删除警告框 -->
    <delete
      ref="fileDialog"
      :dialog="dialog"
      :dele-data="deleData"
      @delete="deleteButton"
    />
    <!-- end -->
    <!-- 启用禁用 -->
    <base-dialog
      ref="status"
      :dialog="dialog"
      @handle-close="handleCloseStatus"
      @state-submit="handleStateSubmit"
    />
    <!-- 分配用户 -->
    <group-user-dialog
      ref="groupUser"
      :group-data="groupId"
      :dialog-visible="groupUserDialog.isVisible"
      @close="handleGroupUserClose"
      @success="handleGroupUserSuccess"
    />
    <!-- end -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { ellipsis, restData } from '@/utils'
// 组件
// 分页
import Pagination from '@/components/Pagination/index.vue'
// 启用禁用
import BaseDialog from '@/components/BaseStatus/index.vue'
// 删除
import Delete from './components/delete.vue'
// 添加
import UserAddDialog from './components/add.vue'
// 添加
import GroupUserDialog from './components/user.vue'
// 详情
import UserDetailDialog from './components/detail.vue'
import ModuleTip from '@/components/ModuleTip/index.vue'
// interface接口
import {
  ICommonSelectOptions
} from '@/utils/common-interface'
import { IManageUserPageListEntity, IUserFreezeRequest } from '@/pages/system/user-group/interface/types'
// api接口
import {
  getUserGroupList,
  delUserGroup,
  detailUserGroup,
  disableUserGroup
} from '@/pages/system/user-group/api'
import { getRepelRole } from '@/api/api'
@Component({
  name: 'userGroupList',
  components: {
    Pagination,
    Delete,
    UserAddDialog,
    UserDetailDialog,
    GroupUserDialog,
    BaseDialog,
    ModuleTip
  }
})
export default class extends Vue {
  private dataTable: IManageUserPageListEntity = {
    list: []
  } as any
  private listLoading = true
  private delectData = []
  private total = 0
  private roleData: ICommonSelectOptions[] = []
  private deleData = {}
  private searchData = {
    id: '',
    groupName: '',
    roleId: '',
    size: 10,
    current: 1
  } as any
  private dialog = {
    id: '',
    msg: '',
    isVisible: false,
    isViewVisible: false,
    isDeleVisible: false,
    isStatusVisible: false,
    type: 'add',
    status: false,
    title: ''
  }
  private newIndex = 0
  private newData = {} as any

  private editData: IUserFreezeRequest = {
    groupName: '', // 用户组名称
    userIds: [], // 成员
    roleId: '', // 角色
    describe: '', // 描述
    status: true
  } as any
  private ivewData: IUserFreezeRequest = {}

  private groupId = ''
  private groupUserDialog = {
    isVisible: false
  }
  /// 生命周期
  created() {
    this.getList()
    this.getRole()
  }

  /// // 功能函数 /////

  // 获取数据
  private async getList() {
    this.listLoading = true
    const { data } = await getUserGroupList({ ...this.searchData })
    if (data.isSuccess === true) {
      this.dataTable = data.data
      this.total = Number(data.data.total)
    }
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.1)
  }

  // 获取角色列表
  private async getRole() {
    const params = {
      status: true
    }
    // const { data } = await getRole(params)
    const { data } = await getRepelRole({ status: '' })
    if (data.isSuccess === true) {
      this.roleData = data.data.list
    }
  }

  // 启用、禁用确认
  private async handleStateSubmit() {
    const { data } = await disableUserGroup(this.dialog.id)
    if (data.isSuccess) {
      this.dialog.isStatusVisible = false
      this.$message.success('操作成功')
      this.getList()
    } else {
      // this.$message.error(data.msg)
    }
  }

  // 删除
  private async deleteButton() {
    const ids: any[] = []
    this.delectData.forEach((value: any) => {
      ids.push(value.id)
    })
    const { data } = await delUserGroup({ ids: ids })
    if (data.isSuccess === true) {
      this.$message.success('操作成功')
      this.getList()
    } else {
      // this.$message.error(data.msg)
    }
  }

  // 单个删除
  private handleDelete(row: any) {
    let table: any = this.$refs.table
    table.toggleRowSelection(row, true)
    this.deleData = row
    this.dialog.isDeleVisible = true
  }

  // 分配用户
  private handleUser(id: string) {
    this.groupUserDialog.isVisible = true
    this.groupId = id
  }

  // 获取详情
  private async getEdit(id: string) {
    const { data } = await detailUserGroup(id)
    this.editData = data.data
  }

  // 查看
  private async handleView(id: string) {
    this.dialog.isViewVisible = true
    // this.getEdit(id)
    const { data } = await detailUserGroup(id)
    this.ivewData = data.data
  }

  /// // ui /////
  // 修改
  private handleEdit(id: string) {
    this.dialog.type = 'edit'
    this.dialog.title = '修改'
    this.dialog.isVisible = true
    this.getEdit(id)
  }

  // 搜索
  private async handleSearch() {
    this.searchData.current = 1
    this.getList()
  }

  // 启用，禁用
  private async handleState(value: any, index: any) {
    this.newData = value
    this.newIndex = index
    this.dialog.isStatusVisible = true
    this.dialog.id = value.id
    this.dialog.status = value.status
    if (!value.status) {
      this.dialog.msg = `用户"${value.groupName}" 将被禁止登录！`
      this.dialog.title = '确认禁用'
    } else {
      this.dialog.msg = `用户"${value.groupName}" 启用！`
      this.dialog.title = '确认启用'
    }
  }

  // 获取删除的数据
  handleSelectionChange(value: any) {
    this.delectData = value
  }

  // 重置
  resetSearch() {
    (this.$refs.ruleForm as ElForm).resetFields()
    this.getList()
  }

  // 启用，禁用筛选
  filterHandler(value: boolean, row: any) {
    return row.status === value
  }

  // 筛选数据状态
  filterData(filter: any) {
    const status = filter['status']
    if (status.length > 0) {
      this.searchData.status = status.toString()
    } else {
      this.searchData.status = null
    }
    this.getList()
  }

  // 关闭用户添加、编辑弹层
  handleClose() {
    this.dialog.isVisible = false
  }

  // 启用禁用弹层关闭
  handleCloseStatus() {
    this.dialog.isStatusVisible = false
    restData(this.dataTable, this.newData, this.newIndex)
  }

  // 用户添加
  handleAdd() {
    this.dialog.isVisible = true
    this.dialog.type = 'add'
    this.dialog.title = '添加'
  }

  // 内容控制字数，多出的用省略号
  ellipsis(value: any, num: any) {
    return ellipsis(value, num)
  }

  // 关闭用户添加、编辑弹层
  handleGroupUserClose() {
    this.groupUserDialog.isVisible = false
  }

  handleGroupUserSuccess() {

  }
}
</script>

<style lang="scss" scoped>
</style>

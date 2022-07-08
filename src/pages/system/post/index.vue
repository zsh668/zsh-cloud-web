<template>
  <div ref="getHeight" class="app-container">
    <div class="main">
      <h2 class="crumbsTitle">岗位管理</h2>
      <div class="container tabCon">
        <div class="conSearch">
          <div class="serchForm searchMain">
            <el-form ref="ruleForm" :inline="true" :model="searchData">
              <el-row :gutter="18">
                <el-col :span="6">
                  <el-form-item label="岗位名称：">
                    <el-input
                      v-model="searchData.stationName"
                      placeholder="请输入"
                      clearable
                      @clear="resetSearch"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" class="marLeft" @click="handleSearch">搜索</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div class="operationData">
          <el-button v-if="$hasPermission('station:add')" type="primary" @click="handleAdd">添加岗位</el-button>
        </div>
        <module-tip :data-table="dataTable" :list-loading="listLoading" />
        <div>
          <el-table
            ref="table"
            :data="dataTable"
            border
            fit
            stripe
            highlight-current-row
            style="width: 100%"
            @filter-change="filterData"
          >
            <el-table-column align="center" width="80" type="index" label="">
              <template slot="header">
                <span> | 序号 </span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span> | 岗位名称 </span>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.stationName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span> | 组织 </span>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.orgName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span> | 描述 </span>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.describe }}</span>
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
                <el-switch v-model="row.status" :disabled="!$hasPermission('station:disable')" @change="handleState(row,$index)" />
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span> | 操作 </span>
              </template>
              <template slot-scope="{ row }">
                <div class="operation">
                  <el-button v-if="$hasPermission('station:update')" class="inputText" :disabled="!row.status" @click="handleEdit(row.id)">修改</el-button>
                  <el-button v-if="$hasPermission('station:delete')" class="inputText delect" :disabled="!row.status" @click="handleDelete(row)">删除</el-button>
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
        <!-- 用户添加、编辑对话框 -->
        <add-dialog
          v-if="dialog.isVisible"
          ref="userDialog"
          :dialog="dialog"
          :org-data="optionData"
          :tree-data="treeData"
          :get-value="getValue"
          :edit-data="baseData"
          @close="handleClose"
          @cleardata="clearData"
          @getList="getList"
        />
        <!-- end -->
        <!-- 用户删除警告框 -->
        <delete
          ref="fileDialog"
          :dialog="dialog"
          @handleClose="handleCloseDelete"
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
        <!-- end -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IPostTableData } from '@/pages/system/post/interface/types'
import { ElForm } from 'element-ui/types/form'
import { ellipsis, restData } from '@/utils'
// 组件
import Pagination from '@/components/Pagination/index.vue'
import Delete from './components/delete.vue'
import ModuleTip from '@/components/ModuleTip/index.vue'
// 启用禁用
import BaseDialog from '@/components/BaseStatus/index.vue'
// 添加
import AddDialog from './components/add.vue'
// api
import { getPostList, deletePost, disablePost, detailPost } from '@/pages/system/post/api'
import { getAllTree } from '@/api/api'
@Component({
  name: 'PostList',
  components: {
    Pagination,
    Delete,
    AddDialog,
    BaseDialog,
    ModuleTip
  }
})
export default class extends Vue {
  private dataTable:IPostTableData[]= []
  private orgData = []
  private total=0
  private listLoading = true
  private deleteId = ''
  private ref: any = this.$refs
  private treeData = {
    treeShow: false,
    valueId: '' // 初始ID（可选）
  }
  private searchData = {
    stationName: '',
    size: 10,
    current: 1
  } as any
  private dialog = {
    id: '',
    stationName: '',
    title: '',
    msg: '',
    isVisible: false,
    isDeleVisible: false,
    isStatusVisible: false,
    status: false
  } as any
  private baseData= {
    stationName: '',
    orgId: '',
    orderNum: '',
    describe: ''
  } as any
  private newIndex=0
  private newData ={} as any
  /// 生命周期
  created() {
    this.getList()
    this.getOrg()
  }
  /// // 功能函数 /////
  get optionData() {
    let cloneData = JSON.parse(JSON.stringify(this.orgData)) // 对源数据深度克隆
    return cloneData.filter((father: any) => {
      // 循环所有项，并添加children属性
      let branchArr = cloneData.filter(
        (child: any) => father.id === child.parentId
      ) // 返回每一项的子级数组
      // eslint-disable-next-line no-unused-expressions
      branchArr.length > 0 ? (father.children = branchArr) : '' // 给父级添加一个children属性，并赋值
      return father.parentId === '0' // 返回第一层
    })
  }
  // 获取数据
  private async getList() {
    this.listLoading = true
    const { data } = await getPostList({ ...this.searchData })
    if (data.isSuccess === true) {
      this.dataTable = data.data.list
      this.total = Number(data.data.total)
    }
    setTimeout(() => {
      this.listLoading = false
    }, 0.1)
  }
  // 获取组织列表
  private async getOrg() {
    const { data } = await getAllTree({ status: true })
    if (data.isSuccess === true) {
      this.orgData = await this.filterMenuData(data.data)
      if (data.data.length > 0) {
        this.treeData.valueId = data.data[0].id
      }

      this.treeData.treeShow = true // 解决异步数据子组件获取不到值的问题
    }
  }
  // 递归 设置禁用的组织
  async filterMenuData(data:any) {
    let result = [] as any
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      item.disabled = !item.status
      if (!item.status && item.children === null) {
        item.disabled = true
      }

      result.push(item)
      if (item.children && item.children.length > 0) {
        this.filterMenuData(item.children)
      }
    }
    return result
  }
  // 获取组织树id
  getValue(value: any) {
    this.treeData.valueId = value
  }
  // 启用、禁用确认
  private async handleStateSubmit() {
    const { data } = await disablePost(this.dialog.id)
    if (data.isSuccess) {
      this.dialog.isStatusVisible = false
      this.$message.success('操作成功')
      this.getList()
    } else {
      // this.$message.error(data.msg)
    }
  }
  // 搜索
  private handleSearch() {
    this.searchData.current = 1
    this.getList()
  }
  // 启用，禁用
  private async handleState(value: any, index:any) {
    this.newData = value
    this.newIndex = index
    this.dialog.isStatusVisible = true
    this.dialog.id = value.id
    this.dialog.status = value.status
    if (!value.status) {
      this.dialog.msg = `"${value.stationName}" 岗位禁用后不可使用！`
      this.dialog.title = '确认禁用'
    } else {
      this.dialog.msg = `"${value.stationName}" 岗位启用！`
      this.dialog.title = '确认启用'
    }
  }
  // 删除
  private async deleteButton() {
    const ids: any[] = [this.dialog.id]
    const { data } = await deletePost({ ids: ids })
    if (data.isSuccess === true) {
      if (data.data.length > 0) {
        this.$message.error(`"${this.dialog.stationName}"` + '岗位正在被使用，不可删除！')
      } else {
        this.$message.success('操作成功')
      }
    } else {
      // this.$message.error(data.msg)
    }
    this.getList()
    this.dialog.isDeleVisible = false
  }
  // 删除
  private handleDelete(row: any) {
    this.dialog.id = row.id
    this.dialog.stationName = row.stationName
    this.dialog.isDeleVisible = true
  }
  // // 获取详情
  private async getEdit(id: string) {
    const { data } = await detailPost(id)
    this.baseData = { ...data.data }
  }
  // 修改
  private handleEdit(id: string) {
    this.dialog.title = '修改'
    this.dialog.isVisible = true
    this.getEdit(id)
  }
  /// // ui /////
  // 重置
  resetSearch() {
    (this.$refs.ruleForm as ElForm).resetFields()
    this.getList()
  }
  // 启用，禁用筛选
  filterHandler(value: boolean, row: any, column: any) {
    return row.status === value
  }
  // 筛选数据状态
  filterData(filter:any) {
    const status = filter['status']
    if (status.length > 0) {
      this.searchData.status = status.toString()
    } else {
      this.searchData.status = null
    }
    this.getList()
  }
   // 启用禁用弹层关闭
  handleCloseStatus() {
    this.dialog.isStatusVisible = false
    restData(this.dataTable, this.newData, this.newIndex)
  }
  handleClose() {
    this.dialog.isVisible = false
  }
  clearData() {
    this.baseData = {}
  }
  handleCloseDelete() {
    this.dialog.isDeleVisible = false
  }
  // 当前页
  private handleCurrentChange(page: number) {
    this.searchData.current = page
    this.getList()
  }

  // 每页条数
  private handleSizeChange(page: number) {
    this.searchData.size = page
    this.searchData.current = 1
    this.getList()
  }
  // 用户添加
  handleAdd() {
    this.dialog.isVisible = true
    this.dialog.title = '添加'
    this.baseData = {}
  }
  // 内容控制字数，多出的用省略号
  ellipsis(value: any, num: any) {
    return ellipsis(value, num)
  }
}
</script>

<style lang="scss" scoped>
</style>

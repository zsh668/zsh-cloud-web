<template>
  <el-dialog
    v-if="dialog.isViewVisible"
    class="user-unfreeze-dialog userView"
    title="查看"
    :visible.sync="dialog.isViewVisible"
    :before-close="handleClose"
  >
    <div class="detailBox">
      <ul class="dialogTable">
        <li>
          <label>姓名：</label>{{ editData.userName }}
        </li>
        <li>
          <label>请求地址：</label>{{ editData.requestUri }}
        </li>
        <li>
          <label>请求类型：</label>{{ editData.httpMethod }}
        </li>
        <li>
          <label>IP：</label>{{ editData.requestIp }}
        </li>
        <li>
          <label>操作描述：</label>{{ editData.description }}
        </li>
        <li>
          <label>类型：</label><span v-if="editData.type === 'OPT'">正常</span><span v-else>异常</span>
        </li>
        <li>
          <label>类路径：</label>{{ editData.classPath }}
        </li>
        <li>
          <label>请求方法：</label>{{ editData.actionMethod }}
        </li>
        <li>
          <label>请求参数：</label>{{ editData.params }}
        </li>
        <li>
          <label>开始时间：</label>{{ editData.startTime }}
        </li>
        <li>
          <label>完成时间：</label>{{ editData.finishTime }}
        </li>
        <li>
          <label>消耗时间（ms）：</label>{{ editData.consumingTime }}
        </li>
        <li>
          <label>终端|浏览器：</label>{{ editData.ua }}
        </li>
        <li style="width: 100% !important;">
          <label>返回值：</label>{{ editData.result }}
        </li>
        <li style="width: 100% !important;">
          <label>异常详情信息：</label>{{ editData.exDesc }}
        </li>
        <li style="width: 100% !important;">
          <label>异常描述：</label>{{ editData.exDetail }}
        </li>
      </ul>
      <div class="right subBox">
        <el-button @click="handleClose"> 取 消</el-button>
        <el-button type="primary" @click="handleClose"> 确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'DetailDialog',
  components: {}
})
export default class extends Vue {
  @Prop() private dialog!: any
  @Prop() private editData!: {}
  /// // 功能函数 /////
  /// // ui /////
  // 表单取消
  private handleClose() {
    this.dialog.isViewVisible = false
  }
}
</script>

<style lang="scss">
</style>

<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of timeline"
        :key="index"
        :timestamp="item.loginTime"
        placement="top"
      >
        <el-card>
          <p>
            <el-icon class="el-icon-link" />
            IP：{{ item.requestIp }}
          </p>
          <p>
            <el-icon class="el-icon-location-outline" />
            地区：{{ item.location }}
          </p>
          <p>
            <el-icon class="el-icon-bangzhu" />
            浏览器：{{ item.browser }}
          </p>
          <p>
            <el-icon class="el-icon-monitor" />
            操作系统：{{ item.operatingSystem }}
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getList } from '@/pages/monitoring/api'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      timeline: []
    }
  },
  mounted() {
    this.getTimeLine()
  },
  methods: {
    getTimeLine() {
      getList({ current: 1, size: 10, userId: this.user.id })
        .then(response => {
          const res = response.data
          this.timeline = res.data.list
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-card.is-always-shadow {
  box-shadow: none;
}
.el-card {
  border: 1px solid #f1f1f1;
  border-radius: 2px;
}
.p {
  margin-top: 0px;
  padding-top: 10px;
}
</style>

<template>
  <div class="app-container">
    <div v-if="userInfo">
      <el-row :gutter="20">
        <el-col :span="16" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="登录时间" name="timeline">
                <Timeline :user="userInfo" />
              </el-tab-pane>
              <el-tab-pane label="账号信息" name="account">
                <Account :user="userInfo" />
              </el-tab-pane>
              <el-tab-pane label="个人密码" name="password">
                <Password :user="userInfo" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/utils/cookies'
import Password from './components/password'
import Timeline from './components/timeline'
import Account from './components/account'

export default {
  name: 'Profile',
  components: { Password, Timeline, Account },
  data() {
    return {
      activeTab: ''
    }
  },
  computed: {
    userInfo() {
      return getUser() ? JSON.parse(getUser()) : null
    }
  },
  created() {
    this.activeTab = 'timeline'
  }
}
</script>
<style lang="scss" scoped>
.el-card.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-card {
  border: none;
  border-radius: 0;
}
</style>

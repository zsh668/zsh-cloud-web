<template>
  <div class="customer-node" :style="{width: data.width||width||'auto'}">
    <div class="root-node" @click.stop.prevent="toggleInfo">
      <span class="icon-bg" :class="{'man': data.sex && data.sex.desc==='男'}">
        <i class="el-icon-user-solid"></i>
      </span>
      <span class="title">{{ data.name }}</span>
      <!-- <span class="sex">{{ data.sex.desc || '未知' }}</span> -->
    </div>
    <transition name="fade-in">
      <div class="info-list-wrap">
        <div class="info-item">
          <span class="name">职位名称：</span>
          <span class="label">{{ data.stationName || '未知' }}</span>
        </div>
        <div class="info-item">
          <span class="name">手机号：</span>
          <span class="label">{{ data.mobile || '未知' }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CustomerNode',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    width: {
      type: String,
      default: '180px'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isRoot() {
      return !!this.data.root
    }
  },
  methods: {
    toggleInfo() {
      if (typeof this.data['infoShow'] !== 'undefined') {
        this.data['infoShow'] = !this.data['infoShow']
      }
    },
    handleCommand(action, node) {
      this.$emit('command', action, node, this.data)
    }
  }
}
</script>

<style scoped lang="scss">
.customer-node {
  position: relative;
  display: inline-block;
  padding: 5px 10px;
  .root-node {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .icon-bg {
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      text-align: center;
      font-size: 28px;
      background: #f97a81;
      color: #fff;
      margin-right: 8px;
      &.man {
        background: rgba(89, 126, 247, 1);
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: 1;
      text-align: left
    }
    .sex {
      font-size: 18px;
      margin-left: 24px;
    }
  }
  .normal-node {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    transition: .3s;
    .title {
      font-size: 18px;
    }
    &:hover {
      background: rgba(67, 207, 124, 0.05);
    }
  }
  .info-list-wrap {
    width: 100%;
    background: #fff;
    padding-top: 8px;
    .info-item {
      position: relative;
      margin: 0;
      line-height: 26px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.has-btn {
        padding-right: 40px;
      }
      .detail {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        &:hover {
          color: #1089ff;
        }
      }
    }
  }
}
</style>

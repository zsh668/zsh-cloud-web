<template>
  <div class="custom-tree">
    <TreeOrg
      ref="treeOrg"
      :data="data"
      :horizonta="horizonta"
      :render="renderContent"
      :label-style="style"
    />
  </div>
</template>

<script>
import TreeOrg from './tree.vue'
export default {
  components: {
    TreeOrg
  },
  filters: {},
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      horizonta: false,
      style: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'default',
        padding: 0,
        minHeight: '44px'
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    renderContent(h, { root, node, data }) {
      return h('customer-node', {
        props: {
          data,
          width: '180px'
        },
        on: {
          command: this.handleCommand
        }
      })
    },
    handleCommand(action, node, data) {
      console.log(node, action, data)
      // this.detail = { action, ...node }
      // this.modal = true
    },
    customClick(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-tree{
  width: 100%;
  min-height: 200px;
  overflow: auto;
  text-align: center;
}

</style>

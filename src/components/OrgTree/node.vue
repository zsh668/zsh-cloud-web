<template>
  <div :class="classes">
    <!--label-->
    <div class="bin-tree-org-node-label">
      <div v-if="data.render" :class="labelClasses" :style="labelStyles" @click="handleClick">
        <Render :render="data.render" :data="data" :node="node" />
      </div>
      <div v-else-if="isParentRender" :class="labelClasses" :style="labelStyles" @click="handleClick">
        <Render :render="parentRender" :data="data" :node="node" />
      </div>
      <div v-else :class="labelClasses" :style="labelStyles" @click="handleClick">{{ data.label }}</div>
      <!--expand-->
      <span v-if="collapsable && !isLeaf"
            class="bin-tree-org-node-btn"
            :class="{expand: data.expand}"
            @click.stop.prevent="handleExpand"
      ></span>
    </div>
    <!--children-->
    <template v-if="data[childrenKey] && data[childrenKey].length">
      <div v-if="!collapsable || data.expand" class="bin-tree-org-node-children">
        <tree-node
          v-for="(item, i) in data[childrenKey]"
          :key="i"
          :data="item"
          :children-key="childrenKey"
          :horizontal="horizontal"
          :label-style="labelStyle"
          :collapsable="collapsable"
          :label-class-name="labelClassName"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Render from './render'

const prefixCls = 'bin-tree-org'
export default {
  name: 'TreeNode',
  components: { Render },
  inject: ['TreeInstance'],
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    horizontal: Boolean,
    collapsable: Boolean,
    labelStyle: Object,
    labelClassName: String
  },
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    isLeaf() {
      return !(Array.isArray(this.data[this.childrenKey]) && this.data[this.childrenKey].length > 0)
    },
    classes() {
      return [
        `${prefixCls}-node`,
        { 'is-leaf': this.isLeaf },
        { 'collapsed': !this.isLeaf && this.collapsable && (!this.data['expand']) }
      ]
    },
    labelClasses() {
      return [`${prefixCls}-node-label-inner`, this.labelClassName]
    },
    labelStyles() {
      return this.data['style'] ? this.data['style'] : this.labelStyle
    },
    isParentRender() {
      const Tree = this.TreeInstance
      return Tree && Tree.render
    },
    parentRender() {
      const Tree = this.TreeInstance
      if (Tree && Tree.render) {
        return Tree.render
      } else {
        return null
      }
    },
    node() {
      const Tree = this.TreeInstance
      if (Tree) {
        // 将所有的 node（即flatState）和当前 node 都传递
        return [Tree.flatState, Tree.flatState.find(item => item.nodeKey === this.data.nodeKey)]
      } else {
        return []
      }
    }
  },
  methods: {
    handleClick() {
      this.TreeInstance.handleClick(this.data.nodeKey)
    },
    handleExpand() {
      const item = this.data
      if (item.disabled) return
      if (item.isLeaf) return
      if (item[this.childrenKey] && item[this.childrenKey].length) {
        this.$set(this.data, 'expand', !this.data.expand)
        this.TreeInstance.toggleExpand(this.data, this.data.expand)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bin-tree-org-node {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-top: 20px;
  display: table-cell;
  vertical-align: top;
  &:before {
    transition: all 0.3s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
  }
  &:after {
    transition: all 0.3s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
    left: 50%;
    border-left: 1px solid #ddd;
  }
  &:not(:first-child) {
    &:before {
      border-top: 1px solid #ddd;
    }
  }
  &:not(:last-child) {
    &:after {
      border-top: 1px solid #ddd;
    }
  }
}
.bin-tree-org-node-children {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: table;
  padding-top: 20px;
  &:before {
    transition: all 0.3s;
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 20px;
    border-left: 1px solid #ddd;
  }
  &:after {
    transition: all 0.3s;
    content: '';
    display: table;
    clear: both;
  }
}
.bin-tree-org-node.is-leaf {
  padding-left: 10px;
  padding-right: 10px;
}
.bin-tree-org-node.collapsed {
  padding-left: 10px;
  padding-right: 10px;
}
.bin-tree-org-node-label {
  position: relative;
  display: inline-block;
  .bin-tree-org-node-label-inner {
    cursor: pointer;
    padding: 10px 15px;
    text-align: center;
    border-radius: 2px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.15);
  }
}
.bin-tree-org-node-btn {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translate(-50%, 50%);
  &:hover {
    background-color: #efefef;
  }
  &:before {
    content: '';
    position: absolute;
    background: #ccc;
    top: 50%;
    left: 4px;
    right: 4px;
    height: 1px;
  }
  &:after {
    content: '';
    position: absolute;
    background: #ccc;
    top: 4px;
    left: 50%;
    bottom: 4px;
    width: 1px;
  }
}
.bin-tree-org-node-btn.expand {
  &:after {
    display: none;
  }
}
.collapsable {
  .bin-tree-org-node.collapsed {
    padding-bottom: 30px;
    .bin-tree-org-node-label {
      &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        width: 50%;
        height: 20px;
        border-right: 1px solid #ddd;
      }
    }
  }
}
.horizontal {
  .bin-tree-org-node {
    display: table;
    padding-top: 0;
    padding-left: 20px;
    &:before {
      width: 19px;
      height: 50%;
    }
    &:after {
      width: 19px;
      height: 50%;
      top: 50%;
      left: 0;
      border-left: 0;
    }
    &:only-child {
      &:before {
        top: 0;
        border-bottom: 1px solid #ddd;
      }
    }
    &:not(:first-child) {
      &:before {
        border-top: 0;
        border-left: 1px solid #ddd;
      }
    }
    &:not(:last-child) {
      &:after {
        border-top: 0;
        border-left: 1px solid #ddd;
      }
    }
    &:not(:only-child) {
      &:after {
        border-top: 1px solid #ddd;
      }
    }
  }
  .bin-tree-org-node.is-leaf {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .bin-tree-org-node.collapsed {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .bin-tree-org-node-label {
    display: table-cell;
    vertical-align: middle;
  }
  .bin-tree-org-node-btn {
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
    margin-left: 20px;
  }
  >.bin-tree-org-node {
    &:only-child {
      &:before {
        border-bottom: 0;
      }
    }
  }
  .bin-tree-org-node-children {
    display: table-cell;
    padding-top: 0;
    padding-left: 20px;
    &:before {
      top: 50%;
      left: 0;
      width: 20px;
      height: 0;
      border-left: 0;
      border-top: 1px solid #ddd;
    }
    &:after {
      display: none;
    }
    >.bin-tree-org-node {
      display: block;
    }
  }
}
.horizontal.collapsable {
  .bin-tree-org-node.collapsed {
    padding-right: 30px;
    .bin-tree-org-node-label {
      &:after {
        top: 1px;
        left: 100%;
        width: 20px;
        height: 50%;
        border-right: 0;
        border-bottom: 1px solid #ddd;
      }
    }
  }
}

.bin-tree-org-node-btn {
    background: rgba(67, 207, 124, 1);
    border: none;
    border-radius: 2px;
    width: 18px;
    height: 18px;
    // margin-left: 40px;

    &:before, &:after {
      content: '';
      position: absolute;
      background: #fff;
    }
    &:before {
      top: 8px;
    }

    &:after {
      left: 8.5px;
    }
  }
  .horizontal .bin-tree-org-node-children {
    padding-left: 40px;
    &:before {
      width: 40px;
    }
  }
  .horizontal.collapsable .bin-tree-org-node.collapsed .bin-tree-org-node-label:after {
    width: 40px;
  }
  .horizontal .bin-tree-org-node {
    padding-left: 40px;
  }
  .horizontal .bin-tree-org-node:before, .horizontal .bin-tree-org-node:after {
    width: 40px;
    height: 50%;
  }
</style>

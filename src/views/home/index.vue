<template>
  <el-container>
    <!-- 侧边容器 -->
    <el-aside     :style="{width:collapse ? '61px' :'201px'}"               style="background:#323745;overflow: hidden;">
      <!-- 组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右边容器 -->
    <el-container>
      <!-- 头部组件 -->
      <el-header>
        <!-- 引入组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 主体区域 -->
      <el-main style="margin:0;padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('openOrclose', (status) => {
      this.collapse = status
    })
  }
}
</script>

<style lang='less' scoped>
</style>

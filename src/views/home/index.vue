<template>
  <el-container>
    <!-- 侧边容器 -->
    <el-aside style="width:200px;background:#323745;">
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
export default {}
</script>

<style lang='less' scoped>
</style>

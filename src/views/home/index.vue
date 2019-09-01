<template>
  <el-container>
    <!-- 侧边容器 -->
    <el-aside style="width:200px">
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
      <el-main>主体</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
</style>

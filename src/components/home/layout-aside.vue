<template>
  <div class="aside">
    <div class="asideimg">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="2">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item>发表文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
      </el-submenu>
      <el-submenu index="fansdata">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item>
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped >
.aside {
  width: 200px;
  height: 100vh;
  background-color: #323745;
  .asideimg {
    background-color: #2e2f32;
    text-align: center;
    padding: 10px 0;
    img {
      height: 30px;
    }
  }
}
</style>

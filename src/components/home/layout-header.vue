<template>
  <el-row class="layout-header" type="flex" justify="space-between">
    <!-- span是给col的宽度  elementUI将页面分为24分 -->
    <el-col class="left" :span="6">
      <i class="el-icon-s-unfold icon"></i>
      <span>江苏传智播客教育股份科技有限公司</span>
    </el-col>
    <el-col class="right" :span="3">
      <!-- 如果属性不给:就相当于 -->
      <img class="head-img" :src="userInfo.photo ? userInfo.photo :dafaultImg" alt />
      <!-- 下拉菜单 -->
      <el-dropdown @command=" handleMenuItem">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgot">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      dafaultImg: require('../../assets/img/avatar.jpg') // 转成base64字符串
    }
  },
  methods: {
    //  获取用户数据
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer ${token}` }
      }).then(result => {
        console.log(result)
        this.userInfo = result.data.data
      })
    },
    handleMenuItem (command) {
      if (command === 'account') {
        //   账户信息
        console.log('账户信息')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/82heimatoutiao' //    跳转至git地址
      } else {
        window.localStorage.clear() //  清除所有缓存
        this.$router.push('./login') //   跳转登录页面
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  padding: 8px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 3px;
    }
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .head-img {
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>

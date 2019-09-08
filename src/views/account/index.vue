<template>
  <!---loading是进度条插件--->
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-upload :show-file-list="false" action :http-request="uploadImg">
      <img class="header-img" :src=" userInfo.photo || defaultImg " alt />
    </el-upload>
    <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userInfo.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="userInfo.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userInfo.mobile" style="width:300px" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo" plain>保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/events' // 引入eventbus
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/img/P_017.jpg'),
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: ' ',
        mobile: ''
      },
      userRules: {
        name: [
          {
            required: true,
            message: '用户名不能为空'
          },
          {
            min: 2,
            max: 8,
            message: '用户名长度必须为2-8位'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空'
          },
          {
            pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    // 上传用户头像
    uploadImg (params) {
      this.loading = true // 显示进度条
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(() => {
        this.loading = false
        this.getuserInfo()
      })
    },
    // 获取基本信息并赋值
    getuserInfo () {
      this.$axios({
        url: 'user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    // 修改用户信息
    saveUserInfo () {
      this.$refs.userForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({
              type: 'success',
              message: '恭喜您修改用户信息成功'
            })
            // 成功之后 要通知 头部去更新数据
            eventBus.$emit('updateUserInfo') // 相当打出去一条电话
          })
        }
      })
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style lang='less' scoped>
.header-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  right: 450px;
}
</style>

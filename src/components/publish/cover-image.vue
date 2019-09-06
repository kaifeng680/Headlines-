<template>
  <div class="cover-image">
    <!-- 注册图片点击事件 -->
    <div @click="showDialog" class="image-item" v-for="(item,index) in images" :key="index">
      <img :src="item ? item :dafaultImg" alt />
    </div>
    <el-dialog @close="handleClose" :visible="dialogVisbile">
      <!-- 素材选择 /上传图片 -->
      <select-image></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 根据images 来渲染页面
  // images ['']
  // images ['','','']
  // images []
  props: ['images'],
  data () {
    return {
      dafaultImg: require('../../assets/img/pic_bg.png'), // 定义一个变量转成64图片字符串
      dialogVisbile: false
    }
  },
  methods: {
    // 显示弹层
    showDialog () {
      this.dialogVisbile = true // 显示
    },
    handleClose () {
      this.dialogVisbile = false // 关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .image-item {
    padding: 10px;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

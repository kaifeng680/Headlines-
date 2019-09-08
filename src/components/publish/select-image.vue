<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部素材" name="all">
      <div class="img-list">
        <el-card class="img-item" v-for="item in list" :key="item.id">
          <img @click="selectImg(item)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          @current-change=" changePage"
          :page-size="page.pageSize"
          :current-page="page.page"
          background
          layout="prev,pager,next"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload :http-request="uploadImg" action :show-file-list="false">
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 全部素材的数组
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      },
      elImg: null
    }
  },
  methods: {
    // 图片上传
    uploadImg (params) {
      // formdata类型
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: formData
      }).then(result => {
        // 获取上传成功之后的地址
        this.$emit('onSelectImg', result.data.url)
      })
    },

    // 点击选择一张图片
    selectImg (item) {
      //  可以获得到点击图片的地址  item.url
      this.$emit('onSelectImg', item.url)
    },
    //   分页
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 为false时取全部
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results // list
        this.page.total = result.data.total_count // 图片总数
      })
    }
  },
  created () {
    this.$on('onSelectImg', function (url) {
      alert(url)
    })
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-item {
    margin: 20px 10px;
    width: 120px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

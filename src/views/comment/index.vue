<template>
  <!-- 最外层 用el-card卡片作业面 -->
  <el-card v-loading="loading">
    <!-- 插槽内容标题 -->
    <bread-crumb slot="header">
      <!-- 面包屑的具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格 需要数据 :data-->
    <el-table :data="list">
      <!-- formatter是el-table-column属性 -->
      <el-table-column prop="title" label="标题" width="700"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop label="操作">
        <!-- 作用域插槽 slot-scope="变量" 变量  就是 row,column,$index.store的属性集合 obj.row -->
        <template slot-scope="obj">
          <el-button size=" small" type="text">修改评论</el-button>
          <el-button
            size=" small"
            :style=" {color: obj.row.comment_status ? '#409EFF' : '#E6A23C'}   "
            type="text"
            @click="openOrClose (obj.row) "
          >{{ obj.row.comment_status ? '关闭评论' :'打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <!-- 分页组件  current-page当前页码 每页显示多少条 page-size total 总数 -->
      <el-pagination
        @current-change="changePage"
        :current-page="page.page"
        :page-size="page.pageSize"
        :total="page.total"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 控制进度条的状态
      list: [],
      page: {
        page: 1, // 默认第几页
        pageSize: 10, // 当前显示的条数
        total: 0 //  总条数
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 给当前页码更新罪行值
      this.page.page = newPage
      this.getComments() //    获取最新页码数据
    },

    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '正常'
      this.$confirm(`您是否要 ${mess} 评论?`, '提示').then(() => {
        // 写调接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() }, // 传递articleid参数
          data: { allow_comment: !row.comment_status } // 取反 因为当前如果是true  只能改成false , 如果是false 改成true
        }).then(result => {
          this.getComments() // 成功之后 重新调用数据拉去数据
        })
      })
    },

    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      this.loading = true // 请求数据之前 把进度条打开
      // query参数 就相当于get参数 路径参数 url参数 params
      // body 路径参数  data
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.loading = false // 响应数据后关系
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>

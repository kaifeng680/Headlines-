<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group @change="changeCondition" v-model="searchForm.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select @change="changeCondition" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="searchForm.dataRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    {{searchForm}}
    <!-- 内容页面结构 -->
    <div class="total-info">总共查找到 {{page.total}} 条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环项 -->
      <div class="article-item" v-for="(item,index)  in  list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src=" item.cover.images.length ? item.cover.images[0]   : defaultImg" alt />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag :type="item.status|statusType " style="width:60px">{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <!-- 给修改按钮注册事件 -->
          <span @click="modifyItem(item)">
            <i class="el-icon-edit"></i> 修改
          </span>
          <span @click=" delItem(item) ">
            <i class="el-icon-delete"></i> 删除
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin:10px 0">
      <el-pagination
        @current-change="changePage"
        :total="page.total"
        :current-page="page.page"
        :page-size="page.pageSize"
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
      list: [], // 定义一格数组
      defaultImg: require('../../assets/img/collect_select.png'), //   转64位字符串
      searchForm: {
        // 定义一个表单数据对象
        status: 5, // 状态
        channel_id: null,
        dataRange: [] // 数组 [开始时间，结束时间]
      },
      channels: [], // 频道列表数据
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 修改数据
    modifyItem (item) {
      // 跳转到发布页面
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    // 删除数据
    async   delItem (item) {
      await this.$confirm('您是否要删除此文章?', '提示')
      // 确认删除
      // item.id 因为长度过长     bigNumber类型=> toString()形成正确的结构
      await this.$axios({
        method: 'delete',
        url: `/articles/${item.id.toString()}`
      })
      // 重新拉取数据
      this.getConditionArticle()
    },
    // 分页
    changePage (newPage) {
      this.page.page = newPage //  把赋值新的页面值
      this.getConditionArticle() //   获取筛选的数据
    },
    // 改变搜索添加
    changeCondition () {
      this.page.page = 1 //  默认回到第一页
      this.getConditionArticle()
    },
    // 根据条件查询
    getConditionArticle () {
      // 组合条件+ 页码  状态/频道/日期区间 每页条数/页码
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.dataRange.length > 0
            ? this.searchForm.dataRange[0]
            : null,
        end_pubdate:
          this.searchForm.dataRange.length > 1
            ? this.searchForm.dataRange[1]
            : null,
        page: this.page.page,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    // 查询文章列表的内容
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },

  created () {
    this.getArticles()
    this.getChannels() //  获取频道数据
  },
  filters: {
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    //  类型过滤器
    statusType: function (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  }
}
</script>

<style  lang='less' scoped>
.total-info {
  border-bottom: 1px dashed #ccc;
  padding: 15px 0;
  color: #323745;
  font-size: 14px;
}

.article-list {
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      img {
        height: 100px;
        width: 180px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        .title {
          font-size: 14px;
          color: #333;
        }
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      font-size: 12px;
      span {
        margin-right: 8px;
        color: #333;
        cursor: pointer;
      }
    }
  }
}
</style>

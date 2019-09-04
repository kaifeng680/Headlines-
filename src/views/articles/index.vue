<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group>
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <!-- 循环项目 -->
        <el-select>
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 内容页面结构 -->
    <div class="total-info">总共查找到5422条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环项 -->
      <div class="article-item" v-for="(item,index)  in  list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src=" item.cover.images.length ? item.cover.images[0]   : defaultImg" alt />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag style="width:60px">{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i> 修改
          </span>
          <span>
            <i class="el-icon-delete"></i> 删除
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/collect_select.png')
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getArticles()
  },
  filters: {
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表  '
        case 3:
          return '审核失败'
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

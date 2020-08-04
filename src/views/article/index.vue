<template>
  <div class="container-article">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small" >
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select 
            v-model="reqParams.channel_id" 
            placeholder="请选择"
            clearable
            @change="changeChannel">
            <el-option v-for="item in channelOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <!-- 统计 -->
      <div slot="header">
        根据筛选条件共查询到 {{total}} 条结果：
      </div>
      <!-- 表格 -->
      <el-table style="width: 100% " :data="articles">
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 180px; height: 120px"
              :src="scope.row.cover.images[0]">
              <!-- 自定义加载失败 -->
              <div slot="error" class="image-slot" >
                <img src="../../assets/error.gif" alt="" style="width: 180px; height: 120px">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="180" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="info" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="warning" v-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePage">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入面包屑 -> 使用vue插件
// import MyBread from '@/components/my-bread'
export default {
  name:'page-article',
  // components:{MyBread},
  data() {
    return {
      // 表单数据对象
      reqParams:{
        // 状态
        status:null,
        // 频道
        channel_id:null,
        // 起始日期
        begin_pubdate:null,
        // 截止日期
        end_pubdate:null,
        // 页数
        page:1,
        // 每页数量
        per_page:20
      },
      // 日期范围组件的数据
      dataArr:[],
      // 文章内容
      articles: [],
      // 频道选项
      channelOption: [],
      // 总条数
      total:0
    }
  },
  created() {
    this.getChannelOption()
    this.getArticles()
  },
  methods:{
    // 频道选项
    async getChannelOption () {
      const res = await this.$http.get('channels')
      // console.log(res);
      this.channelOption = res.data.data.channels
    },
    // 获取文章内容
    async getArticles () {
      const res = await this.$http.get('articles', { 
        params: this.reqParams 
      })
      this.articles = res.data.data.results
      this.total = res.data.data.total_count
      // console.log(res);
    },
    // 当前页改变的时候
    changePage(newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 改变频道
    changeChannel(newChannel) {
      if(newChannel === '') this.reqParams.channel_id = null
    },
    // 确定选中日期时触发
    changeDate(arr) {
      // arr 是数组 [起始日期，结束日期]
      // 注意：后台需要的日期格式是 2019-10-01 这样的格式
      // 组件：支持日期格式设置
      // 注意：清空日期的时候也会触发该函数，arr数据是null
      if(arr) {
        this.begin_pubdate = arr[0]
        this.end_pubdate = arr[1]
      }else {
        this.begin_pubdate = null
        this.end_pubdate = null
      }
    },
    // 点击筛选
    search() {
      this.reqParams.page = 1,
      this.getArticles()
    },
    // 点击编辑
    edit(id) {
      // 用query的方式传id ?后面加id
      // params的话 /id 没有这种路由，上面的方式是同一个路由
      this.$router.push({
        path:'/publish',
        query:{id}
      })
    },
    // 点击删除
    del(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认，发删除请求
        try {
          // 1. 测试账户的文章数据，后台限制不能删除
          // 2. 请求成功，后台没有响应内容，
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除文章成功')
          this.getArticles()
        } catch (e) {
          this.$message.error('删除文章失败')
        }
      }).catch(() => {
        // 点击取消，没有任何逻辑
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
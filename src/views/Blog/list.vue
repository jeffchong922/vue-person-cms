<template>
  <div>
    <view-title>博客列表</view-title>
    <div class="shadow-lg rounded max-w-3xl">
      <el-table
        style="width: 100%"
        :data="blogList"
        :empty-text="fetchLoading ? '正在搜索中...' : '暂无数据'"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="博客标题"></el-table-column>

        <el-table-column label="更新时间">
          <template slot-scope="{ row }">
            <span>{{ row.modifiedOn | timestamp2String }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="$router.push(`/blog/edit/${row.id}`)"
            >
              编辑
            </el-button>

            <i class="px-px sm:px-1"></i>

            <el-button @click="handleDelete(row)" type="danger" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { timestamp2String } from '../../filters'
export default {
  name: 'blog-list',
  filters: {
    timestamp2String
  },
  created() {
    this.fetchBlogs();
  },
  computed: {
    ...mapState({
      fetchLoading: state => state.blogs.loading,
      blogList: state => state.blogs.list
    })
  },
  methods: {
    ...mapActions({
      fetchBlogs: "blogs/load",
      deleteBlog: "blogs/delete"
    }),

    handleDelete({ id, title }) {
      this.$msgBox
        .confirm(`是否要删除 ${title} ?`, {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(() => {
          // 请求
          this.deleteBlog(id).catch(message => {
            this.$message({ type: "error", message, showClose: true });
          });
        })
        .catch(() => {});
    }
  }
}
</script>
<template>
  <div>
    <view-title>分类列表</view-title>
    <div class="shadow-lg rounded max-w-3xl">
      <el-table
        style="width: 100%"
        :data="categoryList"
        :empty-text="fetchLoading ? '正在搜索中...' : '暂无数据'"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="parentName" label="父级分类"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="$router.push(`/category/edit/${row.id}`)"
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
export default {
  name: 'category-list',
  created() {
    this.fetchCategories();
  },
  computed: {
    ...mapState({
      fetchLoading: state => state.categories.loading,
      categoryList: state => state.categories.list
    })
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/load",
      deleteCategory: "categories/delete"
    }),

    handleDelete({ id, name }) {
      this.$msgBox
        .confirm(`是否要删除 ${name} ?`, {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(() => {
          // 请求
          this.deleteCategory(id).catch(message => {
            this.$message({ type: "error", message, showClose: true });
          });
        })
        .catch(() => {});
    }
  }
}
</script>
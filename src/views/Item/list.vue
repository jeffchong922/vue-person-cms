<template>
  <div>
    <view-title>物品列表</view-title>
    <div class="shadow-lg rounded max-w-3xl">
      <el-table
        style="width: 100%"
        :data="itemList"
        :empty-text="fetchLoading ? '正在搜索中...' : '暂无数据'"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        
        <el-table-column label="图标">
          <template slot-scope="{ row }">
            <img class="w-16 h-16" :src="row.icon" :alt="row.name" />
          </template>
        </el-table-column>
        
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="$router.push(`/item/edit/${row.id}`)"
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
  name: 'item-list',
  created() {
    this.fetchItems();
  },
  computed: {
    ...mapState({
      fetchLoading: state => state.items.loading,
      itemList: state => state.items.list
    })
  },
  methods: {
    ...mapActions({
      fetchItems: "items/load",
      deleteItem: "items/delete"
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
          this.deleteItem(id).catch(message => {
            this.$message({ type: "error", message, showClose: true });
          });
        })
        .catch(() => {});
    }
  }
}
</script>
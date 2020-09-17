<template>
  <div>
    <view-title>{{ title }}</view-title>
    <el-form
      class="max-w-md shadow-lg p-4"
      @submit.native.prevent="handleSubmit"
    >

      <el-form-item>
        <el-select placeholder="请选择父类" v-model="parent" class="w-full">
          <el-option
            v-for="item in parents"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="name" placeholder="分类名称"></el-input>
      </el-form-item>

      <el-form-item class="form-item mb-0">
        <el-button :loading="submitting" native-type="submit" type="primary">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { requestData } from '../../_helpers'
import { mapActions, mapState } from "vuex"
export default {
  name: 'category-edit',
  props: ['id'],
  created() {
    this.loadParent();
    this.id && this.fetchDataById(this.id);
  },
  computed: {
    ...mapState({
      submitting: state => state.categories.submitting,
      parents: state => [
        { id: null, name: "As Root Type" },
        ...state.categories.parents
      ]
    }),
    title() {
      return this.id ? "编辑分类" : "创建分类";
    }
  },
  data: () => ({
    name: "",
    parent: ""
  }),
  methods: {
    ...mapActions({
      loadParent: "categories/loadParent",
      createCategory: "categories/create",
      fetchCategory: "categories/fetch",
      updateCategory: "categories/update"
    }),

    fetchDataById(id) {
      this.fetchCategory(id)
        .then(category => {
          requestData.setCategory(this, category);
        })
        .catch(message => {
          this.$message({ type: "error", message, showClose: true });
          return this.$router.replace("/category/list");
        });
    },

    handleSubmit() {
      // 验证
      if (!this.name) {
        return this.$message({
          type: "warning",
          message: "分类必须包含名称属性"
        });
      }

      this.request(requestData.getCategory(this.$data), this.id);
    },

    request(data, id) {
      if (id) {
        const needUpdate = Object.assign({}, data, { id });
        this.updateCategory(needUpdate)
          .then(() => {
            this.$message({
              type: "success",
              message: "修改成功",
              showClose: true
            });
          })
          .catch(message => {
            this.$message({ type: "error", message, showClose: true });
          });
      } else {
        this.createCategory(data)
          .then(() => {
            this.$message({
              type: "success",
              message: "创建成功",
              showClose: true
            });
            this.clear();
          })
          .catch(message => {
            this.$message({ type: "error", message, showClose: true });
          });
      }
    },

    clear() {
      this.name = "";
    }
  }
}
</script>
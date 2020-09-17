<template>
  <div>
    <view-title>{{ title }}</view-title>
    <el-form
      class="max-w-md shadow-lg p-4"
      @submit.native.prevent="handleSubmit"
    >

      <el-form-item mar label="物品名称" required class="form-item mb-1">
        <el-input v-model="name" clearable placeholder="物品名称"></el-input>
      </el-form-item>

      <el-form-item label="物品图片" class="form-item mb-1">
        <upload-file :image-path.sync="imagePath"></upload-file>
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
import { mapState, mapActions } from "vuex"
import { requestData } from '../../_helpers'
import UploadFile from "@/components/UploadFile"
export default {
  name: 'item-edit',
  props: ['id'],
  components: { UploadFile },
  created() {
    this.id && this.fetchDataById(this.id);
  },
  computed: {
    ...mapState({
      submitting: state => state.items.submitting
    }),
    title() {
      return this.id ? "编辑物品" : "创建物品";
    }
  },
  data: () => ({
    name: "",
    imagePath: ""
  }),
  methods: {
    ...mapActions({
      crateItem: "items/create",
      fetchItem: "items/fetch",
      updateItem: "items/update"
    }),

    fetchDataById(id) {
      this.fetchItem(id)
        .then(item => {
          requestData.setItem(this, item);
        })
        .catch(message => {
          this.$message({ type: "error", message, showClose: true });
          return this.$router.replace("/item/list");
        });
    },

    handleSubmit() {
      // 验证
      if (!this.name) {
        return this.$message({
          type: "warning",
          message: "物品必须包含名称属性"
        });
      }

      this.request(requestData.getItem(this.$data), this.id);
    },

    request(data, id) {
      if (id) {
        const needUpdate = Object.assign({}, data, { id });
        this.updateItem(needUpdate)
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
        this.crateItem(data)
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
      this.imagePath = "";
    }
  }
}
</script>
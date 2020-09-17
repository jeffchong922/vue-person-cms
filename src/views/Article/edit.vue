<template>
  <div>
    <view-title>{{ title }}</view-title>
    <el-form
      class="shadow-lg p-4 max-w-4xl"
      @submit.native.prevent="handleSubmit"
    >

      <el-form-item label="类别" class="form-item mb-1">
        <el-select v-model="categoryParent" placeholder="父级">
          <el-option
            v-for="category in categoryParents"
            :key="category.id"
            :value="category.id"
            :label="category.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="sm:w-2/3 md:w-1/2 form-item mb-1">
        <el-select
          multiple
          v-model="categories"
          placeholder="类别"
          class="w-full"
        >
          <el-option
            v-for="child in filterCategoryChild"
            :key="child.id"
            :value="child.id"
            :label="child.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item required label="文章标题" class="sm:w-2/3 md:w-1/2">
        <el-input v-model="articleTitle" placeholder="article-title"></el-input>
      </el-form-item>

      <el-form-item>
        <vue-editor
          v-model="content"
          useCustomImageHandler
          @image-added="handleImageAdded"
        />
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
import { VueEditor } from "vue2-editor";
import { requestData } from '../../_helpers'
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  name: 'article-edit',
  props: ['id'],
  components: { VueEditor },
  created() {
    this.loadCategories().catch(message => {
      this.$message({ type: "error", message, showClose: true });
    });
    this.id && this.fetchDataById(this.id);
  },
  computed: {
    ...mapState({
      submitting: state => state.articles.submitting,
      categoryParents: state => state.categories.parents
    }),
    ...mapGetters({
      categoryChild: "categories/children"
    }),
    filterCategoryChild() {
      let retVal = [];
      if (this.categoryParent) {
        retVal = this.categoryChild.filter(
          ({ parent }) => this.categoryParent === parent
        );
      }
      return retVal;
    },
    title() {
      return this.id ? "编辑文章" : "创建文章";
    }
  },
  data: () => ({
    content: "",
    categories: [],
    articleTitle: "",
    categoryParent: ""
  }),
  methods: {
    ...mapActions({
      uploadImage: "upload/post",
      crateArticle: "articles/create",
      fetchArticle: "articles/fetch",
      updateArticle: "articles/update",
      loadCategories: "categories/load"
    }),

    fetchDataById(id) {
      this.fetchArticle(id)
        .then(article => {
          requestData.setArticle(this, article);
        })
        .catch(message => {
          this.$message({ type: "error", message, showClose: true });
          return this.$router.replace("/article/list");
        });
    },

    handleSubmit() {
      // 验证
      if (!this.articleTitle) {
        return this.$message({
          type: "warning",
          message: "文章必须包含标题属性"
        });
      }

      this.request(requestData.getArticle(this.$data), this.id);
    },

    request(data, id) {
      if (id) {
        const needUpdate = Object.assign({}, data, { id });
        this.updateArticle(needUpdate)
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
        this.crateArticle(data)
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
      this.content = "";
      this.categories = [];
      this.articleTitle = "";
    },

    /* editor组件上传图片 */
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("image", file);

      this.uploadImage(formData)
        .then(result => {
          const { imagePath } = result[0];
          this.pushImageToEditor(
            Editor,
            imagePath,
            cursorLocation,
            resetUploader
          );
        })
        .catch(message => {
          this.$message({ type: "error", showClose: true, message });
        });
    },
    pushImageToEditor(Editor, imagePath, cursorLocation, resetUploader) {
      Editor.insertEmbed(cursorLocation, "image", imagePath);
      resetUploader();
    }
  }
}
</script>
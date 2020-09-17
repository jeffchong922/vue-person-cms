<template>
  <div>
    <view-title>{{ title }}</view-title>
    <el-form
      class="shadow-lg p-4"
      @submit.native.prevent="handleSubmit"
    >

      <el-form-item class="form-item mb-0">
        <el-button :loading="submitting" native-type="submit" type="primary">
          提交
        </el-button>
      </el-form-item>

      <el-form-item required label="博客标题" class="sm:w-2/3 md:w-1/2 mb-3">
        <el-input v-model="blogTitle" placeholder="blog-title"></el-input>
      </el-form-item>

      <el-form-item class="form-item mb-0">
        <div class="inline-block py-1">
          <span class="px-2 text-gray-700">创建日期:</span>
          <el-date-picker
            type="datetime"
            :editable="false"
            v-model="createdAt"
            value-format="timestamp"
            placeholder="created-at"
          ></el-date-picker>
        </div>
        <div class="inline-block py-1">
          <span class="px-2 text-gray-700">修改日期:</span>
          <el-date-picker
            type="datetime"
            :editable="false"
            v-model="modifiedAt"
            value-format="timestamp"
            placeholder="modified-at"
          ></el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="博客描述" class="form-item mb-0">
        <el-input
          type="textarea"
          v-model="blogDesc"
          placeholder="blog-description"
        ></el-input>
      </el-form-item>

      <el-form-item label="博客标签" class="form-item mb-1">
        <el-select
          class="w-full"
          multiple
          filterable
          allow-create
          default-first-option
          v-model="tags"
          placeholder="选择或创建 Tags"
        >
          <el-option
            v-for="tag in tagList"
            :key="tag"
            :value="tag"
            :label="tag"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="插入图片" class="form-item mb-0">
        <upload-file
          :hide-img="true"
          :image-path.sync="imagePath"
        ></upload-file>
      </el-form-item>

      <div class="flex">
        <div class="w-full xl:w-1/2 mr-1">
          <p class="text-gray-800 mb-2">markdown 内容</p>
          <div>
            <textarea
              v-model="content"
              style="height: 80vh"
              class="w-full p-1 border-2 border-gray-900 rounded resize-none leading-5"
            ></textarea>
          </div>
        </div>
        <div class="w-1/2 ml-1 hidden xl:block">
          <p class="text-gray-800 mb-2">markdwon 预览</p>
          <div
            style="height: 80vh"
            v-html="htmlContent"
            class="markdown-content rounded overflow-y-auto border-2 border-gray-800 p-1"
          ></div>
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
import UploadFile from "@/components/UploadFile"
import { mapState, mapActions, mapGetters } from "vuex"
import { requestData, getHtmlContent } from '../../_helpers'
export default {
  name: 'blog-edit',
  props: ['id'],
  components: { UploadFile },
  created() {
    this.fetchBlogs();
    this.id && this.fetchDataById(this.id);
  },
  computed: {
    ...mapState({
      submitting: state => state.blogs.submitting
    }),
    ...mapGetters({
      tagList: "blogs/tags"
    }),
    title() {
      return this.id ? "编辑博客" : "创建博客";
    },
    htmlContent() {
      return getHtmlContent(this.content);
    }
  },
  data: () => ({
    imagePath: "",
    tags: [],
    blogTitle: "",
    blogDesc: "",
    content: "",
    createdAt: undefined,
    modifiedAt: undefined
  }),
  methods: {
    ...mapActions({
      fetchBlogs: "blogs/load",
      crateBlog: "blogs/create",
      fetchBlog: "blogs/fetch",
      updateBlog: "blogs/update"
    }),

    fetchDataById(id) {
      this.fetchBlog(id)
        .then(blog => {
          requestData.setBlog(this, blog);
        })
        .catch(message => {
          this.$message({ type: "error", message, showClose: true });
          return this.$router.replace("/blog/list");
        });
    },

    handleSubmit() {
      // 验证
      if (!this.blogTitle) {
        return this.$message({
          type: "warning",
          message: "博客文章必须包含标题属性"
        });
      }
      // null 无法自动生成时间
      this.createdAt = this.createdAt ? this.createdAt : undefined;
      this.modifiedAt = this.modifiedAt ? this.modifiedAt : undefined;
      this.request(requestData.getBlog(this.$data), this.id);
    },

    request(data, id) {
      if (id) {
        const needUpdate = Object.assign({}, data, { id });
        this.updateBlog(needUpdate)
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
        this.crateBlog(data)
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
      this.imagePath = "";
      this.tags = [];
      this.blogTitle = "";
      this.blogDesc = "";
      this.content = "";
      this.createdAt = undefined;
      this.modifiedAt = undefined;
    }
  }
}
</script>

<style lang="scss">
.markdown-content {
  line-height: 1.2rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bolder;
  }

  h2 {
    margin: 1.2rem 0;
    font-size: 1.5rem;
  }

  h3 {
    margin: 1rem 0;
    font-size: 1.3rem;
  }

  p {
    margin: 0.5rem 0;
  }

  code {
    background: #ddd;
  }

  pre {
    background-color: #ddd;
    padding: 0.6rem;
    overflow-x: auto;
  }

  em {
    color: #900;
  }
  strong {
    color: #d00;
  }

  ul,
  ol {
    padding-left: 2rem;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
}
</style>

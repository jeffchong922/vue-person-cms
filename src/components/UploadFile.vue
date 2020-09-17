<template>
  <div class="upload-file">
    <el-upload
      ref="upload"
      :limit="single ? 1 : 15"
      :auto-upload="auto"
      :http-request="handleUpload"
      accept="image/png, image/jpeg"
      action="null"
      :multiple="!single"
      :on-change="filesChange"
      :disabled="uploading"
    >
      <!-- start -->
      <el-button :loading="uploading" slot="trigger" size="small"
        >选取图片</el-button
      >
      <!-- end -->

      <!-- start -->
      <el-button
        v-if="!auto"
        plain
        class="ml-2"
        size="small"
        type="success"
        :loading="uploading"
        @click="() => $refs.upload.submit()"
      >
        上传图片
      </el-button>
      <!-- end -->

      <!-- start -->
      <div slot="tip">
        只能上传
        <span class="text-red-600"> 单个 </span>
        jpg/png文件，且不超过10MB
      </div>
      <!-- end -->
    </el-upload>

    <!-- 图片显示 start -->
    <div v-if="single">
      <div v-if="imagePath" class="shadow p-2">
        <div :class="{ hidden: hideImg }" class="w-full overflow-hidden">
          <img :src="imagePath" />
        </div>
        <p class="pt-2 text-xs break-all text-gray-600 leading-4 select-all">
          {{ imagePath }}
        </p>
      </div>
    </div>
    <div v-else>
      <div v-for="image in imageGroup" :key="image" class="shadow mb-3 p-2">
        <div class="w-full overflow-hidden">
          <img :src="image" />
        </div>
        <p class="pt-2 text-xs break-all text-gray-600 leading-4">
          {{ image }}
        </p>
      </div>
    </div>
    <!-- 图片显示 end -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "upload-file",
  props: {
    auto: {
      type: Boolean,
      default: true
    },
    hideImg: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: true
    },
    imagePath: {
      type: String,
      default: ""
    },
    imageGroup: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    filesLength() {
      if (this.filesLength <= 0) {
        this.$refs.upload.clearFiles();
        if (this.single) {
          this.$emit("update:image-path", this.imageTemp.pop());
        } else {
          this.$emit("update:image-group", this.imageTemp.splice(0));
        }
      }
    }
  },
  data: () => ({
    imageTemp: [],
    filesLength: 0,
    uploading: false
  }),
  methods: {
    ...mapActions({
      upload: "upload/post"
    }),
    handleUpload({ file }) {
      this.uploading = true;
      const formData = new FormData();
      formData.append("image", file);
      this.upload(formData)
        .then(result => {
          const { imagePath } = result[0];
          this.imageTemp.push(imagePath);
          this.filesLength--;
          this.uploading = false;
        })
        .catch(message => {
          this.filesLength--;
          this.uploading = false;
          this.$message({ type: "error", showClose: true, message });
        });
    },
    filesChange(file, fileList) {
      this.filesLength = fileList.length;
    }
  }
};
</script>

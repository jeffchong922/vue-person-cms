<template>
  <div>
    <el-form-item label="名称" required class="form-item mb-1">
      <el-input v-model="name" placeholder="英雄名"></el-input>
    </el-form-item>

    <el-form-item label="称号" required>
      <el-input v-model="nickName" placeholder="英雄称号"></el-input>
    </el-form-item>

    <el-form-item label="头像">
      <upload-file :image-path.sync="avatar"></upload-file>
    </el-form-item>

    <el-form-item label="资料背景板">
      <upload-file :image-path.sync="bgBanner"></upload-file>
    </el-form-item>

    <div class="h-px bg-gray-300 mb-5"></div>

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

    <el-form-item>
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

    <div class="h-px bg-gray-300 mb-3"></div>

    <el-form-item class="form-item mb-0">
      <span class="">难度系数:</span>
      <el-rate v-model="scores.difficult" :max="10" show-score></el-rate>
    </el-form-item>
    <el-form-item class="form-item mb-0">
      <span class="">技能难度:</span>
      <el-rate v-model="scores.skills" :max="10" show-score></el-rate>
    </el-form-item>
    <el-form-item class="form-item mb-0">
      <span class="">伤害系数:</span>
      <el-rate v-model="scores.attack" :max="10" show-score></el-rate>
    </el-form-item>
    <el-form-item>
      <span class="">生存系数:</span>
      <el-rate v-model="scores.survive" :max="10" show-score></el-rate>
    </el-form-item>

    <div class="h-px bg-gray-300 mb-3"></div>

    <el-form-item label="顺丰出装" class="form-item mb-1">
      <el-select
        multiple
        v-model="vItems"
        class="w-full"
        placeholder="顺丰出装"
      >
        <el-option
          v-for="item in items"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item mb-1">
      <el-input
        v-model="vTips"
        type="textarea"
        placeholder="顺丰出装提示"
      ></el-input>
    </el-form-item>

    <el-form-item label="逆风出装" class="form-item mb-1">
      <el-select
        multiple
        v-model="dItems"
        class="w-full"
        placeholder="逆风出装"
      >
        <el-option
          v-for="item in items"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option
      ></el-select>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model="dTips"
        type="textarea"
        placeholder="逆风出装提示"
      ></el-input>
    </el-form-item>

    <div class="h-px bg-gray-300 mb-3"></div>

    <el-form-item label="使用提示" class="form-item mb-1">
      <el-input
        v-model="usageTips"
        type="textarea"
        placeholder="使用提示"
      ></el-input>
    </el-form-item>

    <el-form-item label="对战提示" class="form-item mb-1">
      <el-input
        v-model="battleTips"
        type="textarea"
        placeholder="对战提示"
      ></el-input>
    </el-form-item>
    
    <el-form-item label="团队提示">
      <el-input
        v-model="teamTips"
        type="textarea"
        placeholder="团队提示"
      ></el-input>
    </el-form-item>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import UploadFile from "@/components/UploadFile";
export default {
  name: "base-info",
  components: { UploadFile },
  computed: {
    ...mapState({
      items: state => state.items.list,
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
    }
  },
  data: () => ({
    name: "",
    nickName: "",
    avatar: "",
    bgBanner: "",
    scores: {
      difficult: 1,
      skills: 1,
      attack: 1,
      survive: 1
    },
    vItems: [],
    vTips: "",
    dItems: [],
    dTips: "",
    usageTips: "",
    battleTips: "",
    teamTips: "",

    categories: [],

    categoryParent: ""
  }),
  methods: {
    clear() {
      this.name = "";
      this.nickName = "";
      this.avatar = "";
      this.bgBanner = "";
      this.scores = {
        difficult: 1,
        skills: 1,
        attack: 1,
        survive: 1
      };
      this.vItems = [];
      this.vTips = "";
      this.dItems = [];
      this.dTips = "";
      this.usageTips = "";
      this.battleTips = "";
      this.teamTips = "";
      this.categories = [];
    }
  }
};
</script>

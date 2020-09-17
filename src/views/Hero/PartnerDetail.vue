<template>
  <div>
    <el-form-item class="form-item mb-1">
      <el-button
        type="primary"
        @click="
          partners.push({
            hero: '',
            description: ''
          })
        "
      >
        添加搭档
      </el-button>
    </el-form-item>

    <div class="flex flex-wrap">
      <div
        class="p-2 w-full md:w-1/2 "
        v-for="(partner, index) of partners"
        :key="index"
      >

        <div class="shadow border border-gray-100 py-2 px-4">

          <el-form-item label="搭档" class="form-item mb-1">
            <el-select v-model="partner.hero" placeholder="搭档" class="w-full">
              <el-option
                v-for="hero in filterHeroList"
                :key="hero.id"
                :value="hero.id"
                :label="hero.name"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="搭配描述" class="form-item mb-1">
            <el-input
              v-model="partner.description"
              placeholder="description"
              type="textarea"
            ></el-input>
          </el-form-item>

          <el-form-item class="mb-0 flex justify-end">
            <el-button type="danger" @click="partners.splice(index, 1)">
              删除
            </el-button>
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "partner-detail",
  props: ["editId"],
  computed: {
    ...mapState({
      heroList: state => state.heroes.list
    }),
    filterHeroList() {
      let retVal = [];
      if (this.heroList) {
        retVal = this.heroList.filter(({ id }) =>
          this.editId ? this.editId !== id : true
        );
      }
      return retVal;
    }
  },
  data: () => ({
    partners: []
  }),
  methods: {
    clear() {
      this.partners = [];
    }
  }
};
</script>

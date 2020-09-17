<template>
  <div>
    <view-title>{{ title }}</view-title>
    <el-form
      class="max-w-3xl shadow-lg p-4"
      @submit.native.prevent="handleSubmit"
    >

      <el-form-item class="form-item mb-1">
        <el-button
          :loading="submitting"
          native-type="submit"
          size="small"
          type="primary"
          >提交</el-button
        >
      </el-form-item>

      <el-tabs value="base-info" class="shadow-lg p-3 border border-gray-200">
        <el-tab-pane name="base-info" label="基础信息" class="max-w-xs">
          <base-info ref="base-info"></base-info>
        </el-tab-pane>
        <el-tab-pane name="skill-detail" label="技能信息">
          <skill-detail ref="skill-detail"></skill-detail>
        </el-tab-pane>
        <el-tab-pane name="partner-detail" label="搭档信息">
          <partner-detail :edit-id="id" ref="partner-detail"></partner-detail>
        </el-tab-pane>
      </el-tabs>

    </el-form>
  </div>
</template>

<script>
import BaseInfo from "./BaseInfo";
import SkillDetail from "./SkillDetail";
import PartnerDetail from "./PartnerDetail";
import { requestData } from '../../_helpers'
import { mapState, mapActions } from "vuex"
export default {
  name: 'item-edit',
  props: ['id'],
  components: { BaseInfo, SkillDetail, PartnerDetail },
  created() {
    this.loadItems().catch(message => {
      this.$message({ type: "error", message, showClose: true });
    });
    this.loadCategories().catch(message => {
      this.$message({ type: "error", message, showClose: true });
    });
    this.loadHeroes().catch(message => {
      this.$message({ type: "error", message, showClose: true });
    });
  },
  mounted () {
    this.id && this.fetchDataById(this.id);
  },
  computed: {
    ...mapState({
      submitting: state => state.heroes.submitting
    }),
    title() {
      return this.id ? "编辑英雄" : "创建英雄";
    }
  },
  methods: {
    ...mapActions({
      crateHero: "heroes/create",
      fetchHero: "heroes/fetch",
      updateHero: "heroes/update",
      loadHeroes: "heroes/load",
      loadCategories: "categories/load",
      loadItems: "items/load"
    }),

    fetchDataById(id) {
      this.fetchHero(id)
        .then(hero => {
          requestData.setHero(this.$refs["base-info"], hero);
          requestData.setHero(this.$refs["skill-detail"], hero);
          requestData.setHero(this.$refs["partner-detail"], hero);
        })
        .catch(message => {
          this.$message({ type: "error", message, showClose: true });
          return this.$router.replace("/hero/list");
        });
    },

    handleSubmit() {
      const part1 = requestData.getHero(this.$refs["base-info"].$data);
      const part2 = requestData.getHero(this.$refs["skill-detail"].$data);
      const part3 = requestData.getHero(this.$refs["partner-detail"].$data);
      const data = Object.assign({}, part1, part2, part3);
      // 验证
      if (!data.name || !data.nickName) {
        return this.$message({
          type: "warning",
          message: "英雄必须包含名称与昵称"
        });
      }
      this.request(data, this.id);
    },

    request(data, id) {
      if (id) {
        const needUpdate = Object.assign({}, data, { id });
        this.updateHero(needUpdate)
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
        this.crateHero(data)
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
      this.$refs["base-info"].clear();
      this.$refs["skill-detail"].clear();
      this.$refs["partner-detail"].clear();
    }
  }
}
</script>
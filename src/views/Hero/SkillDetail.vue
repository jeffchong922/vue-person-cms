<template>
  <div>

    <el-form-item class="form-item mb-1">
      <el-button
        type="primary"
        @click="
          skills.push({
            name: '',
            freeze: '',
            cost: 0,
            icon: '',
            description: '',
            tips: ''
          })
        "
        >添加技能</el-button
      >
    </el-form-item>
    
    <div class="flex flex-wrap">
      <div
        class="p-2 w-full md:w-1/2 "
        v-for="(skill, index) of skills"
        :key="index"
      >
        <div class="shadow-md border border-gray-100 py-2 px-4">

          <el-form-item label="技能名" class="form-item mb-1">
            <el-input v-model="skill.name" placeholder="skill-name"></el-input>
          </el-form-item>

          <el-form-item label="冷却" class="form-item mb-1">
            <el-input
              v-model="skill.freeze"
              placeholder="freeze-tiem"
            ></el-input>
          </el-form-item>

          <el-form-item label="消耗" class="form-item mb-1">
            <el-input
              v-model="skill.cost"
              type="number"
              placeholder="cost"
            ></el-input>
          </el-form-item>

          <el-form-item label="图标" class="form-item mb-1">
            <upload-file :image-path.sync="skill.icon"></upload-file>
          </el-form-item>

          <el-form-item label="描述" class="form-item mb-1">
            <el-input
              placeholder="技能描述"
              v-model="skill.description"
              type="textarea"
            ></el-input>
          </el-form-item>

          <el-form-item label="提示" class="form-item mb-1">
            <el-input
              placeholder="使用提示"
              v-model="skill.tips"
              type="textarea"
            ></el-input>
          </el-form-item>

          <el-form-item class="mb-0 flex justify-end">
            <el-button type="danger" @click="skills.splice(index, 1)">
              删除
            </el-button>
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadFile from "@/components/UploadFile";
export default {
  name: "skill-detail",
  components: { UploadFile },
  data: () => ({
    skills: []
  }),
  methods: {
    clear() {
      this.skills = [];
    }
  }
};
</script>

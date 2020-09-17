<template>
  <div class="h-screen bg-gray-800 flex justify-center items-center">
    <el-card class="w-full max-w-sm mx-4">
      <div class="text-gray-700 font-bold">欢迎使用</div>
      <el-form @submit.native.prevent="userLogin">
        <el-form-item label="用户名" required class="form-item mb-0">
          <el-input
            v-model="username"
            placeholder="username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input
            show-password
            type="password"
            v-model="password"
            placeholder="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item mb-0">
          <el-button
            type="primary"
            :loading="submitting"
            native-type="submit"
            :disabled="loginDisabled"
          >
            登陆
          </el-button>
          <el-button
            type="info"
            :loading="submitting"
            native-type="button"
            @click="visitorLogin"
          >
            游客登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { trimStr } from '../_helpers'
import { visitorInfo } from '../data'
import { mapActions, mapState } from "vuex";
export default {
  name: 'auth-view',
  computed: {
    ...mapState({
      submitting: state => state.auth.submitting
    }),
    loginDisabled () {
      return !(this.username && this.password);
    }
  },
  data: () => ({
    username: "",
    password: ""
  }),
  methods: {
    ...mapActions({
      signIn: "auth/login"
    }),

    visitorLogin () {
      this.request({
        username: trimStr(visitorInfo.username),
        password: trimStr(visitorInfo.password)
      })
    },

    userLogin () {
      this.request({
        username: trimStr(this.username),
        password: trimStr(this.password)
      })
    },

    request (userInfo) {
      this.signIn(userInfo)
        .then(() => {
          this.$router.replace('/')
        })
        .catch(message => {
          this.$message({
            type: 'error',
            message
          })
        })
    }
  }
}
</script>
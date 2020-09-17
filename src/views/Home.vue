<template>
  <div class="relative h-screen overflow-hidden">

    <!-- 头部: 宽度过小时显示 start -->
    <header class="absolute top-0 inset-x-0 bg-gray-800 h-8 sm:hidden">
      <div
        class="flex flex-col justify-around h-full w-10 py-1 pl-4"
        @click="openSide = !openSide"
      >
        <div v-for="i in 3" :key="i" class="h-1 bg-gray-100"></div>
      </div>
    </header>
    <!-- 头部: 宽度过小时显示 end -->

    <!-- 侧边栏 start -->
    <aside
      class="absolute flex flex-col z-20 w-56 left-0 inset-y-0 transition-transform duration-300"
      :class="[
        'transform',
        openSide ? '' : '-translate-x-full',
        'sm:translate-x-0'
      ]"
    >

      <router-link
        tag="div"
        class="flex items-center p-3 bg-black cursor-pointer"
        to="/"
      >
        <div class="h-12 w-12">
          <img class="h-full w-full" src="~@/assets/logo.svg" alt="avatar" />
        </div>
        <div class="ml-2">
          <p class="text-sm text-gray-200">Administer System</p>
          <p class="text-sm text-gray-500">Jeff Chong</p>
        </div>
      </router-link>

      <el-menu
        router
        unique-opened
        :default-active="$route.path"
        class="flex-1 overflow-hidden overflow-y-auto"
      >

        <el-submenu
          v-for="submenu in subMenuGroup"
          :key="submenu.title"
          :index="submenu.title"
        >
          <template v-slot:title>
            <i :class="submenu.icon"></i>
            <span>{{ submenu.title }}</span>
          </template>
          <el-menu-item-group
            v-for="menuItemGroup in submenu.menuItemGroup"
            :key="menuItemGroup.title"
            :title="menuItemGroup.title"
          >
            <el-menu-item
              v-for="menuItem in menuItemGroup.children"
              :key="menuItem.title"
              :index="menuItem.route"
            >
              <span>{{ menuItem.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        
        <div class="h-px bg-gray-300"></div>

        <el-menu-item>
          <a :href="webSiteLink.url" target="_blank"
            class="block w-full h-full"
          >
            <i class="el-icon-share"></i>
            <span>{{webSiteLink.name}}</span>
          </a>
        </el-menu-item>

        <el-menu-item @click="handleLogout">
          <i class="el-icon-finished"></i>
          <span>登出账户</span>
        </el-menu-item>

      </el-menu>

    </aside>
    <!-- 侧边栏 end -->

    <!-- 遮罩 -->
    <div
      v-show="openSide"
      @click="openSide = !openSide"
      class="absolute inset-0 bg-gray-900 bg-opacity-50 z-10 sm:hidden"
    ></div>
    <!-- 遮罩 end -->
    
    <main class="auto-scroll-top ml-0 sm:ml-56 mt-8 sm:mt-0 pt-3 pb-12 sm:pb-4 h-full overflow-x-auto overflow-y-scroll px-4">
      <router-view key="$route.path"></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { subMenuGroup, webSiteLink } from '../data'
export default {
  name: 'home-view',
  computed: {
    subMenuGroup: () => subMenuGroup,
    webSiteLink: () => webSiteLink
  },
  watch: {
    $route() {
      this.openSide = false;
      document &&
        (document.querySelector("main.auto-scroll-top").scrollTop = 0);
    }
  },
  data: () => ({
    openSide: false,
  }),
  methods: {
    ...mapActions({
      logout: "auth/logout"
    }),
    handleLogout() {
      this.logout();
      this.$router.replace("/auth");
    }
  }
}
</script>

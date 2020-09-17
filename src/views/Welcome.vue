<template>
  <div class="flex justify-center items-center h-full">
    <div class="text-center">
      <h2 class="font-bold text-4xl tracking-wide text-gray-700 mb-3">
        欢迎访问此后台
      </h2>
      <p class="welcome-time text-gray-500"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome-view",
  mounted () {
    this.__oTimeNode = document.querySelector('.welcome-time')
    if (this.__timer) clearInterval(this.__timer)
    this.__timer = setInterval(() => {
      this.__oTimeNode.textContent = new Date().toLocaleString();
    }, 120);
  },
  beforeDestroy() {
    clearInterval(this.__timer);
  }
};
</script>
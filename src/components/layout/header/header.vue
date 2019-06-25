<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/basIndex">内容计费系统</el-menu-item>
      <el-menu-item index="/zsIndex">转售系统</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "navHeader",
  data() {
    return {
      activeIndex: "/"
    };
  },
  created: function() {
    this.$router.push(this.activeIndex);
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push("/index" + keyPath);
      console.log(key + ":" + keyPath);
    }
  }
};
</script>

<style lang="scss">
@import "./header.scss";
</style>

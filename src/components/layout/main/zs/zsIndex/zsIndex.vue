<template>
  <el-container class="zs-main">
    <el-aside width="200px">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item index="/zsType1">
          <i class="el-icon-location"></i>
          <span slot="title">转售分类一</span>
        </el-menu-item>
        <el-menu-item index="/zsType2">
          <i class="el-icon-menu"></i>
          <span slot="title">转售分类二</span>
        </el-menu-item>
        <el-menu-item index="/zsType3">
          <i class="el-icon-document"></i>
          <span slot="title">转售分类三</span>
        </el-menu-item>
        <el-menu-item index="/zsType4">
          <i class="el-icon-setting"></i>
          <span slot="title">转售分类四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <transition name="fade">
      <el-main>
        <router-view></router-view>
      </el-main>
    </transition>
  </el-container>
</template>

<script>
export default {
  name: "zsIndex",
  data() {
    return {
      activeIndex: "/zsType1"
    };
  },
  methods: {
    handleSelect(key, keypath) {
      this.$router.push("/index/zsIndex" + keypath);
    }
  }
};
</script>

<style lang="scss">
@import "./zsIndex.scss";
</style>

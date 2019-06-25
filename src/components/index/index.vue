<template>
  <div id="page-container">
    <el-container>
      <el-header>
        <navHeader></navHeader>
      </el-header>
      <el-main>
        <transition name="fade">
        <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navHeader from '../layout/header/header';

export default {
  name: "index",
  components: {
    navHeader
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
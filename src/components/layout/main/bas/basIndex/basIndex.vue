<template>
  <el-container class="bas-main">
    <el-aside width="200px">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item index="/basType1">
          <i class="el-icon-location"></i>
          <span slot="title">时延&话单量日指标</span>
        </el-menu-item>
        <el-menu-item index="/basType2">
          <i class="el-icon-menu"></i>
          <span slot="title">时延&话单量月指标</span>
        </el-menu-item>
        <el-menu-item index="/basType3">
          <i class="el-icon-document"></i>
          <span slot="title">时延&话单量分省指标</span>
        </el-menu-item>
				<el-menu-item index="/dashboard">
				  <i class="el-icon-document"></i>
				  <span slot="title">时延&话单量指标</span>
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
  name: "basIndex",
  data() {
    return {
      activeIndex: "/basType1"
    };
  },
  methods: {
    handleSelect(key, keypath) {
      this.$router.push("/index/basIndex" + keypath);
    }
  }
};
</script>

<style lang="scss">
@import "./basIndex.scss";
</style>

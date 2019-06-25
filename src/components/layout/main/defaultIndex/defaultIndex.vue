<template>
  <div class="default-main">
    默认页
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "defailtIndex"
};
</script>

<style lang="scss">
@import "./defaultIndex.scss";
</style>

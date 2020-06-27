<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import feed from "./views/feed";
import navBar from "./components/navBar";

export default {
  name: "App",

  components: {
    feed,
    navBar
  },

  data: () => ({
    //
  })
};
</script>
<style lang="scss">
@import "./style/global.scss";
// @import './custom.scss';
</style>

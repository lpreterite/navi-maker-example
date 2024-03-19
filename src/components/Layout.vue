<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <Navigator
        :data="navi"
        :active="active"
        :openeds="openeds"
        @select="jump"
      />
    </el-aside>
    <el-container>
      <el-header class="header" height="45px">
        <Crumb class="header__crumb" :route="$route.name"></Crumb>
        <el-dropdown
          class="header__userInfo"
          @command="onDropdownCommand"
          trigger="hover"
        >
          <el-avatar :size="28" icon="el-icon-user" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userDetail">详情</el-dropdown-item>
            <el-dropdown-item divided command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>
<script>
import { getNavi, getCrumb } from "@/router/";
import Navigator from "@/components/Navigator.vue";
import Crumb from "@/components/Crumb.vue";
import auth from "@/auth";
export default {
  components: {
    Navigator,
    Crumb,
  },
  data() {
    return {
      navi: getNavi(),
      openeds: [],
      active: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick(() => vm.updateNav(vm, to));
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.updateNav(this, to);
    next();
  },
  methods: {
    jump(path) {
      this.$router.push(path);
    },
    updateNav(vm, route) {
      const crumb = getCrumb(route.name);
      const currentNode = [...crumb].pop();
      const parentNode = [...crumb].shift();
      vm.openeds = [parentNode.path];
      vm.active = currentNode.path;
    },
    onDropdownCommand(name) {
      console.log(name);
      switch (name) {
        case "userDetail":
          break;
        case "logout":
          auth.logout();
          this.$router.push("/auth/login");
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  border-bottom: solid 1px #eee;
  display: flex;
  &__crumb {
    flex-grow: 1;
  }
  &__userInfo {
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

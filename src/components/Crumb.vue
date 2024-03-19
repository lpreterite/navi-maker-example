<template>
  <el-breadcrumb
    separator-class="el-icon-arrow-right"
    style="line-height: 45px"
  >
    <el-breadcrumb-item
      v-for="item in crumb"
      :key="item.name"
      :to="item.path"
      >{{ item.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script>
import { getCrumb } from "@/router/";
export default {
  props: {
    route: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      crumb: getCrumb(this.route) || [],
    };
  },
  watch: {
    route(val) {
      this.crumb = getCrumb(val);
    },
  },
};
</script>

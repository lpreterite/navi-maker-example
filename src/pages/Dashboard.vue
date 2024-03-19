<template>
  <div class="container">
    <h2>仪表盘</h2>
    <div class="dashboard-card">
      <div v-for="group in groups" :key="group.title">
        <el-card>
          <div slot="header">
            <span>{{ group.title }}</span>
          </div>
          <template v-for="content in group.children">
            <router-link
              :to="{ path: content.path }"
              class=""
              :key="content.title"
            >
              <i :class="content.icon"></i>
              <span>{{ content.title }}</span>
            </router-link>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      groups: [
        {
          title: "文章管理",
          children: [
            {
              title: "草稿箱",
              icon: "el-icon-document",
              path: "/posts/draf",
            },
            {
              title: "已发布",
              icon: "el-icon-document-checked",
              path: "/posts/publish",
            },
            {
              title: "垃圾桶",
              icon: "el-icon-delete",
              path: "/posts/trash",
            },
          ],
        },
        {
          title: "用户管理",
          children: [
            {
              title: "用户列表",
              icon: "el-icon-user",
              path: "/users",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.dashboard-card {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  > div {
    padding: 0 1em;
    flex-grow: 1;
    width: 25%;
  }
  i{
    display: block;
    font-size: 32px;
    text-align: center;
    color: #409eff;
  }
  a{
    display: inline-block;
    margin: 0.5em 0.5em 0.5em 0;
    color: #555;
    text-decoration: none;
    font-size: 14px;
  }
}
</style>

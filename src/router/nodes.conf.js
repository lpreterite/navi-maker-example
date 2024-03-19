export default [
  {
    name: "home",
    route: {
      path: "/",
      redirect: "/dashboard",
      meta:{
        authOn: true,
      },
      component: () => import("@/components/Layout.vue"),
    },
    children: [
      {
        name: "dashboard",
        title: "仪表盘",
        route: {
          path: "dashboard",
          component: () => import("@/pages/Dashboard.vue"),
        },
        navi: {
          path: "/dashboard?query=111",
        },
      },
      {
        name: "+posts",
        title: "文章库",
        navi: {
          path: "/posts/draf",
        },
        children: [
          {
            name: "posts/draf",
            title: "草稿箱",
            route: {
              path: "/posts/draf",
              component: () => import("@/pages/Draf.vue"),
            },
            navi: true,
          },
          {
            name: "posts/publish",
            title: "已发布",
            route: {
              path: "/posts/publish",
              component: () => import("@/pages/Publish.vue"),
            },
            navi: true,
          },
          {
            name: "+other",
            title: "其他",
            navi: {
              menuType: 2,
            },
            children: [
              {
                name: "posts/trash",
                title: "垃圾桶",
                route: {
                  path: "/posts/trash",
                  component: () => import("@/pages/Trash.vue"),
                },
                navi: true,
              },
            ],
          },
        ],
      },
      {
        name: "users",
        title: "用户管理",
        route: {
          path: "/users",
          component: () => import("@/pages/Users.vue"),
        },
        navi: true,
      },
    ],
  },
  {
    name: "login",
    title: "登录",
    route: {
      path: "/auth/login",
      component: () => import("@/pages/Login.vue"),
    },
  },
];

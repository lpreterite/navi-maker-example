export default [
  {
    name: "home",
    route: {
      path: "/",
      redirect: "/dashboard",
      meta: {
        authOn: true,
      },
      component: () => import("@/components/Layout.vue"),
    },
    children: [
      {
        name: "dashboard",
        title: "仪表盘",
        icon: "el-icon-menu",
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
        icon: "el-icon-folder-opened",
        navi: {
          path: "/posts/draf",
        },
        children: [
          {
            name: "posts/draf",
            title: "草稿箱",
            icon: "el-icon-document",
            route: {
              path: "/posts/draf",
              component: () => import("@/pages/Draf.vue"),
            },
            navi: true,
            children: [
              {
                name: "posts/draf/detail",
                title: "文章详情",
                route: {
                  path: "/posts/draf/:id",
                  component: () => import("@/pages/Post.vue"),
                  parentName: "home",
                },
                navi: {
                  shown: false,
                },
              },
            ],
          },
          {
            name: "posts/publish",
            title: "已发布",
            icon: "el-icon-document-checked",
            route: {
              path: "/posts/publish",
              component: () => import("@/pages/Publish.vue"),
            },
            navi: true,
            children: [
              {
                name: "posts/publish/detail",
                title: "文章详情",
                route: {
                  path: "/posts/publish/:id",
                  component: () => import("@/pages/Post.vue"),
                  parentName: "home",
                },
                navi: {
                  shown: false,
                },
              },
            ],
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
                icon: "el-icon-delete",
                route: {
                  path: "/posts/trash",
                  component: () => import("@/pages/Trash.vue"),
                },
                navi: true,
                children: [
                  {
                    name: "posts/trash/detail",
                    title: "文章详情",
                    route: {
                      path: "/posts/trash/:id",
                      component: () => import("@/pages/Post.vue"),
                      parentName: "home",
                    },
                    navi: {
                      shown: false,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "users",
        title: "用户管理",
        icon: "el-icon-user",
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

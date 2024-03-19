import Vue from "vue";
import VueRouter from "vue-router";
import nodes from "./nodes.conf";

import auth from "@/auth";

import { default as naviMaker, stuff } from "@packy-tang/navi-maker";

Vue.use(VueRouter);

const routes = stuff(naviMaker.getRoute(nodes), [], {
  handler: ({ node }, { handler, stuff }) => {
    //输出Vue-Router的数据格式
    const route = node.route || {};
    return {
      name: node.name,
      ...route,
      meta: {
        title: node.title,
        ...(route.meta || {}),
      },
      children: stuff(node.children, [], { handler, stuff }),
    };
  },
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let pageTitle;

  //TODO:根据路由拼凑标题头
  pageTitle = to.matched
    .map((matched) => matched.meta.title || "")
    .filter((title) => !!title)
    .reverse()
    .join(" - ");

  document.title = pageTitle + " | " + process.env.VUE_APP_SITE_TITLE;

  if (to.matched.some(record => record.meta.authOn)) {
    if (!auth.isLogin()) {
      next({ name: "login" });
      return;
    }
  }

  next();
});

const types = ["el-menu-item", "el-submenu", "el-menu-item-group"];
//获取导航配置
const navi = stuff(naviMaker.getNavi(nodes), [], {
  handler: ({ node, level }, { handler, stuff }) => {
    //输出导航组件使用的数据格式
    const navi = node.navi || {};
    const route = router.getRoutes().find((i) => i.name == node.name);
    const routeNode = router.resolve({ name: node.name });
    const type = ((node) => {
      let result = 0;
      node.children.filter(({ navi = {} } = {}) =>
        typeof navi.shown == "undefined" ? true : navi.shown
      ).length > 0 && ++result;
      level > 1 && ++result;
      if (typeof node.navi.menuType !== "undefined")
        result = node.navi.menuType; //由sitemap.js的naviRule存入
      return result;
    })(node);

    return {
      name: node.name,
      title: node.title,
      path: navi.path || (route ? routeNode.route.path : ""),
      shown: typeof navi.shown == "undefined" ? true : navi.shown,
      type: types[type],
      children: stuff(node.children, [], { handler, stuff }),
    };
  },
});

export function getNavi() {
  return navi;
}

export function getSitemap() {
  return naviMaker.getSitemap(nodes);
}

export function getCrumb(name) {
  return naviMaker.getCrumb(name, navi);
}

export default router;

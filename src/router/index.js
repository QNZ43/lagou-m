import Vue from "vue";
import VueRouter from "vue-router";
// 引入 store
import store from "@/store";

Vue.use(VueRouter);

// 路由规则（添加需要认证的 requiresAuth 信息）
const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/index"),
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: 'layout' */ "@/views/layout/index"),
    // 直接给某个路由设置，这时内部的子路由都需要认证（包含当前路由）
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'home' */ "@/views/home/index"),
        meta: {
          title: "home",
        },
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: 'role' */ "@/views/role/index"),
        meta: {
          title: "角色列表",
        },
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: 'menu' */ "@/views/menu/index"),
        meta: {
          title: "菜单列表",
        },
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(/* webpackChunkName: 'resource' */ "@/views/resource/index"),
        meta: {
          title: "资源列表",
        },
      },
      {
        path: "/course",
        name: "course",
        component: () =>
          import(/* webpackChunkName: 'course' */ "@/views/course/index"),
        meta: {
          title: "课程管理",
        },
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: 'user' */ "@/views/user/index"),
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: 'advert' */ "@/views/advert/index"),
        meta: {
          title: "广告列表",
        },
      },
      {
        path: "/advert/create",
        name: "ad-create",
        component: () =>
          import(/* webpackChunkName: 'menu-create' */ "@/views/advert/create"),
      },
      {
        path: "/advert/:id/edit",
        name: "ad-edit",
        component: () =>
          import(/* webpackChunkName: 'menu-edit' */ "@/views/advert/edit"),
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ "@/views/advert-space/index"
          ),
        meta: {
          title: "广告位列表",
        },
      },
      {
        path: "/advert-space/create",
        name: "adp-create",
        component: () =>
          import(
            /* webpackChunkName: 'menu-create' */ "@/views/advert-space/create"
          ),
      },
      {
        path: "/advert-space/:id/edit",
        name: "adp-edit",
        component: () =>
          import(
            /* webpackChunkName: 'menu-edit' */ "@/views/advert-space/edit"
          ),
      },
      // 添加菜单路由组件
      {
        path: "/menu/create",
        name: "menu-create",
        component: () =>
          import(/* webpackChunkName: 'menu-create' */ "@/views/menu/create"),
      },
      // 编辑菜单路由组件
      {
        path: "/menu/:id/edit",
        name: "menu-edit",
        component: () =>
          import(/* webpackChunkName: 'menu-edit' */ "@/views/menu/edit"),
      },
      // 分配菜单路由组件
      {
        path: "/role/:roleId/alloc-menu",
        name: "alloc-menu",
        component: () =>
          import(
            /* webpackChunkName: 'alloc-menu' */ "@/views/role/alloc-menu"
          ),
        props: true,
      },
      // 添加课程组件
      {
        path: "/course/create",
        name: "course-create",
        component: () =>
          import(
            /* webpackChunkName: 'course-create' */ "@/views/course/create"
          ),
      },
      // 编辑课程组件
      {
        path: "/course/:courseId/edit",
        name: "course-edit",
        component: () =>
          import(/* webpackChunkName: 'course-edit' */ "@/views/course/edit"),
        props: true,
      },
      // 课程内容组件
      {
        path: "/course/:courseId/section",
        name: "course-section",
        component: () =>
          import(
            /* webpackChunkName: 'course-section' */ "@/views/course/section"
          ),
        props: true,
      },
      // 上传课时视频
      {
        path: "/course/:courseId/video",
        name: "course-video",
        component: () =>
          import(/* webpackChunkName: 'course-video' */ "@/views/course/video"),
        props: true,
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: () =>
      import(/* webpackChunkName: 'error-page' */ "@/views/error-page/index"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份认证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 验证 Vuex 的 store 中的登录用户信息是否存储
    if (!store.state.user) {
      // 未登录，跳转到登录页
      return next({
        name: "login",
        query: {
          // 将本次路由的 fullPath 传递给 login 页面
          redirect: to.fullPath,
        },
      });
    }
    // 已经登录，允许通过
    next();
  } else {
    next();
  }
});

export default router;

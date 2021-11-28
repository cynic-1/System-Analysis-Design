
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  // 注册主页页面路由
  {
    path: '/home',
    component: () => import('pages/Home')
  },

  // 注册帖子页面路由
  {
    path: '/posts',
    component: () => import('pages/Posts/PostsMain.vue')
  },

  // 注册帖子搜索页面路由
  {
    path: '/posts/search',
    component: () => import('pages/Posts/PostSearch.vue')
  },

  // 注册帖子查看页面路由
  {
    path: '/posts/view',
    component: () => import('pages/Posts/PostView')
  },
  //注册登录界面路由
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },

  // 注册注册界面路由
  {
    path: '/register',
    component: () => import('pages/Register')
  },
  // 注册忘记密码界面路由
  {
    path: '/forgetPassword',
    component: () => import('pages/ForgetPassword')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }

]

export default routes

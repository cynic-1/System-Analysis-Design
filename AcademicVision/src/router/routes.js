
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/posts',
        component: () => import('pages/Posts/PostsMain.vue')
      },
      {
        path: '/posts/search',
        component: () => import('pages/Posts/PostSearch.vue')
      },
      {
        path: '/posts/view',
        component: () => import('pages/Posts/PostView')
      },
      {
        path: '/personal',
        component: () => import('pages/Personal/PersonalMain.vue')
      },
      {
        path: '/personalinformation',
        component: () => import('pages/Personal/PersonalInformation.vue')
      },
    ]
  },

  // // 注册帖子页面路由
  // {
  //   path: '/posts',
  //   component: () => import('pages/Posts/PostsMain.vue')
  // },
  //
  // // 注册帖子搜索页面路由
  // {
  //   path: '/posts/search',
  //   component: () => import('pages/Posts/PostSearch.vue')
  // },
  //
  // // 注册帖子查看页面路由
  // {
  //   path: '/posts/view',
  //   component: () => import('pages/Posts/PostView')
  // },
  // // 注册个人页面路由
  // {
  //   path: '/personal',
  //   component: () => import('pages/Personal/PersonalMain.vue')
  // },
  // // 注册个人信息路由
  // {
  //   path: '/personalinformation',
  //   component: () => import('pages/Personal/PersonalInformation.vue')
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

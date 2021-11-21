
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

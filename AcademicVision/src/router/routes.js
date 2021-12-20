
const routes = [
    {
        "path": "/",
        "component": () => import("layouts/MainLayout.vue"),
        "children": [
            { "path": "",
                "component": () => import("pages/Index.vue")
            },
            {
                "path": "/posts",
                "component": () => import("pages/Posts/PostsMain.vue")
            },
            {
                "path": "/posts/search",
                "component": () => import("pages/Posts/PostSearch.vue")
            },
            {
                "path": "/posts/view",
                "component": () => import("pages/Posts/PostView")
            },
            {
                "path": "/personal",
                "component": () => import("pages/Personal/PersonalMain.vue")
            },
            {
                "path": "/personalinformation",
                "component": () => import("pages/Personal/PersonalInformation.vue")
            },
            {
                "path": "/personalResearch",
                "component": () => import("pages/Personal/PersonalResearch")
            },
        ]
    },
    // 注册主页页面路由
    {
        "path": "/home",
        "component": () => import("pages/Home")
    },


    // 注册帖子页面路由
    {
        "path": "/posts",
        "component": () => import("pages/Posts/PostsMain.vue")
    },

    // 注册帖子搜索页面路由
    {
        "path": "/posts/search",
        "component": () => import("pages/Posts/PostSearch.vue")
    },

    // 注册帖子查看页面路由
    {
        "path": "/posts/view",
        "component": () => import("pages/Posts/PostView")
    },
    // 注册登录界面路由
    {
        "path": "/login",
        "component": () => import("pages/Login.vue")
    },

    // 注册注册界面路由
    {
        "path": "/register",
        "component": () => import("pages/Register")
    },
    // 注册忘记密码界面路由
    {
        "path": "/forgetPassword",
        "component": () => import("pages/ForgetPassword")
    },


    // 注册个人页面路由
    {
        "path": "/personal",
        "component": () => import("pages/Personal/PersonalMain.vue")
    },
    // 注册个人信息路由
    {
        "path": "/personalinformation",
        "component": () => import("pages/Personal/PersonalInformation.vue")
    },

    // 搜索结果页面路由
    {
        "path": "/search",
        "component": () => import("pages/Search/SearchResult.vue")
    },
    // 高级搜索页面路由
    {
        "path": "/search/advanced",
        "component": () => import("pages/Search/AdvancedSearch.vue")
    },
    {
        "path" : "/search/user",
        "component": () => import("pages/Search/UserSearch.vue")
    },
    {
      "path" : "/search/quoted",
      "component": () => import("pages/Search/QuotedResult.vue")
    },
    {
      "path" : "/paper/check",
      "component": () => import("pages/Paper/PaperCheck.vue")
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        "path": "/:catchAll(.*)*",
        "component": () => import("pages/Error404.vue")
    }
];

export default routes;

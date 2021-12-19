<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <NavBar />
    </q-header>
    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          :ripple="{ center: true }"
          rounded
          color="blue-6"
          label="帖子功能测试入口"
          no-caps
          @click="ChangetoPosts"
        />
        <q-btn
          :ripple="{ center: true }"
          rounded
          color="blue-6"
          label="搜索结果测试入口"
          no-caps
          @click="ChangetoSearch"
        />
        <q-btn
          :ripple="{ center: true }"
          rounded
          color="blue-6"
          label="登录注册测试入口"
          to="/register"
          no-caps
        />
        <q-btn
          :ripple="{ center: true }"
          rounded
          color="blue-6"
          label="主页测试入口"
          to="/home"
          no-caps
        />
        <q-btn
          :ripple="{ center: true }"
          rounded
          color="blue-6"
          label="个人中心测试入口"
          to="/personal"
          no-caps
        />
        <q-btn
          :ripple="{ center: true }"
          rounded
          color="blue-6"
          label="他人中心测试入口"
          to="/otherpersonal"
          no-caps
        />
        <q-btn
          :ripple="{ center: true }"
          rounded
          color="blue-6"
          label="管理员界面测试入口"
          to="/administrator"
          no-caps
        />
      </div>
      <div class="q-pa-md q-gutter-sm" />
    </q-page-container>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import NavBar from "components/NavBar";



export default defineComponent({
    "name": "MainLayout",

    "components": {
        NavBar,
    },

    setup () {

        const leftDrawerOpen = ref(false);

        return {
            leftDrawerOpen,
            toggleLeftDrawer () {

                leftDrawerOpen.value = !leftDrawerOpen.value;

            }
        };

    },

    "methods": {
        ChangetoPosts () {

            console.log("您点击了帖子功能按钮");
            this.$router.push({ "path": "/posts", "query": { "id": 123456 } });

        },

        ChangetoSearch () {

            this.$router.push("/search");

        },
        ChangeToRegister () {

            console.log("您点击了登录注册按钮");
            this.$router.push({ "path": "/register" });

        },
        ChangetoPersonal (){

            console.log("您点击了个人主页按钮");
            this.$router.push({ "path": "/personal", "query": { "id": 123456 } });

        }
    }
});
</script>

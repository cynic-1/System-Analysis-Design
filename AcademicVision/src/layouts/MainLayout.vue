<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <NavBar />
    </q-header>
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

            if (this.$store.state.person.userID === "") {

                alert("您还没有登录，即将为您跳转到登录界面");
                this.$router.push({ "path": "/login" });

            } else {

                this.$router.push({ "path": "/posts", "query": { "user_id": this.$store.state.person.userID } });

            }


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

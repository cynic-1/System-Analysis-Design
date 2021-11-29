<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <NavBar></NavBar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-btn :ripple="{ center: true }" rounded color="blue-6" label="帖子功能测试入口" @click="ChangetoPosts" no-caps/>
        <q-btn :ripple="{ center: true }" rounded color="blue-6" label="搜索结果测试入口" @click="ChangetoSearch" no-caps/>
        <q-btn :ripple="{ center: true }" rounded color="blue-6" label="登录注册测试入口" to="/register" no-caps/>
        <q-btn :ripple="{ center: true }" rounded color="blue-6" label="主页测试入口" to="/home" no-caps/>
      </div>
      <div class="q-pa-md q-gutter-sm">
      </div>
    </q-page-container>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="left"
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {defineComponent, ref} from 'vue'
import NavBar from "components/NavBar";

const linksList = [
  {
    title: '帖子测试入口',
    caption: 'post.dev',
    icon: 'school',
    link: '/posts'
  },
  {
    title: '个人主页测试入口',
    caption: 'personalInfo.dev',
    icon: 'book',
    link: '/personal'
  },
];



export default defineComponent({
  name: 'MainLayout',

  components: {
    NavBar,
    EssentialLink
  },

  methods: {
    ChangetoPosts() {
      console.log("您点击了帖子功能按钮");
      this.$router.push({path: '/posts', query: {id: 123456}});
    },

    ChangetoSearch() {
      this.$router.push('/search');
    },
    ChangeToRegister() {
      console.log("您点击了登录注册按钮");
      this.$router.push({path: '/register'});
    },
    ChangetoPersonal(){
      console.log("您点击了个人主页按钮");
      this.$router.push({path: '/personal', query: {id: 123456}});

    }
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

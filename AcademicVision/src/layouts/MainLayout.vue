<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <NavBar></NavBar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-btn :ripple="{ center: true }" rounded color="blue-6" label="帖子功能测试入口" @click="ChangetoPosts" no-caps/>
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
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
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
    ChangeToRegister() {
      console.log("您点击了登录注册按钮");
      this.$router.push({path: '/register'});
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

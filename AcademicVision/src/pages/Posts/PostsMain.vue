<template>
  <div>
    <q-banner inline-actions class="bg-primary text-white">
      模拟导航栏
      <template v-slot:action>
        <q-btn flat color="white" label="测试版本"/>
      </template>
    </q-banner>

    <q-layout view="hHr lpR fFf">

      <q-drawer
        elevated
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        side="left"
        :width="widthD"
        style="position: fixed;top: 0;left: 0"
      >
        <q-list>
          <q-tabs
            v-model="tab"
            vertical
            class="text-blue-6"
          >
            <q-tab name="1" icon="camera" label="首 页 推 荐"/>
            <q-tab name="2" icon="assessment" label="知 贴 热 榜"/>
            <q-tab name="3" icon="dashboard" label="知 贴 分 区"/>
            <q-tab name="4" icon="how_to_reg" label="我 的 知 贴"/>
          </q-tabs>

          <br><br><br><br><br><br><br><br><br><br><br><br>

          <q-item-label
            header
          >
            <div class="q-pa-md q-gutter-sm">
              <q-btn round color="blue-3" icon="arrow_back" @click="toggleLeftDrawer"/>
            </div>
            <h3 style="padding: 0;margin: 0;float: left">知贴&nbsp</h3>
            <Strong>Know You</Strong>
          </q-item-label>
        </q-list>
      </q-drawer>
      <PostDrawer v-show="!leftDrawerOpen" @click="toggleLeftDrawer"></PostDrawer>

      <q-page-container v-if="tab==='1'">
        <PostFirstPage style="padding-top: 10px;padding-right: 10px"></PostFirstPage>
      </q-page-container>
      <q-page-container v-else-if="tab==='2'">
        <PostRanking></PostRanking>
      </q-page-container>
      <q-page-container v-else-if="tab==='3'">
        <PostPartition style="padding-top: 10px;padding-right: 10px;margin-left: 60px"></PostPartition>
      </q-page-container>
      <q-page-container v-else-if="tab==='4'">
        <PostPeople style="padding-top: 10px;margin-left: 20px"></PostPeople>
      </q-page-container>

    </q-layout>
  </div>


</template>

<script>
import {tiArrowTopRight} from '@quasar/extras/themify';
import {matAllInbox} from '@quasar/extras/material-icons'
import PostFirstPage from "pages/Posts/PostFirstPage";
import PostRanking from "pages/Posts/PostRanking";
import EssentialLink from "components/EssentialLink";
import PostDrawer from "components/Posts/PostDrawer";
import PostPartition from "pages/Posts/PostPartition";
import PostPeople from "pages/Posts/PostPeople";
import {ref} from "vue";

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

export default {
  name: "PostsMain",

  data() {
    return {
      tab: "1",
      ratio: 50,
      left: false,
      widthD: 200
    }
  },

  methods: {
    ChangeMode() {
      console.log("转换菜单" + this.tab)
    }
  },

  components: {
    PostFirstPage,
    PostRanking,
    EssentialLink,
    PostDrawer,
    PostPartition,
    PostPeople
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }

}


</script>

<style scoped>

</style>

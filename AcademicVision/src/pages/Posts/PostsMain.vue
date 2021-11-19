<template>
  <div>
    <q-banner inline-actions class="bg-primary text-white">
      模拟导航栏
      <template v-slot:action>
        <q-btn flat color="white" label="测试版本"/>
      </template>
    </q-banner>

    <q-layout view="hHr lpR fFf">

      <q-drawer show-if-above v-model="left" side="left" :width="200">
        <!-- drawer content -->
        <q-splitter
          v-model="splitterModel"
          style="height: 970px"
          model-value="200px">

          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
              class="text-blue-6"
              @click="ChangeMode"
            >
              <q-tab name="1" icon="view_in_ar" label="首 页 推 荐"/>
              <q-tab name="2" icon="leaderboard" label="知 贴 热 榜"/>
              <q-tab name="3" icon="vertical_split" label="知 贴 分 区"/>
              <q-tab name="4" icon="how_to_reg" label="我 的 知 贴"/>
            </q-tabs>
          </template>
        </q-splitter>
      </q-drawer>

      <q-page-container v-show="tab==='1'">
        <PostFirstPage style="padding-top: 10px;padding-right: 10px"></PostFirstPage>
      </q-page-container>
      <q-page-container v-show="tab==='2'">
      </q-page-container>
      <q-page-container v-show="tab==='3'">
      </q-page-container>
      <q-page-container v-show="tab==='4'">
      </q-page-container>

    </q-layout>
  </div>


</template>

<script>
import {ref} from "vue";
import {tiArrowTopRight} from '@quasar/extras/themify';
import {matAllInbox} from '@quasar/extras/material-icons'
import PostFirstPage from "pages/Posts/PostFirstPage";

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
      splitterModel: 250,
      ratio: 50,
      left: false
    }
  },

  methods: {
    ChangeMode() {
      console.log("转换菜单" + this.tab)
    }
  },

  components: {
    PostFirstPage
  },

  watch: {
    splitterModel: {
      immediate: true,    //初始化时就调用handler

      handler(newvalue, oldvalue) { //只要isHot属性发生了改变就会调用handler函数，handler函数有两个参数
        console.log("isHot的值发生了改变，变为", newvalue);
        if (newvalue < 50) {
          this.splitterModel = 50;
        }
      }
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

}


</script>

<style scoped>

</style>

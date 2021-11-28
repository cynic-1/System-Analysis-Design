<template>
  <div>
    <q-banner inline-actions class="bg-primary text-white">
      模拟导航栏
      <template v-slot:action>
        <q-btn flat color="white" label="个人中心" @click="checkinfor"/>
      </template>
    </q-banner>

    <q-layout view="hHh lpR fFf">
      <q-card class="personal-menu-card">
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-avatar style="padding-top: 30px" square size="160px">
              <img src="../../../public/彼岸双生.png">
            </q-avatar>

            <q-card-actions vertical class="justify-around">
              <div style="padding-top: 10px;font-size :150%">昵称：{{this.nickname}}</div>
              <div style="padding-top: 10px;font-size :125%">姓名：{{this.name}}</div>
              <div style="padding-top: 10px;font-size :125%">所属单位：{{this.institution}}</div>
            </q-card-actions>
          </q-card-section>
        </q-card>
        <br><br>
      
        <q-tabs
        v-model="tab"
        no-caps
        outside-arrows
        mobile-arrows
        class="text-teal"
        >
        <q-tab name="1" style="width:200px" label="Information" />
        <q-tab name="2" style="width:200px" label="Research" />
        <q-tab name="3" style="width:200px" label="Message" />
        <q-tab name="4" style="width:200px" label="Saved" />
      </q-tabs>
      </q-card>
      <q-page-container v-if="tab==='1'">
        <PersonalInformation></PersonalInformation>
      </q-page-container>
      <q-page-container v-else-if="tab==='2'">

      </q-page-container>
      <q-page-container v-else-if="tab==='3'">

      </q-page-container>
      <q-page-container v-else-if="tab==='4'">

      </q-page-container>
    </q-layout>
  </div>


</template>

<script>
import PersonalInformation from "pages/Personal/PersonalInformation";

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
  name: "PersonalMain",

  data() {
    return {
      tab: "1",
      nickname:"双笙",
      name:"路人甲",
      institution:"buaa",
    }
  },

  methods: {
    checkinfor(){
      this.$router.push({path: '/personalinformation', query: {id: 123456}});
    }
  },

  components: {
    
  },


}


</script>

    PersonalInformation
<style lang="sass" scoped>
.personal-menu-card
  width: 100%
.my-card
  padding-left:370px
  width: 100%
  max-width: 1200px
</style>

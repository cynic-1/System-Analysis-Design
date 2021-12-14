<template>
  <div>
    <q-toolbar class="bg-primary Nav fa-text-height text-white">
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>
      <q-toolbar-title>Academic Vision</q-toolbar-title>
      <q-breadcrumbs
        active-color="white"
        style="font-size: 18px"
      >
        <q-breadcrumbs-el
          to="/home"
          label="主页"
          icon="home"
        />
        <q-breadcrumbs-el
          to="/posts"
          label="帖子"
          icon="widgets"
        />
        <q-breadcrumbs-el
          to=""
          label="科研用户"
          icon="science"
        />
        <q-breadcrumbs-el>
          <q-btn
            flat
            round
            dense
            label="个人"
            icon="account_circle"
          >
            <q-menu>
              <div class="row no-wrap q-pa-md" v-if="this.$store.state.login">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <template v-if="this.$store.state.person.headImage!==''">
                      <img :src="'/'+this.$store.state.person.headImage">
                    </template>
                    <template v-else>
                      <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                    </template>
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{this.$store.state.person.username}}
                  </div>

                  <q-btn
                    v-close-popup
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    @click="logout"
                  />
                </div>
                <q-separator
                  vertical
                  inset
                  class="q-mx-lg"
                />
                <div class="column items-md-center">
                  <div class="row items-md-center">
                    <q-btn
                      color="secondary"
                      label="个人信息"
                    />
                  </div>
                  <br>
                  <q-separator />
                  <div class="row">
                    <q-btn
                      color="secondary"
                      label="个人收藏"
                      size="md"
                    />
                  </div>
                  <br>
                  <div class="row items-md-center">
                    <q-btn
                      color="secondary"
                      label="我的消息"
                    />
                  </div>
                </div>
              </div>
              <div class="row no-wrap q-pa-md" v-else>
                <div class="row">您尚未登录，请前往</div>
                <br>
                <div class="row">
                  <q-btn
                    flat
                    v-close-popup
                    color="primary"
                    label="登录"
                    push
                    dense
                    size="sm"
                    to="/login"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </q-toolbar>
  </div>
</template>

<script>
export default {
    "name": "NavBar",
    "data": () => ({
        "user": {
            "username": "lx",
            "userImage": "",
            "signature": "",
            "userID": "123",
        }
    }),

    methods: {
        logout (){
          this.$store.commit("setLogout");
          sessionStorage.clear();
          this.$router.push({ "path": "/" });
        }
    },
};
</script>
<style>
.Nav{
  height: 10vh;
}
</style>

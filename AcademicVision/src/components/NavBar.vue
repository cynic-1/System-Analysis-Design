<template>
  <div>
    <q-toolbar class="bg-primary Nav fa-text-height text-white">

      <q-btn to="/home" flat unelevated padding="2vh" ripple="false">
      <q-avatar>
        <q-icon name="school" size="lg"></q-icon>
      </q-avatar>

      <q-toolbar-title>Academic Vision</q-toolbar-title>
      </q-btn>
      <q-space></q-space>
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
        <q-breadcrumbs-el>
          <q-btn
            flat
            round
            dense
            label="个人"
            icon="account_circle"
          >
            <q-menu>
              <div
                class="row no-wrap q-pa-md"
                v-if="this.$store.state.login"
              >
                <div class="column items-center">
                  <q-avatar size="72px">
                    <template v-if="this.$store.state.person.headImage!==''">
                      <img :src="'http://114.116.235.94/'+this.$store.state.person.headImage">
                    </template>
                    <template v-else>
                      <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                    </template>
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ this.$store.state.person.username }}
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
                  <div class="row items-md-center" style="margin-top: 20px">
                    <q-btn
                      color="secondary"
                      label="个人信息"
                      @click="personalInformation"
                    />
                  </div>
                  <br>
                  <q-separator />
                  <div class="row">
                    <q-btn
                      color="secondary"
                      label="个人收藏"
                      size="md"
                      @click="personalSaved"
                    />
                  </div>
                  <br>
                </div>
              </div>
              <div
                class="row no-wrap q-pa-md"
                v-else
              >
                <div class="row">
                  您尚未登录，请前往
                </div>
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

    "methods": {
        logout (){
          this.$store.commit("setLogout");
          sessionStorage.clear();
          this.$router.push({ "path": "/" });
        },
        personalInformation(){
          this.$router.push({
            "path": "/personal",
            "query": {
              "tab": "1",
              "userId": this.$store.state.person.userID
            }
          })
        },
        personalSaved(){
          this.$router.push({
            "path": "/personal",
            "query": {
              "tab": "4",
              "userId": this.$store.state.person.userID
            }
          })
        },
        personalMessage(){
          this.$router.push({
            "path": "/personal",
            "query": {
              "tab": "3",
            }
          })
        },
    },
};
</script>
<style>
.Nav{
  height: 7vh;
}
</style>

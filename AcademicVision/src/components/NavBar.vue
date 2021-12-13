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
          to="/"
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
              <div class="row no-wrap q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    晓海
                  </div>

                  <q-btn
                    v-close-popup
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
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
        toPersonalInfo (){

            this.$router.push({ "path": `/PersonalInfo/${this.$store.state.person.userID}` });
        
        },
        toggleLeftDrawer () {

            leftDrawerOpen.value = !leftDrawerOpen.value;
        
        },
        toBlogs () {

            this.$router.push({ "path": "/BlogList" });
        
        },
        logout (){

            //        this.$store.commit('setLogout')
            //        this.$router.push({path:"/"});
            this.$http({
                "method": "post",
                "url": "/logout",
            }).then(res => {

                if (res.data.success){

                    this.$store.commit("setLogout");
                    this.$router.push({ "path": "/" });
                    sessionStorage.clear();
                
                }
            
            });

        }
    },
};
</script>
<style>
.Nav{
  height: 10vh;
}
</style>

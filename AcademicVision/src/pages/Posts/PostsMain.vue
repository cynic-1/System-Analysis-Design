<template>
  <div>
    <q-layout view="hHr lpR fFf">
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="logout" color="primary" text-color="white" size="36px"/>
            <span class="q-ml-sm" style="font-size: 20px">您还没有登录，即将为您跳转到登录界面</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="确定" color="primary" v-close-popup @click="method1" size="20px"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-drawer
        v-model="leftDrawerOpen"
        elevated
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
            <q-tab
              name="1"
              icon="camera"
              label="首 页 推 荐"
            />
            <q-tab
              name="2"
              icon="assessment"
              label="知 贴 热 榜"
            />
            <q-tab
              name="3"
              icon="dashboard"
              label="知 贴 分 区"
            />
            <q-tab
              name="4"
              icon="how_to_reg"
              label="我 的 知 贴"
            />
          </q-tabs>

          <br><br><br><br><br><br><br><br><br><br><br><br>

          <q-item-label
            header
          >
            <div class="q-pa-md q-gutter-sm">
              <q-btn
                round
                color="blue-3"
                icon="arrow_back"
                @click="toggleLeftDrawer"
              />
            </div>
            <h3 style="padding: 0;margin: 0;float: left">
              知贴
            </h3>
            <Strong>Know You</Strong>
          </q-item-label>
        </q-list>
      </q-drawer>

      <PostDrawer
        v-show="!leftDrawerOpen"
        @click="toggleLeftDrawer"
      />

      <q-page-container v-if="tab==='1'">
        <PostFirstPage style="padding-top: 10px;padding-right: 10px"/>
      </q-page-container>
      <q-page-container v-else-if="tab==='2'">
        <PostRanking/>
      </q-page-container>
      <q-page-container v-else-if="tab==='3'">
        <PostPartition style="padding-top: 10px;padding-right: 10px;margin-left: 60px"/>
      </q-page-container>
      <q-page-container v-else-if="tab==='4'">
        <PostPeople
          style="padding-top: 10px;margin-left: 20px"
          @func="leftDrawerOpen = true"
        />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {tiArrowTopRight} from "@quasar/extras/themify";
import {matAllInbox} from "@quasar/extras/material-icons";
import PostFirstPage from "pages/Posts/PostFirstPage";
import PostRanking from "pages/Posts/PostRanking";
import PostDrawer from "components/Posts/PostDrawer";
import PostPartition from "pages/Posts/PostPartition";
import PostPeople from "pages/Posts/PostPeople";
import {ref} from "vue";

export default {
  "name": "PostsMain",

  "components": {
    PostFirstPage,
    PostRanking,
    PostDrawer,
    PostPartition,
    PostPeople
  },

  setup() {

    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {

        leftDrawerOpen.value = !leftDrawerOpen.value;

      }
    };

  },

  data() {

    return {
      "tab": "1",
      "ratio": 50,
      "left": false,
      "widthD": 200,
      "confirm": false,
    };

  },

  "methods": {
    ChangeMode() {

      console.log(`转换菜单${this.tab}`);

    },

    method1() {
      this.$router.push({path: "/login"});
    }
  },

  mounted() {
    if (!this.$store.state.login) {
      // alert("您还没有登录，即将为您跳转到登录界面");
      this.confirm = true;
      // this.$router.push({path: "/login"});
    }
  }

};


</script>

<style scoped>

</style>

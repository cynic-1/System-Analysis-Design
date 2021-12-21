<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-card class="personal-menu-card">
        <q-card class="my-card">
          <q-card-section
            horizontal
            style="padding-top: 30px"
          >
            <q-btn
              round
              @click="alert = true"
            >
              <q-avatar size="120px">
                <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="用户头像">
              </q-avatar>
            </q-btn>

            <q-card-actions
              vertical
              class="justify-around"
              style="padding-left: 100px"
            >
              <div class="q-py-sm">
                <span class="text-weight-bold text-h4">{{ name }}</span>
              </div>
              <div class="q-py-sm">
                <span class="text-grey text-h5">{{ institution }}--{{ department }}--{{degree}}</span>
              </div>
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
          <q-tab
            name="1"
            style="width:200px;font-size: 20px"
            label="个人信息"
          />
          <q-tab
            name="2"
            style="width:200px"
            label="学者主页"
          />
          <q-tab
            name="3"
            style="width:200px"
            label="消息中心"
          />
          <q-tab
            name="4"
            style="width:200px"
            label="收藏夹"
          />
        </q-tabs>
      </q-card>
      <q-separator
        inset
        color="grey-11"
      />
      <q-tab-panels v-model="tab">
        <q-tab-panel name="1">
          <PersonalInformation />
        </q-tab-panel>
        <q-tab-panel name="2">
          <personal-research
            ref="personal-research"
            @changeTab="changeTab"
          />
        </q-tab-panel>
        <q-tab-panel name="3" >
          <personal-message/>
        </q-tab-panel>
        <q-tab-panel name="4">
          <PersonalSaved />
        </q-tab-panel>
      </q-tab-panels>
    </q-layout>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            请选择您要上传的头像
          </div>
        </q-card-section>
        <q-uploader
          style="max-width: 300px"
          url="http://localhost:4444/upload"
          label="仅限于jpg,png文件"
          accept=".jpg,.png, image/*"
          @rejected="onRejected"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";

const PersonalInformation = defineAsyncComponent(() => import("./PersonalInformation"));
const PersonalResearch = defineAsyncComponent(() => import("./PersonalResearch"));
const PersonalSaved = defineAsyncComponent(() => import("./PersonalSaved"));
const PersonalMessage = defineAsyncComponent(() => import("./PersonalMessage"));

export default {
    "name": "PersonalMain",

    "components": {
        PersonalSaved,
        PersonalResearch,
        PersonalInformation,
      PersonalMessage
    },
    setup () {

        return {
            "alert": ref(false),
        };

    },
    data () {

        return {
            "tab": "1",
            "nickname": "双笙",
            "name": "路人甲",
            "degree": "在读",
            "institution": "北京航空航天大学",
            "department": "软件工程",
        };

    },

    "methods": {
        checkinfor (){

            this.$router.push({ "path": "/personalinformation", "query": { "id": 123456 } });

        },
        changeTab (tab) {

            this.tab = tab;

        }
    },


};


</script>


<style lang="sass" scoped>
.personal-menu-card
  width: 100%
.my-card
  padding-left: 370px
  width: 100%
  max-width: 1200px
</style>

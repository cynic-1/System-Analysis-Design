<template>
  <div>
    <!--    <q-banner inline-actions class="bg-primary text-white">-->
    <!--      模拟导航栏-->
    <!--      <template v-slot:action>-->
    <!--        <q-btn flat color="white" label="个人中心" @click="checkinfor"/>-->
    <!--      </template>-->
    <!--    </q-banner>-->

    <q-layout view="hHh lpR fFf">
      <q-card class="personal-menu-card">
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-avatar
              style="padding-top: 30px"
              square
              size="160px"
            >
              <img src="../../../public/彼岸双生.png">
            </q-avatar>

            <q-card-actions
              vertical
              class="justify-around"
            >
              <div style="padding-top: 10px;font-size :150%">
                昵称：{{ nickname }}
              </div>
              <div style="padding-top: 10px;font-size :125%">
                姓名：{{ name }}
              </div>
              <div style="padding-top: 10px;font-size :125%">
                所属单位：{{ institution }}
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
            style="width:200px"
            label="Information"
          />
          <q-tab
            name="2"
            style="width:200px"
            label="Research"
          />
          <q-tab
            name="3"
            style="width:200px"
            label="Message"
          />
          <q-tab
            name="4"
            style="width:200px"
            label="Saved"
          />
        </q-tabs>
      </q-card>
      <q-page-container v-if="tab==='1'">
        <PersonalInformation />
      </q-page-container>
      <q-page-container v-else-if="tab==='2'">
        <personal-research />
      </q-page-container>
      <q-page-container v-else-if="tab==='3'" />
      <q-page-container v-else-if="tab==='4'">
        <PersonalSaved />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const PersonalInformation = defineAsyncComponent(() => import("./PersonalInformation"));
const PersonalResearch = defineAsyncComponent(() => import("./PersonalResearch"));
const PersonalSaved = defineAsyncComponent(() => import("./PersonalSaved"));

export default {
    "name": "PersonalMain",

    "components": {
        PersonalSaved,
        PersonalResearch,
        PersonalInformation,
    },
    data () {

        return {
            "tab": "1",
            "nickname": "双笙",
            "name": "路人甲",
            "institution": "buaa",
        };
    
    },

    "methods": {
        checkinfor (){

            this.$router.push({ "path": "/personalinformation", "query": { "id": 123456 } });
        
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

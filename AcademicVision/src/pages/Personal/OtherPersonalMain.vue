<template>
  <div>

    <q-layout view="hHh lpR fFf">
      <q-card class="other-personal-menu-card">
        <q-card class="other-card">
          <q-card-section horizontal style="padding-top: 30px">
            <q-btn round >
              <q-avatar size="180px">
                <img src="../../../public/彼岸双生.png" />
              </q-avatar>
            </q-btn>

            <q-card-actions
              vertical
              class="justify-around"
              style="padding-left: 100px"
            >
              <div style="padding-top: 10px;font-size :150%">
                昵称：{{ nickname }}
              </div>
              <div style="font-size :125%">
                所属单位：{{ institution }}
              </div>
              <div style="font-size :125%">
                特长：{{ hobby }}
              </div>
            </q-card-actions>
            <q-card-actions
              v-if="this.is_associated===1"
              vertical
              class="justify-around"
              style="margin-left: 100px"
            >
              <q-btn v-if="!isFollowed" color="primary" style="width: 100px" no-caps label="Follow" @click="changeFollow"/>
              <q-btn v-if="isFollowed" color="grey" style="width: 100px" no-caps label="Unfollow"  @click="changeFollow"/>
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
        </q-tabs>
      </q-card>
      <q-page-container v-if="tab==='1'">
        <OtherPersonalInformation />
      </q-page-container>
      <q-page-container v-else-if="tab==='2'">
        <personal-research />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import { defineAsyncComponent } from "vue";

const OtherPersonalInformation = defineAsyncComponent(() => import("./OtherPersonalInformation"));
const PersonalResearch = defineAsyncComponent(() => import("./PersonalResearch"));

export default {
  "name": "OtherPersonalMain",

  "components": {
    PersonalResearch,
    OtherPersonalInformation,
  },
  setup () {
    return {
      alert: ref(false),
    }
  },
  data () {

    return {
      "tab": "1",
      "nickname": "",
      "name": "",
      "institution": "",
      "department" :"",
      "isFollowed":false,
      "is_associated":0,
      "hobby":""
    };

  },
  "mounted": function () {
    this.loadOtherpersonalInfo()
  },

  "methods": {
    loadOtherpersonalInfo(){
      this.$axios({
        method:"post",
        url:"http://114.116.235.94/check_my_info/",
        header:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
          user_id:window.sessionStorage.getItem('otherpersonid'),
        },
        transformRequest:[function(data){
          let ret = ''
          for(let it in data){
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res)=>{
        console.log(res.data.info )
        let info = res.data.info ;
        this.nickname = info.user_name;
        if (info.org!==null){
          this.institution = info.org;
        }
        if (info.is_associated!==null) {
          this.is_associated = info.is_associated;
        }
        if (info.hobby!==null) {
          this.hobby = info.hobby;
        }
        // if(info.signature !== null)
        //   this.Form.signature = info.signature;
        // if(info.briefintroduction !== null)
        //   this.Form.briefintroduction = info.briefintroduction;
      })
    },
    checkotherinfor (){

      this.$router.push({ "path": "/otherpersonalinformation", "query": { "id": 123456 } });

    },
    changeFollow(){
      if(this.isFollowed){
        this.isFollowed=false;
      }
      else {
        this.isFollowed=true;
      }
    }
  },


};


</script>


<style lang="sass" scoped>
.other-personal-menu-card
  width: 100%
.other-card
  padding-left: 370px
  width: 100%
  max-width: 1200px
</style>

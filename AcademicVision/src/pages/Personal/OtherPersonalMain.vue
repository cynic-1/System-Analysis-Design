<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-card class="other-personal-menu-card">
        <q-card class="other-card">
          <q-card-section
            horizontal
            style="padding-top: 30px"
          >
            <q-btn
              round
              @click="alert = true"
            >
              <q-avatar size="120px">
                <img :src="this.OtherimgUrl" alt="用户头像">
              </q-avatar>
            </q-btn>

            <q-card-actions
              vertical
              class="justify-around"
              style="padding-left: 100px"
            >
              <div class="q-py-sm">
                <span class="text-weight-bold text-h4">{{ nickname }}</span>
              </div>
              <div class="q-py-sm">
                <span class="text-grey text-h5">{{ institution }}--{{ department }}</span>
              </div>
            </q-card-actions>
            <q-card-actions
              v-if="this.is_associated===1"
              vertical
              class="justify-around"
              style="margin-left: 100px"
            >
              <q-btn
                v-if="!isFollowed"
                color="primary"
                style="width: 100px"
                no-caps
                label="Follow"
                @click="changeFollow"
              />
              <q-btn
                v-if="isFollowed"
                color="grey"
                style="width: 100px"
                no-caps
                label="Unfollow"
                @click="changeFollow"
              />
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
            label="个人信息"
          />
          <q-tab
            name="2"
            style="width:200px"
            label="学者主页"
          />
        </q-tabs>
      </q-card>
      <q-tab-panels v-model="tab">
        <q-tab-panel  name="1">
          <OtherPersonalInformation />
        </q-tab-panel>
        <q-tab-panel  name="2">
          <OtherPersonalResearch />
        </q-tab-panel>
      </q-tab-panels>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineAsyncComponent } from "vue";

const OtherPersonalInformation = defineAsyncComponent(() => import("./OtherPersonalInformation"));
const OtherPersonalResearch = defineAsyncComponent(() => import("./OtherPersonalResearch"));

export default {
  "name": "OtherPersonalMain",

  "components": {
    OtherPersonalResearch,
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
      "hobby":"",
      "OtherimgUrl":"",
      "author_id": "",
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
          user_id2:this.$store.state.person.userID,
        },
        transformRequest:[function(data){
          let ret = ''
          for(let it in data){
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res)=>{
        if(this.$route.query.tab) {
          this.tab = this.$route.query.tab;
        }
        console.log(res.data.info )
        let info = res.data.info ;
        this.nickname = info.user_name;
        this.OtherimgUrl = 'http://114.116.235.94/' +  info.image;
        if (info.org!==null){
          this.institution = info.org;
        }
        if (info.is_associated!==null) {
          this.is_associated = info.is_associated;
        }
        if (info.hobby!==null) {
          this.hobby = info.hobby;
        }
        if (info.department!==null) {
          this.department = info.department;
        }
        this.author_id=info.author_id;
        if(info.isfollow===0){
          console.log("未关注");
          this.isFollowed=false
        }
        else {
          console.log("已关注");
          this.isFollowed=true
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
    changeFollow (){
      if (this.isFollowed){
        this.isFollowed = false;
        this.$axios({
          method:"post",
          url:"http://114.116.235.94/un_col_author/",
          header:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:{
            user_id:this.$store.state.person.userID,
            author_id:this.author_id,
          },
          transformRequest:[function(data){
            let ret = ''
            for(let it in data){
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then((res)=>{
          console.log(res.data.code )
        })
      } else {
        this.isFollowed = true;
        this.$axios({
          method:"post",
          url:"http://114.116.235.94/col_author/",
          header:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:{
            user_id:this.$store.state.person.userID,
            author_id:this.author_id,
          },
          transformRequest:[function(data){
            let ret = ''
            for(let it in data){
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then((res)=>{
          alert("关注成功")
          console.log(res.data.code)
        })
          }
      }
    },


};


</script>


<style lang="sass" scoped>
.other-personal-menu-card
  width: 100%
.other-card
  padding-left: 500px
  width: 100%
  max-width: 1400px
</style>

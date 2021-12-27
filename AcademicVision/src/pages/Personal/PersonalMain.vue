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
              <q-avatar size="120px" >
                <img :src="this.imgUrl" alt="用户头像">
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
          <PersonalInformation :imageurl="this.imgUrl" :canEdit="this.canEdit"
          @changeUserName="changeUserName"/>
        </q-tab-panel>
        <q-tab-panel name="2">
          <personal-research
            ref="personal-research"
            :canEdit="canEdit"
            @changeTab="changeTab"
          />
        </q-tab-panel>
        <q-tab-panel name="3">
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
          auto-upload
          style="max-width: 300px"
          label="仅限于jpg,png文件"
          accept=".jpg,.png, image/*"
          @uploaded="attachmentUploaded"
          url="http://114.116.235.94/save_img/"
          field-name="picture"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, watch } from "vue";

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
            "filesImages": ref(null),
        };

    },
    data () {

        return {
            "tab": "1",
            "nickname": "",
            "name": "",
            "institution": "",
            "department" :"",
            "is_associated":0,
            "hobby":"",
            "imgUrl":"",
            "user_id":this.$store.state.person.userID,
            "canEdit": false
        };

    },
    mounted () {
      this.loadpersonalInfo()
      this.canEdit = this.$route.query.userId === this.$store.state.person.userID
      watch(
        this.$store.state.person.username,
        (newName) => {
          this.nickname = newName
          console.log(this.nickname)
        },
        { "deep": true }
      );
    },

    "methods": {
        checkinfor (){
            this.$router.push({ "path": "/personalinformation", "query": { "id": 123456 } });
        },
        loadpersonalInfo(){
          if(this.$route.query.tab) {
            this.tab = this.$route.query.tab;
          }
          this.$axios({
            method:"post",
            url:"http://114.116.235.94/check_my_info/",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
              user_id: this.$route.query.userId,
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
            this.imgUrl = "http://114.116.235.94/" +  info.image;
            this.$store.commit("setUserHeadImage",info.image)
            console.log(this.imgUrl)
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

            // if(info.signature !== null)
            //   this.Form.signature = info.signature;
            // if(info.briefintroduction !== null)
            //   this.Form.briefintroduction = info.briefintroduction;
          })
        },
        changeTab (tab) {

            this.tab = tab;
        },
      attachmentUploaded:function (file){
        // console.log(file.name)
        console.log(file["files"][0])
        this.$axios({
          method:"post",
          url:"http://114.116.235.94/change_img/",
          header:{
            'Content-Type': 'multipart/from-data'
          },
          data:{
            user_id:this.$store.state.person.userID,
            picture:file["files"][0].name,
          },
          transformRequest:[function(data){
            let ret = ''
            for(let it in data){
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then((res)=>{
          console.log("更新成功")
          this.loadpersonalInfo()
        })
       },
      changeUserName() {
          console.log(this.$store.state.person.username)
          this.nickname = this.$store.state.person.username
      }
    },


};


</script>


<style lang="sass" scoped>
.personal-menu-card
  width: 100%
.my-card
  padding-left: 500px
  width: 100%
  max-width: 1200px
</style>

<template>
  <div>

    <q-layout view="hHh lpR fFf">
      <q-card class="personal-menu-card">
        <q-card class="my-card">
          <q-card-section horizontal style="padding-top: 30px">
            <q-btn round @click="alert = true">
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
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">请选择您要上传的头像</div>
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
import { ref } from 'vue'
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
            "is_associated":0,
            "hobby":""
        };

    },
    "mounted": function () {
      this.loadpersonalInfo()
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
              user_id:this.$store.state.person.userID,
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

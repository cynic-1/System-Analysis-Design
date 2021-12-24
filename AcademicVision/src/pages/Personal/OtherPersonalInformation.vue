<template>
  <right-drawer>
    <template #main>
      <q-card
        class="information-card-1"
        style="width: 80%;margin-left: 160px;padding: 10px 25px"
      >
        <div class="clearfix">
          <span style="font-size: 28px;">About {{ Form.nickname }}</span>
        </div>
        <q-separator />
        <br>
        <div>
          <div class="text-h6 q-mt-sm q-mb-xs">
            自我介绍
          </div>
          <div v-if="Form.introduction.length!==0">
            {{ Form.introduction }}
          </div>
          <div v-if="Form.introduction.length===0">
            <q-btn
              outline
              no-caps
              color="black"
              class="full-width"
            >
              <div class="text-h6 q-mt-sm q-mb-xs">
                该用户尚未进行自我介绍。
              </div>
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">
            常用语言
          </div>
          <div v-if="Form.Language.length!==0">
            <q-btn
              outline
              no-caps
              rounded
              color="grey"
            >
              {{ Form.Language }}
            </q-btn>
          </div>
          <div v-if="Form.Language.length===0">
            <q-btn
              outline
              no-caps
              color="black"
              class="full-width"
            >
              <div class="text-h6 q-mt-sm q-mb-xs">
                该用户尚未选择常用语言。
              </div>
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">
            学科
          </div>
          <div v-if="Form.disciplines.length!==0">
            <q-btn
              outline
              no-caps
              rounded
              color="grey"
            >
              {{ Form.disciplines }}
            </q-btn>
          </div>
          <div v-if="Form.Language.length===0">
            <q-btn
              outline
              no-caps
              color="black"
              class="full-width"
            >
              <div class="text-h6 q-mt-sm q-mb-xs">
                该用户尚未填写他的学科。
              </div>
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">
            技能与专长
          </div>
          <div v-if="Form.skill.length!==0">
            <q-btn
              outline
              no-caps
              rounded
              color="grey"
            >
              {{ Form.skill }}
            </q-btn>
          </div>
          <div v-if="Form.skill.length===0">
            <q-btn
              outline
              no-caps
              color="black"
              class="full-width"
            >
              <div class="text-h6 q-mt-sm q-mb-xs">
                该用户尚未填写他的技能与专长。
              </div>
            </q-btn>
          </div>
        </div>
      </q-card>
      <br>
      <div
        class="text-h4 q-mt-sm q-mb-xs"
        style="width: 80%;margin-left: 160px;"
      >
        学 者
        <q-separator />
      </div>
      <br>
      <q-card
        class="information-card-2"
        style="width: 80%;margin-left: 160px;padding: 10px 25px"
      >
        <div class="clearfix">
          <span style="font-size: 20px;">学者概况</span>
        </div>
        <q-separator inset />
        <br>
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card style="width: 150px;height: 75px;padding-left:10px">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ Form.Researchitemnum }}
            </div>
            <div>Research item</div>
          </q-card>
          <q-card style="width: 150px;height: 75px;padding-left:10px">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ Form.Projectnum }}
            </div>
            <div>Project</div>
          </q-card>
          <q-card style="width: 150px;height: 75px;padding-left:10px">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ Form.Questionnum }}
            </div>
            <div>Questions</div>
          </q-card>
          <q-card style="width: 150px;height: 75px;padding-left:10px">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ Form.Answernum }}
            </div>
            <div>Answers</div>
          </q-card>
        </div>
      </q-card>
    </template>
    <template #rightDrawer>
      <q-card
        class="information-card-3"
        style="width:280px;margin-right: 100px;padding: 10px 10px"
      >
        <div class="clearfix">
          <span style="font-size: 28px">所属机构</span>
        </div>
        <q-separator inset />
        <br>
        <div>
          <p style=" font-size : 2em">
            {{ Form.institution }}
          </p>
          <p style=" font-size : 1.5em">
            部门：{{ Form.department }}
          </p>
          <p style="font-size : 1em">
            在职岗位：{{ Form.position }}
          </p>
          <p style="font-size : 1em">
            研究方向：{{ Form.direction }}
          </p>
          <p style="font-size : 1em">
            研究成果：{{ Form.achievement }}
          </p>
          <div v-if="Form.text.length!==0">
            <div class="text-weight-bold">
              该用户所属机构的描述
            </div>
            <q-input
              outlined
              type="textarea"
              autogrow
              disable
              v-model="Form.text"
            />
          </div>
        </div>
      </q-card>
      <br><br>
      <q-card
        class="information-card-5"
        style="width:280px;margin-right: 100px;padding: 10px 10px"
      >
        <div class="clearfix">
          <span style="font-size: 28px;">Network</span>
        </div>
        <q-separator inset />
        <br>
        <p style=" font-size : 1.5em">
          Following({{ colAuthorList.length }})
        </p>
        <div
          v-for="author in colAuthorList"
          :key="author">
          <q-item>
            <q-item-section side>
              <q-avatar
                rounded
                size="48px"
              >
                <img :src="'http://114.116.235.94/'+author.img">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ author.author_name }}</q-item-label>
              <q-item-label caption>
                {{ author.org }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-card>
    </template>
  </right-drawer>
</template>

<script>
import { defineAsyncComponent } from "vue";
import RightDrawer from "layouts/RightDrawer";

const rightDrawer = defineAsyncComponent(() => import("../../layouts/RightDrawer"));

export default {
    "name": "OtherPersonalInformation",

    "components": { RightDrawer },

    data () {

    return {
      "accept": false,
      "colAuthorList":[],
      "Form": {
        "nickname": "",
        "name": "",
        "institution": "",
        "disciplines": "",
        "skill": "",
        "position": "",
        "department": "",
        "direction": "",
        "achievement": "",
        "introduction":"",
        "Language":"",
        "text": "",
        "OtherimgUrl":"",
        "follownum": 1,
        "Researchitemnum":0,
        "Projectnum":0,
        "Questionnum":0,
        "Answernum":0,
      }
    };

  },
  "mounted": function () {
    this.loadOtherInfo()
    this.loadothercolAuthor()
  },
  "methods": {
    loadothercolAuthor(){
      this.$axios({
        method:"post",
        url:"http://114.116.235.94/my_col_author_list/",
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
        this.colAuthorList = info;

      })
    },
    loadOtherInfo(){
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
        this.Form.nickname = info.user_name;
        this.Form.OtherimgUrl = 'http://114.116.235.94/' +  info.image;
        if (info.org!==null){
          this.Form.institution = info.org;
        }
        if (info.is_associated!==null) {
          this.Form.is_associated = info.is_associated;
        }
        if (info.hobby!==null) {
          this.Form.skill = info.hobby;
        }
        if (info.bio!==null) {
          this.Form.introduction = info.bio;
        }
        if (info.subject!==null) {
          this.Form.disciplines = info.subject;
        }
        if (info.language!==null) {
          this.Form.Language = info.language;
        }
        if (info.department!==null) {
          this.Form.department = info.department;
        }
        if (info.direction!==null) {
          this.Form.direction = info.direction;
        }
        if (info.achievement!==null) {
          this.Form.achievement = info.achievement;
        }
        if (info.position!==null) {
          this.Form.position = info.position;
        }
        if (info.org_bio!==null) {
          this.Form.text = info.org_bio;
        }
        // if(info.briefintroduction !== null)
        //   this.Form.briefintroduction = info.briefintroduction;
      })
    }
  },
};

</script>

<style lang="sass" scoped>

</style>

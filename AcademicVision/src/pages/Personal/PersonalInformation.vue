<template>
  <right-drawer>
    <template #main>
      <q-card
        class="information-card-1"
        style="width: 80%;margin-left: 160px;padding: 10px 25px"
      >
        <div v-if="disabled">
          <div class="clearfix">
            <span style="font-size: 20px;">
              <q-icon name="lock" />
              此预览是私有的 — 只有您可以在个人资料中看到它</span>
            <q-btn
              flat
              color="black"
              label="Edit"
              icon-right="create"
              style="float: right; padding: 3px 0"
              @click="chgcard()"
            />
          </div>
          <q-separator />
          <br>
          <div>
            <p style="font-size : 1.5em">
              名 片
            </p>
            <div class="text-caption text-grey">
               您的名片是您个人资料的简短摘要，可以在平台上向其他人显示。确保它是最新的，以便其他人可以轻松了解您。
            </div>
            <br>
            <q-card
              class="my-card"
              flat
              bordered
              style="padding:30px 30px"
            >
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-h5 q-mt-sm q-mb-xs">
                    {{ Form.nickname }}
                  </div>
                  <br>
                  <div class="text-caption text-grey">
                    机构
                  </div>
                  <p>{{ Form.institution }}</p>
                  <div class="text-caption text-grey">
                    部门
                  </div>
                  <p>{{ Form.department }}</p>
                </q-card-section>

                <q-card-section style="padding-left: 300px">
                  <q-avatar size="100px">
                    <img
                      class="rounded-borders"
                      :src="this.imageurl" alt="用户头像"
                    />
                  </q-avatar>
                </q-card-section>
              </q-card-section>
            </q-card>
            <br>
          </div>
        </div>
        <div v-if="!disabled">
          <div class="clearfix">
            <span style="font-size: 20px;">编辑您的名片</span>
            <div class="text-caption text-grey">
              确保您的名片信息准确且最新
            </div>
          </div>
          <q-separator />
          <br>
          <div>
            <div
              style="padding: 0 60px 0 30px"
              class="text-caption text-grey"
            >
              当您对以下信息进行更改时，您的个人资料将使用相同的信息进行更新。
            </div>
            <br>
            <q-form
              class="q-gutter-md"
              @submit="onSubmit1"
              @reset="onReset"
            >
              <div
                style="padding: 0 60px 0 30px"
                class="text-h5 q-mt-sm q-mb-xs"
              >
                {{ Form.nickname }}
              </div>
              <div
                style="padding: 0px 60px 0px 30px"
                class="text-weight-bold"
              >
                用户名*
              </div>
              <q-input
                v-model="Form.nickname"
                outlined
                bottom-slots
                dense
                filled
                style="padding: 0px 60px 0px 30px;margin-top: 0px"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <!-- <div
                style="padding: 0px 60px 0px 30px"
                class="text-weight-bold"
              >
                姓名*
              </div>
              <q-input
                v-model="Form.name"
                outlined
                bottom-slots
                dense
                filled
                style="padding: 0px 60px 0px 30px;margin-top: 0px"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              /> -->
              <div
                style="padding: 0px 60px 0px 30px"
                class="text-weight-bold"
              >
                机构
              </div>
              <q-input
                v-model="Form.institution"
                outlined
                bottom-slots
                dense
                filled
                style="padding: 0px 60px 0px 30px;margin-top: 0px"
              />
              <!-- <div
                style="padding: 0px 60px 0px 30px"
                class="text-weight-bold"
              >
                部门
              </div>
              <q-input
                v-model="Form.department"
                outlined
                bottom-slots
                dense
                filled
                style="padding: 0px 60px 0px 30px;margin-top: 0px"
              /> -->
              <div
                style="padding: 0px 60px 0px 30px"
                class="text-weight-bold"
              >
                部门
              </div>
              <q-input
                v-model="Form.department"
                outlined
                bottom-slots
                dense
                filled
                style="padding: 0px 60px 0px 30px;margin-top: 0px"
              />
              <br>
              <div v-if="!disabled">
                <q-btn
                  label="Submit"
                  style="left:20px"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  label="Cancel"
                  style="left:50px"
                  type="cancel"
                  color="primary"
                  @click="Cancel()"
                />
                <q-btn
                  label="Reset"
                  style="float: right;"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </div>
      </q-card>
      <br>
      <q-card
        class="information-card-2"
        style="width: 80%;margin-left: 160px;padding: 10px 25px"
      >
        <div class="clearfix">
          <span style="font-size: 28px;">关于我</span>
          <q-btn
            flat
            color="black"
            label="Edit"
            icon-right="create"
            style="float: right; padding: 3px 0"
            @click="chgcard1()"
          />
        </div>
        <q-separator />
        <br>
        <div v-if="disabled1">
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
              @click="chgcard1()"
            >
              <div class="text-h6 q-mt-sm q-mb-xs">
                请介绍一下您自己
              </div>
              <div class="text-grey">
                添加一篇介绍您的研究重点和兴趣的文章，以帮助他人更进一步的了解您与您的工作。
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
              @click="chgcard1()"
            >
              <div class="text-h6 q-mt-sm q-mb-xs">
                请选择您的常用语言
              </div>
              <div class="text-grey">
                请从所给列表选择出您最常用的语言，以便让其他人更容易地与您进行联系与沟通。
              </div>
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">学科</div>
          <div v-if="Form.disciplines.length!==0">
            <q-btn outline no-caps rounded color="grey">{{Form.disciplines}} </q-btn>
          </div>
          <div v-if="Form.disciplines.length===0">
            <q-btn outline no-caps color="black" class="full-width" @click="chgcard1()">
              <div class="text-h6 q-mt-sm q-mb-xs">请列举出您所学习与研究的学科</div>
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">技能与专长</div>
          <div v-if="Form.skill.length!==0">
            <q-btn outline no-caps rounded color="grey">{{Form.skill}} </q-btn>
          </div>
          <div v-if="Form.skill.length===0">
            <q-btn outline no-caps color="black" class="full-width" @click="chgcard1()">
              <div class="text-h6 q-mt-sm q-mb-xs">请介绍您的技能与专长</div>
            </q-btn>
          </div>
        </div>
        <div v-if="!disabled1">
          <q-form
            class="q-gutter-md"
            @submit="onSubmit2"
            @reset="onReset1"
          >
            <div
              style="padding: 0px 60px 0px 30px"
              class="text-weight-bold"
            >
              自我介绍
            </div>
            <q-input
              v-model="Form.introduction"
              filled
              autogrow
              type="textarea"
              dense
              label="请介绍一下您自己"
              style="padding: 0px 60px 0px 30px;margin-top: 0px"
            />
            <div
              style="padding: 0px 60px 0px 30px"
              class="text-weight-bold"
            >
              常用语言
            </div>
            <q-select
              dense
              filled
              style="padding: 0 60px 0 30px;margin-top: 0"
              outlined
              v-model="Form.Language"
              :options="options1"
              label="选择您的常用语言"
            />
            <div
              style="padding: 0 60px 0 30px"
              class="text-weight-bold"
            >
              学科
            </div>
            <q-input
              v-model="Form.disciplines"
              outlined
              bottom-slots
              dense
              filled
              style="padding: 0 60px 0 30px;margin-top: 0"
            />
            <div
              style="padding: 0 60px 0 30px"
              class="text-weight-bold"
            >
              技能与专长
            </div>
            <q-input
              v-model="Form.skill"
              outlined
              bottom-slots
              dense
              filled
              style="padding: 0px 60px 0px 30px;margin-top: 0px"
            />
            <br>
            <q-btn
              label="Submit"
              type="submit"
              style="left:20px"
              color="primary"
            />
            <q-btn
              label="Cancel"
              style="left:50px"
              type="cancel"
              color="primary"
              @click="Cancel1()"
            />
            <q-btn
              label="Reset"
              style="float: right;"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-form>
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
        class="information-card-3"
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
              {{ articleCount[0] }}
            </div>
            <div>期刊/会议</div>
          </q-card>
          <q-card style="width: 150px;height: 75px;padding-left:10px">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ articleCount[1] }}
            </div>
            <div>学位论文</div>
          </q-card>
          <q-card style="width: 150px;height: 75px;padding-left:10px">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ articleCount[2] }}
            </div>
            <div>专著</div>
          </q-card>
          <q-card style="width: 150px;height: 75px;padding-left:10px">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ articleCount[3] }}
            </div>
            <div>其他</div>
          </q-card>
        </div>
      </q-card>
  </template>
    <template #rightDrawer>
      <q-card
        class="information-card-4"
        style="width:280px;margin-right: 100px;padding: 10px 10px"
      >
        <div class="clearfix">
          <span style="font-size: 28px">所属机构</span>
          <q-btn
            flat
            color="black"
            label="Edit"
            icon-right="create"
            style="float: right; padding: 3px 0"
            @click="chgcard3()"
          />
        </div>
        <q-separator inset />
        <br>
        <div v-if="disabled3">
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
          <div
            class="q-pa-md"
            style="max-width: 300px"
          >
            <p>请描述一下您的所属机构或您自己的相关信息</p>
            <q-input
              v-model="Form.text"
              filled
              dense
              disable
              type="textarea"
            />
          </div>
        </div>
        <div>
          <q-form
            class="q-gutter-md"
            @submit="onSubmit3"
            @reset="onReset3"
          >
            <q-input
              v-if="!disabled3"
              v-model="Form.department"
              filled
              dense
              label="隶属部门"
            />
            <q-input
              v-if="!disabled3"
              v-model="Form.position"
              filled
              dense
              label="在职岗位"
            />
            <q-input
              v-if="!disabled3"
              v-model="Form.direction"
              filled
              label="研究方向"
            />

            <q-input
              v-if="!disabled3"
              v-model="Form.achievement"
              filled
              dense
              label="研究成果"
            />
            <q-input
              v-if="!disabled3"
              v-model="Form.text"
              filled
              autogrow
              type="textarea"
              dense
              label="所属机构介绍"
            />
            <div v-if="!disabled3">
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Cancel"
                style="left:10px"
                type="cancel"
                color="primary"
                @click="Cancel3()"
              />
              <q-btn
                label="Reset"
                style="float: right;"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
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
              <q-btn
                round
                @click="checkother(author.user_id)"
              >
                <q-avatar
                  rounded
                  size="48px"
                >
                  <img :src="'http://114.116.235.94/'+author.img">
                </q-avatar>
              </q-btn>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ author.author_name }}</q-item-label>
              <q-item-label caption>
                {{ author.org }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-btn
                label="Unfollow"
                type="unfollow"
                color="primary"
                size="12px"
                @click="deletecol(author.author_id)"
              />
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
import PersonalMain from "pages/Personal/PersonalMain";

const rightDrawer = defineAsyncComponent(() => import("../../layouts/RightDrawer"));

export default {
    "name": "PersonalInformation",

    "components": { RightDrawer },

    data () {

        return {
            "disabled": true,
            "disabled1": true,
            "disabled2": false,
            "disabled3": true,
            "accept": false,
            "options1": ["Chinese", "English", "Japanese", "French", "Russian"],
            "colAuthorList":[],
            "articleCount": [],
            "Form": {
                "user": "",
                "pass": "········",
                "oldpass": "",
                "newpass1": "",
                "newpass2": "",
                "nickname": "",
                "name": "",
                "institution": "",
                "disciplines": "",
                "skill": "",
                "position": "",
                "department": "",
                "direction": "",
                "achievement": "",
                "introduction": "",
                "Language": "",
                "text": "",
                "imgUrl":"",
                "is_associated":1,
                "follownum": 1,
                "Researchitemnum": 0,
                "Projectnum": 0,
                "Questionnum": 0,
                "Answernum": 0,
            }
        };

    },
    "mounted": function () {
      this.loadInfo()
      this.loadcolAuthor()
      this.getConfirmedList()
    },
    "methods": {
        getConfirmedList() {
          this.$axios({
            "method": "post",
            "url": "my_paper/",
            "header": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
              "user_id": this.$route.query.userId,
            },
            "transformRequest": [function (data) {

              let ret = "";
              for (const it in data) {

                ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

              }
              return ret;

            }],
          }).then((res) => {
            this.articleCount = res.data.type;
          });
        },
        loadcolAuthor(){
          this.$axios({
            method:"post",
            url:"http://114.116.235.94/my_col_author_list/",
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
            this.colAuthorList = info;

          })
        },
        deletecol(authorid){
          this.$axios({
            method:"post",
            url:"http://114.116.235.94/un_col_author/",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
              user_id:this.$store.state.person.userID,
              author_id:authorid,
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
            this.loadcolAuthor()

          })
        },
        loadInfo(){
          this.$axios({
            method:"post",
            url:"http://114.116.235.94/check_my_info/",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
              user_id:this.$route.query.userId,
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
            this.Form.imgUrl = 'http://114.116.235.94/' + info.image;
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
        },
        chgcard () {
          this.disabled = false;
        },
        chgcard1 () {
            this.disabled1 = false;
        },
        chgcard3 () {
            this.disabled3 = false;
        },
        onSubmit1 () {
            this.$axios({
              method: "post",
              url: "http://114.116.235.94/change_base_info/",
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                user_id: this.$store.state.person.userID,
                user_name: this.Form.nickname,
                org: this.Form.institution,
                department:this.Form.department,
              },
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
            }).then((res) => {
              console.log(res.data)
              if (res.data.code !== '400') {
                this.loadInfo();
                return alert(res.data.message);
              }
              alert('修改个人信息成功');
              this.$store.commit("setUserName", this.Form.nickname);
              this.$emit("changeUserName");
              this.disabled = true;
            });
          this.disabled = true;

        },
        onReset () {

          this.Form.nickname = null;
          this.Form.institution = null;
          this.Form.department = null;
        },
        Cancel () {
          this.disabled = true;
          this.loadInfo();
        },
        onSubmit2 () {
              this.$axios({
                method: "post",
                url: "http://114.116.235.94/change_base_info/",
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                  user_id: this.$store.state.person.userID,
                  bio: this.Form.introduction,
                  hobby: this.Form.skill,
                  language: this.Form.Language,
                  subject: this.Form.disciplines,
                },
                transformRequest: [function (data) {
                  let ret = ''
                  for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret
                }],
              }).then((res) => {
                console.log(res.data)
                if (res.data.code !== '400') return alert(res.data.message);
                alert('修改个人信息成功');
                this.disabled1 = true;
              });
          this.disabled1 = true;
        },
        onReset1 () {
            this.Form.introduction = '';
            this.Form.Language = "";
            this.Form.disciplines = "";
            this.Form.skill ="";
        },
        Cancel1 () {
          this.disabled1 = true;
          this.loadInfo();
        },
        onSubmit3 () {
          this.$axios({
            method: "post",
            url: "http://114.116.235.94/change_base_info/",
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              user_id: this.$store.state.person.userID,
              department: this.Form.department,
              position: this.Form.position ,
              direction:this.Form.direction ,
              achievement:this.Form.achievement ,
              org_bio:this.Form.text,
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res) => {
            console.log(res.data)
            if (res.data.code !== '400') return alert(res.data.message);
            alert('修改个人信息成功');
            this.disabled3 = true;
          });
          this.disabled3 = true;
        },
        onReset3 () {
            this.Form.institution = "";
            this.Form.position = "";
            this.Form.direction = "";
            this.Form.achievement = "";
            this.Form.text="";
        },
        Cancel3 () {
          this.disabled3 = true;
          this.loadInfo();
        },
      checkother(userid){
          window.sessionStorage.setItem('otherpersonid',userid);
          this.$router.push({
            "path":"/otherpersonal",
          })
      }
    },
  props:["imageurl", "canEdit"]
}

</script>

<style lang="sass" scoped>

</style>

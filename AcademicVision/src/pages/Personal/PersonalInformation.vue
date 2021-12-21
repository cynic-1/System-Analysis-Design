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
              This preview is private — only you can see it on your profile</span>
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
              Business card
            </p>
            <div class="text-caption text-grey">
              Your business card is a short summary of your profile which can be displayed to others across the platform. Make sure it's up to date so others can easily learn about you when they discover your card.
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
                    Institution and department
                  </div>
                  <p>{{ Form.institution }}·{{ Form.department }}</p>
                  <div class="text-caption text-grey">
                    Skills
                  </div>
                  <p>{{ Form.skill }}</p>
                </q-card-section>

                <q-card-section style="padding-left: 300px">
                  <q-avatar size="100px">
                    <q-img
                      class="rounded-borders"
                      src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="用户头像"
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
            <span style="font-size: 20px;">Edit your business card</span>
            <div class="text-caption text-grey">
              Make sure your business card information is accurate and up to date.
            </div>
          </div>
          <q-separator />
          <br>
          <div>
            <div
              style="padding: 0px 60px 0px 30px"
              class="text-caption text-grey"
            >
              When you make changes to the information below, your profile will be updated with the same information.
            </div>
            <br>
            <q-form
              class="q-gutter-md"
              @submit="onSubmit"
              @reset="onReset"
            >
              <div
                style="padding: 0px 60px 0px 30px"
                class="text-h5 q-mt-sm q-mb-xs"
              >
                {{ Form.nickname }}
              </div>
              <div
                style="padding: 0px 60px 0px 30px"
                class="text-weight-bold"
              >
                昵称*
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
              <div
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
              />
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
              <div
                style="padding: 0px 60px 0px 30px"
                class="text-weight-bold"
              >
                特长
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
          <span style="font-size: 28px;">About me</span>
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
            Introduction
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
                Make an introduction for yourself
              </div>
              <div class="text-grey">
                Add an introduction with your research focus and interests to help others understand your work.
              </div>
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">
            Languages
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
                Which language do you speak
              </div>
              <div class="text-grey">
                Make it easier for others to contact you by listing the languages you speak
              </div>
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">
            Disciplines
          </div>
          <div>
            <q-btn
              outline
              no-caps
              rounded
              color="grey"
            >
              {{ Form.disciplines }}
            </q-btn>
          </div>
          <br>
          <div class="text-h6 q-mt-sm q-mb-xs">
            Skills and expertise
          </div>
          <div>
            <q-btn
              outline
              no-caps
              rounded
              color="grey"
            >
              {{ Form.skill }}
            </q-btn>
          </div>
        </div>
        <div v-if="!disabled1">
          <q-form
            class="q-gutter-md"
            @submit="onSubmit1"
            @reset="onReset1"
          >
            <div
              style="padding: 0px 60px 0px 30px"
              class="text-weight-bold"
            >
              Introduction
            </div>
            <q-input
              v-model="Form.introduction"
              filled
              autogrow
              type="textarea"
              dense
              label="Please make an introduction for yourself"
              style="padding: 0px 60px 0px 30px;margin-top: 0px"
            />
            <div
              style="padding: 0px 60px 0px 30px"
              class="text-weight-bold"
            >
              Languages
            </div>
            <q-select
              dense
              filled
              style="padding: 0px 60px 0px 30px;margin-top: 0px"
              outlined
              v-model="Form.Language"
              :options="options1"
              label="Choose language"
            />
            <div
              style="padding: 0px 60px 0px 30px"
              class="text-weight-bold"
            >
              disciplines
            </div>
            <q-input
              v-model="Form.disciplines"
              outlined
              bottom-slots
              dense
              filled
              style="padding: 0px 60px 0px 30px;margin-top: 0px"
            />
            <div
              style="padding: 0px 60px 0px 30px"
              class="text-weight-bold"
            >
              Skills and expertise
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
        Research
        <q-separator />
      </div>
      <br>
      <q-card
        class="information-card-3"
        style="width: 80%;margin-left: 160px;padding: 10px 25px"
      >
        <div class="clearfix">
          <span style="font-size: 20px;">Research overview</span>
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
      <!--      <q-card-->
      <!--        class="information-card-3"-->
      <!--        style="width: 80%;margin-left: 160px;padding: 10px 25px"-->
      <!--      >-->
      <!--        <div class="clearfix">-->
      <!--          <span style="font-size: 28px;">Account</span>-->
      <!--          <q-btn flat color="black" label="Edit" icon-right="create" style="float: right; padding: 3px 0" @click="chgcard2()"/>-->
      <!--        </div>-->
      <!--        <q-separator inset />-->
      <!--        <br>-->
      <!--        <div>-->
      <!--          <q-form-->
      <!--            class="q-gutter-md"-->
      <!--            @submit="onSubmit2"-->
      <!--            @reset="onReset2"-->
      <!--          >-->
      <!--            <q-input-->
      <!--              v-if="!disabled2"-->
      <!--              v-model="Form.user"-->
      <!--              outlined-->
      <!--              bottom-slots-->
      <!--              style="padding: 0px 60px 0px 30px"-->
      <!--              :readonly="true"-->
      <!--            >-->
      <!--              <template v-slot:before>-->
      <!--                <p style=" font-size : 0.75em;color: #1D1D1D">账号 ：</p>-->
      <!--              </template>-->
      <!--            </q-input>-->
      <!--            <q-input-->
      <!--              v-if="!disabled2"-->
      <!--              v-model="Form.pass"-->
      <!--              outlined-->
      <!--              bottom-slots-->
      <!--              style="padding: 0px 60px 0px 30px"-->
      <!--              :readonly="true"-->
      <!--            >-->
      <!--              <template v-slot:before>-->
      <!--                <p style=" font-size : 0.75em;color: #1D1D1D">密码 ：</p>-->
      <!--              </template>-->
      <!--            </q-input>-->

      <!--            <q-input-->
      <!--              v-if="disabled2"-->
      <!--              v-model="Form.oldpass"-->
      <!--              style="padding: 0px 60px 0px 30px"-->
      <!--              outlined-->
      <!--              bottom-slots-->
      <!--              lazy-rules-->
      <!--              :rules="[ val => val && val.length > 0 || 'Please type something']"-->
      <!--            >-->
      <!--              <template v-slot:before>-->
      <!--                <p style=" font-size : 0.75em;color: #1D1D1D">原密码 ：</p>-->
      <!--              </template>-->
      <!--            </q-input>-->

      <!--            <q-input-->
      <!--              v-if="disabled2"-->
      <!--              v-model="Form.newpass1"-->
      <!--              style="padding: 0px 60px 0px 30px"-->
      <!--              outlined-->
      <!--              bottom-slots-->
      <!--              lazy-rules-->
      <!--              :rules="[ val => val && val.length > 0 || 'Please type something']"-->
      <!--            >-->
      <!--              <template v-slot:before>-->
      <!--                <p style=" font-size : 0.75em;color: #1D1D1D">新密码 ：</p>-->
      <!--              </template>-->
      <!--            </q-input>-->

      <!--            <q-input-->
      <!--              v-if="disabled2"-->
      <!--              v-model="Form.newpass2"-->
      <!--              style="padding: 0px 60px 0px 20px"-->
      <!--              outlined-->
      <!--              bottom-slots-->
      <!--              lazy-rules-->
      <!--              :rules="[ val => val && val ===Form.newpass1 || 'Please type something as last one']"-->
      <!--            >-->
      <!--              <template v-slot:before>-->
      <!--                <p style=" font-size : 0.75em;color: #1D1D1D">确认密码：</p>-->
      <!--              </template>-->
      <!--            </q-input>-->

      <!--            <div v-if="disabled2">-->
      <!--              <q-btn-->
      <!--                label="Submit"-->
      <!--                type="submit"-->
      <!--                color="primary"-->
      <!--              />-->
      <!--              <q-btn-->
      <!--                label="Cancel"-->
      <!--                style="left:50px"-->
      <!--                type="cancel"-->
      <!--                color="primary"-->
      <!--                @click="Cancel2()"-->
      <!--              />-->
      <!--              <q-btn-->
      <!--                label="Reset"-->
      <!--                style="float: right;"-->
      <!--                type="reset"-->
      <!--                color="primary"-->
      <!--                flat-->
      <!--                class="q-ml-sm"-->
      <!--              />-->
      <!--            </div>-->
      <!--          </q-form>-->
      <!--        </div>-->
      <!--      </q-card>-->
    </template>
    <template #rightDrawer>
      <q-card
        class="information-card-4"
        style="width:280px;margin-right: 100px;padding: 10px 10px"
      >
        <div class="clearfix">
          <span style="font-size: 28px">Affiliation</span>
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
            Department：{{ Form.department }}
          </p>
          <p style="font-size : 1em">
            position：{{ Form.position }}
          </p>
          <p style="font-size : 1em">
            direction：{{ Form.direction }}
          </p>
          <p style="font-size : 1em">
            achievement：{{ Form.achievement }}
          </p>
          <div
            class="q-pa-md"
            style="max-width: 300px"
          >
            <p>Please describe your affiliation or yourself</p>
            <q-input
              v-model="Form.text"
              filled
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
              v-model="Form.institution"
              filled
              label="隶属科研机构*"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              v-if="!disabled3"
              v-model="Form.position"
              filled
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
              label="研究成果"
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
          Following({{ Form.follownum }})
        </p>
        <q-item>
          <q-item-section side>
            <q-avatar
              rounded
              size="48px"
            >
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Mary</q-item-label>
            <q-item-label caption>
              西安大学教授
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-btn
              label="Unfollow"
              type="unfollow"
              color="primary"
              size="12px"
            />
          </q-item-section>
        </q-item>
      </q-card>
    </template>
  </right-drawer>
</template>

<script>
import { defineAsyncComponent } from "vue";
import RightDrawer from "layouts/RightDrawer";

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
            "Form": {
                "user": "19231051",
                "pass": "········",
                "oldpass": "",
                "newpass1": "",
                "newpass2": "",
                "nickname": "双笙",
                "name": "路人甲",
                "institution": "北京航空航天大学",
                "disciplines": "Computer",
                "skill": "智能计算机，网页制作",
                "position": "学生",
                "department": "Software",
                "direction": "Robot",
                "achievement": "",
                "introduction": "",
                "Language": "",
                "text": "",
                "follownum": 1,
                "Researchitemnum": 0,
                "Projectnum": 0,
                "Questionnum": 0,
                "Answernum": 0,
            }
        };

    },

    "methods": {
        save1 (formName) {

        },
        chgcard () {

            this.disabled = false;

        },
        chgcard1 () {

            this.disabled1 = false;

        },
        chgcard2 () {

            this.disabled2 = true;

        },
        chgcard3 () {

            this.disabled3 = false;

        },
        onSubmit () {

            if (this.accept !== true) {

                this.$q.notify({
                    "color": "red-5",
                    "textColor": "white",
                    "icon": "warning",
                    "message": "You need to accept the license and terms first"
                });

            } else {

                this.$q.notify({
                    "color": "green-4",
                    "textColor": "white",
                    "icon": "cloud_done",
                    "message": "Submitted"
                });

            }

        },
        onReset () {

            this.Form.nickname = null;
            this.Form.name = null;
            this.Form.institution = null;
            this.Form.position = null;

        },
        Cancel () {

            this.disabled = true;

        },
        onSubmit1 () {

            if (this.accept !== true) {

                this.$q.notify({
                    "color": "red-5",
                    "textColor": "white",
                    "icon": "warning",
                    "message": "You need to accept the license and terms first"
                });

            } else {

                this.$q.notify({
                    "color": "green-4",
                    "textColor": "white",
                    "icon": "cloud_done",
                    "message": "Submitted"
                });

            }

        },
        onReset1 () {

            this.Form.nickname = null;
            this.Form.name = null;
            this.Form.institution = null;
            this.Form.position = null;

        },
        Cancel1 () {

            this.disabled1 = true;

        },
        onSubmit2 () {

            if (this.accept !== true) {

                this.$q.notify({
                    "color": "red-5",
                    "textColor": "white",
                    "icon": "warning",
                    "message": "You need to accept the license and terms first"
                });

            } else {

                this.$q.notify({
                    "color": "green-4",
                    "textColor": "white",
                    "icon": "cloud_done",
                    "message": "Submitted"
                });

            }

        },
        onReset2 () {

            this.Form.oldpass = null;
            this.Form.newpass1 = null;
            this.Form.newpass2 = null;

        },
        Cancel2 () {

            this.disabled2 = false;

        },
        onSubmit3 () {

            if (this.accept !== true) {

                this.$q.notify({
                    "color": "red-5",
                    "textColor": "white",
                    "icon": "warning",
                    "message": "You need to accept the license and terms first"
                });

            } else {

                this.$q.notify({
                    "color": "green-4",
                    "textColor": "white",
                    "icon": "cloud_done",
                    "message": "Submitted"
                });

            }

        },
        onReset3 () {

            this.Form.institution = null;
            this.Form.position = null;
            this.Form.direction = null;
            this.Form.achievement = null;

        },
        Cancel3 () {

            this.disabled3 = true;

        },
    },
};

</script>

<style lang="sass" scoped>

</style>

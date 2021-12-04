<template>
  <div class="q-pa-md fit row wrap justify-evenly items-start content-start">
    <div
      class="col-grow q-pa-xl"
      style="overflow:auto;"
    >
      <q-card
        class="information-card-1"
        style="width: 800px;margin-left: 100px"
      >
        <div class="clearfix">
          <span style="font-size: 28px;">About me</span>
          <q-btn
            style="float: right; padding: 3px 0"
            push
            color="white"
            text-color="primary"
            round
            icon="create"
            @click="chgcard1()"
          />
        </div>
        <q-separator />
        <br>
        <div>
          <q-form
            class="q-gutter-md"
            @submit="onSubmit1"
            @reset="onReset1"
          >
            <q-input
              v-model="Form.nickname"
              label="您的昵称*"
              :readonly="disabled1"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              v-model="Form.name"
              label="您的姓名*"
              :readonly="disabled1"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              v-model="Form.disciplines"
              label="学科"
              :readonly="disabled1"
            />

            <q-input
              v-model="Form.skill"
              label="特长和专业知识"
              :readonly="disabled1"
            />

            <div v-if="!disabled1">
              <q-btn
                label="Submit"
                type="submit"
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
            </div>
          </q-form>
        </div>
      </q-card>
      <br>
      <q-card
        class="information-card-2"
        style="width: 800px;margin-left: 100px"
      >
        <div class="clearfix">
          <span style="font-size: 28px;">Account</span>
          <q-btn
            style="float: right; padding: 3px 0"
            push
            color="white"
            text-color="primary"
            round
            icon="create"
            @click="chgcard2()"
          />
        </div>
        <q-separator inset />
        <br>
        <div>
          <q-form
            class="q-gutter-md"
            @submit="onSubmit2"
            @reset="onReset2"
          >
            <q-input
              v-if="!disabled2"
              v-model="Form.user"
              label="账号*"
              :readonly="true"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              v-if="!disabled2"
              v-model="Form.pass"
              label="密码*"
              :readonly="true"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              v-if="disabled2"
              v-model="Form.oldpass"
              filled
              label="原密码*"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              v-if="disabled2"
              v-model="Form.newpass1"
              filled
              label="新密码*"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              v-if="disabled2"
              v-model="Form.newpass2"
              filled
              label="确认密码*"
              lazy-rules
              :rules="[ val => val && val ===Form.newpass1 || 'Please type something as last one']"
            />

            <div v-if="disabled2">
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Cancel"
                style="left:50px"
                type="cancel"
                color="primary"
                @click="new Cancel2()"
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
    </div>
    <div
      class="gt-md q-pa-xl"
      style="overflow:auto;"
    >
      <q-card
        class="information-card-3"
        style="width:280px;margin-right: 100px"
      >
        <div class="clearfix">
          <span style="font-size: 28px;">Current affiliation</span>
          <q-btn
            style="float: right; padding: 3px 0"
            push
            color="white"
            text-color="primary"
            round
            icon="create"
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
        class="information-card-4"
        style="width:280px;margin-right: 100px"
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
          <q-item-section side>
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
            />
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
    "name": "PersonalInformation",

    "components": {},

    data () {

        return {
            "disabled1": true,
            "disabled2": false,
            "disabled3": true,
            "accept": false,
            "Form": {
                "user": "19231051",
                "pass": "········",
                "oldpass": "",
                "newpass1": "",
                "newpass2": "",
                "nickname": "双笙",
                "name": "路人甲",
                "institution": "北京航空航天大学",
                "disciplines": "",
                "skill": "",
                "position": "学生",
                "department": "Software",
                "direction": "Robot",
                "achievement": "",
                "text": "",
                "follownum": 1,
            }
        };

    },

    "methods": {
        cancel () {

        },
        save1 (formName) {

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

/* eslint-disable vue/multi-word-component-names */
<template>
  <div class="login-register">
    <div class="card">
      <div
        id="1"
        class="front"
        :class="isTop ? 'contain-Before' : ''"
      >
        <div class="q-mb-lg">
          <q-icon
            id="logo"
            size="100px"
            name="person_outline"
          /><br><br><br><br>
        </div>
        <div class="items-center q-mx-md">
          <q-form
            ref="form"
            lazy-validation
          >
            <div>
              <div class="row items-center">
                <div class="col-12 ">
                  <q-input
                    v-model="id"
                    :rules="idRules"
                    label="用户名/邮箱"
                    required
                  />

                  <q-input
                    v-model="password"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="密码"
                    required
                  >
                    <template #append>
                      <q-avatar v-if="show1">
                        <q-btn
                          icon="visibility_off"
                          round
                          size="14px"
                          @click="show1 = !show1"
                        />
                      </q-avatar>
                      <q-avatar v-else>
                        <q-btn
                          icon="visibility"
                          round
                          size="14px"
                          @click="show1 = !show1"
                        />
                      </q-avatar>
                    </template>
                  </q-input>

                  <q-btn
                    :disabled="!valid"
                    class="button"
                    large
                    @click="Login"
                  >
                    <p class="login_">
                      登录
                    </p>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-form>
        </div>
        <div>
          <div class="col-12 items-center">
            <q-btn
              flat
              color="primary"
              class="register"
              to="/register"
            >
              注册
            </q-btn>
            <q-btn
              flat
              color="primary"
              class="forget"
              to="/forgetPassword"
            >
              忘记密码
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    "inject": ["reload"],
    data () {
        return {
            "valid": true,
            "show1": false,
            "show2": false,
            "show3": false,
            "isTop": false,
            "id": "",
            "idRules": [(v) => !!v || "请填写用户名/邮箱"],
            "password": "",
            "passwordRules": [(v) => !!v || "请填写密码"],
            "message": "error",
        };
    },
    methods: {
        Login () {
          this.validate();
          this.$axios({
            method: 'POST',
            url: 'http://114.116.235.94/login/',
            data: {
              line1: this.id,
              line2: this.password
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then(response => {
            console.log("登录", response)
            if (response.data.code === "200") {
              alert("登录成功");
              this.$store.commit("setLogin");
              this.$store.commit("setUserName",response.data.data.username);
              this.$store.commit("setUserID",response.data.data.userid);
              this.$store.commit("setUserHeadImage",response.data.data.image);
              this.$store.commit("setUserAssociated",response.data.data.is_associated);
              this.$router.push({ "path": "/home","query":{"user_id": response.data.data.userid} });
              // this.$router.push({ path: "/home" });
            }
            else if (response.data.code === "0") {
              alert(response.data.message);
              this.clear();
            }
          })
        },
        validate () {
            this.$refs.form.validate();
        },
        clear () {
            this.id = "";
            this.password = "";
        },
        affirmPass (val) {
            if (val !== this.password) {
                return "两次密码不一致";
            }
            return true;
        },
    },
};
</script>

<style>
.login-register {
  background-image: url('../assets/bg1.jpeg');
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#logo {
  position: relative;
  bottom: -20px;
}

.button {
  color: #596275;
  box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.1),
  -9px -9px 18px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  background-color: #efeeee;
  position: relative;
  top: 15%;
  margin-top: 20px;
  width: 130px;
  height: 55px;
  outline: none;
  border: none;
}
.button:hover {
  font-size: 19px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2),
  -1px -1px 2px rgba(255, 255, 255, 0.8);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  transition: font-size 0.2s ease-out;
}
.login_ {
  font-size: 20px;
  margin-top: 15px;
}
.card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 550px;

  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.card .front,
.card .back {
  position: absolute;
  text-align: center;
  box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.1),
  -12px -12px 24px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  background-color: #efeeee;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.front,
.back {
  position: absolute;
  transition: 0.3s linear;
  backface-visibility: hidden;
}
.register {
  top: 130px;
}
.forget {
  top: 130px;
}
.turn {
  text-align: right;
}

.back {
  transform: rotateY(-180deg);
}
.front {
  transform: rotateY(0deg);
}
.return {
  top: 40px;
}
.card .contain-Before {
  transform: rotateY(-180deg);
}
.card .contain-After {
  transform: rotateY(0deg);
}
</style>

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
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="密码"
                    required
                    @click:append="show1 = !show1"
                  />

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
              @click="toRegister"
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
      <div
        id="2"
        class="back"
        :class="isTop ? 'contain-After' : ''"
      >
        <div class="items-center q-mx-md">
          <q-form
            ref="form"
            lazy-validation
          >
            <q-icon
              id="logo1"
              size="100px"
              name="person_add"
            /><br>
            <div>
              <div class="row items-center">
                <div class="col-12">
                  <q-input
                    v-model="id"
                    :rules="idRules"
                    label="用户名"
                    required
                  />

                  <q-input
                    v-model="password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show2 ? 'text' : 'password'"
                    label="密码"
                    required
                    @click:append="show2 = !show2"
                  />

                  <q-input
                    v-model="rePassword"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    :rules="[affirmPass]"
                    label="确认密码"
                    required
                    @click:append="show3 = !show3"
                  />

                  <q-input
                    v-model="Email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  />

                  <q-btn
                    :disabled="!valid"
                    class="button"
                    @click="Register"
                  >
                    <p class="register_">
                      注册
                    </p>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-form>
        </div>
        <div>
          <div class="row">
            <div class="col-12 items-center">
              <q-btn
                flat
                color="primary"
                class="return"
                @click="toLogin"
              >
                登录
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <!--      <v-snackbar-->
      <!--        v-model="snackbar"-->
      <!--        :timeout="3000"-->
      <!--        color="blue-grey"-->
      <!--        absolute-->
      <!--        rounded="pill"-->
      <!--        top-->
      <!--      >-->
      <!--        {{ message }}-->
      <!--      </v-snackbar>-->
    </div>
  </div>
</template>

<script>
export default {
    "inject": ["reload"],
    data () {

        return {
            "valid": true,
            "show1": false,
            "show2": false,
            "show3": false,
            "isTop": false,
            "timer": null,
            "snackbar": false,
            "id": "",
            "idRules": [(v) => !!v || "请填写用户名"],
            "pass": "",
            "password": "",
            "passwordRules": [(v) => !!v || "请填写密码"],
            "rePassword": "",
            "Email": "",
            "emailRules": [
                (v) => !!v || "请填写邮箱",
                (v) => /.+@.+\..+/.test(v) || "邮箱格式不合法",
            ],
            "checkbox": false,
            "message": "error",
        };

    },
    "methods": {
        toRegister () {
            if (!this.isTop) {
                this.isTop = true;
                this.clear();
            }
        },
        toLogin () {
            if (this.isTop) {
                this.isTop = false;
                this.clear();
            }
        },
        Login () {
            this.validate();
            this.$http({
                "method": "post",
                "url": "/Login",
                "data": {
                    "UserID": this.id,
                    "Password": this.password,
                },
            })
                .then((res) => {
                    this.message = res.data.message;
                    if (res.data.success) {
                        this.$store.commit("setLogin");
                        this.$store.commit("setUserID", this.id);
                        if (res.data.isAdmin) {
                            this.$store.commit("setAdmin");
                            this.$router.push({ "path": "/Admin" });
                        } else {
                            this.$store.commit("setIsTeacher", res.data.user.isTeacher);
                            this.$router.push({ "path": "/" });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            this.snackbar = true;

        },
        Register () {
            this.validate();
            this.$http({
                "method": "post",
                "url": "/Register",
                "data": {
                    "UserID": this.id,
                    "Password": this.password,
                    "rePassword": this.rePassword,
                    "Email": this.Email,
                },
            })
                .then((res) => {
                    console.log(res.data.message);
                    this.message = res.data.message;
                    this.snackbar = true;
                    if (res.data.success) {
                        this.$store.commit("setLogin");
                        this.timer = setTimeout(() => {
                            // 设置延迟执行
                            this.reload();
                        }, 1000);
                    } else {
                        this.clear();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        validate () {
            this.$refs.form.validate();
        },
        clear () {
            this.id = "";
            this.password = "";
            // this.message = "";
            this.rePassword = "";
            this.Email = "";
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
#logo1 {
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
.register_ {
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

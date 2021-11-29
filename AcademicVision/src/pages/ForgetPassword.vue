<template>
  <div class="login">
    <div class="card">
      <div class="front">
        <div class="items-center q-mx-md">
          <q-form ref="form" v-model="valid" lazy-validation>
            <q-icon size="100px" id="logo" name="construction" /><br>
            <div class="row items-center">
              <div class="col-12">
                <q-field
                  v-model="id"
                  :rules="idRules"
                  label="用户名"
                  required
                ></q-field>

                <q-field
                  v-model="Email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></q-field>
                <div>
                  <div class="row">
                    <div class="col-12">
                      <q-field
                        v-model="code"
                        :rules="codeRules"
                        label="验证码"
                        required>
                        <template v-slot:append>
                          <q-btn
                            flat
                            offset-y
                            color="cyan"
                            @click="getCode"
                          >
                            获取验证码
                          </q-btn>
                        </template>
                      </q-field>
                    </div>
                  </div>
                </div>

                <q-field
                  v-model="password"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules]"
                  :type="show2 ? 'text' : 'password'"
                  label="密码"
                  required
                  @click:append="show2 = !show2"
                ></q-field>

                <q-field
                  v-model="rePassword"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  :rules="[passwordRules, affirmPass]"
                  label="确认密码"
                  required
                  @click:append="show3 = !show3"
                ></q-field>

                <q-btn
                  :disabled="!valid"
                  class="button"
                  @click="resetPassword"
                  large
                  :to="'/Login'"
                >
                  <p class="pass_">重置密码</p>
                </q-btn>
<!--                <v-snackbar-->
<!--                  v-model="snackbar"-->
<!--                  :timeout="3000"-->
<!--                  color="blue-grey"-->
<!--                  absolute-->
<!--                  rounded="pill"-->
<!--                >-->
<!--                  {{ message }}-->
<!--                </v-snackbar>-->
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show2: false,
    show3: false,
    valid: true,
    snackbar: false,
    id: "",
    idRules: [(v) => !!v || "请填写账号"],
    password: "",
    passwordRules: (v) => !!v || "请填写密码",
    rePassword: "",
    Email: "",
    emailRules: [
      (v) => !!v || "请填写邮箱",
      (v) => /.+@.+\..+/.test(v) || "邮箱格式不合法",
    ],
    code: "",
    codeRules: [(v) => !!v || "请填写验证码"],
    checkbox: false,
    message: "",
  }),

  methods: {
    resetPassword() {
      this.validate();
      this.$http({
        method: "POST",
        url: "/code",
        data: {
          UserID: this.id,
          Password: this.password,
          rePassword: this.rePassword,
          code: this.code,
        },
      })
        .then((res) => {
          this.message = res.data.message;
          this.snackbar = true;
          if (res.data.success) {
            this.$router.push({ path: "/Login" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCode() {
      this.$http({
        method: "post",
        url: "/ForgetPassword",
        data: {
          UserID: this.id,
          Email: this.Email,
        },
      })
        .then((res) => {
          this.message = res.data.message;
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validate() {
      this.$refs.form.validate();
    },
    affirmPass(val) {
      if (val !== this.password) {
        return "两次密码不一致";
      }
      return true;
    },
  },
};
</script>

<style>
.login {
  background-image: url('../assets/bg1.jpeg');
  background-color: #efeeee;
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
  top: 5%;
  margin-top: 10px;
  width: 120px;
  height: 55px;
  outline: none;
  border: none;
}
.pass_ {
  font-size: 18px;
  margin-top: 15px;
}
.button:hover {
  font-size: 19px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2),
  -1px -1px 2px rgba(255, 255, 255, 0.8);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  transition: font-size 0.2s ease-out;
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
.card .front {
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
</style>

<template>
  <div class="forgetPassword">
    <div class="fcard">
      <div class="front">
        <div class="items-center q-mx-md">
          <q-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <q-icon
              id="logo"
              size="100px"
              name="construction"
            />
            <br>
            <div class="row items-center">
              <div class="col-12">
                <q-input
                  v-model="id"
                  :rules="idRules"
                  label="用户名"
                  required
                />

                <q-input
                  v-model="Email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                />
                <div>
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        v-model="provCode"
                        :rules="[codeRules, affirmCode]"
                        label="验证码"
                        lazy-rules="ondemand"
                      >
                        <template #append>
                          <q-btn
                            v-if="!have_acquired"
                            flat
                            offset-y
                            color="cyan"
                            @click="waitCode"
                          >
                            获取验证码
                          </q-btn>
                          <q-btn
                            v-if="have_acquired"
                            disable
                            flat
                            offset-y
                            color="cyan"
                          >
                            重新获取 {{ time }}
                          </q-btn>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>

                <q-input
                  v-model="password"
                  :rules="[passwordRules]"
                  :type="show2 ? 'text' : 'password'"
                  label="密码"
                  required
                >
                  <template #append>
                    <q-avatar v-if="show2">
                      <q-btn
                        icon="visibility_off"
                        round
                        size="14px"
                        @click="show2 = !show2"
                      />
                    </q-avatar>
                    <q-avatar v-else>
                      <q-btn
                        icon="visibility"
                        round
                        size="14px"
                        @click="show2 = !show2"
                      />
                    </q-avatar>
                  </template>
                </q-input>

                <q-input
                  v-model="rePassword"
                  :type="show3 ? 'text' : 'password'"
                  :rules="[passwordRules, affirmPass]"
                  label="确认密码"
                  required
                >
                  <template #append>
                    <q-avatar v-if="show3">
                      <q-btn
                        icon="visibility_off"
                        round
                        size="14px"
                        @click="show3 = !show3"
                      />
                    </q-avatar>
                    <q-avatar v-else>
                      <q-btn
                        icon="visibility"
                        round
                        size="14px"
                        @click="show3 = !show3"
                      />
                    </q-avatar>
                  </template>
                </q-input>

                <q-btn
                  :disabled="!valid"
                  class="button"
                  large
                  @click="resetPassword"
                >
                  <p class="pass_">
                    重置密码
                  </p>
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
        <div>
          <div class="row">
            <div class="col-12 items-center">
              <q-btn
                flat
                color="primary"
                class="return"
                to="/login"
              >
                登录
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    "data": () => ({
        "have_acquired": false,
        "time": 0,
        "show2": false,
        "show3": false,
        "valid": true,
        "snackbar": false,
        "id": "",
        "idRules": [(v) => !!v || "请填写账号"],
        "password": "",
        "passwordRules": (v) => !!v || "请填写密码",
        "rePassword": "",
        "Email": "",
        "emailRules": [
            (v) => !!v || "请填写邮箱",
            (v) => /.+@.+\..+/.test(v) || "邮箱格式不合法",
        ],
        "provCode": "",
        "codeRules": (v) => !!v || "请填写验证码",
        "message": "",
        "ran_str": ""
    }),

    "methods": {
        affirmCode (val) {

            if (val !== this.ran_str) {

                return "验证码错误";
            
            }
            return true;
        
        },
        waitCode () {

            if (this.Email !== "") {

                this.$axios({
                    "method": "POST",
                    "url": "http://114.116.235.94/forget_pass0/",
                    "data": {
                        "email": this.Email,
                    },
                    "transformRequest": [function (data) {

                        let ret = "";
                        for (const it in data) {

                            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
                        
                        }
                        return ret;
                    
                    }],
                }).then(response => {

                    console.log("发送验证码", response);
                    if (response.data.code === "400") {

                        alert("发送成功");
                        this.ran_str = response.data.str;
                    
                    } else if (response.data.code === "200") {

                        alert(response.data.message);
                    
                    }
                
                });
                this.have_acquired = true;
                this.time = 60;
                this.timer();
            
            } else {

                alert("请输入邮箱");
            
            }
        
        },
        timer () {

            if (this.time <= 0) {

                this.have_acquired = false;
            
            } else {

                this.time--;
                setTimeout(this.timer, 1000);
            
            }
        
        },
        resetPassword () {

            this.validate();
            console.log("Email = ", this.Email);
            console.log("UserID = ", this.id);
            console.log("new_password = ", this.password);
            this.$axios({
                "method": "POST",
                "url": "http://114.116.235.94/forget_pass/",
                "data": {
                    "Email": this.Email,
                    "user_name": this.id,
                    "pass1": this.password,
                    "pass2": this.rePassword,
                },
                "transformRequest": [function (data) {

                    let ret = "";
                    for (const it in data) {

                        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
                    
                    }
                    return ret;
                
                }],
            }).then(response => {

                console.log("重置密码", response);
                if (response.data.code === "400") {

                    alert("密码重置成功,正在前往登录界面");
                    this.$router.push({ "path": "/login" });
                
                } else if (response.data.code === "200") {

                    alert(response.data.message);
                    console.log("出错了");
                    this.clear();
                
                }
            
            });
        
        },
        clear () {

            this.id = "";
            this.password = "";
            this.Email = "",
            this.provCode = "",
            this.rePassword = "";
        
        },
        validate () {

            this.$refs.form.validate();
        
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
.forgetPassword {
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

.fcard {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 650px;
  width: 550px;

  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fcard .front {
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

.return {
  top: 40px;
}
</style>

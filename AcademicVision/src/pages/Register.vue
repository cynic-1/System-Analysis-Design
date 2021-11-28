<template>
  <div class="login">
    <div class="card">
      <div class="front">
        <div class="items-center q-mx-md">
          <q-form ref="form" v-model="valid" lazy-validation>
            <q-icon size="100px" name="person_add" /><br>
            <div>
              <q-field
                v-model="id"
                :rules="idRules"
                label="用户名"
                required
              ></q-field>

              <q-field
                v-model="password"
                :rules="passwordRules"
                label="密码"
                required
              ></q-field>

              <q-field
                v-model="rePassword"
                :rules="rePasswordRules"
                label="确认密码"
                required
              ></q-field>

              <q-field
                v-model="Email"
                :rules="emailRules"
                label="E-mail"
                required
              ></q-field>

              <q-btn :disabled="!valid" class="button" @click="validate" large href="/Login">
                <p class="login_">注册</p>
              </q-btn>
            </div>
          </q-form>
        </div>
        <div>
          <div class="row">
            <div class="col-12 items-center" >
              <q-btn flat color="primary" class="return" to="/login">登录</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    id: "",
    idRules: [(v) => !!v || "ID is required"],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
    rePassword:"",
    rePasswordRules: [
      v => !!v || "Password is required",
      v => v===this.password || "Not equle",
    ],
    Email:"",
    emailRules:[
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
.login {
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
  top: 30px;
  margin-top: 20px;
  width: 130px;
  height: 55px;
  outline: none;
  border: none;
}
.login_ {
  font-size: 20px;
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
  z-index: 1;
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
.card .front {
  z-index: 1;
}
.return{
  top:40px;
}
</style>

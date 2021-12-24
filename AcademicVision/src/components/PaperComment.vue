<template>
  <!--学术成果评论页面-->
  <br>
  <div class="PaperComment">
    <br><br>
    <q-separator inset/>
    <br>
    <h4 style="float: left;margin-top: 20px;margin-left: 120px;margin-bottom: 20px">
      <q-icon
        name="textsms"
        color="blue-6"
      />
      学术成果评论区
    </h4>

    <div
      class="q-pa-md"
      style="max-width: 1000px;float: right;margin-right: 100px;margin-top: 60px"
    >
      <form
        class="q-gutter-md"
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
      >
        <q-input
          ref="text"
          v-model="text"
          filled
          type="textarea"
          clearable
          hint="评论字数上限200字"
          label="请理智友善发言~"
          lazy-rules
          style="float: right;width: 1200px;font-size: 20px"
          :rules="[ val => val && val.length > 0 || '请您输入评论内容',
                    val => val && val.length <= 200 || '评论过长']"
        />
        <q-btn
          ref="name"
          :loading="loading1"
          color="blue-6"
          style="float: left;margin-left:800px;margin-bottom: 0"
          size="18px"
          type="submit"
          @click="simulateProgress(1)"
        >
          评&nbsp;&nbsp;&nbsp;论
        </q-btn>
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          size="18px"
          flat
          class="q-ml-sm"
        />
      </form>
      <q-dialog v-model="alert">
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">
              恭喜您
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            评论成功
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-close-popup
              flat
              label="OK"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="isLoginAlert">
        <q-card style="width: 500px">
          <q-card-section class="q-pt-none" style="font-size: 19px;margin-left: 70px;margin-top: 40px">
            您尚未登录，请前往
            <q-btn
              flat
              v-close-popup
              color="primary"
              label="登录"
              push
              dense
              size="lg"
              to="/login"
            />
          </q-card-section>

          <q-card-actions align="right">

            <q-btn
              v-close-popup
              flat
              label="OK"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div
      class="q-pa-md row justify-center"
      style="width: 1300px;margin-left: 80px"
    >
      <h5
        style="color: lightgray"
        v-show="hasComment"
      >
        暂时还没有评论，快去发一条评论吧！
      </h5>
      <div
        v-for="comment in comments.slice(left,right)"
        :key="comment"
        style="width: 100%; max-width: 1200px"
      >
        <q-chat-message
          :name="comment.comment_user_name"
          :avatar="'http://114.116.235.94/' + comment.user_img"
          :text="[comment.comment_content]"
          :stamp="comment.com_time"
          style="font-size: 23px;width: 1100px"
          bg-color="blue-2"
          @click="method1(comment.comment_user_id)"
        />
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="logout" color="primary" text-color="white"/>
              <span class="q-ml-sm" style="font-size: 20px">您即将前往用户个人空间</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="取消" color="primary" v-close-popup/>
              <q-btn flat label="前往" color="primary" v-close-popup @click="gotoCheckUser(this.comid)"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <br><br>
        <q-separator
          inset
          style="width: 1200px"
        />
        <br>
      </div>
    </div>
    <div
      class="q-pa-lg flex flex-center"
      style="width: 1000px;margin: 0 auto"
      v-show="!hasComment"
    >
      <q-pagination
        v-model="current"
        color="blue-6"
        :max="length"
        :max-pages="6"
        :boundary-numbers="false"
        @click="left = (current - 1) * 5;right = 5 + (current - 1) * 5"
      />
    </div>
  </div>
</template>

<script>
import "highlight.js/styles/arta.css";
export default {
    name: "PaperComment",
    props:['paper_id'],
    data () {

        return {
             comid: 0,
             confirm: false,//
            "hasComment": false,//
            "prompt": false, //
            "reason": "", //
            "comment_length": 0, //
            "isgood": false, //
            "current": 1, //
            "left": 0, //
            "right": 5, //
            "alert": false, //
            "isLoginAlert": false, //
            "loading1": false, //
            "text": "", //
            "comments": [{
                "name": "周杰伦",
                "avatar": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2485887168-197F1658E5C35C7917B991AB1E993AA8%2F0%3Ffmt%3Djpg%26size%3D246%26h%3D900%26w%3D900%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640135843&t=de793e46679e21a08c9fc364633089a6",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 300,
                "isgood": true,
                "cid": 1,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 299,
                "isgood": false,
                "cid": 2,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 298,
                "isgood": false,
                "cid": 3,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 4,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 5,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 6,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 7,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 8,
            },
            {
                "name": "周杰伦",  // 用户名
                "commentid": 1, // 评论id
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto", // 用户头像
                "text": "这里是一条评论，哎呦不错哦",  // 用户评论内容
                "stamp": "2021/6/10", // 评论时间
                "goodnumber": 297,  // 评论点赞数
                "isgood": true, // 当前用户是否点赞该评论
                "cid": 9, // 评论id
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 10,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 11,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 12,
            }, {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 13,
            }, {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 14,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 15,
            },
            {
                "name": "周杰伦",
                "avatar": "https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 297,
                "isgood": true,
                "cid": 16,
            }, {
                "name": "周杰伦",
                "avatar": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2485887168-197F1658E5C35C7917B991AB1E993AA8%2F0%3Ffmt%3Djpg%26size%3D246%26h%3D900%26w%3D900%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640135843&t=de793e46679e21a08c9fc364633089a6",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 300,
                "isgood": true,
                "cid": 17,
            }, {
                "name": "周杰伦",
                "avatar": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2485887168-197F1658E5C35C7917B991AB1E993AA8%2F0%3Ffmt%3Djpg%26size%3D246%26h%3D900%26w%3D900%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640135843&t=de793e46679e21a08c9fc364633089a6",
                "text": "这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦",
                "stamp": "2021/6/10",
                "goodnumber": 300,
                "isgood": true,
                "cid": 18,
            }


            ],
        };

  },
  "computed": {},
  mounted() {
    this.$axios({
      "method": "POST",
      "url": "http://114.116.235.94/get_paper_comment/",
      "data": {
        "paper_id": this.paper_id,
      },
      "transformRequest": [function (data) {

        let ret = "";
        for (const it in data) {

          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

        }
        return ret;

      }],
    }).then(response => {
      console.log("查看学术成果评论", response);
      this.comments = response.data.comment;
      if (this.comments.length !== 0) {
        if (this.comments.length % 5 === 0) {
          this.commnet_length = this.comments.length / 5
        } else {
          this.commnet_length = this.comments.length / 5 + 1
        }
      }
      if (this.comments.length === 0) {

        this.hasComment = true;

      }

    });
  },

  "methods": {
    method1(userid) {
      this.comid = userid;
      this.confirm = true;
    },
    simulateProgress(number) {

      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      setTimeout(() => {

        // we're done, we reset loading state
        this[`loading${number}`] = false;

      }, 1000);

    },
    onSubmit() {
      if (this.$store.state.login) {
        console.log("点击了发布按钮");
        this.$refs.text.validate();
        if (this.$refs.text.hasError) {

          this.formHasError = true;

        } else {

          this.$refs.text.resetValidation();
          // 调用评论axios请求
          // http://114.116.235.94/comment_post/
          this.$axios({
            "method": "POST",
            "url": "http://114.116.235.94/comment_paper/",
            "data": {
              "user_id": this.$store.state.person.userID !== "" ? this.$store.state.person.userID : "1",
              "paper_id": this.paper_id,
              "content": this.text,
            },
            "transformRequest": [function (data) {

              let ret = "";
              for (const it in data) {

                ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

              }
              return ret;

            }],
          }).then(response => {

            console.log("发表学术成果评论", response);
            if (response.data.code === 200) {

              this.alert = true;

            }
            this.hasComment = false;

          });
          const d = new Date();
          let str = "";
          str += `${d.getFullYear()}/`; // 获取当前年份
          str += `${d.getMonth() + 1}/`; // 获取当前月份（0——11）
          str += `${d.getDate()}/ `;
          str += `${d.getHours()}:`;
          str += `${d.getMinutes()}:`;
          str += d.getSeconds();
          clearTimeout(this.timer);  //清除延迟执行
          this.timer = setTimeout(() => {   //设置延迟执行
            this.$axios({
              "method": "POST",
              "url": "http://114.116.235.94/get_paper_comment/",
              "data": {
                "paper_id": this.paper_id
              },
              "transformRequest": [function (data) {

                let ret = "";
                for (const it in data) {

                  ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

                }
                return ret;

              }],
            }).then(response => {

              console.log("查看学术成果评论2", response);
              this.comments = response.data.comment;

            });
          }, 1000);

        }
      } else {
        this.isLoginAlert = true;
      }
    },
    onReset() {

      this.text = null;
      this.$refs.text.resetValidation();

    },
    gotoCheckUser(userid) {
      console.log(userid)
      window.sessionStorage.setItem('otherpersonid', userid);
      this.$router.push({
        "path": "/otherpersonal",
      })
    },
  },

};
</script>


<template>
  <!--查看帖子页面-->
  <br>
  <PostDrawer
    style="size: 50px"
    @click="back"
  />
  <div class="PostView">
    <q-card style="background: lightskyblue;padding-top: 10px;padding-bottom: 10px;max-width: 1200px;margin: 0 auto">
      <h3 style="text-align: center;margin-bottom: 10px;margin-top: 10px">
        {{ title }}
      </h3>
      <h5 style="text-align: center;margin-top: 10px;margin-bottom: 10px">
        <q-icon
          name="account_circle"
          color="blue-6"
        />
        {{author}}&nbsp;&nbsp;&nbsp;
        <q-icon
          name="watch_later"
          color="blue-6"
        />
        {{time}}
      </h5>
    </q-card>
    <br>
    <!--    <div style="margin-left: 200px;margin-right: 200px;" v-html="context" class="test">-->
    <!--    </div>-->

    <br>
    <q-card class="my-card">
      <div
        style="margin-left: 20px;margin-right: 20px;"
        class="test"
        v-html="context"
      />
      <q-card-actions align="right">
        <q-btn
          flat
          round
          color="red"
          icon="thumb_up"
          size="19px"
          v-show="isgood"
          @click="postNotGood"
        />
        <q-btn
          flat
          round
          color="grey"
          icon="thumb_up"
          size="19px"
          v-show="!isgood"
          @click="postGood"
        />
        <q-btn
          flat
          round
          color="blue-6"
          icon="bookmark"
          size="19px"
        />
        <q-btn
          flat
          round
          color="grey-6"
          icon="error"
          size="19px"
          @click="textJubao"
        />
      </q-card-actions>
    </q-card>
    <q-dialog
      v-model="textJ"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            举报理由
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="reason"
            dense
            autofocus
            @keyup.enter="textJ = false"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            v-close-popup
            flat
            label="取消"
          />
          <q-btn
            v-close-popup
            flat
            label="举报"
            @click="jubao()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <br><br>
    <q-separator inset/>
    <br>
    <h4 style="float: left;margin-top: 20px;margin-left: 120px;margin-bottom: 20px">
      <q-icon
        name="textsms"
        color="blue-6"
      />
      写下您的评论&nbsp;
    </h4>

    <div
      class="q-pa-md"
      style="max-width: 1000px;float: right;margin-right: 100px"
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
          label="写一条友善的评论吧~"
          lazy-rules
          style="float: right;width: 1000px;font-size: 20px"

          :rules="[ val => val && val.length > 0 || '请您输入评论内容',
                    val => val && val.length <= 200 || '评论过长']"
        />
        <q-btn
          ref="name"
          :loading="loading1"
          color="blue-6"
          style="float: left;margin-left: 0;margin-bottom: 0"
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
            提交成功
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
      style="width: 1300px;margin-left: 150px"
    >
      <div
        v-for="comment in comments.slice(left,right)"
        :key="comment"
        style="width: 100%; max-width: 1200px"
      >
        <q-chat-message
          :name="comment.name"
          :avatar="comment.avatar"
          :text="[comment.text]"
          :stamp="comment.stamp"
          style="font-size: 23px;width: 1100px"
          bg-color="blue-2"
        />
        <br>
        <div style="float: right;margin-right: 100px">
          &nbsp;
          <q-btn
            v-show="!comment.isgood"
            icon="thumb_up_off_alt"
            round
            size="10px"
            style="color: deepskyblue"
            @click="good(comment.cid)"
          />
          <q-btn
            v-show="comment.isgood"
            icon="thumb_up_alt"
            round
            color="blue"
            size="10px"
            @click="bad(comment.cid)"
          />
          &nbsp;
          <span>({{ comment.goodnumber }})</span>
          &nbsp;
          <q-btn
            icon="error_outline"
            round
            size="10px"
            style="color: red"
            @click="prompt = true"
          />
        </div>
        <br><br>
        <q-separator
          inset
          style="width: 1200px"
        />
        <br>
        <q-dialog
          v-model="prompt"
          persistent
        >
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">
                举报理由
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                v-model="reason"
                dense
                autofocus
                @keyup.enter="prompt = false"
              />
            </q-card-section>

            <q-card-actions
              align="right"
              class="text-primary"
            >
              <q-btn
                v-close-popup
                flat
                label="取消"
              />
              <q-btn
                v-close-popup
                flat
                label="举报"
                @click="jubao(comment.cid)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>


    <div
      class="q-pa-lg flex flex-center"
      style="width: 1000px;margin: 0 auto"
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
import PostDrawer from "components/Posts/PostDrawer";
import {marked} from "marked";
import hljs from "highlight.js";
// import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/arta.css";


const rendererMD = new marked.Renderer();
marked.setOptions({
  "renderer": rendererMD,
  "highlight"(code) {

    return hljs.highlightAuto(code).value;

  },
  "gfm": true,
  "tables": true,
  "breaks": false,
  "pedantic": false,
  "sanitize": false,
  "smartLists": true,
  "smartypants": false,
  "boxShadow": true
});// 基本设置
export default {
  "name": "PostView",

  "components": {
    PostDrawer,
  },

  data() {

    return {
      "title": '帖子标题',
      "author": '作者',
      "time": '2021/6/10',
      "textJ": false,
      "prompt": false,
      "reason": "",
      "length": 0,
      "isgood": false,
      "current": 1,
      "alert": false,
      "loading1": false,
      "text": "",
      "accept": true,
      "context": "++**vue + quasar + Markdown**++\n" +
        "### 测试\n" +
        "> 19231224卢恒润\n" +
        "```c\n" +
        "int a = 1;\n" +
        "printf(\"Hello world!\");\n" +
        "```\n" +
        "**结束^上角标^**\n" +
        "[mavonEditor](https://github.com/hinesboy/mavonEditor)\n\n" +
        "|column1|column2|column3|\n" +
        "|-|-|-|\n" +
        "|123|c1232|1232133|\n",
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
      "left": 0,
      "right": 5,
    };

  },

  "computed": {},


  mounted() {
    this.$axios({
      method: 'POST',
      url: 'http://114.116.235.94/view_post/',
      data: {
        user_id: this.$route.query.user_id,
        post_id: this.$route.query.post_id
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then(response => {
      console.log("查看帖子", response)
      this.title = response.data.all_info.title
      this.author = response.data.all_info.user
      this.time = response.data.all_info.datetime
      this.context = response.data.all_info.content
      this.isgood = response.data.all_info.islike
    })
    // this.context = this.context.replace(/\n/g, '<br>');
    this.context = marked(this.context);
    if (this.comments / 5 !== 0) {

      this.length = this.comments.length / 5 + 1;

    } else {

      this.length = this.comments.length / 5;

    }

  },

  "methods": {
    postGood() {
      this.isgood = true
    },
    postNotGood() {
      this.isgood = false
    },
    markdownToHtml() {

      this.context = marked(this.context);

    },
    textJubao() {

      this.textJ = true;

    },
    back() {

      this.$router.back();

    },
    jubao(cid) {

      // 举报axios请求
      alert("举报成功");

    },
    good(cid) {

      let index = 0;
      for (index = 0; index < this.comments.length; index += 1) {

        if (this.comments[index].cid === cid) {

          this.comments[index].goodnumber += 1;
          this.comments[index].isgood = true;
          break;

        }

      }

    },
    bad(cid) {

      let index = 0;
      for (index = 0; index < this.comments.length; index += 1) {

        if (this.comments[index].cid === cid) {

          this.comments[index].goodnumber -= 1;
          this.comments[index].isgood = false;
          break;

        }

      }

    },
    change() {

      this.context = this.context.replace(/\n/g, "<br>");

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

      this.$refs.text.validate();

      if (this.$refs.text.hasError) {

        this.formHasError = true;

      } else {

        this.alert = true;
        this.$refs.text.resetValidation();
        // 调用评论axios请求
        this.comments.splice(0, 0, {
          "name": this.$route.params.id,
          "avatar": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171208%2Ff1d2aa196b2248abb59d50bff5c7376a.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640140175&t=fbcd874f84cac90de991d827a58808ae",
          "text": this.text,
          "stamp": "2021/6/10",
          "goodnumber": 0,
          "isgood": false,
          "cid": -1,
        });
        this.text = "";

      }

    },

    onReset() {

      this.text = null;
      this.$refs.text.resetValidation();

    }
  },

};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 1200px
  margin: 0 auto
  padding: 10px

//.PostView
  //background-image: url('../../../public/彼岸双生.png')
</style>

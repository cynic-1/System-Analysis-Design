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
        <span @click="method1(this.actor_id)" style="cursor:pointer"><q-icon
          name="account_circle"
          color="blue-6"
        />
          {{ author }}&nbsp;&nbsp;&nbsp;</span>
        <q-icon
          name="watch_later"
          color="blue-6"
        />
        {{ time }}
      </h5>
    </q-card>
    <br>
    <!--    <div style="margin-left: 200px;margin-right: 200px;" v-html="context" class="test">-->
    <!--    </div>-->

    <br>
    <q-card class="my-card" style="min-width: 1350px">
      <div
        style="margin-left: 20px;margin-right: 20px"
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
          icon="star"
          size="19px"
          @click="unstar"
          v-show="isStar"
        />
        <q-btn
          flat
          round
          color="grey-6"
          icon="star"
          size="19px"
          @click="star"
          v-show="!isStar"
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
      <h5
        style="color: lightgray"
        v-show="hasComment"
      >
        暂时还没有评论
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
          style="font-size: 23px;width: 1100px;cursor:pointer"
          bg-color="blue-2"
          @click="method1(comment.comment_user_id)"
        />
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="logout" color="primary" text-color="white" />
              <span class="q-ml-sm" style="font-size: 20px">您即将前往用户个人空间</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="取消" color="primary" v-close-popup/>
              <q-btn flat label="前往" color="primary" v-close-popup @click="gotoCheckUser(this.comid)"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <br>
        <div style="float: right;margin-right: 100px">
          &nbsp;
          <q-btn
            v-show="!comment.is_like"
            icon="thumb_up_off_alt"
            round
            size="10px"
            style="color: deepskyblue"
            @click="good(comment.com_id)"
          />
          <q-btn
            v-show="comment.is_like"
            icon="thumb_up_alt"
            round
            color="blue"
            size="10px"
            @click="bad(comment.com_id)"
          />
          &nbsp;
          <span>({{ comment.like_num }})</span>
          &nbsp;
          <q-btn
            icon="error_outline"
            round
            size="10px"
            style="color: red"
            @click="this.prompt = true"
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
                @click="commentJubao(comment.comment_user_id,comment.com_id)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
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
        :max="commnet_length"
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
      comid: 0,
      confirm: false,
      isGo: false,
      "commnet_length": 0,
      "isStar": false,
      "hasComment": false,
      "title": "帖子标题",
      "author": "作者",
      "time": "2021/6/10",
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
        "## 请您稍等，数据正在加载\n",

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
      actor_id: 0,
    };

  },

  "computed": {},


  mounted() {

    this.$axios({
      "method": "POST",
      "url": "http://114.116.235.94/view_post/",
      "data": {
        "user_id": this.$route.query.user_id,
        "post_id": this.$route.query.post_id
      },
      "transformRequest": [function (data) {

        let ret = "";
        for (const it in data) {

          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

        }
        return ret;

      }],
    }).then(response => {

      console.log("查看帖子", response);
      this.title = response.data.all_info.title;
      this.author = response.data.all_info.user;
      this.time = response.data.all_info.datetime;
      this.context = response.data.all_info.content;
      this.isgood = response.data.all_info.is_like;
      this.comments = response.data.all_info.comment;
      this.isStar = response.data.all_info.is_col;
      this.actor_id = response.data.all_info.user_id;
      this.markdownToHtml();
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

    // http://114.116.235.94/get_report_post/

    // this.context = this.context.replace(/\n/g, '<br>');
    this.context = marked(this.context);
    if (this.comments / 5 !== 0) {

      this.length = this.comments.length / 5 + 1;

    } else {

      this.length = this.comments.length / 5;

    }

  },

  "methods": {
    method1(userid) {
      this.comid = userid;
      this.confirm = true;
    },
    gotoCheckUser(userid) {
      console.log(userid)
      window.sessionStorage.setItem('otherpersonid', userid);
      this.$router.push({
        "path": "/otherpersonal",
      })
    },
    unstar() {

      this.isStar = false;
      // http://114.116.235.94/del_my_col_post/
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/un_col_post/",
        "data": {
          "post_id": this.$route.query.post_id,
          // 这里有问题
          "user_id": this.$route.query.user_id,
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("取消收藏帖子", response);

      });

    },
    star() {

      // http://114.116.235.94/col_post/
      this.isStar = true;
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/col_post/",
        "data": {
          "user_id": this.$route.query.user_id,
          "post_id": this.$route.query.post_id,
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("收藏帖子", response);

      });

    },
    postGood() {

      this.isgood = true;
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/like_post/",
        "data": {
          "user_id": this.$route.query.user_id,
          "post_id": this.$route.query.post_id,
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("点赞帖子", response);

      });

    },
    postNotGood() {

      // http://114.116.235.94/dislike_post/
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/dislike_post/",
        "data": {
          "user_id": this.$route.query.user_id,
          "post_id": this.$route.query.post_id,
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("取消点赞帖子", response);
        this.isgood = false;

      });

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
    jubao(user_id, cid) {

      // 举报axios请求
      // http://114.116.235.94/report_post/
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/report_post/",
        "data": {
          "user_id": this.$route.query.user_id,
          "post_id": this.$route.query.post_id,
          "reason": this.reason
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("举报帖子", response);
        this.reason = "";

      });
      alert("举报成功");

    },
    good(cid) {

      // http://114.116.235.94/like_comment/
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/like_comment/",
        "data": {
          "user_id": this.$route.query.user_id,
          "com_id": cid,
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("评论点赞", response);

      });
      let index = 0;
      for (index = 0; index < this.comments.length; index += 1) {

        if (this.comments[index].com_id === cid) {

          this.comments[index].like_num += 1;
          this.comments[index].is_like = true;
          break;

        }

      }

    },
    bad(cid) {

      // http://114.116.235.94/dislike_post/
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/dislike_com/",
        "data": {
          "user_id": this.$route.query.user_id,
          "com_id": cid,
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("取消评论点赞", response);

      });
      let index = 0;
      for (index = 0; index < this.comments.length; index += 1) {

        if (this.comments[index].com_id === cid) {

          this.comments[index].like_num -= 1;
          this.comments[index].is_like = false;
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
          "url": "http://114.116.235.94/comment_post/",
          "data": {
            "user_id": this.$route.query.user_id,
            "post_id": this.$route.query.post_id,
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

          console.log("发表评论", response);
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
        this.$axios({
          "method": "POST",
          "url": "http://114.116.235.94/view_post/",
          "data": {
            "user_id": this.$route.query.user_id,
            "post_id": this.$route.query.post_id
          },
          "transformRequest": [function (data) {

            let ret = "";
            for (const it in data) {

              ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

            }
            return ret;

          }],
        }).then(response => {

          console.log("查看帖子", response);
          this.comments = response.data.all_info.comment;

        });

      }

    },

    onReset() {

      this.text = null;
      this.$refs.text.resetValidation();

    },

    commentJubao(user_id, com_id) {

      // http://114.116.235.94/report_comment/
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/report_comment/",
        "data": {
          user_id,
          "comment_id": com_id,
          "reason": this.reason
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("举报评论", response);
        this.prompt = true;
        this.reason = "";

      });

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

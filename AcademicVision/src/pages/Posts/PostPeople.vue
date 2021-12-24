<template>
  <div>
    <div
      class="row"
      style="margin-top: 10px"
    >
      <div class="col-3">
        <q-card class="my-card">
          <q-img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F26%2F20200326212002_rxlyj.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640236068&t=8beea3c899b9955f22135a823c9be01f"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                我发表的帖子
              </div>
              <div class="text-subtitle2">
                My post
              </div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn
              flat
              dark-percentage
              class="card"
              @click="publish"
            >
              查看
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card class="my-card">
          <q-img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-04-30%2F5eaa72d5c22c6.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640236068&t=17ddc1373551ea113de4f13c0b564e9a"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                我收藏的帖子
              </div>
              <div class="text-subtitle2">
                My favorite posts
              </div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn
              flat
              dark-percentage
              class="card"
              @click="love"
            >
              查看
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card class="my-card">
          <q-img
            src="https://pic4.zhimg.com/80/v2-3ee71d53dcb787415a632fdd3ad5eb37_720w.jpg"
            style="height: 170px"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                创作中心
              </div>
              <div class="text-subtitle2">
                Creative center
              </div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn
              flat
              dark-percentage
              class="card"
              @click="create"
            >
              发表帖子
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
<!--      <div class="col-3">-->
<!--        <q-card class="my-card">-->
<!--          <q-img src="../../../public/希儿.jpg">-->
<!--            <div class="absolute-bottom">-->
<!--              <div class="text-h6">-->
<!--                数据分析-->
<!--              </div>-->
<!--              <div class="text-subtitle2">-->
<!--                Data analysis-->
<!--              </div>-->
<!--            </div>-->
<!--          </q-img>-->

<!--          <q-card-actions>-->
<!--            <q-btn-->
<!--              flat-->
<!--              dark-percentage-->
<!--              class="card"-->
<!--              @click="charts"-->
<!--            >-->
<!--              查看-->
<!--            </q-btn>-->
<!--          </q-card-actions>-->
<!--        </q-card>-->
<!--      </div>-->
    </div>

    <h3 v-show="!isPublish && !isLove && !isCreate && !isCharts">
      <q-icon
        name="account_circle"
        color="blue-6"
      />
      &nbsp;知贴 · 个人中心
    </h3>
    <div
      v-show="isPublish === true"
      class="q-pa-md"
    >
      <div
        v-for="test in list"
        :key="test"
        class="q-gutter-md"
        style="max-width: 1200px;margin: 0 auto;"
      >
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-field
            filled
            stack-label
            bg-color="light-blue-1"
            style="cursor:pointer"
          >
            <template #control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
                style="font-size: 25px;margin-top: 10px"
                @click="viewPost(test.post_id)"
              >
                {{ test.title }}
              </div>
              <div style="width: 1100px;text-align: right;font-size: 18px;margin-bottom: 5px">
                <span style="text-align: right">
                  <q-icon
                    color="green-6"
                    name="watch_later"
                    size="23px"
                  />{{ test.datetime }}&nbsp;&nbsp;
                  <q-icon
                    color="red"
                    name="thumb_up"
                    size="23px"
                  />{{ test.likes }}&nbsp;&nbsp;
                  <q-icon
                    color="blue-6"
                    name="textsms"
                    size="23px"
                  />{{ test.lable }}&nbsp;&nbsp;
                  <q-icon
                    color="orange-6"
                    name="bookmark"
                    size="23px"
                  />
                  {{ test.collections }}</span>
              </div>
            </template>
          </q-field>
        </transition>
      </div>
    </div>

    <div
      v-show="isLove === true"
      class="q-pa-md"
    >
      <div
        v-for="test in list"
        :key="test"
        class="q-gutter-md"
        style="max-width: 1200px;margin: 0 auto;"
      >
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-field
            filled
            stack-label
            bg-color="light-blue-1"
            @click="viewPost(test.post_id)"
            style="cursor:pointer"
          >
            <template #control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
                style="font-size: 25px;margin-top: 10px"
                @click="viewPost(test.post_id)"
              >
                {{ test.title }}&nbsp;&nbsp;&nbsp;{{ test.user_name }}
              </div>
              <div style="width: 1100px;text-align: right;font-size: 18px;margin-bottom: 5px">
                <span style="text-align: right">
                  <q-icon
                    color="green-6"
                    name="watch_later"
                    size="23px"
                  />{{ test.time }}&nbsp;&nbsp;
                  <q-icon
                    color="red"
                    name="thumb_up"
                    size="23px"
                  />{{ test.goodnum }}&nbsp;&nbsp;
                  <q-icon
                    color="blue-6"
                    name="textsms"
                    size="23px"
                  />{{ test.commentNum }}&nbsp;&nbsp;
                  <q-icon
                    color="orange-6"
                    name="bookmark"
                    size="23px"
                  />
                  {{ test.col_num }}</span>
              </div>
            </template>
          </q-field>
        </transition>
      </div>
    </div>

    <div
      v-show="isCreate"
      style="margin-top: 50px"
    >
      <span style="font-size: 50px;float: left">知&nbsp;贴&nbsp;<q-btn
        icon="arrow_back"
        size="13px"
        color="blue-6"
        style="float: left"
        @click="$emit('func',1)"
      /></span>
      <span
        style="font-size: 20px;float: left;background-color: rgba(103,206,247,0.64)"
      >&nbsp;Create&nbsp;</span>
      <br>
      <q-banner
        v-show="notice"
        class="bg-grey-3"
        rounded
        style="width: 1000px;margin: 0 auto"
      >
        <template #avatar>
          <q-icon
            name="check_circle"
            color="primary"
          />
        </template>
        <span style="font-size: 25px">知贴支持<strong>Markdown</strong>文本格式文档，你可以在右侧浏览对应效果，您也可以不使用<strong>Markdown</strong>文本格式正常输入即可</span>
        <template #action>
          <a
            href="https://luosijie.github.io/vm-markdown/"
            style="text-decoration: none"
          >
            <q-btn
              flat
              color="primary"
              label="示例"
              style="font-size: 20px"
            />
          </a>
          <q-btn
            flat
            color="primary"
            label="知道了"
            style="font-size: 20px"
            @click="notice = false"
          />
        </template>
      </q-banner>

      <br>
      <mavon-editor
        ref="md"
        v-model="context"
        style="height: 500px;margin-right: 10px"
        image
        @imgAdd="$imgAdd"
      />
      <div
        class="q-pa-md q-gutter-sm"
        style="float: right;margin-right: 200px"
      >
        <q-btn
          color="blue-6"
          icon="cloud_upload"
          label="发布"
          @click="submit1"
        />
      </div>
      <br>
      <br>
      <br>
      <br>
    </div>

    <q-dialog
      v-model="bar2"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn
            v-close-popup
            dense
            flat
            icon="close"
          >
            <q-tooltip content-class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6">
            帖子标题
          </div>
        </q-card-section>
        <q-card-section
          class="q-pt-none"
          style="margin-left: 20px;padding: 0"
        >
          <div
            class="q-gutter-md"
            style="max-width: 300px;background-color: white;margin: 0;padding: 0"
          >
            <q-input
              v-model="title"
              label="文章标题"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">
            选择分区
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <div class="q-gutter-md row">
              <q-select
                v-model="type"
                transition-show="flip-up"
                transition-hide="flip-down"
                filled
                :options="options"
                style="width: 300px;background-color: white"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section style="float: right;margin-right: 15px">
          <q-btn
            v-show="type !== null"
            v-close-popup
            color="blue-10"
            icon="cloud_upload"
            label="发布"
            @click="submit2"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

<!--    <div v-show="isCharts === true">-->
<!--      <div-->
<!--        class="q-pa-md row items-start q-gutter-md"-->
<!--        style="float: left"-->
<!--      >-->
<!--        <q-card class="my-card">-->
<!--          <img src="../../../public/彼岸双生.png">-->

<!--          <q-list>-->
<!--            <q-item clickable>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon-->
<!--                  color="primary"-->
<!--                  name="format_list_numbered"-->
<!--                />-->
<!--              </q-item-section>-->

<!--              <q-item-section>-->
<!--                <q-item-label class="text-h6">-->
<!--                  已发表-->
<!--                </q-item-label>-->
<!--                <q-item-label caption>-->
<!--                  100-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->

<!--            <q-item clickable>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon-->
<!--                  color="red"-->
<!--                  name="favorite"-->
<!--                />-->
<!--              </q-item-section>-->

<!--              <q-item-section>-->
<!--                <q-item-label class="text-h6">-->
<!--                  被收藏-->
<!--                </q-item-label>-->
<!--                <q-item-label caption>-->
<!--                  100-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->

<!--            <q-item clickable>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon-->
<!--                  color="amber"-->
<!--                  name="thumb_up_alt"-->
<!--                />-->
<!--              </q-item-section>-->

<!--              <q-item-section>-->
<!--                <q-item-label class="text-h6">-->
<!--                  获赞数-->
<!--                </q-item-label>-->
<!--                <q-item-label caption>-->
<!--                  100-->
<!--                </q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </q-list>-->
<!--        </q-card>-->
<!--      </div>-->
<!--      <h4>-->
<!--        <q-icon-->
<!--          name="poll"-->
<!--          color="blue-6"-->
<!--        />&nbsp;近期获赞数趋势图-->
<!--      </h4>-->
<!--      <div-->
<!--        id="echarts1"-->
<!--        style="height: 300px;width: 600px;float: right;margin-right: 200px"-->
<!--      />-->
<!--    </div>-->

    <q-dialog v-model="card1">
      <q-card class="my-card">
        <q-img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-678ed781c39579664eeac6c2496f917f_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642902738&t=f87aa0bdd8232724162f240cbaafbd86" height="400px"/>

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="verified"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              您还没有发布过帖子
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              0 post
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            创作，从知贴开始
          </div>
          <div class="text-caption text-grey">
            前往个人创作重新发布一篇帖子吧
          </div>
        </q-card-section>

        <br>
        <q-separator />
      </q-card>
    </q-dialog>

    <q-dialog v-model="card2">
      <q-card class="my-card">
        <q-img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp291868896.jpg&refer=http%3A%2F%2Fimg9.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642902738&t=e32297e8e47b7f4afc8eadfb6e9afa72" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="verified"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              您还没有收藏过帖子
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              0 love
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            收藏，从知贴开始
          </div>
          <div class="text-caption text-grey">
            前往帖子主页收藏一篇帖子吧
          </div>
        </q-card-section>

        <br>
        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import "highlight.js/styles/arta.css";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
// import PostDrawer from "components/Posts/PostDrawer";
import * as echarts from "echarts";

export default {
    "name": "PostPeople",

    "components": {
        mavonEditor,
    },

    data () {

        return {
            "card1": false,
            "card2": false,
            "context": "",
            "bar2": false,
            "notice": true,
            "editor": "",
            "isPublish": false,
            "isLove": false,
            "isCreate": false,
            "isCharts": false,
            "list": [],
            "type": null,
            "options": [
                "文学", "数学", "语言", "计算机", "物理", "化学", "生物", "自动化", "工程建造", "金融", "航空航天", "交流"
            ],
            "title": ""
        };

    },

    "methods": {
        viewPost (post_id) {

            console.log("点击了查看帖子方法");
            this.$router.push({
                "path": "/posts/view",
                "query": {
                    "user_id": this.$store.state.person.userID,
                    "post_id": post_id,
                }
            });

        },
        // 绑定@imgAdd event
        $imgAdd (pos, $file) {

            // 第一步.将图片上传到服务器.
            const formdata = new FormData();
            formdata.append("image", $file);
            axios({
                "url": "server url",
                "method": "post",
                "data": formdata,
                "headers": { "Content-Type": "multipart/form-data" },
            }).then((url) => {

                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                // $vm.$img2Url 详情见本页末尾
                this.$refs.md.$img2Url(pos, url);

            });

        },
        submit2 () {

            this.$axios({
                "method": "POST",
                "url": "http://114.116.235.94/publish_post/",
                "data": {
                    "user_id": this.$store.state.person.userID,
                    "content": this.context,
                    "label": this.type,
                    "title": this.title
                },
                "transformRequest": [function (data) {

                    let ret = "";
                    for (const it in data) {

                        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

                    }
                    return ret;

                }],
            }).then(response => {

                console.log("发布帖子", response);
                if (response.data.code === 200) {

                    alert("帖子发表成功");
                    this.context = "";
                    this.type = "";
                    this.title = "";

                }

            });
            // axios方法
            console.log(this.context);

        },
        getMessage (data) {

            this.context = data;
            console.log(this.context);

        },
        submit1 () {

            if (this.context === "") {

                alert("无法发布，您的帖子内容为空！");

            } else {

                this.bar2 = true;

            }

        },
        async uploadImage (file) {

            const imgUrl = await this.uploadRequest(file);
            return imgUrl;

        },
        htmlChange () {

            this.$nextTick(() => {

                const codes = document.querySelectorAll(".markdown-body pre code");
                codes.forEach(elem => {

                    hljs.highlightBlock(elem);
                    console.log(elem);

                });

            });

        },
        publish () {

            this.isPublish = true;
            this.isLove = false;
            this.isCreate = false;
            this.isCharts = false;
            // http://114.116.235.94/my_post/
            // axios请求方法
            this.$axios({
                "method": "POST",
                "url": "http://114.116.235.94/my_post/",
                "data": {
                    "user_id": this.$store.state.person.userID
                },
                "transformRequest": [function (data) {

                    let ret = "";
                    for (const it in data) {

                        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

                    }
                    return ret;

                }],
            }).then(response => {

                console.log("查询个人发表帖子", response);
                this.list = response.data.info;
                if (this.list.length === 0) {

                    this.card1 = true;

                }

            });
            setTimeout(() => {

                // this.list = [
                //   {
                //     "rank": 1,  // 文章排名，这个只有在排行榜请求的数据的时候才有用，可以根据点赞数，评论数，收藏数综合排名，在排行榜get请求时返回前十个即可
                //     "context": "新的推荐帖子",  // 文章标题
                //     "author": "周杰伦",  // 文章作者昵称
                //     "time": "2021/6/10",  // 文章发表时间
                //     "goodNum": 123, // 文章点赞数
                //     "commentNum": 10, // 文章评论数
                //     "starNum": 10,  // 文章收藏数
                //     "pid": 1, // 作者唯一标识id
                //     "postid": 1,  // 文章唯一标识id
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10,
                //     "pid": 2,
                //     "postid": 2,
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10,
                //     "pid": 3,
                //     "postid": 3,
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10,
                //     "pid": 4,
                //     "postid": 4,
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10,
                //     "pid": 5,
                //     "postid": 5,
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10,
                //     "pid": 6,
                //     "postid": 6,
                //   },
                // ];

            }, 100);
            // 更新List数据

        },
        love () {

            this.$axios({
                "method": "POST",
                "url": "http://114.116.235.94/my_col_post_list/",
                "data": {
                    "user_id": this.$store.state.person.userID
                },
                "transformRequest": [function (data) {

                    let ret = "";
                    for (const it in data) {

                        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

                    }
                    return ret;

                }],
            }).then(response => {

                console.log("查询个人收藏帖子", response);
                this.list = response.data.info;
                if (this.list.length === 0) {

                    this.card2 = true;

                }

            });
            this.isPublish = false;
            this.isLove = true;
            this.isCreate = false;
            this.isCharts = false;
            // axios请求方法
            setTimeout(() => {

                // this.list = [
                //   {
                //     "rank": 1,
                //     "context": "新的推荐帖子",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10
                //   },
                //   {
                //     "rank": 1,
                //     "context": "新的推荐数据",
                //     "author": "周杰伦",
                //     "time": "2021/6/10",
                //     "goodNum": 123,
                //     "commentNum": 10,
                //     "starNum": 10
                //   },
                // ];

            }, 100);
            // 更新List数据

        },
        create () {

            this.isPublish = false;
            this.isLove = false;
            this.isCreate = true;
            this.isCharts = false;

        },
        charts () {

            this.isPublish = false;
            this.isLove = false;
            this.isCreate = false;
            this.isCharts = true;
            const chartDom = document.getElementById("echarts1");
            const myChart = echarts.init(chartDom);
            let option;

            option = {
                "title": {
                    "text": "Distribution of Electricity",
                    "subtext": "Fake Data"
                },
                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "cross"
                    }
                },
                "toolbox": {
                    "show": true,
                    "feature": {
                        "saveAsImage": {}
                    }
                },
                "xAxis": {
                    "type": "category",
                    "boundaryGap": false,
                    // prettier-ignore
                    "data": ["00:00", "01:15", "02:30", "03:45", "05:00", "06:15", "07:30", "08:45", "10:00", "11:15", "12:30", "13:45", "15:00", "16:15", "17:30", "18:45", "20:00", "21:15", "22:30", "23:45"]
                },
                "yAxis": {
                    "type": "value",
                    "axisLabel": {
                        "formatter": "{value} W"
                    },
                    "axisPointer": {
                        "snap": true
                    }
                },
                "visualMap": {
                    "show": false,
                    "dimension": 0,
                    "pieces": [
                        {
                            "lte": 6,
                            "color": "green"
                        },
                        {
                            "gt": 6,
                            "lte": 8,
                            "color": "red"
                        },
                        {
                            "gt": 8,
                            "lte": 14,
                            "color": "green"
                        },
                        {
                            "gt": 14,
                            "lte": 17,
                            "color": "red"
                        },
                        {
                            "gt": 17,
                            "color": "green"
                        }
                    ]
                },
                "series": [
                    {
                        "name": "Electricity",
                        "type": "line",
                        "smooth": true,
                        // prettier-ignore
                        "data": [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
                        "markArea": {
                            "itemStyle": {
                                "color": "rgba(255, 173, 177, 0.4)"
                            },
                            "data": [
                                [
                                    {
                                        "name": "Morning Peak",
                                        "xAxis": "07:30"
                                    },
                                    {
                                        "xAxis": "10:00"
                                    }
                                ],
                                [
                                    {
                                        "name": "Evening Peak",
                                        "xAxis": "17:30"
                                    },
                                    {
                                        "xAxis": "21:15"
                                    }
                                ]
                            ]
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

        }
    }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px

.card
  font-size: 20px
</style>

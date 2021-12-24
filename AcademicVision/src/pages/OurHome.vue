/* eslint-disable vue/multi-word-component-names */
<template>
  <div>
    <br>
    <!--    <NavBar /><br>-->
    <div
      class="q-pa-md"
      style="margin-top: 0;padding-top: 0"
    >
      <q-carousel
        v-model="slide"
        arrows
        control-text-color="primary"
        animated
        height="400px"
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          height="100px"
          name="first"
          img-src="../assets/bg2.jpeg"
        >
          <div class="q-mx-xl L_search q-my-xl" style="font-size: 20px">
            <q-splitter
              v-model="splitterModel"
              style="height: 200px"
              class="q-mx-xl"
              :separator-style="{ backgroundColor: '#63e0ce' }"
            >
              <template #before>
                <q-tabs
                  v-model="tab"
                  vertical
                  class="bg-transparent text-grey-10"
                  active-color="white"
                  indicator-color="white"
                >
                  <q-tab
                    ripple="false"
                    name="search"
                    icon="mail"
                    label="文献检索"
                  />
                  <br>
                  <q-tab
                    name="user_search"
                    icon="alarm"
                    label="门户检索"
                  />
                </q-tabs>
              </template>

              <template #after>
                <q-tab-panels
                  v-model="tab"
                  animated
                  swipeable
                  vertical
                  class="bg-transparent text-white"
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel name="search">
                    <q-input
                      v-model="search_text"
                      outlined
                      label="请输入检索词"
                      @keyup.enter="search"
                    >
                      <template #prepend>
                        <q-select
                          v-model="search_type"
                          style="min-width: 125px"
                          borderless
                          :options="search_type_options"
                          label="检索类型"
                        />
                      </template>
                      <template #append>
                        <q-avatar>
                          <q-btn
                            icon="search"
                            round
                            size="14px"
                            @click="search"
                          />
                        </q-avatar>
                      </template>
                    </q-input>
                    <br>
                    <q-option-group
                      v-model="type_accepted"
                      name="type_acc"
                      :options="type_options"
                      type="checkbox"
                      color="primary"
                      inline
                    />
                    <q-btn
                      outline
                      color="black"
                      size="18px"
                      label="高级检索"
                      @click="advanced"
                    />
                  </q-tab-panel>

                  <q-tab-panel name="user_search">
                    <q-input
                      v-model="user_search_text"
                      outlined
                      label="请输入学者名称"
                      style="margin-top: 50px"
                      @keyup.enter="searchAuthor"
                    >
                      <template #append>
                        <q-avatar>
                          <q-btn
                            icon="search"
                            round
                            size="14px"
                            @click="searchAuthor"
                          />
                        </q-avatar>
                      </template>
                    </q-input>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>


          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              Academic Vision
            </div>
            <div class="text-subtitle1">
              高效&nbsp;&nbsp;&nbsp;精准&nbsp;&nbsp;&nbsp;便捷&nbsp;&nbsp;&nbsp;轻量
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div class="row flex-center bg-blue-grey-2">
      <div
        class="col-3 q-mx-lg"
        style="height: 550px"
      >
        <h4 style="margin: 20px">
          热门论文 <span class="material-icons" style="color: rgba(37,130,255,0.95)">verified</span>
        </h4>
        <div v-for="(each,index) in hot_paper_list"
             :key="each">
          <div
            class="q-pa-md q-gutter-sm"
            style="padding: 0;margin: 0"
          >
            <q-banner
              class="bg-grey-3"
              @click="viewPaper(each.paper_id)"
              rounded
              style="cursor:pointer;background-color: white"
            >
              <template #avatar>
                <q-icon
                  v-if="index+1===1"
                  name="leaderboard"
                  color="red"
                  size="27px"
                />
                <q-icon
                  v-else-if="index+1===2"
                  name="leaderboard"
                  color="yellow-10"
                  size="27px"
                />
                <q-icon
                  v-else-if="index+1===3"
                  name="leaderboard"
                  color="indigo-12"
                  size="27px"
                />
                <q-icon
                  v-else
                  name="leaderboard"
                  color="blue-3"
                  size="27px"
                />
              </template>
              <strong>{{ index + 1 }}&nbsp;&nbsp;&nbsp;</strong>
              {{ each.paper_name }}
            </q-banner>
          </div>
        </div>
      </div>
      <div
        class="col-3 q-mx-lg"
        style="height: 550px"
      >
        <h4 style="margin: 20px">
          热门学者 <span class="material-icons" style="color: rgba(37,130,255,0.95)">supervised_user_circle</span>
        </h4>
        <div v-for="(each,index) in hot_scholar_list"
             :key="each">
          <div
            class="q-pa-md q-gutter-sm"
            style="padding: 0;margin: 0"
          >
            <q-banner
              class="bg-grey-3"
              @click="viewAuthor(each.user_id)"
              rounded
              style="cursor:pointer;background-color: white"
            >
              <template #avatar>
                <q-icon
                  v-if="index+1===1"
                  name="leaderboard"
                  color="red"
                  size="27px"
                />
                <q-icon
                  v-else-if="index+1===2"
                  name="leaderboard"
                  color="yellow-10"
                  size="27px"
                />
                <q-icon
                  v-else-if="index+1===3"
                  name="leaderboard"
                  color="indigo-12"
                  size="27px"
                />
                <q-icon
                  v-else
                  name="leaderboard"
                  color="blue-3"
                  size="27px"
                />
              </template>
              <strong>{{ index + 1 }}&nbsp;&nbsp;&nbsp;</strong>
              <strong>{{ each.name }}&nbsp;&nbsp;&nbsp;</strong>
              <row style="float:right;padding-right: 40px">被引量{{ each.quote }}</row>

            </q-banner>
          </div>
        </div>
      </div>
      <div
        class="col-3 q-mx-lg"
        style="height: 550px"
      >
        <h4 style="margin: 20px">
          热搜关键词 <span class="material-icons" style="color: rgba(37,130,255,0.95)">local_fire_department</span>
        </h4>
        <div v-for="(each,index) in hot_keyword_list"
             :key="each">
          <div
            class="q-pa-md q-gutter-sm"
            style="padding: 0;margin: 0"
          >
            <q-banner
              class="bg-grey-3"
              @click="viewKeyword(each)"
              rounded
              style="cursor:pointer;background-color: white"
            >
              <template #avatar>
                <q-icon
                  v-if="index+1===1"
                  name="leaderboard"
                  color="red"
                  size="27px"
                />
                <q-icon
                  v-else-if="index+1===2"
                  name="leaderboard"
                  color="yellow-10"
                  size="27px"
                />
                <q-icon
                  v-else-if="index+1===3"
                  name="leaderboard"
                  color="indigo-12"
                  size="27px"
                />
                <q-icon
                  v-else
                  name="leaderboard"
                  color="blue-3"
                  size="27px"
                />
              </template>
              <strong>{{ index + 1 }}&nbsp;&nbsp;&nbsp;</strong>
              {{ each }}
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <!--评论测试>-->
  </div>
</template>

<script>
import EachRanking from "components/Posts/EachRanking";
// import RankingList from "components/Posts/RankingList";
import NavBar from "components/NavBar";
import PaperComment from "components/PaperComment";

export default {
  "name": "Home",
  "props": ["rank", "context", "author", "pid"],
  "components": {
    NavBar,
    EachRanking,
    PaperComment
  },

  data() {
    return {
      "type_accepted_user": [],
      "type_options_user": [
        {
          "label": "普通用户",
          "value": "normal_user"
        },
        {
          "label": "科研用户",
          "value": "science_user"
        },
      ],
      "type_accepted": [],
      "type_options": [
        {
          "label": "学术期刊",
          "value": "qikan"
        },
        {
          "label": "学位论文",
          "value": "lunwen"
        },
        {
          "label": "图书书籍",
          "value": "pop"
        },
      ],

      "search_type": "不限",
      "search_type_options": [
        "不限", "篇名", "摘要", "关键词", "作者", "发表时间"
      ],
      "search_text": "",
      "user_search_text": "",
      "tab": "search",
      "splitterModel": 20,
      "dense": false,
      "slide": "first",
      "autoplay": true,
      "hot_paper_list": [
        {"paper_id": 1, "paper_name": "拓扑排序"},
        {"paper_id": 2, "paper_name": "插入排序"},
        {"paper_id": 3, "paper_name": "分治"},
      ],
      "hot_scholar_list": [
        {"author_id": 1, "name": "宋", "quote": "1231"},
        {"author_id": 2, "name": "徐", "quote": "1221"},
      ],
      "hot_keyword_list": [
        "软件工程",
        "操作系统",
        "数据挖掘",
        "算法设计",
      ]
    };

  },

  methods: {
    viewPaper(paper_id) {

      console.log("点击了查看论文方法", paper_id);
      this.$router.push({
        "path": "/paper/check",
        "query": {
          "id": paper_id
        }
      });

    },
    viewAuthor(user_id) {

      console.log("点击了查看学者方法", user_id);
      window.sessionStorage.setItem('otherpersonid', user_id);
      this.$router.push({
        "path": "/otherpersonal",
      })

    },
    viewKeyword(keyword) {

      console.log("点击了查看关键词方法", keyword);
      this.$router.push({"path": "/search", "query": {"searchBy": "不限", "key": keyword, "method": "1"}});

    },
    search() {
      console.log(`您点击了搜索按钮，您选择搜索的内容是${this.search_text}`);
      this.$router.push({
        "path": "/search",
        "query": {"searchBy": this.search_type, "key": this.search_text, "method": "1"}
      });

    },
    searchAuthor() {
      this.$router.push({"path": "/search/user", "query": {"key": this.user_search_text}});
    },
    advanced() {
      this.$router.push("/search/advanced")
    }
  },
  mounted() {
    console.log("加载首页")
    this.$axios({
      "method": "POST",
      "url": "http://114.116.235.94/top_author/",
      "data": {},
      "transformRequest": [function (data) {
        let ret = "";
        for (const it in data) {

          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

        }
        return ret;

      }],
    }).then(response => {
      console.log("作者热度排行榜", response);
      this.hot_scholar_list = response.data.info;
    });
    this.$axios({
      "method": "POST",
      "url": "http://114.116.235.94/top_keywords/",
      "data": {},
      "transformRequest": [function (data) {
        let ret = "";
        for (const it in data) {

          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

        }
        return ret;

      }],
    }).then(response => {
      console.log("关键词热度排行榜", response);
      this.hot_keyword_list = response.data.all_key;
    });
    this.$axios({
      "method": "POST",
      "url": "http://114.116.235.94/top_paper/",
      "data": {},
      "transformRequest": [function (data) {
        let ret = "";
        for (const it in data) {

          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

        }
        return ret;

      }],
    }).then(response => {
      console.log("论文热度排行榜", response);
      this.hot_paper_list = response.data.top_paper;
    });
  },


};
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

.my-card
  width: 100%
  max-width: 500px

.L_search
  width: 90%

.tabs
  width: 90%
</style>

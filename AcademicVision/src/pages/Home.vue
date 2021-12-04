/* eslint-disable vue/multi-word-component-names */
<template>
  <div>
    <NavBar /><br>
    <div
      class="q-pa-md"
      style="margin-top: 0;padding-top: 0"
    >
      <q-carousel
        v-model="slide"
        arrows
        animated
        height="500px"
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          height="400px"
          name="first"
          img-src="../assets/bg2.jpeg"
        >
          <div class="q-mx-xl L_search q-my-xl">
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
                    name="search"
                    icon="mail"
                    label="文献检索"
                  /><br><br><br>
                  <q-tab
                    name="user_search"
                    icon="alarm"
                    label="用户检索"
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
                    >
                      <template #prepend>
                        <q-select
                          v-model="search_type"
                          multiple
                          clearable
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
                    <br>
                    <q-btn
                      outline
                      color="black"
                      size="18px"
                      label="高级检索"
                    />
                  </q-tab-panel>

                  <q-tab-panel name="user_search">
                    <q-input
                      v-model="user_search_text"
                      outlined
                      label="请输入用户名"
                    >
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
                      v-model="type_accepted_user"
                      name="type_acc_user"
                      :options="type_options_user"
                      type="checkbox"
                      color="primary"
                      inline
                    />
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
          热 门 论 文 <span class="material-icons">trending_up</span>
        </h4>
        <EachRanking
          v-for="each in hot_paper_list"
          :key="each"
          :rank="each.rank"
          :context="each.context"
          :author="each.author"
        />
      </div>
      <div
        class="col-3 q-mx-lg"
        style="height: 550px"
      >
        <h4 style="margin: 20px">
          热 门 学 者 <span class="material-icons">trending_up</span>
        </h4>
        <EachRanking
          v-for="each in hot_scholar_list"
          :key="each"
          :rank="each.rank"
          :context="each.context"
          :author="each.author"
        />
      </div>
      <div
        class="col-3 q-mx-lg"
        style="height: 550px"
      >
        <h4 style="margin: 20px">
          热 门 关 键 词 <span class="material-icons">trending_up</span>
        </h4>
        <EachRanking
          v-for="each in hot_keyword_list"
          :key="each"
          :rank="each.rank"
          :context="each.context"
          :author="each.author"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EachRanking from "components/Posts/EachRanking";
// import RankingList from "components/Posts/RankingList";
import NavBar from "components/NavBar";

export default {
    "name": "Home",

    "components": {
        NavBar,
        EachRanking
    },

    data () {

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
                    "label": "学术论文",
                    "value": "lunwen"
                },
                {
                    "label": "会议",
                    "value": "conference"
                },
                {
                    "label": "报纸",
                    "value": "newpaper"
                },
                {
                    "label": "年鉴",
                    "value": "nianjian"
                },
                {
                    "label": "专利",
                    "value": "zhuanli"
                },
                {
                    "label": "成果",
                    "value": "chengguo"
                },
                {
                    "label": "图书",
                    "value": "pop"
                },
            ],

            "search_type": null,
            "search_type_options": [
                "主题", "关键字", "作者", "第一作者", "参考文献", "摘要", "文献来源", "作者单位", "DOI"
            ],
            "search_text": "",
            "user_search_text": "",
            "tab": "search",
            "splitterModel": 20,
            "dense": false,
            "slide": "first",
            "autoplay": true,
            "hot_paper_list": [
                { "rank": 1, "context": "拓扑排序", "author": "" },
                { "rank": 2, "context": "狄杰斯特拉算法", "author": "" },
                { "rank": 3, "context": "Prime算法", "author": "" },
                { "rank": 4, "context": "什么时候能做完软工啊", "author": "" },
                { "rank": 5, "context": "55555555", "author": "555" },
                { "rank": 6, "context": "66666666", "author": "666" },
                { "rank": 7, "context": "77777777", "author": "777" },
            ],
            "hot_scholar_list": [
                { "rank": 1, "context": "晓海", "author": "" },
                { "rank": 2, "context": "永欣", "author": "" },
                { "rank": 3, "context": "卢", "author": "黄俊郎" },
                { "rank": 4, "context": "郭", "author": "444" },
                { "rank": 5, "context": "龙", "author": "555" },
                { "rank": 6, "context": "66666666", "author": "666" },
                { "rank": 7, "context": "77777777", "author": "777" },
            ],
            "hot_keyword_list": [
                { "rank": 1, "context": "软件工程", "author": "" },
                { "rank": 2, "context": "操作系统", "author": "" },
                { "rank": 3, "context": "编译原理", "author": "" },
                { "rank": 4, "context": "智能计算", "author": "" },
                { "rank": 5, "context": "算法", "author": "" },
                { "rank": 6, "context": "66666666", "author": "" },
                { "rank": 7, "context": "77777777", "author": "" },
            ]
        };

    },

    "methods": {
        search () {

            console.log(`您点击了搜索按钮，您选择搜索的内容是${this.text}`);
            this.$router.push({ "path": "/posts/search", "query": { "id": 123456, "context": this.text } });

        }
    }
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

<template>
  <left-drawer>
    <template #leftDrawer>
      <q-card>
        <div class="q-pa-md text-h5 text-center">
          学 术 中 心
        </div>
        <q-separator />
        <q-tabs
          v-model="tab"
          align="justify"
          class="text-grey-6 q-py-md"
          active-color="primary"
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          inline-label
        >
          <q-tab
            v-for="item in tabsList"
            :key="item"
            ripple
            :name="item.name"
            :icon="item.icon"
            :label="item.label"
            content-class="q-py-md"
          />
        </q-tabs>
      </q-card>
    </template>
    <template #navBar4SmallWindow>
      <q-tabs
        v-model="tab"
        align="justify"
        class="text-grey-6 q-py-md"
        active-color="primary"
        swipeable
        transition-prev="jump-up"
        transition-next="jump-up"
        inline-label
        mobile-arrows
      >
        <q-tab
          v-for="item in tabsList"
          :key="item"
          ripple
          :name="item.name"
          :icon="item.icon"
          :label="item.label"
        />
      </q-tabs>
    </template>
    <template #main>
      <q-tab-panels
        v-model="tab"
        animated
      >
        <!--          这里加个padding是为了改他默认的padding，对齐好看-->
        <q-tab-panel
          name="scholar page"
          style="padding: 1px"
        >
          <q-card>
            <div class="text-h5 q-pa-md">
              统计数据
            </div>
            <q-separator inset />
            <pie-chart />
          </q-card>
          <q-card class="q-my-xl">
            <div class="text-h5 q-pa-md">
              历史数据
            </div>
            <q-separator inset />
            <line-chart />
          </q-card>
          <q-card>
            <article-item
              v-for="item in confirmedListExample"
              :key="item"
              v-bind="item"
            />
          </q-card>
        </q-tab-panel>
        <q-tab-panel
          name="confirm authorship"
          style="padding: 1px"
        >
          <q-card>
            <div class="text-h5 q-pa-md">
              作者是你吗？
            </div>
            <div class="row q-px-md">
              <div class="col text-h6 text-grey-8">
                认领学术成果，将它们加入你的学者主页
              </div>
              <div class="col text-h6 text-right">
                不是你？
                <q-btn
                  label="修改个人信息"
                  size="lg"
                  unelevated
                  padding="none"
                  text-color="grey-13"
                  @click="() => {this.$emit('changeTab', '1')}"
                />
              </div>
            </div>
            <q-separator inset />
            <q-list>
              <article-item v-for="item in confirmListExample" :key="item" v-bind="item"/>
            </q-list>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </left-drawer>
</template>

<script>
import { defineAsyncComponent } from "vue";

const leftDrawer = defineAsyncComponent(() => import("../../layouts/LeftDrawer"));
const pieChart = defineAsyncComponent(() => import("../../components/PieChart"));
const lineChart = defineAsyncComponent(() => import("../../components/LineChart"));
const articleItem = defineAsyncComponent(() => import("../../components/ArticleItem"));


export default {
    "name": "PersonalResearch",
    "components": {
        leftDrawer,
        pieChart,
        lineChart,
        articleItem,
    },
    data () {

        return {
            "tab": "scholar page",
            "tabsList": [
                { "name": "scholar page", "icon": "description", "label": "学者主页" },
                { "name": "confirm authorship", "icon": "school", "label": "研究认领" },
                { "name": "questions", "icon": "help_center", "label": "我的问题" },
                { "name": "answers", "icon": "question_answer", "label": "我的回答" },
            ],
            "confirmListExample": [
                {
                    "canEdit": 0,
                    "authorName": "宋永欣",
                    "researchType": 0, // 0: 期刊 1: 会议 2：专著 3: 其他
                    "title": "GAT综述：模型、算法和应用",
                    "publishTime": "2021/09/10",
                    "journalName": "计算机学报", // 期刊、会议、出版社名
                    "authorList": ["宋永欣", "王章琦", "刘子楠"], // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
                    "reference": 23
                }
            ],
            "confirmedListExample": [
                {
                    "canEdit": 1,
                    "authorName": "宋永欣",
                    "researchType": 0, // 0: 期刊 1: 会议 2：专著 3: 其他
                    "title": "GAT综述：模型、算法和应用",
                    "publishTime": "2021/09/10",
                    "journalName": "计算机学报", // 期刊、会议、出版社名
                    "authorList": ["宋永欣", "王章琦", "刘子楠"], // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
                    "reference": 23
                }
            ],
        };

    },
    "computed": {
    }

};
</script>

<style lang="sass">
</style>

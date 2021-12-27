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
          <div v-if="this.confirmedList.length > 0">
            <q-card>
              <div class="text-h5 q-pa-md">
                统计数据
              </div>
              <q-separator inset />
              <pie-chart v-if="this.dataReady" />
            </q-card>
            <q-card class="q-my-xl">
              <div class="text-h5 q-pa-md">
                历史数据
              </div>
              <q-separator inset />
              <line-chart v-if="this.dataReady1"/>
            </q-card>
            <q-card>
              <article-item
                v-for="item in confirmedList"
                :key="item"
                v-bind="item"
              />
            </q-card>
          </div>
          <div v-else>
            <q-card>
              <div class="q-pa-xl justify-center" style="min-width: 200px; min-height: 100px">
                <q-btn flat class="text-center text-h5 q-ma-md text-grey" @click="()=>{tab='confirm authorship'}"
                style="cursor: pointer"
                >您尚未认领任何成果，请前往认领</q-btn>
              </div>

            </q-card>
          </div>

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
            <template v-if="this.confirmList.length > 0">
              <q-list>
                <template
                  v-for="(item,index) in confirmList"
                  :key="item.paperId">
                  <article-item
                    v-bind="item"
                    @denyAuthor="confirmList.splice(index, 1)"
                    @claimAuthor="claimAuthor(item.paperId)"
                  />
                </template>
              </q-list>
            </template>
            <template v-else>
              <div class="q-pa-xl text-center text-grey text-h5">
                根据您的姓名未搜索到学术成果
              </div>
            </template>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </left-drawer>
</template>

<script>
import { defineAsyncComponent, watch } from "vue";

const leftDrawer = defineAsyncComponent(() => import("../../layouts/LeftDrawer"));
const pieChart = defineAsyncComponent(() => import("../../components/PieChart"));
const lineChart = defineAsyncComponent(() => import("../../components/LineChart"));
const articleItem = defineAsyncComponent(() => import("../../components/ArticleItem"));

const typeMap = [-1, 2, 1, 0, 3];

export default {
    "name": "PersonalResearch",
    "components": {
        leftDrawer,
        pieChart,
        lineChart,
        articleItem,
    },
    props: {
      username: String,
    },
    data () {

        return {
            "tab": "scholar page",
            "dataReady": false,
            "dataReady1": false,
            "tabsList": [
                { "name": "scholar page", "icon": "description", "label": "学者主页" },
                { "name": "confirm authorship", "icon": "school", "label": "研究认领" },
            ],
            "confirmList": [],
            "confirmedList": [],
            articleCount: [],
            articleSum: 7,
            paperIdList: []
        };

    },
    "methods": {
      claimAuthor(it) {
        const index = this.confirmList.findIndex(item => item.paperId === it)
        this.confirmAuthor(it)
        this.confirmList.splice(index, 1)
        this.getConfirmedList()
        this.getLineChartData()
      },
      confirmAuthor(paperId) {
        this.$axios({
          "method": "post",
          "url": "claim_paper/",
          "header": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
              "user_id": this.$route.query.userId,
              "paper_id": paperId
          },
          "transformRequest": [function (data) {

            let ret = "";
            for (const it in data) {

              ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

            }
            return ret;

          }],
        }).then((res) => {

          console.log(res.data);
          if (res.data.code !== "400") return alert(res.data.message);
          alert("文章认领成功");
        });
      },
      getConfirmedList() {
        this.$axios({
          "method": "post",
          "url": "my_paper/",
          "header": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "user_id": this.$route.query.userId,
          },
          "transformRequest": [function (data) {

            let ret = "";
            for (const it in data) {

              ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

            }
            return ret;

          }],
        }).then((res) => {

          console.log(res.data);
          if (res.data.code !== 200) {
            console.log(this.$store.state.person.papers)
            return;
          }
          this.confirmedList = res.data.data.paper_list;
          this.confirmedList.forEach((item) => {
            item.publishTime = item.publishTime === "N/A" ? "" : item.publishTime
          })
          console.log(this.confirmedList)
          this.articleCount = res.data.type;
          this.articleSum = res.data.sum;
          console.log(this.articleCount[0]);
          console.log(this.articleSum);
          this.$store.commit("setPapers", this.confirmedList.slice());
          this.$store.commit("setPaperCounts", this.articleCount.slice());

          this.dataReady = true;
          // alert("文章认领成功");
        });
      },
      getLineChartData() {
        this.$axios({
          "method": "post",
          "url": "count_my_paper/",
          "header": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "user_id": this.$route.query.userId,
          },
          "transformRequest": [function (data) {

            let ret = "";
            for (const it in data) {

              ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

            }
            return ret;

          }],
        }).then((res) => {
            console.log(res.data);
            this.$store.commit("setQuoteNums", res.data.num);
            this.$store.commit("setYears", res.data.years);
            this.dataReady1 = true;

        });
      },
      getConfirmList(list) {
        console.log(this.$store.state.person.username)
        this.$axios({
          "method": "get",
          "url": "search/",
          "header": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "params": {
            "q": this.$store.state.person.username,
            "method": 1,
            "want": "00010"
          },
          "transformRequest": [function (data) {

            let ret = "";
            for (const it in data) {

              ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

            }
            return ret;

          }],
        }).then((res) => {

          if (res.data.status.code !== 200) return;
          this.confirmList = [];
          for (let it of res.data.data.goods) {
            if (list.includes(it.id)) continue;
            console.log(it.id);
            let temp = {
              "canEdit": 0,
              "authorName": "宋永欣",
              "paperId": it.id,
              "researchType": typeMap[it.type], // 0: 期刊 1: 会议 2：专著 3: 其他
              "title": it.title,
              "publishTime": it.publish_time === "N/A"? "" : it.publish_time,
              "journalName": it.org === "N/A" ? "" : it.org, // 期刊、会议、出版社名
              "authorList": it.author_name.match(/(?<=\')[^,].*?(?=\')/g), // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
              "reference": it.quote === "N/A" ? 0 : Number(it.quote),
            };
            this.confirmList.push(temp);
          }
          this.$store.commit("setConfirmPapers", this.confirmList.slice());
          console.log(this.confirmList)
          // alert("文章认领成功");
        });
      },
      getConfirmListWithFilter() {
        this.$axios({
          "method": "post",
          "url": "my_paper_id/",
          "header": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "user_id": this.$route.query.userId
          },
          "transformRequest": [function (data) {

            let ret = "";
            for (const it in data) {

              ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

            }
            return ret;

          }],
        }).then((res) => {
          const paperIdList = res.data.paper_id_list;
          this.getConfirmList(paperIdList);
        });
      }

    },
    "computed": {
    },
    created () {
        this.getConfirmedList();
        console.log("test confirm list");
        this.getConfirmListWithFilter()
        this.getLineChartData()
    },
    mounted () {
      watch(
        this.$store.state.person.username,
        (newId) => {
          this.getConfirmedList();
          this.getLineChartData()
        },
        { "deep": true }
      );
    },

};
</script>

<style lang="sass">
</style>

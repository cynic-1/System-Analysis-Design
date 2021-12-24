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
            ripple
            name="scholar page"
            icon="description"
            label="学者主页"
            content-class="q-py-md"
          />
        </q-tabs>
      </q-card>
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
          <template v-if="this.confirmedList.length > 0">
            <q-card>
              <div class="text-h5 q-pa-md">
                统计数据
              </div>
              <q-separator inset />
              <pie-chart v-if="this.dataReady" :n="this.articleCount" :s="this.articleSum" />
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
                v-for="item in confirmedList"
                :key="item"
                v-bind="item"
              />
            </q-card>
          </template>
          <template v-else>
            <q-card>
              <div class="q-pa-xl text-center text-h5" >
                该用户尚未认领学术成果
              </div>
            </q-card>
          </template>

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
      "confirmList": [],
      "confirmedList": [],
      articleCount: [],
      articleSum: 7,
    };

  },
  "methods": {
    claimAuthor(it) {
      const index = this.confirmList.findIndex(item => item.paperId === it)
      this.confirmAuthor(it)
      this.confirmList.splice(index, 1)
      this.getConfirmedList()
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
          "user_id": window.sessionStorage.getItem('otherpersonid'),
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
    getConfirmList() {
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

        console.log(res.data);
        if (res.data.status.code !== 200) return;
        this.confirmList = [];
        for (let it of res.data.data.goods) {
          let temp = {
            "canEdit": 0,
            "authorName": "宋永欣",
            "paperId": it.id,
            "researchType": typeMap[it.type], // 0: 期刊 1: 会议 2：专著 3: 其他
            "title": it.title,
            "publishTime": it.publish_time,
            "journalName": it.org === "N/A" ? "" : it.org, // 期刊、会议、出版社名
            "authorList": it.author_name.match(/(?<=\')[^,].*?(?=\')/g), // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
            "reference": it.quote === "N/A" ? 0 : Number(it.quote),
          };
          this.confirmList.push(temp);
        }
        this.$store.commit("setConfirmPapers", this.confirmList.slice());
        console.log(this.confirmList)
        this.dataReady = true;
        // alert("文章认领成功");
      });
    }

  },
  "computed": {
  },
  created () {
    this.getConfirmedList();
    console.log("test confirm list");
    this.getConfirmList()
  },
  mounted () {
    watch(
      this.$store.state.person.username,
      (newId) => {
        this.getConfirmedList();
      },
      { "deep": true }
    );
  },
  watch: {

  }


};
</script>

<style lang="sass">
</style>

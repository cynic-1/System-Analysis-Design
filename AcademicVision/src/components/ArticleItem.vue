<template>
  <q-item
    class="q-pt-md"
  >
    <q-item-section top>
      <q-item-label lines="1" @click="viewPaper">
        <span class="text-h5 text-weight-bold cursor-pointer">{{ title }}</span>
      </q-item-label>
      <q-item-label lines="1">
        <q-chip
          size="lg"
          square
          outline
          color="teal"
          text-color="white"
        >
          {{ this.researchTypeStrMap[researchType] }}
        </q-chip>
        <span class="text-h6 text-grey q-px-md">{{ pubTime }} {{ journalName }}
            被引量: {{ reference }}</span>
      </q-item-label>
      <q-item-label
        lines="1"
        class="q-mt-xs"
      >
          <span
            v-for="it in authorList"
            class="q-px-xs text-uppercase text-h6"
          >{{ it }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section
      top
      side
    >
      <div
        class="text-grey-8 q-gutter-xs"
        v-if="canEdit===0"
      >
        <q-btn
          class="gt-xs"
          size="lg"
          flat
          dense
          color="primary"
          icon="close"
          label="不是我"
          @click="() => {this.$emit('denyAuthor')}"
        />
        <q-btn
          class="gt-xs"
          size="lg"
          dense
          icon="check"
          label="我是作者"
          color="primary"
          @click="() => {this.$emit('claimAuthor')}"
        />
      </div>
      <div v-else-if="canEdit===1">
        <q-btn
          class="gt-xs"
          size="lg"
          dense
          flat
          color="red"
          icon="add_circle_outline"
          label="举报"
          @click="jubao()"
        />
<!--        <q-btn-->
<!--          class="gt-xs"-->
<!--          size="lg"-->
<!--          dense-->
<!--          flat-->
<!--          icon="upload"-->
<!--          label="上传全文"-->
<!--          color="primary"-->
<!--        />-->
      </div>
      <div v-else-if="canEdit===2">
        <q-btn
          class="gt-xs"
          size="lg"
          dense
          flat
          color="grey-6"
          icon="star"
          label="收藏"
          v-show="!isStar"
          @click="star"
        />
        <q-btn
          class="gt-xs"
          size="lg"
          dense
          flat
          color="blue-6"
          icon="star"
          label="收藏"
          v-show="isStar"
          @click="unstar"
        />
        <q-btn
          class="gt-xs"
          size="lg"
          dense
          flat
          icon="bookmark"
          label="关注"
          color="primary"
        />
      </div>
    </q-item-section>
  </q-item>

  <q-dialog
    v-model="show"
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
          @click="test1()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    "canEdit": Number,
    "authorName": String,
    "paper_id": Number,
    "researchType": Number, // 0: 期刊/会议 1: 学位论文 2：专著 3: 其他
    "title": String,
    "publishTime": String,
    "journalName": String, // 期刊、会议、出版社名
    "authorList": Array , // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
    "reference": Number
  },
  data () {

    return {
      "researchTypeStrMap": ["期刊/会议", "学位论文", "专著", "其他"],
      isStar: false,
      show: false,
      reason: ""
    };

  },
  methods: {
    jubao() {
      this.show = true
    },
    test1() {
      this.$axios({
        "method": "POST",
        "url": "report_author/",
        "data": {
          "user_id1": window.sessionStorage.getItem('otherpersonid'),
          "post_id2": this.$store.state.person.userID,
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
      alert("举报成功")
    },
    collect() {
      this.$axios({
        "method": "post",
        "url": "col_paper/",
        "header": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "paper_id": this.paper_id,
          "user_id": this.$store.state.person.userID,
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
        alert("修改个人信息成功");
        this.disabled = true;
        // PersonalMain.methods.loadpersonalInfo();

      });
    },
    unstar() {

      this.isStar = false;
      // http://114.116.235.94/del_my_col_post/
      this.$axios({
        "method": "POST",
        "url": "un_col_paper/",
        "data": {
          "user_id": this.$store.state.person.userID,
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

        console.log("取消收藏文章", response);

      });

    },
    star() {

      this.isStar = true;
      this.$axios({
        "method": "POST",
        "url": "col_paper/",
        "data": {
          "paper_id": this.paper_id,
          "user_id": this.$store.state.person.userID,
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("收藏文章", response);

      });

    },
    viewPaper() {
      this.$router.push({
        "path": "/paper/check",
        "query": {
          "id": this.paper_id
        }
      });

    },
  },
  mounted () {
    console.log(this.publishTime === "N/A")
  },
  computed: {
    pubTime() {
      if (this.publishTime === "N/A") return "";
      else return this.publishTime
    }
  }
};
</script>

<style scoped>

</style>

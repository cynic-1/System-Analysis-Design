<template>
  <q-item
    class="q-pt-md"
  >
    <q-item-section top>
      <q-item-label lines="1">
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
        <span class="text-h6 text-grey q-px-md">{{ publishTime }} {{ journalName }}
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
          color="primary"
          icon="add_circle_outline"
          label="补充相关资源"
          @click="collect()"
        />
        <q-btn
          class="gt-xs"
          size="lg"
          dense
          flat
          icon="upload"
          label="上传全文"
          color="primary"
        />
      </div>
      <div v-else-if="canEdit===2">
        <q-btn
          class="gt-xs"
          size="lg"
          dense
          flat
          color="primary"
          icon="star"
          label="收藏"
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
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    "canEdit": Number,
    "authorName": String,
    "paperId": Number,
    "researchType": Number, // 0: 期刊/会议 1: 学位论文 2：专著 3: 其他
    "title": String,
    "publishTime": String,
    "journalName": String, // 期刊、会议、出版社名
    "authorList": Array , // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
    "reference": Number
  },
  data () {

    return {
      "researchTypeStrMap": ["期刊/会议", "学位论文", "专著", "其他"]
    };

  },
  methods: {
    collect() {
      this.$axios({
        "method": "post",
        "url": "col_paper/",
        "header": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "paper_id": this.paperId,
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
    }
  }
};
</script>

<style scoped>

</style>

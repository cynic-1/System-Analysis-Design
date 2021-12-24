<template>
  <div class="row">
    <q-avatar><img :src="userAvatar" alt="头像"/></q-avatar>
    <span class="text-light-blue text-h5 q-pa-sm">{{userName}}</span>
    <span class="text-h6 q-py-sm q-px-lg">{{this.actionTypeStrMap[actionType]}}</span>
  </div>
  <article-item
  :title="title"
  :researchType="researchType"
  :paperId="paperId"
  :publishTime="publishTime"
  :journalName="journalName"
  :authorList="authorList"
  :reference="reference"
  :canEdit="2"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
const articleItem = defineAsyncComponent(() => import("./ArticleItem"));

export default {
    name: "MessageItem",
    components: {
        articleItem
    },
    props: {
        userName: String,
        userAvatar: String,
        actionType: Number, // 0: 增加一篇期刊 1: 关注一篇期刊
        // 2.增加一篇会议 3. 关注一篇会议 4：增加一篇专著 5: 关注一篇专著 6. 增加其他研究 7. 关注其他研究
        paperId: Number,
        title: String,
        researchType: Number, // 0: 期刊 1: 会议 2：专著 3: 其他
        publishTime: String,
        journalName: String, // 期刊、会议、出版社名
        authorList:  [String], // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
        reference: Number
    },
    data() {
      return {
        actionTypeStrMap: ["添加一篇期刊", "关注一篇期刊", "添加一篇会议", "关注一篇会议",
        "添加一篇专著", "关注一篇专著", "增加其他研究", "关注其他研究"]
      }
    }
};
</script>

<style scoped>

</style>

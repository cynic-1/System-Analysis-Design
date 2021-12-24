<template>
  <div class="q-pa-lg" style="align-items: center">
    <q-card v-for="message in messages" :key="message" class="q-pa-md" style="margin-left: auto; margin-right: auto; max-width: 1600px">
      <message-item
        v-bind="message"
      />
    </q-card>
  </div>

</template>

<script>
import { defineAsyncComponent } from "vue";

const messageItem = defineAsyncComponent(() => import("../../components/MessageItem"));

export default {
  name: "PersonalMessage",
  components: {
    messageItem
  },
  data() {
    return {
      "messages": [
        {
          "userName": "宋永欣",
          "userAvatar": "https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
          "actionType": 0, // 0: 增加一篇期刊 1: 关注一篇期刊
          // 2.增加一篇会议 3. 关注一篇会议 4：增加一篇专著 5: 关注一篇专著 6. 增加其他研究 7. 关注其他研究
          "paperId": 13628,
          "canEdit": 2,
          "authorName": "宋永欣",
          "researchType": 0, // 0: 期刊 1: 会议 2：专著 3: 其他
          "title": "GAT综述：模型、算法和应用",
          "publishTime": "2021/09/10",
          "journalName": "计算机学报", // 期刊、会议、出版社名
          "authorList": ["宋永欣", "王章琦", "刘子楠"], // 共同作者名，按照原文的作者排序，包括正在认领的这个作者
          "reference": 23
        }
      ],
    }
  },


};
</script>

<style scoped>

</style>

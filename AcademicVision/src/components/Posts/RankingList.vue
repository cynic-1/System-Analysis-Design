<template>
  <div>
    <h4 style="margin: 20px"> 知 贴 热 榜 <span class="material-icons">trending_up</span></h4>
    <EachRanking v-for="each in list" :rank="each.rank" :context="each.context" :author="each.author"></EachRanking>
  </div>
</template>

<script>
import EachRanking from "components/Posts/EachRanking";

export default {
  name: "RankingList",

  components: {
    EachRanking
  },

  data() {
    return {
      list: [
        {rank: 1, context: "还记得你说家是唯一的城堡", author: "周杰伦"},
        {rank: 2, context: "随着稻香河流慢慢奔跑", author: "方文山"},
        {rank: 3, context: "微微笑，小时候我的梦知道", author: "黄俊郎"},
        {rank: 4, context: "断了的弦", author: "444"},
        {rank: 5, context: "55555555", author: "555"},
        {rank: 6, context: "66666666", author: "666"},
        {rank: 7, context: "77777777", author: "777"},
      ]
    }
  }
}
</script>

<style scoped>

</style>

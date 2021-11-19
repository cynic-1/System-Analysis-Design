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
        {rank: 1, context: "111111111", author: "111"},
        {rank: 2, context: "22222222", author: "222"},
        {rank: 3, context: "33333333", author: "333"},
        {rank: 4, context: "44444444", author: "444"},
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

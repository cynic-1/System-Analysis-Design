<template>
  <div>
    <h4 style="margin: 20px">
      知 贴 热 榜 <span
        class="material-icons"
        style="color: deepskyblue"
      >trending_up</span>
    </h4>
    <EachRanking
      v-for="(each,index) in list"
      :key="each"
      :rank="index + 1"
      :context="each.title"
      :author="each.user_name"
      :pid="each.post_id"
      style="cursor:pointer"
    />
  </div>
</template>

<script>
import EachRanking from "components/Posts/EachRanking";

export default {
    "name": "RankingList",

    "components": {
        EachRanking
    },

    "methods": {
        viewPost (post_id) {

            console.log("点击了查看帖子方法");
            this.$router.push({
                "path": "/posts/view",
                "query": {
                    "user_id": this.$store.state.person.userID,
                    post_id,
                }
            });

        },
    },

    data () {

        return {
            "list": [
                { "rank": 1, "context": "还记得你说家是唯一的城堡", "author": "周杰伦" },
                { "rank": 2, "context": "随着稻香河流慢慢奔跑", "author": "方文山" },
                { "rank": 3, "context": "微微笑，小时候我的梦知道", "author": "黄俊郎" },
                { "rank": 4, "context": "断了的弦", "author": "444" },
                { "rank": 5, "context": "55555555", "author": "555" },
                { "rank": 6, "context": "66666666", "author": "666" },
                { "rank": 7, "context": "77777777", "author": "777" },
            ]
        };

    },

    mounted () {

        this.$axios({
            "method": "POST",
            "url": "http://114.116.235.94/top_post/",
            "data": {
                "lable": "",
                "sort_way": 3
            },
            "transformRequest": [function (data) {

                let ret = "";
                for (const it in data) {

                    ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

                }
                return ret;

            }],
        }).then(response => {

            console.log("所有帖子排行榜", response);
            this.list = response.data.all_info.splice(0, 7);

        });

    }
};
</script>

<style scoped>

</style>

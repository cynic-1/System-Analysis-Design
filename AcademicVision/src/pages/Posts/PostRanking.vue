<template>
  <div>
    <div class="col-6">
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        height="150px"
      >
        <div class="absolute-full text-subtitle2 flex flex-center">
          <h3>知 贴 热 榜</h3>
        </div>
      </q-img>
    </div>

    <div class="q-pa-md">
      <div
        v-for="(test,index) in list"
        :key="test"
        class="q-gutter-md"
        style="max-width: 1000px;margin: 0 auto"
        @click="viewPost(test.post_id)"
      >
        <!--        <q-field filled label="Filled" stack-label>-->
        <!--          <template v-slot:control>-->
        <!--            <div class="self-center full-width no-outline" tabindex="0">Field content</div>-->
        <!--          </template>-->
        <!--        </q-field>-->
        <q-field
          filled
          stack-label
          style="cursor:pointer"
        >
          <h3 style="margin: 10px;float: left;color: skyblue">
            {{ index + 1 }}
          </h3>
          <template #control>
            <div
              class="self-center full-width no-outline"
              tabindex="0"
              style="font-size: 20px"
            >
              {{ test.title }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ test.user_name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                test.lable
              }}
            </div>
          </template>
        </q-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  "name": "PostRanking",

  data() {

    return {
      "list": [
      ]
    };

  },

  mounted() {

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
      this.list = response.data.all_info.splice(0, 10);

    });

  },

  "methods": {
    viewPost(post_id) {

      console.log("点击了查看帖子方法");
      this.$router.push({
        "path": "/posts/view",
        "query": {
          "user_id": this.$store.state.person.userID,
          post_id,
        }
      });

    },
  }
};
</script>

<style scoped>

</style>

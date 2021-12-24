/* eslint-disable vue/multi-word-component-names */
<template>
  <!--帖子首页推荐板块-->

  <div class="row">
    <div class="col-8">
      <div
        class="q-pa-md"
        style="cursor:pointer"
        @click="viewPost(pid1)"
      >
        <q-card
          class="my-card"
          style="max-width: 900px"
        >
          <q-parallax
            src="https://pic3.zhimg.com/80/v2-e71ec4340bdd4ba0a43da480139af8ba_720w.jpg"
            :height="150"
          />

          <q-card-section @click="viewPost(pid1)">
            <div class="text-h6">
              {{ title1 }}
            </div>
            <div class="text-subtitle2">
              {{ name1 }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-4">
      <div class="q-pa-md row items-start q-gutter-md" style="cursor:pointer"
           @click="viewPost(pid2)">
        <q-card
          class="my-card"
          style="width: 100%;max-width: 250px;height: 235px"
        >
          <q-img
            src="https://pic3.zhimg.com/80/v2-8babc37f3e33dd1b92bedd3d5518233a_720w.jpg"
            style="max-height: 180px"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ title2 }}
              </div>
              <div class="text-subtitle2">
                {{ name2 }}
              </div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn
              flat
              @click="viewPost(pid2)"
            >
              <span style="font-size: 18px">查看帖子</span>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      <div class="q-pa-md row items-start q-gutter-md" style="cursor:pointer"
           @click="viewPost(pid3)">
        <q-card
          class="my-card"
          style="width: 100%;max-width: 250px;height: 230px"
        >
          <q-img
            src="https://pic4.zhimg.com/80/v2-5b07e06a72e30e6a98f9b73f8703a78b_720w.jpg"
            style="max-height: 180px"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ title3 }}
              </div>
              <div class="text-subtitle2">
                {{ name3 }}
              </div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn
              flat
              @click="viewPost(pid3)"
            >
              <span style="font-size: 18px">查看帖子</span>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div
      class="col-8"
      style=""
    >
      <div class="q-pa-md row items-start q-gutter-md"
           style="cursor:pointer"
           @click="viewPost(pid4)">
        <q-card
          class="my-card"
          style="max-width: 1500px;margin-right: 10px;float: left"
        >
          <q-parallax
            src="https://pic1.zhimg.com/80/v2-4a723621a54340be66e253361e72b484_720w.jpg"
            :height="150"
          />

          <q-card-section @click="viewPost(pid4)">
            <div class="text-h6">
              {{ title4 }}
            </div>
            <div class="text-subtitle2">
              {{ name4 }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!--    <div-->
    <!--      class="col-4"-->
    <!--      style=""-->
    <!--    >-->
    <!--      <div class="q-pa-md row items-start q-gutter-md">-->
    <!--        <q-card-->
    <!--          class="my-card"-->
    <!--          style="width: 100%;max-width: 250px;height: 230px"-->
    <!--        >-->
    <!--          <q-img src="https://upload-bbs.mihoyo.com/upload/2021/10/29/73565430/88fda7330415d47c945ac5610f7f965b_6502096957213310465.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg">-->
    <!--            <div class="absolute-bottom">-->
    <!--              <div class="text-h6">-->
    <!--                {{ title5 }}-->
    <!--              </div>-->
    <!--              <div class="text-subtitle2">-->
    <!--                {{ name5 }}-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </q-img>-->

    <!--          <q-card-actions>-->
    <!--            <q-btn-->
    <!--              flat-->
    <!--              @click="viewPost(pid5)"-->
    <!--            >-->
    <!--              <span style="font-size: 18px">查看帖子</span>-->
    <!--            </q-btn>-->
    <!--          </q-card-actions>-->
    <!--        </q-card>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  "name": "Recommendation",

  data() {

    return {
      "list": [],
      "title1": "",
      "name1": "",
      "title2": "",
      "name2": "",
      "title3": "",
      "name3": "",
      "title4": "",
      "name4": "",
      "title5": "",
      "name5": "",

      "pid1": "",
      "pid2": "",
      "pid3": "",
      "pid4": "",
      "pid5": "",
    };

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
    search() {

      this.$router.push({"path": "/posts/view", "query": {"id": 123456, "context": this.text, "textid": 123}});

    }
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

      console.log("所有帖子排行榜2", response.data);
      this.list = response.data.all_info.splice(0, 5);
      this.title1 = this.list[0].title;
      this.name1 = this.list[0].user_name;
      this.title2 = this.list[1].title;
      this.name2 = this.list[1].user_name;
      this.title3 = this.list[2].title;
      this.name3 = this.list[2].user_name;
      this.title4 = this.list[3].title;
      this.name4 = this.list[3].user_name;
      this.title5 = this.list[4].title;
      this.name5 = this.list[4].user_name;
      this.pid1 = this.list[0].post_id;
      this.pid2 = this.list[1].post_id;
      this.pid3 = this.list[2].post_id;
      this.pid4 = this.list[3].post_id;
      this.pid5 = this.list[4].post_id;

    });

  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>

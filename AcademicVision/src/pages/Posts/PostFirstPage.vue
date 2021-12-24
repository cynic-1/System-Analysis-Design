<template>
  <div>
    <!--    <h3>帖子首页：热门推荐。帖子排行榜（部分）</h3>-->

    <div
      class="q-pa-md"
      style="margin-top: 0;padding-top: 0"
    >
      <q-carousel
        v-model="slide"
        arrows
        animated
        height="400px"
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        style="cursor:pointer"
      >
        <q-carousel-slide
          name="first"
          img-src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191008%2Fb43e924a74404d80b0df528233cbb7b7.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642867237&t=af870aac426f0057a92529422bd17ee4"
        >
          <q-input
            v-model="text"
            standout
            :dense="dense"
            style="max-width: 900px;background-color: white;margin: 20px auto 0;opacity: 0.85"
            @keyup.enter="search"
          >
            <template #append>
              <q-avatar>
                <q-btn
                  icon="search"
                  round
                  color="blue-6"
                  size="12px"
                  @click="search"
                />
              </q-avatar>
            </template>
          </q-input>
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              Welcome to 知贴
            </div>
            <div class="text-subtitle1">
              知&nbsp;&nbsp;&nbsp;贴&nbsp;&nbsp;&nbsp;知&nbsp;&nbsp;&nbsp;你
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="second"
          img-src="https://pic3.zhimg.com/v2-e3dcab4a32594c810f766221dea7e970_1440w.jpg?source=172ae18b"
        >
          <q-input
            v-model="text"
            standout
            :dense="dense"
            style="max-width: 900px;background-color: white;margin: 20px auto 0;opacity: 0.85"
            @keyup.enter="search"
          >
            <template #append>
              <q-avatar>
                <q-btn
                  icon="search"
                  round
                  color="blue-6"
                  size="12px"
                  @click="search"
                />
              </q-avatar>
            </template>
          </q-input>
          <div class="absolute-bottom custom-caption"
               @click="viewPost(15)"
          >
            <div class="text-h2">
              Windows11正式发布
            </div>
            <div class="text-subtitle1">
              今&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;推&nbsp;&nbsp;&nbsp;荐
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="third"
          img-src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwallcoo.com%2Fgame%2FHalo_Reach%2Fwallpapers%2F1920x1080%2FCruiser_Crash.jpg&refer=http%3A%2F%2Fwallcoo.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642903069&t=14b11d3d98796b2db7dd2e2886c52e3f"
        >
          <q-input
            v-model="text"
            standout
            :dense="dense"
            style="max-width: 900px;background-color: white;margin: 20px auto 0;opacity: 0.85"
            @keyup.enter="search"
          >
            <template #append>
              <q-avatar>
                <q-btn
                  icon="search"
                  round
                  color="blue-6"
                  size="12px"
                  @click="search"
                />
              </q-avatar>
            </template>
          </q-input>
          <div class="absolute-bottom custom-caption"
               @click="viewPost(14)"
          >
            <div class="text-h2">
              知贴版区公告
            </div>
            <div class="text-subtitle1">
              运&nbsp;&nbsp;&nbsp;行&nbsp;&nbsp;&nbsp;公&nbsp;&nbsp;&nbsp;告
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!--    <q-input standout v-model="text" :dense="dense" style="max-width: 900px;margin:0 auto">-->
    <!--      <template v-slot:append>-->
    <!--        <q-avatar>-->
    <!--          <q-btn icon="search" round color="blue-6" size="12px" @click="search"></q-btn>-->
    <!--        </q-avatar>-->
    <!--      </template>-->
    <!--    </q-input>-->

    <!--    <br>-->

    <div class="row">
      <div
        class="col-8"
        style="height: 550px"
      >
        <Recommendation/>
      </div>
      <div
        class="col-4"
        style="height: 550px"
      >
        <RankingList/>
      </div>
    </div>
  </div>
</template>

<script>
import Recommendation from "components/Posts/Recommendation";
import RankingList from "components/Posts/RankingList";

export default {
  "name": "PostFirstPage",

  "components": {
    Recommendation,
    RankingList
  },

  data() {

    return {
      "text": "",
      "dense": false,
      "slide": "first",
      "autoplay": true,
      "lorem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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

      console.log(`您点击了搜索按钮，您选择搜索的内容是${this.text}`);
      this.$router.push({"path": "/posts/search", "query": {"id": 123456, "context": this.text}});

    }
  }
};
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

.my-card
  width: 100%
  max-width: 500px
</style>

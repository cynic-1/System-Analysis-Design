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
      >
        <q-carousel-slide
          name="first"
          img-src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fc95f482214a43304a2072b813bc6ddf855d7e83d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641987019&t=229987192e032261fff3b46ebedc7894"
        >
          <q-input
            v-model="text"
            standout
            :dense="dense"
            style="max-width: 900px;background-color: white;margin: 20px auto 0;opacity: 0.85"
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
          img-src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-242270951d2d80da8d17271629567301_r.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641987249&t=5b7df4efb89a2044a6e61150d67f24bf"
        >
          <q-input
            v-model="text"
            standout
            :dense="dense"
            style="max-width: 900px;background-color: white;margin: 20px auto 0;opacity: 0.85"
          >
            <template #append>
              <q-avatar>
                <q-btn
                  icon="search"
                  round
                  color="blue-6"
                  size="12px"
                />
              </q-avatar>
            </template>
          </q-input>
          <div class="absolute-bottom custom-caption">
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
          img-src="https://upload-bbs.mihoyo.com/upload/2021/11/05/73565430/b65c68b1dc3fdadae9b3cf6f1bb04662_1707343588625440344.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg"
        >
          <q-input
            v-model="text"
            standout
            :dense="dense"
            style="max-width: 900px;background-color: white;margin: 20px auto 0;opacity: 0.85"
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
        <Recommendation />
      </div>
      <div
        class="col-4"
        style="height: 550px"
      >
        <RankingList />
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

    data () {

        return {
            "text": "",
            "dense": false,
            "slide": "first",
            "autoplay": true,
            "lorem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        };

    },

    "methods": {
        search () {

            console.log(`您点击了搜索按钮，您选择搜索的内容是${this.text}`);
            this.$router.push({ "path": "/posts/search", "query": { "id": 123456, "context": this.text } });

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

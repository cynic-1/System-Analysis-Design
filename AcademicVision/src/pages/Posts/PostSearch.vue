<template>
  <div
    style="margin: 0 auto;"
    class="postsearch"
  >
    <div class="search">
      <div style="margin: 0 auto;padding-top: 50px">
        <h3 style="text-align: center;margin-top: 0;color: white">
          知 贴 搜 索
        </h3>
      </div>
      <q-input
        v-model="text"
        standout
        :dense="dense"
        style="max-width: 900px;margin:0 auto;background-color: white;opacity: 0.85"
        @keyup.enter="search"
      >
        <template #append>
          <q-avatar>
            <q-btn
              icon="arrow_back"
              color="blue-6"
              round
              size="11px"
              @click="back"
            />
          </q-avatar>
          &nbsp;
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
    </div>

    <div class="q-pa-md">
      <div
        v-for="test in list"
        class="q-gutter-md"
        style="max-width: 1200px;margin: 0 auto;"
      >
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-field
            filled
            stack-label
            bg-color="light-blue-1"
          >
            <template #control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
                style="font-size: 20px"
                @click="viewPost(test.post_id)"
              >
                {{ test.author }}&nbsp;&nbsp;&nbsp;{{ test.title }}&nbsp;&nbsp;&nbsp;{{ test.lable }}
              </div>
            </template>
          </q-field>
        </transition>
        <q-inner-loading :showing="visible">
          <q-spinner-gears
            size="100px"
            color="primary"
          />
        </q-inner-loading>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  "name": "PostSearch",

  data() {

    return {
      "text": this.$route.query.context,
      "dense": false,
      "visible": true,
      "showSimulatedReturnData": true,
      "list": [],
    };

  },
  mounted() {
    console.log(`您点击了搜索按钮，您选择搜索的内容是${this.text}`);
    this.visible = true;
    this.showSimulatedReturnData = false;

    // http://114.116.235.94/search_post/
    this.$axios({
      "method": "POST",
      "url": "http://114.116.235.94/search_post/",
      "data": {
        "title": this.text
      },
      "transformRequest": [function (data) {

        let ret = "";
        for (const it in data) {

          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

        }
        return ret;

      }],
    }).then(response => {

      console.log("搜索帖子", response);
      this.list = response.data.info;

    });
    clearTimeout(this.timer);  //清除延迟执行

    this.timer = setTimeout(()=>{   //设置延迟执行
      this.visible = false;
      this.showSimulatedReturnData = true;
    },500);
  },
  "methods": {
    viewPost(post_id) {

      console.log("搜索帖子");
      this.$router.push({
        "path": "/posts/view",
        "query": {
          "user_id": this.$store.state.person.userID,
          post_id,
        }
      });

    },
    back() {

      this.$router.go(-1);

    },
    search() {

      console.log(`您点击了搜索按钮，您选择搜索的内容是${this.text}`);
      this.visible = true;
      this.showSimulatedReturnData = false;

      // http://114.116.235.94/search_post/
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/search_post/",
        "data": {
          "title": this.text
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("搜索帖子", response);
        this.list = response.data.info;

      });
      // setTimeout(() => {
      //
      //   this.list = [
      //     {"rank": 1, "context": "新的推荐帖子", "author": "周杰伦"},
      //     {"rank": 1, "context": "新的推荐数据", "author": "周杰伦"},
      //     {"rank": 1, "context": "新的推荐数据", "author": "周杰伦"},
      //     {"rank": 1, "context": "新的推荐数据", "author": "周杰伦"},
      //     {"rank": 1, "context": "新的推荐数据", "author": "周杰伦"},
      //     {"rank": 1, "context": "新的推荐数据", "author": "周杰伦"},
      //   ];
      // }, 1000);

      this.timer = setTimeout(()=>{   //设置延迟执行
        this.visible = false;
        this.showSimulatedReturnData = true;
      },500);
      // 更新List数据

    }
  }
};
</script>

<style scoped>
.search {
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11172380288%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642867237&t=46c17f1376890eed84ebac87c0e93dbf");
  background-size: cover;
  background-attachment: fixed;
  padding: 0;
  margin: 0;
  min-height: 350px;

}
</style>

<template>
  <!--浏览分区帖子-->
  <div>
    <h3 style="margin-top: 10px;margin-bottom: 10px">
      <q-btn
        icon="reply"
        color="blue-6"
        round
        @click="emitToParent"
      />
      <strong>{{ name }}</strong>帖子分区
    </h3>
    <div class="row">
      <div class="col-8">
        <div class="q-pa-md">
          <q-card
            class="my-card"
            style="max-width: 900px;cursor:pointer"
          >
            <q-parallax
              src="https://t7.baidu.com/it/u=2487536464,3153080617&fm=193&f=GIF"
              :height="150"
            />

            <q-card-section @click="viewPost(pid1)">
              <div class="text-h6">
                <strong>{{ title1 }}</strong>
              </div>
              <div class="text-subtitle2">
                {{ name1 }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            style="width: 100%;max-width: 200px;height: 230px"
          >
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              style="height: 180px"
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
                查看帖子
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            style="width: 100%;max-width: 200px;height: 230px"
          >
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              style="height: 180px"
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
                查看帖子
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <h4 style="margin-top: 10px;margin-bottom: 10px;float: left">
      <q-icon
        name="local_fire_department"
        color="blue-6"
      />
      帖子推荐
    </h4>
    <h5 style="margin-top: 10px;margin-bottom: 10px;float: right">
      <q-btn
        icon="published_with_changes"
        round
        color="blue-6"
        @click="showTextLoading"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </h5>
    <br>
    <br>

    <div class="q-pa-md">
      <div
        v-for="test in list"
        :key="test"
        class="q-gutter-md"
        style="max-width: 1200px;margin: 0 auto;"
      >
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          @click="viewPost(test.post_id)"
        >
          <q-field
            filled
            stack-label
            bg-color="blue-1"
            @click="viewPost(test.post_id)"
          >
            <template #control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
                style="font-size: 20px"
                @click="viewPost(test.post_id)"
              >
                {{ test.user_name }}&nbsp;&nbsp;&nbsp;{{ test.title }}
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
  "name": "PostPartionView",

  "props": ["name"],

  mounted() {
    // http://114.116.235.94/top_post/
  },

  "watch": {
    name(newValue, oldValue) {

      console.log(newValue);
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/top_post/",
        "data": {
          "lable": newValue,
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

        console.log("分区帖子排行榜", response);
        this.list = response.data.all_info;
        this.name1 = response.data.all_info[0].user_name;
        this.title1 = response.data.all_info[0].title;
        if (this.title1.length >= 20) {

          this.title1 = `${this.title1.substring(0, 9)}......`;

        }
        this.pid1 = response.data.all_info[0].post_id;
        this.name2 = response.data.all_info[1].user_name;
        this.title2 = response.data.all_info[1].title;
        this.pid2 = response.data.all_info[1].post_id;
        if (this.title2.length >= 10) {

          this.title2 = `${this.title2.substring(0, 9)}......`;

        }
        this.name3 = response.data.all_info[2].user_name;
        this.title3 = response.data.all_info[2].title;
        this.pid3 = response.data.all_info[2].post_id;
        if (this.title3.length >= 10) {

          this.title3 = `${this.title3.substring(0, 9)}......`;

        }

      });

    }
  },


  data() {

    return {
      "visible": false,
      "showSimulatedReturnData": false,
      "list": [
        {"rank": 1, "context": "还记得你说家是唯一的城堡", "author": "周杰伦"},
        {"rank": 2, "context": "随着稻香河流慢慢奔跑", "author": "方文山"},
        {"rank": 3, "context": "微微笑，小时候我的梦知道", "author": "黄俊郎"},
        {"rank": 4, "context": "断了的弦", "author": "周杰伦"},
        {"rank": 5, "context": "麻烦给我的爱人一杯Mojito", "author": "周杰伦"},
        {"rank": 6, "context": "吹着前奏 望着天空", "author": "周杰伦"},
        {"rank": 7, "context": "我想起花瓣 试着掉落", "author": "周杰伦"},
        {"rank": 8, "context": "为你翘课的那一天", "author": "周杰伦"},
        {"rank": 9, "context": "花落的那一天", "author": "周杰伦"},
        {"rank": 10, "context": "教室的那一间 我怎么看不见", "author": "周杰伦"},
      ],
      "name1": "",
      "title1": "",
      "pid1": "",
      "name2": "",
      "title2": "",
      "pid2": "",
      "name3": "",
      "title3": "",
      "pid3": "",
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
    emitToParent() {

      this.$emit("childevent", false);

    },
    showTextLoading() {

      this.visible = true;
      this.showSimulatedReturnData = false;
      this.$axios({
        "method": "POST",
        "url": "http://114.116.235.94/top_post/",
        "data": {
          "lable": this.name,
          "sort_way": 2
        },
        "transformRequest": [function (data) {

          let ret = "";
          for (const it in data) {

            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;

          }
          return ret;

        }],
      }).then(response => {

        console.log("改变推荐方式", response);
        this.list = response.data.all_info;

      });
      setTimeout(() => {

        this.visible = false;
        this.showSimulatedReturnData = true;

      }, 1000);
      // 更新List数据

    }
  }
};
</script>

<style scoped>

</style>

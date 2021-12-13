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
        style="max-width: 1000px;margin: 0 auto;"
      >
        <!--        <q-field filled label="Filled" stack-label>-->
        <!--          <template v-slot:control>-->
        <!--            <div class="self-center full-width no-outline" tabindex="0">Field content</div>-->
        <!--          </template>-->
        <!--        </q-field>-->
        <q-field
          filled
          stack-label
        >
          <h3 style="margin: 10px;float: left;color: skyblue">
            {{ index + 1 }}
          </h3>
          <template #control>
            <div
              class="self-center full-width no-outline"
              tabindex="0"
              style="font-size: 20px"
              @click="viewPost(test.post_id)"
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
      ]
    };

  },

  mounted() {
    this.$axios({
      method: 'POST',
      url: 'http://114.116.235.94/top_post/',
      data: {
        lable: "",
        sort_way: 3
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then(response => {
      console.log("所有帖子排行榜", response)
      this.list = response.data.all_info.splice(0,10)
    })
  },

  methods: {
    viewPost(post_id) {
      console.log("点击了查看帖子方法")
      this.$router.push({
        "path": "/posts/view",
        "query": {
          "user_id": 1,
          "post_id": post_id,
        }
      })
    },
  }
};
</script>

<style scoped>

</style>

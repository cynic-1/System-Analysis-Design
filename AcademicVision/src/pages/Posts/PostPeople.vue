<template>
  <div>
    <div class="row" style="margin-top: 10px">
      <div class="col-3">
        <q-card class="my-card">
          <q-img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F26%2F20200326212002_rxlyj.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640236068&t=8beea3c899b9955f22135a823c9be01f">
            <div class="absolute-bottom">
              <div class="text-h6">我发表的帖子</div>
              <div class="text-subtitle2">My post</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat dark-percentage class="card" @click="publish">查看</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card class="my-card">
          <q-img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-04-30%2F5eaa72d5c22c6.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640236068&t=17ddc1373551ea113de4f13c0b564e9a">
            <div class="absolute-bottom">
              <div class="text-h6">我收藏的帖子</div>
              <div class="text-subtitle2">My favorite posts</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat dark-percentage class="card" @click="love">查看</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card class="my-card">
          <q-img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F020520123437%2F200205123437-2-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640236207&t=4ec6f18b98a2388faa3995243da314da">
            <div class="absolute-bottom">
              <div class="text-h6">创作中心</div>
              <div class="text-subtitle2">Creative center</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat dark-percentage class="card" @click="create">发表帖子</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card class="my-card">
          <q-img src="../../../public/希儿.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">数据分析</div>
              <div class="text-subtitle2">Data analysis</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat dark-percentage class="card" @click="charts">查看</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <h3 v-show="!isPublish && !isLove && !isCreate && !isCharts">
      <q-icon name="account_circle" color="blue-6"></q-icon>
      &nbsp知贴 · 个人中心
    </h3>
    <div class="q-pa-md" v-show="isPublish === true">
      <div class="q-gutter-md" style="max-width: 1200px;margin: 0 auto;" v-for="test in list">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-field filled stack-label bg-color="light-blue-1">
            <template v-slot:control>
              <a href="https://y.qq.com/n/ryqq/songDetail/0039MnYb0qxYhV" style="text-decoration: none;color: #1D1D1D">
                <div class="self-center full-width no-outline" tabindex="0" style="font-size: 25px;margin-top: 10px">
                  {{ test.context }}
                </div>
                <div style="width: 1100px;text-align: right;font-size: 18px;margin-bottom: 5px">
                  <span style="text-align: right">
                    <q-icon color="green-6" name="watch_later" size="23px"/>{{ test.time }}&nbsp&nbsp
                    <q-icon color="red" name="thumb_up" size="23px"/>{{ test.goodNum }}&nbsp&nbsp
                    <q-icon color="blue-6" name="textsms" size="23px"/>{{ test.commentNum }}&nbsp&nbsp
                    <q-icon color="orange-6" name="bookmark" size="23px"/>
                    {{ test.starNum }}</span>
                </div>
              </a>
            </template>
          </q-field>
        </transition>
      </div>
    </div>

    <div class="q-pa-md" v-show="isLove === true">
      <div class="q-gutter-md" style="max-width: 1200px;margin: 0 auto;" v-for="test in list">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-field filled stack-label bg-color="light-blue-1">
            <template v-slot:control>
              <a href="https://y.qq.com/n/ryqq/songDetail/0039MnYb0qxYhV" style="text-decoration: none;color: #1D1D1D">
                <div class="self-center full-width no-outline" tabindex="0" style="font-size: 25px;margin-top: 10px">
                  {{ test.context }}&nbsp&nbsp&nbsp{{ test.author }}
                </div>
                <div style="width: 1100px;text-align: right;font-size: 18px;margin-bottom: 5px">
                  <span style="text-align: right">
                    <q-icon color="green-6" name="watch_later" size="23px"/>{{ test.time }}&nbsp&nbsp
                    <q-icon color="red" name="thumb_up" size="23px"/>{{ test.goodNum }}&nbsp&nbsp
                    <q-icon color="blue-6" name="textsms" size="23px"/>{{ test.commentNum }}&nbsp&nbsp
                    <q-icon color="orange-6" name="bookmark" size="23px"/>
                    {{ test.starNum }}</span>
                </div>
              </a>
            </template>
          </q-field>
        </transition>
      </div>
    </div>

    <div v-show="isCreate" style="margin-top: 50px">

      <span style="font-size: 50px;float: left">知&nbsp贴&nbsp<q-btn icon="arrow_back" size="13px" round color="blue-6"
                                                                   @click="this.$emit('func',1)"
                                                                   style="float: left"></q-btn></span>
      <span
        style="font-size: 20px;float: left;background-color: rgba(103,206,247,0.64)">&nbspCreate&nbsp</span>
      <br>
      <q-banner class="bg-grey-3" v-show="notice" rounded style="width: 1000px;margin: 0 auto">
        <template v-slot:avatar>
          <q-icon name="check_circle" color="primary"/>
        </template>
        <span style="font-size: 25px">知贴支持<strong>Markdown</strong>文本格式文档，你可以在右侧浏览对应效果，您也可以不使用<strong>Markdown</strong>文本格式正常输入即可</span>
        <template v-slot:action>
          <a href="https://luosijie.github.io/vm-markdown/" style="text-decoration: none">
            <q-btn flat color="primary" label="示例" style="font-size: 20px"/>
          </a>
          <q-btn flat color="primary" label="知道了" @click="notice = false" style="font-size: 20px"/>
        </template>
      </q-banner>

      <br>

      <mavon-editor style="height: 500px;margin-right: 10px" v-model="context" @imgAdd="$imgAdd" ref=md
                    image></mavon-editor>
      <div class="q-pa-md q-gutter-sm" style="float: right;margin-right: 200px">
        <q-btn color="blue-6" icon="cloud_upload" label="发布" @click="submit1"/>
      </div>
      <br>
      <br>
      <br>
      <br>
    </div>

    <q-dialog v-model="bar2" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space/>

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">选择分区</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <div class="q-gutter-md row">
              <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                filled
                v-model="type"
                :options="options"
                style="width: 300px;background-color: white"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section style="float: right;margin-right: 15px">
          <q-btn color="blue-10" icon="cloud_upload" label="发布" v-close-popup @click="submit2" v-show="type !== null"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div v-show="isCharts === true">
      <div class="q-pa-md row items-start q-gutter-md" style="float: left">
        <q-card class="my-card">
          <img src="../../../public/彼岸双生.png">

          <q-list>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="format_list_numbered"/>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6">已发表</q-item-label>
                <q-item-label caption>100</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="red" name="favorite"/>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6">被收藏</q-item-label>
                <q-item-label caption>100</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="amber" name="thumb_up_alt"/>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6">获赞数</q-item-label>
                <q-item-label caption>100</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <h4><q-icon name="poll" color="blue-6"></q-icon>&nbsp近期获赞数趋势图</h4>
      <div id="echarts1" style="height: 300px;width: 600px;float: right;margin-right: 200px"></div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/arta.css';
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios";
import PostDrawer from "components/Posts/PostDrawer";
import * as echarts from 'echarts';

export default {
  name: "PostPeople",

  data() {
    return {
      context: '',
      bar2: false,
      notice: true,
      editor: '',
      isPublish: false,
      isLove: false,
      isCreate: false,
      isCharts: false,
      list: [],
      type: null,
      options: [
        '文学', '数学', '语言', '计算机', '物理', '化学', '生物', '自动化', '工程建造', '金融', '航空航天', '交流'
      ]
    }
  },

  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        this.$refs.md.$img2Url(pos, url);
      })
    },
    submit2() {
      // axios方法
      console.log(this.context);
    },
    getMessage(data) {
      this.context = data;
      console.log(this.context)
    },
    submit1() {
      if (this.context === '') {
        alert("无法发布，您的帖子内容为空！")
      } else {

        this.bar2 = true;
      }
    },
    async uploadImage(file) {
      const imgUrl = await this.uploadRequest(file);
      return imgUrl
    },
    htmlChange() {
      this.$nextTick(() => {
        const codes = document.querySelectorAll(".markdown-body pre code");
        codes.forEach(elem => {
          hljs.highlightBlock(elem);
          console.log(elem)
        });
      });
    },
    publish() {
      this.isPublish = true;
      this.isLove = false;
      this.isCreate = false;
      this.isCharts = false;
      // axios请求方法
      setTimeout(() => {
        this.list = [
          {
            rank: 1,  // 文章排名，这个只有在排行榜请求的数据的时候才有用，可以根据点赞数，评论数，收藏数综合排名，在排行榜get请求时返回前十个即可
            context: "新的推荐帖子",  // 文章标题
            author: "周杰伦",  // 文章作者昵称
            time: '2021/6/10',  // 文章发表时间
            goodNum: 123, // 文章点赞数
            commentNum: 10, // 文章评论数
            starNum: 10,  // 文章收藏数
            pid: 1, // 作者唯一标识id
            postid: 1,  // 文章唯一标识id
          },
          {
            rank: 1,
            context: "新的推荐数据",
            author: "周杰伦",
            time: '2021/6/10',
            goodNum: 123,
            commentNum: 10,
            starNum: 10,
            pid: 2,
            postid: 2,
          },
          {
            rank: 1,
            context: "新的推荐数据",
            author: "周杰伦",
            time: '2021/6/10',
            goodNum: 123,
            commentNum: 10,
            starNum: 10,
            pid: 3,
            postid: 3,
          },
          {
            rank: 1,
            context: "新的推荐数据",
            author: "周杰伦",
            time: '2021/6/10',
            goodNum: 123,
            commentNum: 10,
            starNum: 10,
            pid: 4,
            postid: 4,
          },
          {
            rank: 1,
            context: "新的推荐数据",
            author: "周杰伦",
            time: '2021/6/10',
            goodNum: 123,
            commentNum: 10,
            starNum: 10,
            pid: 5,
            postid: 5,
          },
          {
            rank: 1,
            context: "新的推荐数据",
            author: "周杰伦",
            time: '2021/6/10',
            goodNum: 123,
            commentNum: 10,
            starNum: 10,
            pid: 6,
            postid: 6,
          },
        ]
      }, 100)
      // 更新List数据
    },
    love() {
      this.isPublish = false;
      this.isLove = true;
      this.isCreate = false;
      this.isCharts = false;
      // axios请求方法
      setTimeout(() => {
        this.list = [
          {rank: 1, context: "新的推荐帖子", author: "周杰伦", time: '2021/6/10', goodNum: 123, commentNum: 10, starNum: 10},
          {rank: 1, context: "新的推荐数据", author: "周杰伦", time: '2021/6/10', goodNum: 123, commentNum: 10, starNum: 10},
          {rank: 1, context: "新的推荐数据", author: "周杰伦", time: '2021/6/10', goodNum: 123, commentNum: 10, starNum: 10},
          {rank: 1, context: "新的推荐数据", author: "周杰伦", time: '2021/6/10', goodNum: 123, commentNum: 10, starNum: 10},
          {rank: 1, context: "新的推荐数据", author: "周杰伦", time: '2021/6/10', goodNum: 123, commentNum: 10, starNum: 10},
          {rank: 1, context: "新的推荐数据", author: "周杰伦", time: '2021/6/10', goodNum: 123, commentNum: 10, starNum: 10},
        ]
      }, 100)
      // 更新List数据
    },
    create() {
      this.isPublish = false;
      this.isLove = false;
      this.isCreate = true;
      this.isCharts = false;
    },
    charts() {
      this.isPublish = false;
      this.isLove = false;
      this.isCreate = false;
      this.isCharts = true;
      const chartDom = document.getElementById('echarts1');
      const myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: 'Distribution of Electricity',
          subtext: 'Fake Data'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} W'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: 'green'
            },
            {
              gt: 6,
              lte: 8,
              color: 'red'
            },
            {
              gt: 8,
              lte: 14,
              color: 'green'
            },
            {
              gt: 14,
              lte: 17,
              color: 'red'
            },
            {
              gt: 17,
              color: 'green'
            }
          ]
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: 'Morning Peak',
                    xAxis: '07:30'
                  },
                  {
                    xAxis: '10:00'
                  }
                ],
                [
                  {
                    name: 'Evening Peak',
                    xAxis: '17:30'
                  },
                  {
                    xAxis: '21:15'
                  }
                ]
              ]
            }
          }
        ]
      };

      option && myChart.setOption(option);

    }
  },

  components: {
    mavonEditor,
    PostDrawer,
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px

.card
  font-size: 20px
</style>

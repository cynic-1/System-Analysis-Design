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
    {{ context }}
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
      <br>
      <span style="font-size: 50px;float: left">知&nbsp贴&nbsp</span>
      <span
        style="font-size: 25px;float: left;background-color: rgba(103,206,247,0.64)">&nbspCreate&nbsp</span>
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
      <VmMarkdown
        :uploadImage="uploadImage"
        theme="gray"
        width="1150px"
        height="300px"
        @html-change="htmlChange"
        style="margin: 0 auto"
        class="shadow-3"
        v-model="context"
        @input="getMessage"
        ref=""
      />
      <mavon-editor style="height: 100px"></mavon-editor>
      <div class="q-pa-md q-gutter-sm" style="float: right;margin-right: 200px">
        <q-btn color="blue-6" icon="cloud_upload" label="发布" @click="submit1"/>
      </div>
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
  </div>
</template>

<script>
import {marked} from 'marked'
import hljs from "highlight.js";
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/arta.css';
import VmMarkdown from "./vm-markdown-change"
import {useQuasar} from 'quasar'
import {onBeforeUnmount} from 'vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  boxShadow: true
});//基本设置
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

  computed: {
    markdown() {
      return marked(this.editor)
    }
  },
  methods: {
    submit2() {
      // axios方法
      console.log(this.context);
    },
    getMessage(data) {
      this.context = data;
      console.log(this.context)
    },
    submit1() {
      this.bar2 = true;
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
    }
  },

  components: {
    VmMarkdown,
    mavonEditor,
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

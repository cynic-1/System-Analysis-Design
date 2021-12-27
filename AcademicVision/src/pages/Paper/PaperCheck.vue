<template>
  <div style="width: 100%;height: 100%">
    <q-card style="width: 90%;margin: 20px auto auto auto;padding: 15px 10% 20px 10%">
      <div style="font-size: small;color: #7f7f7f">{{ school }}</div>
      <div class="q-pa-md q-gutter-sm">
        <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class="bg-primary text-white">
            <q-bar>
              <q-space/>

              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <h3 style="margin-bottom: 10px;margin-top: 10px">保存当前文献信息</h3>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <p style="font-size: 20px">
                按下键盘上的<strong>ctrl</strong>和<strong>P</strong>按键，选择打印类型为PDF文件即可自定义保存当前文献信息
              </p>
              <img src="../../../public/img.png" style="height: 500px">
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
      <div style="text-align: right">
        <q-btn icon="download" size="15px" round color="blue" style="margin-right: 5px;size: 100px"
               @click="this.dialog = true"></q-btn>
       <q-btn icon="star" size="15px" round color="blue" style="margin-right: 5px" @click="colpaper"></q-btn>
        <q-btn icon="share" size="15px" round color="blue" style="margin-right: 5px" @click="creatQrCode" :disable="isClick"></q-btn>
      </div>
      <div class="qrcode" ref="qrCodeUrl" style="float: right;margin-top: 20px"></div>
      <div style="margin-top: 30px;text-align: center;font-size: 24px;font-weight: bold">{{ title }}</div>
      <div style="margin-top: 20px;text-align: center">
        <span v-for="x in author" :key="x" style="margin-left: 30px;color: #006cd6;cursor: pointer;" @click="checkAuthor(x)">{{x}}</span>
      </div>
<!--      <div style="margin-top: 10px;text-align: center;color: #006cd6;cursor: pointer;">{{ school }}</div>-->

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">摘要：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{ abstract }}</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">关键词：</span>
        <span style="width: 94%">
          <span v-for="x in keywords" :key="x" style="margin-left: 10px;color: #666666;cursor: pointer;" @click="goSearch(x)">{{ x }};</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">被引量：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{ quote }}</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">DOI：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{ DOI }}</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">收藏量：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{ collection }}</span>
        </span>
      </div>


<!--        <span style="font-weight: bold;width: 8%">前往查看：</span>-->
<!--        <span style="width: 92%">-->
<!--          <span style="color: #666666">{{ url }}</span>-->
<!--        </span>-->
      <q-btn @click="goBaiDu" rounded style="margin-top: 10px;float: right">前往查看</q-btn>


      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        style="margin-top: 60px"
      >
        <q-tab name="相似文献" label="相似文献"/>
      </q-tabs>

      <q-separator/>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="相似文献">
          <div v-for="(item,i) in reference" :key="i" style="margin-top: 15px;cursor: pointer;" @click="check(item.id)">
            <span style="margin-right: 20px">[{{ i }}]</span>
            <span>
              {{ item.title }}.
              <span v-for="opt in item.author">{{opt}}&nbsp; </span>
              <span v-if="item.publish_time !== ''">.{{item.publish_time}}.</span>
            </span>
          </div>
        </q-tab-panel>

      </q-tab-panels>

    </q-card>
    <q-dialog v-model="toolbar">
      <q-card style="height: 150px;width: 350px">
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold" style="font-size: 25px">收藏</span><span style="font-size: 25px">错误提示</span></q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <span style="font-size: 20px">请您先登录</span>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="toolbar1">
      <q-card style="height: 150px;width: 350px">
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold" style="font-size: 25px">收藏</span><span style="font-size: 25px">提示</span></q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <span style="font-size: 20px">收藏成功</span>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="toolbar2">
      <q-card style="height: 150px;width: 350px">
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold" style="font-size: 25px">收藏</span><span style="font-size: 25px">提示</span></q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <span style="font-size: 20px">您已经收藏过了当前文献</span>
        </q-card-section>
      </q-card>
    </q-dialog>

    <PostView :paper_id="this.$route.query.id"></PostView>
  </div>
</template>

<script>
import PostView from "components/PaperComment";
import JsPDF from "jspdf";
import QRCode from 'qrcodejs2'

export default {
  name: "PaperCheck",
  "components": {
    PostView,
  },
  data() {
    return {
      isClick: false,
      toolbar: false,
      toolbar1: false,
      toolbar2: false,
      qrcodeValue: {
        userId: ''
      },
      dialog: false,
      maximizedToggle: true,
      paper_id: "",
      user_id: "",
      instruction: "",
      title: "",
      author: [],
      publish_time: "",
      school: "",
      abstract: "",
      keywords: [],
      DOI: "",
      tab: "相似文献",
      reference: [],
      quote: 0,
      url: "",
      collection: 0,
      is_col: false,
      paper:[],
      defaultPaper : [
        {id : 934461, title: "边坡稳定性影响因素敏感性人工神经网络分析", author_name:["夏元友","熊海丰"], publish_time : "2004"},
        {id : 883584, title: "人工神经网络模型在急性应激障碍预警中的应用", author_name:["侯艳红","张林","陈晓菲"], publish_time : "2015"},
        {id : 203086, title: "一种移动机器人全局路径规划新型算法. 王仲民", author_name:["王仲民","岳宏"], publish_time : "2003"},
        {id : 80841, title: "基于时空神经网络的充电桩时空动态负荷预测", author_name:["张秀钊","王志敏","钱纹"], publish_time : "2019"},
        {id : 25495, title: "移动机器人多传感器信息融合技术综述", author_name:["司现军","王志良"], publish_time : "2004"},
        {id : 2390, title: "交通系统的模糊控制及其神经网络实现", author_name:["徐冬玲","方建安"], publish_time : "1992"},
        {id : 1822, title: "M-P神经元模型的几何意义及其应用", author_name:["张铃","张钹"], publish_time : "1998"},
        {id : 897313, title: "基于高光谱成像及神经网络技术检测玉米含水率", author_name:["李江波","苏忆楠","饶秀勤"], publish_time : "2010"},
        {id : 91322, title: "基于神经网络的水轮发电机组的建模分析", author_name:["郭君","董朝霞"], publish_time : "2003"},
        {id : 84072, title: "基于决策表-粗糙集理论的动态安全分析神经网络输入特征优选", author_name:["严宇","刘天琪"], publish_time : "2004"},
        {id : 920664, title: "区域环境污染影响因子的数量分析", author_name:["武鹏程","张曙红"], publish_time : "2008"},
        {id : 79259, title: "基于Hopfield网络学习的多城市旅行商问题的解法", author_name:["金海和","陈剑","唐政"], publish_time : "2003"},
        {id : 941150, title: "神经网络基于粒子群优化的学习算法研究", author_name:["刘洪波","王秀坤","孟军"], publish_time : "2005"},
        {id : 2277, title: "基于FFT和神经网络的非整数次谐波检测方法",author_name:["向东阳","王公宝","马伟明"], publish_time : "2005"},
        {id : 64791, title: "Automated Image Segmentation Using Improved PCNN Model Based on Cross-entropy一种基于交叉熵的改进型PCNN图像自动分割新方法", author_name:["LIU Qing","MA Yide","QIAN Zhibai"], publish_time : "2005"},
      ]
    }

  },
  mounted() {
    this.paper = JSON.parse(window.sessionStorage.getItem("data"))
    this.paper_id = this.$route.query.id
    this.user_id = this.$store.state.person.userID !== ""? this.$store.state.person.userID: "1"
    this.loadPaper()
  },
  methods: {
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: 'http://114.116.235.94/view_paper/' + this.paper_id,
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      this.isClick = true;
    },
    loadPaper() {
      //console.log(this.paper)
      this.reference = []
      this.showLoading()
      this.$axios({
        method: 'POST',
        url: 'http://114.116.235.94/view_paper/',
        data: {
          paper_id: this.paper_id,
          user_id: this.user_id
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(response => {
        if (response.data.code !== "400")
          return alert("论文信息加载失败")
        let info = response.data.all_info
        this.title = info.title
        this.publish_time = info.publish_time
        this.school = info.org === "N/A" ? "" : info.org
        //this.abstract = info.abstract
        this.author = info.author_name.match(/(?<=\')[^,].*?(?=\')/g)
        this.keywords = info.keyword.match(/(?<=\')[^,].*?(?=\')/g)
        this.quote = info.quote === "N/A" ? 0 : info.quote
        this.DOI = info.doi === "N/A" ? "暂无" : info.doi
        this.url = info.url
        this.collection = info.collections
        this.is_col = info.is_col
      })

      this.$axios({
        method: 'POST',
        url: 'http://114.116.235.94/get_abstract/',
        data: {
          paper_id: this.paper_id
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(response => {
        this.abstract = response.data.abstract
      })

      if(this.paper === null || this.paper === undefined || this.paper.length < 11)
        this.paper = this.defaultPaper
      console.log(this.paper)
      for(let idx in [1,2,3,4,5,6,7,8,9,10]){
        let i = Math.round(Math.random()*(this.paper.length-1))
        //console.log(this.rows[i])
        this.reference.push({title : this.paper[i].title, id: this.paper[i].id, author:this.paper[i].author_name, publish_time: this.paper[i].publish_time})
      }
      //console.log(this.reference)
    },
    colpaper(){
      if(this.is_col===false && this.user_id !== "1") {
        this.$axios({
          method: 'POST',
          url: 'http://114.116.235.94/col_paper/',
          data: {
            paper_id: this.paper_id,
            user_id: this.$store.state.person.userID,
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then(response => {
          console.log(response.data.code)
          this.toolbar1 = true;
          this.is_col=true
        })
      }
      else if(this.$store.state.login === false){
        // alert("请先登录！")
        this.toolbar = true;
      }
      else {
        this.toolbar2 = true;
      }
    },
    checkAuthor(name){
      this.$router.push({ "path": "/search", "query": { "searchBy": "作者", "key": name , "method" : "1"} });
    },
    check(id){
      this.paper_id = id
      this.$router.push({ "path": "/paper/check", "query": { "id": id } })
      this.loadPaper()

    },
    goBaiDu () {
      window.open(this.url, '_blank');
    },
    showLoading () {
      this.$q.loading.show()

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 1000)
    },
    goSearch(key) {
      this.$router.push({ "path": "/search", "query": { "searchBy": "关键词", "key": key , "method" : "1"} });
    }
  },
  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>

<style scoped>

</style>

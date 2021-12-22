<template>
  <div style="width: 100%;height: 100%">
    <q-card style="width: 90%;margin: 20px auto auto auto;padding: 15px 10% 20px 10%">
      <div style="font-size: small;color: #7f7f7f">{{instruction}}</div>
      <div style="text-align: right">
        <q-btn icon="download" size="xs" round color="blue" style="margin-right: 5px"></q-btn>
        <q-btn icon="star" size="xs" round color="blue" style="margin-right: 5px"></q-btn>
        <q-btn icon="share" size="xs" round color="blue" style="margin-right: 5px"></q-btn>
      </div>
      <div style="margin-top: 30px;text-align: center;font-size: 24px;font-weight: bold">{{title}}</div>
      <div style="margin-top: 20px;text-align: center">
        <span v-for="x in author" :key="x" style="margin-left: 30px;color: #006cd6;cursor: pointer;">{{x}}</span>
      </div>
      <div style="margin-top: 10px;text-align: center;color: #006cd6;cursor: pointer;">{{school}}</div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">摘要：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{abstract}}</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">关键词：</span>
        <span style="width: 94%">
          <span v-for="x in keywords" :key="x" style="margin-left: 10px;color: #666666;cursor: pointer;">{{x}};</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">被引量：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{quote}}</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">DOI：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{DOI}}</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px">
        <span style="font-weight: bold;width: 6%">收藏量：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{collection}}</span>
        </span>
      </div>

      <div class="row" style="margin-top: 10px;margin-bottom: 100px">
        <span style="font-weight: bold;width: 6%">查看：</span>
        <span style="width: 94%">
          <span style="color: #666666">{{url}}</span>
        </span>
      </div>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="参考文献" label="参考文献" />
        <q-tab name="相似文献" label="相似文献" />
        <q-tab name="引证文献" label="引证文献" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated style="font-size: 16px;color: #7f7f7f">
        <q-tab-panel name="参考文献">
          <div  v-for="(i,x) in 10" :key="i" style="margin-top: 15px">
            <span style="margin-right: 20px">[{{i}}]</span>
            <span>{{reference}}</span>
          </div>
        </q-tab-panel>

        <q-tab-panel name="相似文献">
          <div  v-for="(i,x) in 10" :key="i" style="margin-top: 15px">
            <span style="margin-right: 20px">[{{i}}]</span>
            <span>{{reference}}</span>
          </div>
        </q-tab-panel>

        <q-tab-panel name="引证文献">
          <div  v-for="(i,x) in 10" :key="i" style="margin-top: 15px">
            <span style="margin-right: 20px">[{{i}}]</span>
            <span>{{reference}}</span>
          </div>
        </q-tab-panel>
      </q-tab-panels>

    </q-card>

    <PostView></PostView>
  </div>
</template>

<script>
import PostView from "components/PaperComment";

export default {
  name: "PaperCheck",
  "components": {
    PostView,
  },
  data(){
    return {
      paper_id : "",
      user_id : "",
      instruction : "浙江大学 浙江省 211工程院校 985工程院校 教育部直属院校",
      title : "基于高通量计算与机器学习的材料设计方法与软件的开发与应用",
      author: ["尤子硕","李硕","唐冰"],
      publish_time : "",
      school : "浙江大学",
      abstract : "过去四十余年,以办公或产业发展为目的的新城园区建设是中国大规模快速城市化的关键部分,正逐步从关注单一经济增长目标的产业集聚地向关注综合发展目标的复合功能都市区转变。当前中国经济转向创新主导并迎来新一轮产业升级和创新创业发展,科创园区成为未来城市化的重要空间载体,其“产”的发展离不开“城”“创”这两个关键要素。杭州城西科创大走廊代表我国最新园区发展趋势,经历了政府规划、房地产开发、城中村自发嵌入等不同主体主导下的不同阶段、不同规模、不同层级的发展过程。其汇集了多类型科创园区及创新平台,依托杭州数字经济优势、社区共生资源、西溪湿地生态、老余杭仓前文脉,是创新要素集聚、多元功能混合、园区社区并存、经济社会文化生态共赢的新城代表,是研究科创园区“产城创”融合发展的典型范本。本文以衡量科创园区发展的“科创企业发展”反映“产”,以衡量城市用地功能混合的“职住关系”反映“城”,以衡量创新资源的“高校创新力”反映“创”,通过分析职住关系、高校创新力与科创企业发展的关联,来研究“产”“城”“创”的关系,进而从“产城创”融合角度展开对大走廊科创园区发展的研究。采用多元数据包括科创企业发展数据、基于位置服务",
      keywords: ["触觉互联网","网络架构","多模态通信","语义通信","机器学习"],
      category : "工程科技Ⅰ辑; 信息科技",
      subject : "材料科学; 计算机软件及计算机应用; 自动化技术",
      DOI : "10.27162/d.cnki.gjlin.2021.000019",
      number : "TN929.5;TP393.09",
      tab : "参考文献",
      reference : "基于多元数据的城市街区活力影响机制研究[J]. 李夏天,温小军.  江西理工大学学报. 2021(01)",
      quote : 0,
      url : "",
      collection : 0,
      is_col : false
    }

  },
  created() {
    this.paper_id = this.$route.query.id
    this.user_id = 1
    this.loadPaper()
  },
  methods : {
    loadPaper () {
      this.$axios({
        method: 'POST',
        url: 'http://114.116.235.94/view_paper/',
        data: {
          paper_id : this.paper_id,
          user_id : this.user_id
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(response => {
        if(response.data.code !== "400")
          return alert("论文信息加载失败")
        let info = response.data.all_info
        this.title = info.title
        this.publish_time = info.publish_time
        this.school = info.org
        //this.abstract = info.abstract
        this.author = info.author_name.match(/(?<=\')[^,].*?(?=\')/g)
        this.keywords = info.keyword.match(/(?<=\')[^,].*?(?=\')/g)
        this.quote = info.quote === "N/A"?0:info.quote
        this.DOI = info.doi === "N/A"?"暂无":info.doi
        this.url = info.url
        this.collection = info.collection
        this.is_col = info.is_col
      })

        this.$axios({
          method: 'POST',
          url: 'http://114.116.235.94/get_abstract/',
          data: {
            paper_id : this.paper_id
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
    }
  }
}
</script>

<style scoped>

</style>

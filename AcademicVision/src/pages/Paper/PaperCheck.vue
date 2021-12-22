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
        <span v-for="x in author" :key="x" style="margin-left: 30px;color: #006cd6;cursor: pointer;" @click="checkAuthor">{{x}}</span>
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
        <span style="font-weight: bold;width: 8%">前往查看：</span>
        <span style="width: 92%">
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
      instruction : "",
      title : "",
      author: [],
      publish_time : "",
      school : "",
      abstract : "",
      keywords: [],
      DOI : "",
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
        this.collection = info.collections
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

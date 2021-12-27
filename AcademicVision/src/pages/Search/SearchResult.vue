<template>
  <NavBar></NavBar>
  <div
    class="q-pa-md"
    style="margin-left: 20%"
  >
    <div
      class="q-gutter-y-md column"
      style="width: 80%; max-width: 100%"
    >
      <q-toolbar
        class="bg-grey-2 shadow-2 rounded-borders"
        style="height: 60px"
      >
        <q-btn-dropdown
          :label="searchBy"
          color="white"
          style="width: 15%; height: 60%"
          text-color="black"
        >
          <q-list>
            <q-item
              v-for="item in list"
              :key="item"
              v-close-popup
              clickable
              @click="onItemClick(item)"
            >
              <q-item-section>
                <q-item-label>{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-space />
        <q-separator
          vertical
          inset
          style="margin-left: 10px"
        />

        <q-input
          v-model="key"

          dense
          outlined
          input-class="text-left"
          class="q-ml-md"
          style="width: 80%"
          bg-color="white"
          @keyup.enter="search"
        >
          <template #append>
            <q-separator
              vertical
              inset
            />
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="search"
            />
          </template>
        </q-input>
        <q-separator
          vertical
          inset
          style="margin-left: 10px"
        />
        <q-btn
          color="grey-3"
          text-color="black"
          flat
          stretch
          style="margin-left: 10px"
          no-wrap
          @click="searchOnResult()"
        >
          结果中检索
        </q-btn>
        <q-separator
          vertical
          inset
          style="margin-left: 10px"
        />
        <q-btn
          color="grey-3"
          text-color="black"
          flat
          stretch
          style="margin-left: 10px"
          no-wrap
          @click="advanced"
        >
          高级检索
        </q-btn>
      </q-toolbar>
    </div>
  </div>

<!--  <div class="q-pa-md">-->
<!--    <div-->
<!--      class="q-gutter-y-md"-->
<!--      style="width: 100%"-->
<!--    >-->
<!--      <q-tabs-->
<!--        v-model="tab"-->
<!--        inline-label-->
<!--        class="bg-blue-8 text-white shadow-2"-->
<!--      >-->
<!--        <span-->
<!--          v-for="item in categories"-->
<!--          :key="item"-->
<!--        >-->
<!--          <q-tab-->
<!--            v-if="item.selection.length ===0"-->
<!--            :name="item.name"-->
<!--            :label="item.name + '( ' + item.num + ' )'"-->
<!--          />-->

<!--          <q-btn-dropdown-->
<!--            v-else-->
<!--            auto-close-->
<!--            stretch-->
<!--            flat-->
<!--            :label="item.name"-->
<!--          >-->
<!--            <q-list>-->
<!--              <q-item-->
<!--                v-for="opt in item.selection"-->
<!--                :key="opt"-->
<!--                clickable-->
<!--                @click="tab = ''"-->
<!--              >-->
<!--                <q-item-section>{{ opt.name }}({{ opt.num }})</q-item-section>-->
<!--              </q-item>-->
<!--            </q-list>-->
<!--          </q-btn-dropdown>-->
<!--        </span>-->
<!--      </q-tabs>-->
<!--    </div>-->
<!--  </div>-->

  <div
    class="row bg-white"
    style="min-height: 400px; width: 92%; padding: 24px;margin-left: 8%"
  >
    <div
      id="parent"
      class="fit row wrap justify-start items-start content-start"
      style="overflow: hidden;"
    >
      <div
        class="q-pa-md"
        style="overflow: auto;width: 18%"
      >
        <q-card
          class="my-card text-blue"
          flat
          bordered
        >
          <q-card-section horizontal>
            <q-card-actions
              vertical
              align="center"
            >
              <q-btn
                color="grey-3"
                text-color="blue"
                flat
                size="24px"
                style="margin-left: 15px"
              >
                <div class="text-center">
                  <span style="font-weight: bold">全部</span>
                </div>
              </q-btn>
              <q-btn
                color="grey-3"
                text-color="blue"
                size="14px"
                style="margin-top: 10px;margin-left: 20px"
                @click=" pickType(3)"
              >
                <span style="font-weight: bold">学术期刊</span>
              </q-btn>
            </q-card-actions>

            <q-separator
              vertical
              dark
            />

            <q-card-actions
              vertical
              style="margin-left: 0px"
            >

              <q-btn
                color="grey-3"
                text-color="blue"
                size="14px"
                style="margin-bottom: 20px;margin-top: 10px"
                @click=" pickType(2)"
              >
                <span style="font-weight: bold">学位论文</span>
              </q-btn>
              <q-btn
                color="grey-3"
                text-color="blue"
                size="14px"
                @click=" pickType(1)"
              >
                <span style="font-weight: bold">图书书籍</span>
              </q-btn>

            </q-card-actions>
          </q-card-section>

<!--          <q-separator />-->

<!--          <q-card-actions align="around">-->
<!--            <q-btn flat>-->
<!--              中文-->
<!--            </q-btn>-->
<!--            <q-btn flat>-->
<!--              外文-->
<!--            </q-btn>-->
<!--          </q-card-actions>-->
        </q-card>

        <q-expansion-item
          expand-separator
          label="发表时间"
          class="shadow-2"
          style="margin-top: 10px;background-color: #cce6ff; color: #1D1D1D; font-weight: bold;"
        >
          <q-btn v-for="opt in this.topDate" :key="opt" flat @click="pickTime(opt.name)">
            {{opt.name}}
          </q-btn>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          label="作者"
          class="shadow-2"
          style="margin-top: 10px;background-color: #cce6ff; color: #1D1D1D; font-weight: bold;"
        >
          <div>
            <q-btn v-for="opt in this.topAuthor" :key="opt" flat @click="pickAuthor(opt.name)">
              {{opt.name}}
            </q-btn>
          </div>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          label="机构"
          class="shadow-2"
          style="margin-top: 10px;background-color: #cce6ff; color: #1D1D1D; font-weight: bold;"
        >
          <div>
            <q-btn v-for="opt in this.topSchool" :key="opt" flat @click="pickSchool(opt.name)">
              {{opt.name}}
            </q-btn>
          </div>
        </q-expansion-item>

        <q-card
          class="my-card"
          style="margin-top: 10px"
        >
          <q-card-section
            class="q-pt-none"
            style="background-color: #cdcdcd; font-weight: bold; font-size: medium; color: #4c4c4c; height: 28px"
          >
            为我推荐
          </q-card-section>
          <q-card-section>
            <q-list style="font-size: x-small; color: #b2b2b2">
              <q-item
                v-ripple
                clickable
                v-for="item in this.relatedPaper"
                :key="item"
                @click="check(item.id)"
              >
                <q-item-section>
                  {{item.title}}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div
        class="q-pa-md"
        style="width: 72%; margin-left: 10px"
      >
        <q-table
          v-if="this.rows.length !== 0"
          v-model:pagination="pagination"
          :rows="rows"
          :columns="columns"
          row-key="name"
          hide-pagination
        >
          <template v-slot:body-cell-title="props">
            <q-td :props="props">
              <div class="my-table-details" style="cursor: pointer" @click="check(props.row.id)">
                {{props.value}}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-author="props">
            <q-td :props="props">
              <div class="my-table-details2">
                <span v-for="item in props.value" :key="item">{{item}}&nbsp;&nbsp;</span>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-org="props">
            <q-td :props="props">
              <div class="my-table-details2">
                {{props.value}}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-time="props">
            <q-td :props="props">
              <div class="my-table-details2">
                {{props.value}}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-keyword="props">
            <q-td :props="props">
              <div class="my-table-details">
                <span v-for="item in props.value" :key="item">{{item}}&nbsp;&nbsp;</span>
              </div>
            </q-td>
          </template>

<!--          <template v-slot:body-cell-operation="props">-->
<!--            <q-td :props="props">-->
<!--              <q-btn icon="star" round flat size="sm"/>-->
<!--              <q-btn icon="share" round flat size="sm"/>-->
<!--            </q-td>-->
<!--          </template>-->
        </q-table>
        <div v-else></div>

        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            :max-pages="6"
            size="sm"
          />
        </div>

        <div style="margin-top: 25px">
          <span style="margin-right: 10px;font-weight: bold;color: #b2b2b2">相关搜索</span>
          <span
            v-for="item in this.topKeyWord"
            :key="item"
            style="margin-right: 25px;color: #006cd6; cursor: pointer;"
            @click="relative(item.name)"
          >{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import qs from "qs";
import NavBar from "components/NavBar";

export default {
    "name": "SearchResult",
    "components": {
      NavBar
    },
    data () {
        const pagination = ref({
          "sortBy": "desc",
          "descending": false,
          "page": 1,
          "rowsPerPage": 20
          // rowsNumber: xx if getting data from a server
        });
        return {
            pagination,
            "list": ["不限", "篇名", "摘要", "关键词", "作者", "发表时间"],
            "searchBy": "不限",
            "key": "",
            "result" : "",
            "tab": "学术期刊",
            "categories": [
                { "name": "学术期刊", "num": "13.47万", "selection": [] },
                { "name": "学位论文", "num": "2.56万", "selection": [{ "name": "博士", "num": "3410" }, { "name": "硕士", "num": "2.22万" }] },
                { "name": "会议", "num": "5345", "selection": [{ "name": "国内会议", "num": "3698" }, { "name": "国外会议", "num": "483" }, { "name": "会议视频", "num": "0" }] },
                { "name": "报纸", "num": "8069", "selection": [] },
                { "name": "年鉴", "num": "123", "selection": [] },
                { "name": "图书", "num": "601", "selection": [{ "name": "中文图书", "num": "53" }, { "name": "外文图书", "num": "546" }] },
                { "name": "专利", "num": "0", "selection": [] },
                { "name": "成果", "num": "2964", "selection": [] }
            ],
            "topic": [
                "研究层次", "主题", "发表年度", "文献来源", "学科", "作者", "机构", "基金", "文献类型"
            ],
            "related": [
                "人工智能技术", "人工智能应用", "人工智能领域", "AI", "智能机器人", "人工智能发展", "人工智能", "弱人工智能", "智能科学"
            ],
            "columns" : [
              {
                "name": "title",
                "required": true,
                "label": "题名",
                "align": "center",
                "field": row => row.title,
                "format": val => `${val}`
              },
              { "name": "author", "align": "center", "label": "作者", "field": "author_name" },
              { "name": "org", "align": "center", "label": "来源", "field": "org" },
              { "name": "time", "align": "center", "label": "发表时间", "field": "publish_time",sortable: true },
              { "name": "keyword", "align": "center", "label": "关键词", "field": "keyword" },
              { "name": "quote", "align": "center", "label": "被引", "field": "quote", sortable: true },
             // { "name": "operation", "align": "center", "label": "操作", "field": "protein" }
            ],
            "rows" : [],
            "pagesNumber": computed(() => Math.ceil(this.rows.length / pagination.value.rowsPerPage)),
            "method" : 1,
            "line" : "",
            "oldrows" : [],
            "topAuthor" : [],
            "topKeyWord" : [],
            "topDate" : [],
            "topSchool" : [],
            "relatedPaper" : []
        };

    },

    created() {
      this.method = this.$route.query.method
      this.key = this.$route.query.key;
      if(this.method === "1") {
        this.searchBy = this.$route.query.searchBy;
        this.simpleSearch();
      }
      else if(this.method === "2"){
        console.log(1)
        this.line = this.$route.query.line;
        this.advancedSearch();
      }
    },

    "methods": {
        onItemClick (item) {
          this.searchBy = item;
        },
        search (){
          this.$router.push({ "path": "/search", "query": { "searchBy": this.searchBy, "key": this.key , "method" : "1"} });
          this.simpleSearch()
        },
        simpleSearch () {
          if(this.key === '') {
            alert("关键词不能为空！")
            return
          }
          this.result = this.key;
          let want = "";
          if(this.searchBy === "不限")
            want = "11111";
          if(this.searchBy === "篇名")
            want = "00100";
          else if(this.searchBy === "摘要")
            want = "10000";
          else if(this.searchBy === "关键词")
            want = "01000";
          else if(this.searchBy === "作者")
            want = "00010";
          else if(this.searchBy === "发表时间")
            want = "00001";
          else
            console.log("searchBy error!");
          let row = []
          this.topKeyWord = []
          this.topSchool = []
          this.topDate = []
          this.topAuthor = []
          this.relatedPaper = []
          this.showLoading()
          this.$axios.get("http://114.116.235.94/search/",{
            params:{
              q : this.key,
              method : 1,
              want : want,
            },
          }).then(res => {
            this.rows = res.data.data.goods;
            this.oldrows = res.data.data.goods;
            row = res.data.data.goods;
            //console.log((this.rows[11].author_name).match(/(?<=\').*?(?=\')/g))
            for(let item of this.rows){
              item.author_name = item.author_name.match(/(?<=\')[^,].*?(?=\')/g);
              item.keyword = item.keyword.match(/(?<=\')[^,].*?(?=\')/g);
              if(item.publish_time === "N/A")
                item.publish_time = "";
              if(item.quote === "N/A")
                item.quote = 0;
              if(item.quote !== "N/A"){
                if(String(item.quote).indexOf("万") !== -1)
                  item.qutoe = 10012
                else
                  item.quote = parseInt(item.quote)
              }
              if(item.org === "N/A")
                item.org = "";
            }
            for(let idx in [1,2,3]){
              let i = Math.round(Math.random()*this.rows.length)
              //console.log(this.rows)
              this.relatedPaper.push({title : this.rows[i].title, id: this.rows[i].id})
            }
            //console.log(this.relatedPaper)
            this.$axios({
              method:"post",
              url: "http://114.116.235.94/count_search/",
              header:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {all_info : row},
              traditional: true,
              paramsSerializer: data => {
                return qs.stringify(data, { indices: false })
              }
            }).then((res)=>{
              this.top = res.data
              //console.log(this.top)

              for(let key in this.top.author){
                if(key !== "None") {
                  let item = this.top.author[key];
                  this.topAuthor.push({name:key, value:item})
                }
              }
              //console.log(this.topAuthor)
              for(let key in this.top.keywords_count){
                if(key !== "None") {
                  let item = this.top.keywords_count[key];
                  this.topKeyWord.push({name:key, value:item})
                }
              }

              for(let key in this.top.org){
                if(key !== "None") {
                  let item = this.top.org[key];
                  this.topSchool.push({name:key, value:item})
                }
              }

              for(let key in this.top.publish_time){
                if(key !== "None") {
                  let item = this.top.publish_time[key];
                  this.topDate.push({name:key, value:item})
                }
              }
            })
          })
        },

        advancedSearch (){
          this.topKeyWord = []
          this.topSchool = []
          this.topDate = []
          this.topAuthor = []
          let row = []
          this.relatedPaper = []
          this.showLoading()
          this.$axios.get("http://114.116.235.94/search/",{
            params:{
              q : this.key,
              method : 2,
              line : this.line,
            },
          }).then(res => {
            //console.log(res.data.code)
            this.rows = res.data.data.goods;
            this.oldrows = res.data.data.goods;
            row = res.data.data.goods;
            //console.log((this.rows[11].author_name).match(/(?<=\').*?(?=\')/g))
            for(let item of this.rows){
              item.author_name = item.author_name.match(/(?<=\')[^,].*?(?=\')/g);
              item.keyword = item.keyword.match(/(?<=\')[^,].*?(?=\')/g);
              if(item.publish_time === "N/A")
                item.publish_time = "";
              if(item.quote === "N/A")
                item.quote = 0;
              if(item.quote !== "N/A"){
                if(String(item.quote).indexOf("万") !== -1)
                  item.qutoe = 10012
                else
                  item.quote = parseInt(item.quote)
              }
              if(item.org === "N/A")
                item.org = "";
            }
           for(let idx in [1,2,3]){
             let i = Math.round(Math.random()*this.rows.length)
             //console.log(this.rows[i])
             this.relatedPaper.push({title : this.rows[i].title, id: this.rows[i].id})
           }
            //console.log(this.relatedPaper)
            this.$axios({
              method:"post",
              url: "http://114.116.235.94/count_search/",
              header:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {all_info : row},
              traditional: true,
              paramsSerializer: data => {
                return qs.stringify(data, { indices: false })
              }
            }).then((res)=>{
              this.top = res.data
              //console.log(this.top)

              for(let key in this.top.author){
                if(key !== "None") {
                  let item = this.top.author[key];
                  this.topAuthor.push({name:key, value:item})
                }
              }

              for(let key in this.top.keywords_count){
                if(key !== "None") {
                  let item = this.top.keywords_count[key];
                  this.topKeyWord.push({name:key, value:item})
                }
              }

              for(let key in this.top.org){
                if(key !== "None") {
                  let item = this.top.org[key];
                  this.topSchool.push({name:key, value:item})
                }
              }

              for(let key in this.top.publish_time){
                if(key !== "None") {
                  let item = this.top.publish_time[key];
                  this.topDate.push({name:key, value:item})
                }
              }
            })
          })
        },

        searchOnResult(){
          this.key = this.result + " " + this.key;
          console.log(this.key)
          this.$router.push({ "path": "/search", "query": { "searchBy": this.searchBy, "key": this.key, "method" : "1" } });
          this.simpleSearch ()
        },
        advanced () {
          this.$router.push("/search/advanced");
        },
        check (id){
          window.sessionStorage.setItem("data", JSON.stringify(this.rows))
          this.$router.push({ "path": "/paper/check", "query": { "id": id } });
        },
        // pick (cond){
        //   this.key = this.key + " " + cond
        //   this.search()
        // },
        relative (cond){
          this.key = cond
          this.search()
        },
        pickType (type) {
          this.line = "$" + this.result + "_" + "$" + this.result + "_" + "$" + this.result + "_" + "$" + "_" + "$" + "_" + "$" + type + "_" + "$"
          this.$router.push({ "path": "/search", "query": { "line": this.line, "key": this.key , "method" : "2"} });
          this.advancedSearch()
        },
        pickTime (time){
          this.line = "$"  + "_" + "$"   +"_" + "$"  + "_" + "$"  + "_" + "$"  + "_" + "$"  + "_" + "$" + time
          this.$router.push({ "path": "/search", "query": { "line": this.line, "key": this.key + " " + time , "method" : "2"} });
          this.advancedSearch()
        },
        pickAuthor (author){
          this.line = "$"  + "_" + "$"   +"_" + "$"  + "_" + "$" + author + "_" + "$"  + "_" + "$"  + "_" + "$"
          this.$router.push({ "path": "/search", "query": { "line": this.line, "key": this.key + " " + author , "method" : "2"} });
          this.advancedSearch()
        },
        pickSchool (school){
          this.line = "$"  + "_" + "$"   +"_" + "$"  + "_" + "$"  + "_" + "$"  + school + "_" + "$"  + "_" + "$"
          this.$router.push({ "path": "/search", "query": { "line": this.line, "key": this.key + " " + school , "method" : "2"} });
          this.advancedSearch()
        },
        showLoading () {
          this.$q.loading.show()

          // hiding in 2s
          this.timer = setTimeout(() => {
            this.$q.loading.hide()
            this.timer = void 0
          }, 3000)
        },


    },
    beforeDestroy () {
      if (this.timer !== void 0) {
        clearTimeout(this.timer)
        this.$q.loading.hide()
      }
    }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
.my-table-details {
  font-size: 1.0em;
  max-width: 200px;
  white-space: normal;
  color: #555;
  text-align: left;
}
.my-table-details2 {
  font-size: 1.0em;
  max-width: 200px;
  min-width: 100px;
  white-space: normal;
  text-align: center;
}
</style>

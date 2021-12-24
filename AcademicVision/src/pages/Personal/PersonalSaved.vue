<template>
  <left-drawer>
    <template #leftDrawer>
      <q-card style="width: 70%;margin-left: 15%">
        <div class="q-pa-md text-h5 text-center">
          我  的  学  术
        </div>
        <q-separator />
        <q-tabs
          v-model="tab"
          align="justify"
          class="text-grey-6 q-py-md"
          active-color="primary"
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          inline-label
        >
          <q-tab
            v-for="item in tabsList"
            :key="item"
            ripple="false"
            :name="item.name"
            :icon="item.icon"
            :label="item.label"
            content-class="q-py-md"
          />
        </q-tabs>
      </q-card>
    </template>
    <template #navBar4SmallWindow>
      <q-tabs
        v-model="tab"
        align="justify"
        class="text-grey-6 q-py-md"
        active-color="primary"
        swipeable
        transition-prev="jump-up"
        transition-next="jump-up"
        inline-label
        mobile-arrows
      >
        <q-tab
          v-for="item in tabsList"
          :key="item"
          ripple="false"
          :name="item.name"
          :icon="item.icon"
          :label="item.label"
        />
      </q-tabs>
    </template>
    <template #main>
      <q-table
        v-if="tab==='1'&&this.rows1.length !== 0"
        v-model:pagination="pagination"
        style="height:450px;width: 85%"
        title="文献列表"
        :rows="rows1"
        :columns="columns1"
        row-key="paper_id"
        virtual-scroll
        :rows-per-page-options="[0]"
        :filter="filter1"
      >
        <template #top-right>
          <q-input
            v-model="filter1"
            borderless
            dense
            debounce="300"
            placeholder="Search"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template #header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template #body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="primary"
                round
                dense
                :icon="props.expand ? 'remove' : 'add'"
                @click="props.expand = !props.expand"
              />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              <span v-if="col.name!=='author_name'">{{ col.value }}</span>
              <span v-else>
                <span v-for="item in col.value"
                :key="item">
                  {{item}}&nbsp;&nbsp;
                </span>
              </span>
            </q-td>
          </q-tr>
          <q-tr
            v-show="props.expand"
            :props="props"
          >
            <q-td colspan="100%">
              <div class="text-left">
                <q-btn
                  push
                  color="white"
                  text-color="primary"
                  label="查看文献详细信息"
                  @click="CheckDocument(props.row.paper_id)"
                />
                <q-btn
                  style="margin-left: 30px"
                  color="primary"
                  label="查看作者详细信息"
                  @click="CheckWriter(props.row.author_id)"
                />
                <q-btn
                  style="margin-left: 30px"
                  color="red"
                  label="取消关注"
                  @click="DeleteDocument(props.row.paper_id)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <template v-if="tab==='1' && this.rows1.length===0">
        <div class="q-pa-xl text-center text-grey text-h5">
          您还未收藏文献
        </div>
      </template>
        <q-table
          v-if="tab==='2'&&this.rows2.length !== 0"
          v-model:pagination="pagination2"
          style="height: 450px;width: 85%"
          title="知贴列表"
          :rows="rows2"
          :columns="columns2"
          row-key="col_post_id"
          virtual-scroll
          :rows-per-page-options="[0]"
          :filter="filter2"
        >
          <template #top-right>
            <q-input
              v-model="filter2"
              borderless
              dense
              debounce="300"
              placeholder="Search"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

        <template #body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="primary"
                round
                dense
                :icon="props.expand ? 'remove' : 'add'"
                @click="props.expand = !props.expand"
              />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
            <q-tr
              v-show="props.expand"
              :props="props"
            >
              <q-td colspan="100%">
                <div class="text-left">
                  <q-btn
                    push
                    color="white"
                    text-color="primary"
                    label="查看知贴详细信息"
                    @click="CheckPost(props.row.post_id,props.row.user_id)"
                  />
                  <q-btn
                    style="margin-left: 30px"
                    color="primary"
                    label="查看作者详细信息"
                    @click="CheckPostWriter(props.row.user_id)"
                  />
                  <q-btn
                    style="margin-left: 30px"
                    color="red"
                    label="取消关注"
                    @click="DeletePost(props.row.post_id,props.row.user_id)"
                  />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>

      <template v-if="tab==='2' && this.rows2.length===0">
        <div class="q-pa-xl text-grey text-h4">
          您还未收藏任何帖子
        </div>
      </template>
    </template>
  </left-drawer>
</template>

<script>
import { ref } from "vue";
import { defineAsyncComponent } from "vue";

const leftDrawer = defineAsyncComponent(() => import("../../layouts/LeftDrawer"));

const columns1 = [
    {
        "name": "title",
        "required": true,
        "label": "文献名称",
        "align": "left",
        "field": row => row.title,
        "format": val => `${val}`,
        "sortable": true
    },
    { "name": "author_name","align": "center", "label": "作者", "field": "author_name" },
    { "name": "org", "align": "center", "label": "出版单位", "field": "org",},
    { "name": "quote", "align": "center", "label": "被引次数", "field": "quote", },
    { "name": "publish_time","align": "center", "label": "发布日期", "field": "publish_time" },
];


const columns2 = [
    {
        "name": "title",
        "required": true,
        "label": "帖子主题",
        "align": "left",
        "field": row => row.title,
        "format": val => `${val}`,
        "sortable": true
    },
    { "name": "lable", "align": "center", "label": "分类", "field": "lable", "sortable": true },
    { "name": "user_name","align": "center", "label": "作者", "field": "user_name" },
    { "name": "goodnum", "align": "center", "label": "获赞数", "field": "goodnum",},
    { "name": "time", "align": "center","label": "发布日期", "field": "time" },
];


export default {
    "name": "PersonalSaved",
    "components": {
        leftDrawer
    },
    setup (){

        return {
            "filter1": ref(""),
            "filter2": ref(""),

        };

    },

    data () {

        return {
          rows1:[],
          columns1,
          rows2:[],
          columns2,
            "tab": "1",
            "tabsList": [
            { "name": "1", "icon": "camera", "label": "文 献 收 藏" },
            { "name": "2", "icon": "assessment", "label": "知 贴 收 藏" },
            ],
            "pagination": ref({
                "rowsPerPage": 0
            }),
            "pagination2": ref({
                "rowsPerPage": 0
            }),

        };

    },
   "mounted": function () {
      this.loadPaperTable()
      this.loadPostTable()
    },
    "methods": {
        loadPaperTable(){
          this.$axios({
            method:"post",
            url:"http://114.116.235.94/my_col_paper_list/",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
              user_id:this.$store.state.person.userID,
            },
            transformRequest:[function(data){
              let ret = ''
              for(let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res)=>{
            console.log(res.data.info )
            let info = res.data.info ;
            this.rows1=info;
            for(let item of this.rows1) {
              item.author_name = item.author_name.match(/(?<=\')[^,].*?(?=\')/g);
            }
            // if(info.briefintroduction !== null)
            //   this.Form.briefintroduction = info.briefintroduction;
          })
        },
        loadPostTable(){
          this.$axios({
            method:"post",
            url:"http://114.116.235.94/my_col_post_list/",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
              user_id:this.$store.state.person.userID,
            },
            transformRequest:[function(data){
              let ret = ''
              for(let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res)=>{
            console.log(res.data.info )
            let info = res.data.info ;
            this.rows2=info;
            // if(info.briefintroduction !== null)
            //   this.Form.briefintroduction = info.briefintroduction;
          })
        },
        CheckDocument (paperid){
          this.$router.push({
            "path": "/paper/check",
            "query":{"id": paperid}
          })
        },
        CheckWriter (authorid){
          if(authorid!=null) {
            console.log(authorid)
            window.sessionStorage.setItem('otherpersonid', authorid);
            this.$router.push({
              "path": "/otherpersonal",
              "query":{"tab": "2"},
            })
          }
          else {
            alert("该作者未注册")
          }
        },
        DeleteDocument (paperid){
          console.log(paperid)
          this.$axios({
            method:"post",
            url:"http://114.116.235.94/un_col_paper/",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
              user_id: this.$store.state.person.userID,
              paper_id: paperid,
            },
            transformRequest:[function(data){
              let ret = ''
              for(let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          })
          this.loadPaperTable()
          alert('取消关注成功')
          this.loadPaperTable()
        },
        CheckPost (postid,userid){
          console.log(userid)
          console.log(postid)
          this.$router.push({
            "path": "/posts/view",
            "query": {
              "user_id": userid,
              "post_id": postid,
            }
          })
        },
        CheckPostWriter (userid){
          console.log(userid)
          window.sessionStorage.setItem('otherpersonid',userid);
          this.$router.push({
            "path": "/otherpersonal",
            "tab" : "1"
          })
        },
        DeletePost (postid,userid){
         this.$axios({
            method:"post",
            url:"http://114.116.235.94/un_col_post/",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
              user_id: this.$store.state.person.userID,
              post_id: postid
            },
            transformRequest:[function(data){
              let ret = ''
              for(let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          })
          this.loadPostTable()
          alert('取消关注成功')
          this.loadPostTable()
        },
    },
};
</script>

<style lang="sass">

</style>

<template>
  <div class="q-pa-md q-gutter-sm" style="margin: 0 auto;text-align:center">
    <div class="text-h5 text-grey-7" style="margin-top: 0px">学者搜索</div>
  </div>

  <q-toolbar
    class="bg-grey-2 shadow-2 rounded-borders"
    style="height: 50px;width: 900px;margin: 20px auto 20px auto"
  >
    <span style="color: #7f7f7f">姓名</span>

    <q-separator
      vertical
      inset
      style="margin-left: 10px"
    />

    <q-input
      v-model="name"
      dark
      dense
      standout
      input-class="text-left"
      class="q-ml-md"
      style="width: 37%"
      bg-color="white"
    >
    </q-input>

    <span style="color: #7f7f7f;margin-left: 40px">机构</span>

    <q-separator
      vertical
      inset
      style="margin-left: 10px"
    />

    <q-input
      v-model="instruction"
      dark
      dense
      standout
      input-class="text-left"
      class="q-ml-md"
      style="width: 37%"
      bg-color="white"
    >
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
      icon="search"
      @click="load"
    >
    </q-btn>
  </q-toolbar>

  <div style="margin: 0 auto;width: 70%">
    <div style="font-size: small;margin-bottom: 20px">为您搜索到如下结果：</div>
    <div class="row">
      <q-card v-if="author.length !== 0" v-for="item in author.slice((current-1)*8,current*8)"  :key="item" class="my-card" flat bordered style="width: 50%">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="80px">
              <img v-if="item.img !== null" :src="'http://114.116.235.94/' + item.img">
              <img v-else src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label style="font-size: large;font-weight: bold">{{item.author_name}}</q-item-label>
            <q-item-label style="font-size: small">{{item.org}}</q-item-label>
            <q-item-label caption>
              发表文章：{{item.paper_num}}
            </q-item-label>
            <q-item-label caption>
              被引次数：{{item.quote}}
            </q-item-label>
            <q-item-label  caption>
              研究方向： {{item.direction}}
            </q-item-label>
          </q-item-section>
          <q-btn class="text-blue-7" color="blue-7" rounded outline size="md" style="height: 30px" @click="goToOther(item.user_id)">前往查看</q-btn>
        </q-item>
      </q-card>

      <div v-else style="font-size: 50px;font-weight: bold;color: #7f7f7f;margin-left: auto;margin-right: auto;margin-top: 80px">暂无符合要求的结果!</div>
    </div>

    <div class="q-pa-lg flex flex-center" style="margin-top: 30px">
      <q-pagination
        v-model="current"
        color="grey"
        :max="max"
        :max-pages="8"
        boundary-numbers
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSearch",
  data(){
    return{
      'name': '',
      'instruction' : '',
      'current' : 1,
      "author" : [],
      "max" : 1
    }
  },
  created() {
    this.name = this.$route.query.key
    this.load()
  },
  methods : {
    load () {
      this.$router.push({ "path": "/search/user", "query": { "key": this.name, "org":this.instruction} });
      this.$axios({
        method: 'POST',
        url: 'http://114.116.235.94/get_author/',
        data: {
          name: this.name,
          org: this.instruction
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(response => {
        this.author = []
        this.author = response.data.list
        this.max = this.author.length / 6
      })
    },
    goToOther(id){
      window.sessionStorage.setItem("otherpersonid",id)
      this.$router.push({"path":"/otherpersonal"})
    }
  }
}
</script>

<style scoped>

</style>

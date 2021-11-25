<template>
  <div style="margin: 0 auto;" class="postsearch">
    <div class="search">
      <div style="margin: 0 auto;padding-top: 50px">
        <h3 style="text-align: center;margin-top: 0;color: white">知 贴 搜 索</h3>
      </div>
      <q-input standout v-model="text" :dense="dense" style="max-width: 900px;margin:0 auto;background-color: white;opacity: 0.85">
        <template v-slot:append>
          <q-avatar>
            <q-btn icon="arrow_back" color="blue-6" round @click="back" size="11px"></q-btn>
          </q-avatar>
          &nbsp
          <q-avatar>
            <q-btn icon="search" round color="blue-6" size="12px" @click="search"></q-btn>
          </q-avatar>
        </template>
      </q-input>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 1200px;margin: 0 auto;" v-for="test in list">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-field filled stack-label bg-color="light-blue-1">
            <template v-slot:control>
              <a href="https://y.qq.com/n/ryqq/songDetail/0039MnYb0qxYhV" style="text-decoration: none;color: #1D1D1D">
                <div class="self-center full-width no-outline" tabindex="0" style="font-size: 20px">
                  {{ test.author }}&nbsp&nbsp&nbsp{{ test.context }}
                </div>
              </a>
            </template>
          </q-field>
        </transition>
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="100px" color="primary"/>
        </q-inner-loading>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PostSearch",

  data() {
    return {
      text: this.$route.query.context,
      dense: false,
      visible: true,
      showSimulatedReturnData: true,
      list: [],
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },
    search() {
      console.log("您点击了搜索按钮，您选择搜索的内容是" + this.text);
      this.visible = true
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.list = [
          {rank: 1, context: "新的推荐帖子", author: "周杰伦"},
          {rank: 1, context: "新的推荐数据", author: "周杰伦"},
          {rank: 1, context: "新的推荐数据", author: "周杰伦"},
          {rank: 1, context: "新的推荐数据", author: "周杰伦"},
          {rank: 1, context: "新的推荐数据", author: "周杰伦"},
          {rank: 1, context: "新的推荐数据", author: "周杰伦"},
        ]
        this.visible = false
        this.showSimulatedReturnData = true
      }, 1000)
      // 更新List数据
    }
  }
}
</script>

<style scoped>
.search {
  background-image: url("../../../public/双生.jpg");
  background-size: cover;
  background-attachment: fixed;
  padding: 0;
  margin: 0;
  min-height: 350px;

}
</style>

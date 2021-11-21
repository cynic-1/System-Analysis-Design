<template>
  <!--浏览分区帖子-->
  <div>
    <h3 style="margin-top: 10px;margin-bottom: 10px">
      <q-btn icon="reply" color="blue-6" round @click="emitToParent"></q-btn>
      {{ name }}帖子分区
    </h3>
    <div class="row">
      <div class="col-8">
        <div class="q-pa-md">
          <q-card class="my-card" style="max-width: 900px">
            <q-parallax
              src="https://cdn.quasar.dev/img/parallax1.jpg"
              :height="150"
            />

            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card" style="width: 100%;max-width: 200px;height: 230px">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom">
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </div>
            </q-img>

            <q-card-actions>
              <q-btn flat>查看帖子</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="col-2">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card" style="width: 100%;max-width: 200px;height: 230px">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom">
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </div>
            </q-img>

            <q-card-actions>
              <q-btn flat>查看帖子</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <h4 style="margin-top: 10px;margin-bottom: 10px;float: left">
      <q-icon name="local_fire_department" color="blue-6"></q-icon>
      帖子推荐
    </h4>
    <h5 style="margin-top: 10px;margin-bottom: 10px;float: right">
      <q-btn icon="published_with_changes" round color="blue-6" @click="showTextLoading"></q-btn>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    </h5>
    <br>
    <br>

    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 1200px;margin: 0 auto;" v-for="test in list">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-field filled stack-label bg-color="blue-1">
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
  name: "PostPartionView",

  data() {
    return {
      visible: false,
      showSimulatedReturnData: false,
      list: [
        {rank: 1, context: "还记得你说家是唯一的城堡", author: "周杰伦"},
        {rank: 2, context: "随着稻香河流慢慢奔跑", author: "方文山"},
        {rank: 3, context: "微微笑，小时候我的梦知道", author: "黄俊郎"},
        {rank: 4, context: "断了的弦", author: "周杰伦"},
        {rank: 5, context: "麻烦给我的爱人一杯Mojito", author: "周杰伦"},
        {rank: 6, context: "吹着前奏 望着天空", author: "周杰伦"},
        {rank: 7, context: "我想起花瓣 试着掉落", author: "周杰伦"},
        {rank: 8, context: "为你翘课的那一天", author: "周杰伦"},
        {rank: 9, context: "花落的那一天", author: "周杰伦"},
        {rank: 10, context: "教室的那一间 我怎么看不见", author: "周杰伦"},
      ]
    }
  },
  methods: {
    emitToParent() {
      this.$emit('childevent', false);
    },
    showTextLoading() {
      this.visible = true
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.list= [
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
  },

  props: ['name']
}
</script>

<style scoped>

</style>

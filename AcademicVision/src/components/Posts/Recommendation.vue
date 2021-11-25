<template>
  <!--帖子首页推荐板块-->

  <div class="row">
    <div class="col-8">
      <div class="q-pa-md" @click="search">
        <q-card class="my-card" style="max-width: 800px">
          <q-parallax
            src="https://cdn.quasar.dev/img/parallax1.jpg"
            :height="150"
          />

          <q-card-section>
            <div class="text-h6">今日推荐文章1</div>
            <div class="text-subtitle2">作者名</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-4">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" style="width: 100%;max-width: 250px;height: 230px">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">今日推荐文章2</div>
              <div class="text-subtitle2">作者名</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" style="width: 100%;max-width: 250px;height: 230px">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">今日推荐文章3</div>
              <div class="text-subtitle2">作者名</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="col-4" style="">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" style="width: 100%;max-width: 250px;height: 230px">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">今日推荐文章4</div>
              <div class="text-subtitle2">作者名</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="col-4" style="">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" style="width: 100%;max-width: 250px;height: 230px">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">今日推荐文章5</div>
              <div class="text-subtitle2">作者名</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommendation",

  methods: {
    search() {
      this.$router.push({path: '/posts/view', query: {id: 123456,context: this.text,textid: 123}});
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>

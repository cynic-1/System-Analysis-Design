<template>
  <div class="q-pa-md q-gutter-sm" style="margin: 0 auto;text-align:center">
    <div class="text-h5 text-grey-7" style="margin-top: 50px">学者搜索</div>
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
    >
    </q-btn>
  </q-toolbar>

  <div style="margin: 0 auto;width: 70%">
    <div style="font-size: small;margin-bottom: 20px">为您搜索到如下结果：</div>
    <div class="row">
      <q-card v-for="x in 8"  :key="x" class="my-card" flat bordered style="width: 50%">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="80px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label style="font-size: large;font-weight: bold">张勇</q-item-label>
            <q-item-label style="font-size: small">中国疾病预防控制中心病毒病预防控制所</q-item-label>
            <q-item-label caption>
              发表文章：7522  被引次数：166328
            </q-item-label>
            <q-item-label  caption>
              研究领域：病原生物学 分子流行病学
            </q-item-label>
          </q-item-section>
          <q-btn class="text-blue-7" color="blue-7" rounded outline size="md" style="height: 30px">前往查看</q-btn>
        </q-item>
      </q-card>
    </div>

    <div class="q-pa-lg flex flex-center" style="margin-top: 30px">
      <q-pagination
        v-model="current"
        color="grey"
        :max="10"
        :max-pages="6"
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
      'current' : 1
    }
  }
}
</script>

<style scoped>

</style>

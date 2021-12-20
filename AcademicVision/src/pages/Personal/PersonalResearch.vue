<template>
  <left-drawer>
    <template #leftDrawer>
      <q-card>
        <div class="q-pa-md text-h5 text-center">
          学 术 中 心
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
            ripple
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
          ripple
          :name="item.name"
          :icon="item.icon"
          :label="item.label"
        />
      </q-tabs>
    </template>
    <template #main>

        <q-tab-panels
          v-model="tab"
          animated
        >
<!--          这里加个padding是为了改他默认的padding，对齐好看-->
          <q-tab-panel name="scholar page" style="padding: 1px">
            <q-card>
              <div class="text-h5 q-pa-md">
                统计数据
              </div>
              <q-separator inset/>
              <pie-chart />
            </q-card>
            <q-card class="q-my-xl">
              <div class="text-h5 q-pa-md">
                历史数据
              </div>
              <q-separator inset/>
              <line-chart />
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
    </template>
  </left-drawer>
</template>

<script>
import { defineAsyncComponent } from "vue";

const leftDrawer = defineAsyncComponent(() => import("../../layouts/LeftDrawer"));
const pieChart = defineAsyncComponent(() => import("../../components/PieChart"));
const lineChart = defineAsyncComponent(() => import("../../components/LineChart"));


export default {
    "name": "PersonalResearch",
    "components": {
        leftDrawer,
        pieChart,
        lineChart
    },
    data () {

        return {
            "tab": "scholar page",
            "tabsList": [
                { "name": "scholar page", "icon": "description", "label": "学者主页" },
                { "name": "questions", "icon": "help_center", "label": "我的问题" },
                { "name": "answers", "icon": "question_answer", "label": "我的回答" },
                { "name": "confirm authorship", "icon": "school", "label": "研究认领" },
                { "name": "file visibility", "icon": "visibility", "label": "管理可见" },
            ],
        };

    },

};
</script>

<style lang="sass">
</style>

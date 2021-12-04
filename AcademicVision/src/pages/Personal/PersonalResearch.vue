<template>
  <left-drawer>
    <template #leftDrawer>
      <q-card>
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
      <q-card>
        <q-tab-panels
          v-model="tab"
          animated
        >
          <q-tab-panel
            v-for="item in tabsList"
            :key="item.name"
            :name="item.name"
          >
            <div class="text-h5 q-pb-md">
              {{ item.label }}
            </div>
            <q-separator />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </template>
  </left-drawer>
</template>

<script>
import { defineAsyncComponent } from "vue";

const leftDrawer = defineAsyncComponent(() => import("../../layouts/LeftDrawer"));

export default {
    "name": "PersonalResearch",
    "components": {
        leftDrawer
    },
    data () {

        return {
            "tab": "projects",
            "tabsList": [
                { "name": "projects", "icon": "folder", "label": "我的工程" },
                { "name": "research items", "icon": "description", "label": "研究项目" },
                { "name": "questions", "icon": "help_center", "label": "我的问题" },
                { "name": "answers", "icon": "question_answer", "label": "我的回答" },
                { "name": "confirm authorship", "icon": "school", "label": "研究认领" },
                { "name": "file visibility", "icon": "visibility", "label": "管理可见" },
            ]
        };

    }
};
</script>

<style lang="sass">
</style>

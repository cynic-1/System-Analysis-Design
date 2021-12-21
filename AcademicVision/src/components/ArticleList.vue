<template>
  <q-list style="min-width: 600px">
    <q-item
      v-for="item in confirmList"
      class="q-pt-md"
    >
      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-h5 text-weight-bold cursor-pointer">{{ item.title }}</span>
        </q-item-label>
        <q-item-label lines="1">
          <q-chip
            size="lg"
            square
            outline
            color="teal"
            text-color="white"
          >
            {{ this.researchTypeStrMap[item.researchType] }}
          </q-chip>
          <span class="text-h6 text-grey q-px-md">{{ item.publishTime }} {{ item.journalName }}
            被引量: {{ item.reference }}</span>
        </q-item-label>
        <q-item-label
          lines="1"
          class="q-mt-xs"
        >
          <span
            v-for="it in item.authorList"
            class="q-px-xs text-uppercase text-h6"
          >{{ it }}</span>
        </q-item-label>
      </q-item-section>

      <q-item-section
        top
        side
      >
        <div
          class="text-grey-8 q-gutter-xs"
          v-if="canEdit"
        >
          <q-btn
            class="gt-xs"
            size="lg"
            flat
            dense
            color="primary"
            icon="close"
            label="不是我"
          />
          <q-btn
            class="gt-xs"
            size="lg"
            dense
            icon="check"
            label="我是作者"
            color="primary"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
    "name": "ArticleList",
    "props": {
        "canEdit": Boolean,
        "confirmList": Array
    },
    data () {

        return {
            "researchTypeStrMap": ["期刊", "会议", "专著", "其他"]
        };

    },
    mounted () {
    }

};
</script>

<style scoped>

</style>

<template>
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
          dark
          dense
          standout
          input-class="text-left"
          class="q-ml-md"
          style="width: 80%"
          bg-color="white"
        >
          <template #append>
            <q-separator
              vertical
              inset
            />
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="key = ''"
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

  <div class="q-pa-md">
    <div
      class="q-gutter-y-md"
      style="width: 100%"
    >
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-blue-8 text-white shadow-2"
      >
        <span
          v-for="item in categories"
          :key="item"
        >
          <q-tab
            v-if="item.selection.length ===0"
            :name="item.name"
            :label="item.name + '( ' + item.num + ' )'"
          />

          <q-btn-dropdown
            v-else
            auto-close
            stretch
            flat
            :label="item.name"
          >
            <q-list>
              <q-item
                v-for="opt in item.selection"
                :key="opt"
                clickable
                @click="tab = ''"
              >
                <q-item-section>{{ opt.name }}({{ opt.num }})</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </span>
      </q-tabs>
    </div>
  </div>

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
                flat
                size="20px"
                style="margin-left: 15px"
              >
                <div class="text-center">
                  <span style="font-weight: bold">总库</span><br><span>20.09万</span>
                </div>
              </q-btn>
            </q-card-actions>

            <q-separator
              vertical
              dark
            />

            <q-card-actions
              vertical
              style="margin-left: 15px"
            >
              <q-btn flat>
                中文
              </q-btn>
              <q-btn flat>
                外文
              </q-btn>
            </q-card-actions>
          </q-card-section>

          <q-separator />

          <q-card-actions align="around">
            <q-btn
              color="grey-3"
              text-color="blue"
              size="18px"
            >
              科技
            </q-btn>
            <q-btn
              color="grey-3"
              text-color="blue"
              size="18px"
            >
              社科
            </q-btn>
          </q-card-actions>
        </q-card>


        <q-expansion-item
          v-for="item in topic"
          :key="item"
          expand-separator
          :label="item"
          class="shadow-2"
          style="margin-top: 10px;background-color: #cce6ff; color: #1D1D1D; font-weight: bold;"
        >
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            label="技术研究"
          />
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            label="应用研究"
          />
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
              >
                <q-item-section>
                  财务共享对企业财务绩效的影响研究——以华为公司为例
                </q-item-section>
              </q-item>

              <q-item
                v-ripple
                clickable
              >
                <q-item-section>
                  碳市场的减排效应研究——来自中国碳交易试点地区的经验证据
                </q-item-section>
              </q-item>

              <q-item
                v-ripple
                clickable
              >
                <q-item-section>
                  绿色金融与企业绿色创新
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
          v-model:pagination="pagination"
          :rows="rows"
          :columns="columns"
          row-key="name"
          selection="multiple"
          v-model:selected="selected"
          hide-pagination
        >
          <template #body-cell-desc="props">
            <q-td :props="props">
              <div class="my-table-details">
                {{ props.value }}
              </div>
            </q-td>
          </template>

          <template #body-cell-operation="props">
            <q-td :props="props">
              <q-btn
                icon="download"
                round
                flat
                size="sm"
              />
              <q-btn
                icon="star"
                round
                flat
                size="sm"
              />
              <q-btn
                icon="share"
                round
                flat
                size="sm"
              />
            </q-td>
          </template>
        </q-table>

        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
        </div>

        <div style="margin-top: 25px">
          <span style="margin-right: 10px;font-weight: bold;color: #b2b2b2">相关搜索</span>
          <span
            v-for="item in related"
            :key="item"
            style="margin-right: 25px;color: #006cd6; cursor: pointer;"
          >{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

const columns = [
    {
        "name": "desc",
        "required": true,
        "label": "题名",
        "align": "center",
        "field": row => row.name,
        "format": val => `${val}`
    },
    { "name": "calories", "align": "center", "label": "作者", "field": "calories" },
    { "name": "fat", "align": "center", "label": "来源", "field": "fat" },
    { "name": "carbs", "align": "center", "label": "发表时间", "field": "carbs" },
    { "name": "protein", "align": "center", "label": "数据库", "field": "protein" },
    { "name": "protein", "align": "center", "label": "被引", "field": "protein" },
    { "name": "protein", "align": "center", "label": "下载", "field": "protein" },
    { "name": "operation", "align": "center", "label": "操作", "field": "protein" }
];

const rows = [
    {
        "name": "基于确定性因子的启发式属性值约简模型",
        "calories": 159,
        "fat": 6.0,
        "carbs": 24,
        "protein": 4.0
    },
    {
        "name": "智能时代乡村教师队伍建设的困境与出路",
        "calories": 237,
        "fat": 9.0,
        "carbs": 37,
        "protein": 4.3
    },
    {
        "name": "从虚拟现实到元宇宙：在线教育的新方向",
        "calories": 262,
        "fat": 16.0,
        "carbs": 23,
        "protein": 6.0
    },
    {
        "name": "“泛在智能”时代警务人工智能“奇点”与警察未来",
        "calories": 305,
        "fat": 3.7,
        "carbs": 67,
        "protein": 4.3
    },
    {
        "name": "人工智能对出口产品质量促进的异质效应与影响路径",
        "calories": 356,
        "fat": 16.0,
        "carbs": 49,
        "protein": 3.9
    },
    {
        "name": "机器人辅助椎体成形骨水泥注射治疗胸腰椎多椎体病理性骨折",
        "calories": 375,
        "fat": 0.0,
        "carbs": 94,
        "protein": 0.0
    },
    {
        "name": "基于专利语义表征的技术预见方法及其应用",
        "calories": 392,
        "fat": 0.2,
        "carbs": 98,
        "protein": 0
    },
    {
        "name": "浅析人工智能与大数据板块上市公司",
        "calories": 408,
        "fat": 3.2,
        "carbs": 87,
        "protein": 6.5
    },
    {
        "name": "人工智能时代会计信息生成路径优化研究",
        "calories": 452,
        "fat": 25.0,
        "carbs": 51,
        "protein": 4.9
    },
    {
        "name": "数字时代的隐私权保护研究",
        "calories": 518,
        "fat": 26.0,
        "carbs": 65,
        "protein": 7
    },
    {
        "name": "基于确定性因子的启发式属性值约简模型",
        "calories": 159,
        "fat": 6.0,
        "carbs": 24,
        "protein": 4.0
    },
    {
        "name": "智能时代乡村教师队伍建设的困境与出路",
        "calories": 237,
        "fat": 9.0,
        "carbs": 37,
        "protein": 4.3
    },
    {
        "name": "从虚拟现实到元宇宙：在线教育的新方向",
        "calories": 262,
        "fat": 16.0,
        "carbs": 23,
        "protein": 6.0
    },
    {
        "name": "“泛在智能”时代警务人工智能“奇点”与警察未来",
        "calories": 305,
        "fat": 3.7,
        "carbs": 67,
        "protein": 4.3
    },
    {
        "name": "人工智能对出口产品质量促进的异质效应与影响路径",
        "calories": 356,
        "fat": 16.0,
        "carbs": 49,
        "protein": 3.9
    },
    {
        "name": "机器人辅助椎体成形骨水泥注射治疗胸腰椎多椎体病理性骨折",
        "calories": 375,
        "fat": 0.0,
        "carbs": 94,
        "protein": 0.0
    },
    {
        "name": "基于专利语义表征的技术预见方法及其应用",
        "calories": 392,
        "fat": 0.2,
        "carbs": 98,
        "protein": 0
    },
    {
        "name": "浅析人工智能与大数据板块上市公司",
        "calories": 408,
        "fat": 3.2,
        "carbs": 87,
        "protein": 6.5
    },
    {
        "name": "人工智能时代会计信息生成路径优化研究",
        "calories": 452,
        "fat": 25.0,
        "carbs": 51,
        "protein": 4.9
    },
    {
        "name": "数字时代的隐私权保护研究",
        "calories": 518,
        "fat": 26.0,
        "carbs": 65,
        "protein": 7
    },
    {
        "name": "基于确定性因子的启发式属性值约简模型",
        "calories": 159,
        "fat": 6.0,
        "carbs": 24,
        "protein": 4.0
    },
    {
        "name": "智能时代乡村教师队伍建设的困境与出路",
        "calories": 237,
        "fat": 9.0,
        "carbs": 37,
        "protein": 4.3
    },
    {
        "name": "从虚拟现实到元宇宙：在线教育的新方向",
        "calories": 262,
        "fat": 16.0,
        "carbs": 23,
        "protein": 6.0
    },
    {
        "name": "“泛在智能”时代警务人工智能“奇点”与警察未来",
        "calories": 305,
        "fat": 3.7,
        "carbs": 67,
        "protein": 4.3
    },
    {
        "name": "人工智能对出口产品质量促进的异质效应与影响路径",
        "calories": 356,
        "fat": 16.0,
        "carbs": 49,
        "protein": 3.9
    },
    {
        "name": "机器人辅助椎体成形骨水泥注射治疗胸腰椎多椎体病理性骨折",
        "calories": 375,
        "fat": 0.0,
        "carbs": 94,
        "protein": 0.0
    },
    {
        "name": "基于专利语义表征的技术预见方法及其应用",
        "calories": 392,
        "fat": 0.2,
        "carbs": 98,
        "protein": 0
    },
    {
        "name": "浅析人工智能与大数据板块上市公司",
        "calories": 408,
        "fat": 3.2,
        "carbs": 87,
        "protein": 6.5
    },
    {
        "name": "人工智能时代会计信息生成路径优化研究",
        "calories": 452,
        "fat": 25.0,
        "carbs": 51,
        "protein": 4.9
    },
    {
        "name": "数字时代的隐私权保护研究",
        "calories": 518,
        "fat": 26.0,
        "carbs": 65,
        "protein": 7
    }
];

export default {
    "name": "SearchResult",
    setup () {

        const pagination = ref({
            "sortBy": "desc",
            "descending": false,
            "page": 1,
            "rowsPerPage": 20
            // rowsNumber: xx if getting data from a server
        });
        return {
            pagination,
            columns,
            rows,
            "pagesNumber": computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
        };

    },
    data () {

        return {
            "list": ["主题", "篇关摘", "关键词", "篇名", "第一作者"],
            "searchBy": "主题",
            "key": "",
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
            "selected": [rows[1]],
        };

    },
    "methods": {
        onItemClick (item) {

            this.searchBy = item;

        },
        advanced () {

            this.$router.push("/search/advanced");

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
</style>

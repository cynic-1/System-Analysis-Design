<template>
  <div class="row q-py-md">
    <div
      id="researchPieMap"
      class="col q-pa-md"
      style="min-height: 200px; min-width: 800px"
    />
    <div class="col-2 text-center q-py-xl">
      <div class="text-h6 text-grey">
        共计
      </div>
      <div class="text-h5">
        {{ researchItems.sum }}篇
      </div>
    </div>
  </div>

  <div
    class="row q-pa-md"
    style="min-height: 200px"
  >
    <div
      class="col q-px-md"
      v-for="item in researchItems.items"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ item.name }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="text-h5">
            {{ item.value }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    DatasetComponent,
    DatasetComponentOption,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    TransformComponent
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, onUnmounted, watch } from "vue";

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    PieChart,
    LegendComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

// import * as echarts from "echarts";

import { useStore } from 'vuex'

export default {
    "name": "PieChart",
    setup () {

        const store = useStore()

        const researchItems = {
            "items": [{ "value": store.state.person.paperCounts[0], "name": "期刊/会议" },
                { "value": store.state.person.paperCounts[1], "name": "学位论文" },
                { "value": store.state.person.paperCounts[2], "name": "专著" },
                { "value": store.state.person.paperCounts[3], "name": "其他" }],
            "sum": store.state.person.paperCounts.reduce((prev, cur) => {return prev+cur}, 0)
        };

        const option = {
            "tooltip": {
                "trigger": "item"
            },
            "legend": {
                "orient": "vertical",
                "textStyle": {
                    "fontSize": "20"
                },
                "left": "5"
            },
            "series": [
                {
                    "type": "pie",
                    "radius": ["50%", "70%"],
                    "avoidLabelOverlap": false,
                    "label": {
                        "show": true,
                        "fontSize": "20",
                        "position": "outside",
                        "formatter": "{b}: {d}%",
                        "emphasis": {
                            "show": true
                        }
                    },
                    "labelLine": {
                        "show": true
                    },
                    "data": researchItems.items
                }
            ]
        };
        let chart;
        function initChart () {

            chart = echarts.init(document.getElementById("researchPieMap"));
            // 把配置和数据放这里
            // 在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。
            chart.setOption(option);
            window.onresize = function () {

                // 自适应大小
                chart.resize();

            };

        }

        onMounted(() => {

            initChart();

        });

        onUnmounted(() => {

            echarts.dispose(chart);

        });

        watch(
            option,
            (newOptions) => {

                chart.value.setOption(newOptions);

            },
            { "deep": true }
        );

        return {
            option,
            researchItems
        };

    },
    "computed": {
    }
};
</script>

<style scoped>

</style>

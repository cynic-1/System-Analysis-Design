<template>
  <div
    class="row bg-white"
    style="min-height: 400px; width: 92%; padding: 24px;margin-left: 8%"
  >
    <div
      id="parent"
      class="fit row wrap justify-start items-start content-start"
      style="overflow: hidden;margin-top: 100px"
    >
      <q-card
        class="q-pa-md row"
        style="width: 66%; margin-left: 10px"
      >
        <q-slide-transition>
          <div v-show="expanded">
            <q-card-section class=" text-black">
              <div style="font-size: large">
                文献分类
              </div>
              <div style="margin-top: 5px;margin-bottom: 5px">
                <span style="text-align: right;color:#b2b2b2;font-size: small;cursor: pointer;">全选 </span>
                <span
                  style="text-align: right;color:#b2b2b2;font-size: small;cursor: pointer;"
                  @click="subject = []"
                > 清除</span>
              </div>
              <div style="width: 70px;font-size: 1px;">
                <q-option-group
                  v-model="subject"
                  :options="subjectList"
                  type="checkbox"
                  dense
                  size="xs"
                />
              </div>
            </q-card-section>
            <q-separator vertical />
          </div>
        </q-slide-transition>

        <q-btn
          flat
          :icon="expanded ? 'keyboard_arrow_left' : 'keyboard_arrow_right'"
          size="xs"
          style="height: 30px"
          @click="expanded = !expanded"
        />

        <q-form
          class="q-gutter-md rounded-borders"
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-toolbar
            v-for="(item,index) in condition"
            :key="item"
            class="bg-white shadow-2 rounded-borders"
            style="height: 40px;width: 95%;margin-left: 5%"
          >
            <q-btn-dropdown
              :label="item.wayWith"
              color="white"
              style="width: 15%"
              text-color="black"
              stretch
              flat
            >
              <q-list>
                <q-item
                  v-for="opt in this.with"
                  :key="opt"
                  v-close-popup
                  clickable
                  @click="onItemClick(index, 'wayWith', opt)"
                >
                  <q-item-section>
                    <q-item-label>{{ opt }}</q-item-label>
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

            <q-btn-dropdown
              :label="item.searchBy"
              color="white"
              style="width: 15%"
              text-color="black"
              stretch
              flat
            >
              <q-list>
                <q-item
                  v-for="opt in list"
                  :key="opt"
                  v-close-popup
                  clickable
                  @click="onItemClick(index, 'searchBy', opt)"
                >
                  <q-item-section>
                    <q-item-label>{{ opt }}</q-item-label>
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
              v-model="item.key"
              input-class="text-left"
              class="q-ml-md text-black"
              style="width: 80%"
              borderless
            />

            <q-separator
              vertical
              inset
              style="margin-left: 10px"
            />

            <q-btn-dropdown
              :label="item.whichOne"
              color="white"
              style="width: 15%"
              text-color="black"
              stretch
              flat
            >
              <q-list>
                <q-item
                  v-for="opt in which"
                  :key="opt"
                  v-close-popup
                  clickable
                  @click="onItemClick(index, 'which', opt)"
                >
                  <q-item-section>
                    <q-item-label>{{ opt }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn
              flat
              class="q-ml-auto"
              icon="delete"
              @click="delDomain(index)"
            />
            <q-btn
              flat
              icon="add"
              @click="addDomain()"
            />
          </q-toolbar>

          <div
            class="q-gutter-sm"
            style="margin-left: 5%"
          >
            <span style="font-size: large">数据源:</span>
            <q-radio
              v-for="item in from"
              :key="item"
              v-model="fromWhere"
              name="where"
              :val="item"
              :label="item"
            />
          </div>

          <div
            class="q-gutter-sm row"
            style="margin-left: 5%"
          >
            <span style="font-size: large;margin-right: 10px">时间范围:</span>
            <q-select
              v-model="beginDate"
              outlined
              dense
              :options="dateOption"
              style="width: 20%"
              label="开始时间"
            />
            <q-select
              v-model="endDate"
              outlined
              dense
              :options="dateOption"
              style="width: 20%;margin-left: 30px"
              label="结束时间"
            />
            <q-select
              v-model="updateDate"
              outlined
              dense
              :options="updateDateOption"
              style="width: 20%;margin-left: 30px"
              label="更新时间"
            />
          </div>

          <div
            class="q-gutter-sm row"
            style="margin-left: 5%"
          >
            <span style="font-size: large;margin-right: 10px">来源类别:</span>
            <q-checkbox
              v-for="item in sourceKind"
              :key="item"
              v-model="source"
              :label="item"
              :val="item"
            />
          </div>

          <div
            class="q-gutter-sm row"
            style="margin-left: 40%"
          >
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card>


      <q-card
        class="my-card q-pa-md"
        flat
        bordered
        style="height:400px;overflow-y: auto;width: 20%;margin-left: 20px"
      >
        <div style="font-size: 20px;margin-left: 5px;margin-top: 5px">
          高级检索使用方法:
        </div>
        <q-separator inset />
        <div style="color: #b2b2b2;font-size: small">
          <br>{{ introduction }}
        </div><br>
        <div>例如</div>
        <div style="white-space: pre-wrap;color: #b2b2b2;font-size: small">
          {{ example }}
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
    "name": "AdvancedSearch",

    data () {

        return {
            "list": ["主题", "篇关摘", "关键词", "篇名", "第一作者"],
            "which": ["精确", "模糊"],
            "with": ["AND", "OR", "NOT"],
            "from": ["总库", "中文", "外文"],
            "fromWhere": "总库",
            "condition": [
                { "searchBy": "主题", "whichOne": "精确", "isAccurate": true, "wayWith": "AND", "key": "", },
                { "searchBy": "作者", "whichOne": "精确", "isAccurate": true, "wayWith": "AND", "key": "", },
                { "searchBy": "文献来源", "whichOne": "精确", "isAccurate": true, "wayWith": "AND", "key": "", }
            ],
            "dateOption": [1915],
            "updateDateOption": ["今年迄今", "上一年度", "最近一年", "最近半年", "最近一月", "最近半月", "不限"],
            "updateDate": "不限",
            "beginDate": "",
            "endDate": "",
            "sourceKind": ["全部期刊", "SCI来源期刊", "EI来源期刊", "北大核心", "CSSCI", "CSCD"],
            "source": ["全部期刊"],
            "subjectList": [
                { "label": "基础科学", "value": "基础科学" },
                { "label": "工程科技I辑", "value": "工程科技I辑" },
                { "label": "工程科学II辑", "value": "工程科学II辑" },
                { "label": "农业科技", "value": "农业科技" },
                { "label": "医药卫生科技", "value": "医药卫生科技" },
                { "label": "哲学与人文科学", "value": "哲学与人文科学" },
                { "label": "社会科学I辑", "value": "社会科学I辑" },
                { "label": "社会科学II辑", "value": "社会科学II辑" },
                { "label": "信息科技", "value": "信息科技" },
                { "label": "经济与管理科学", "value": "经济与管理科学" }
            ],
            "subject": [],
            "expanded": false,
            "name": null,
            "age": null,
            "accept": false,
            "introduction": "高级检索支持使用运算符*、+、-、''、\"\"、()进行同一检索项内多个检索词的组合运算，检索框内输入的内容不得超过120个字符。输入运算符*(与)、+(或)、-(非)时，前后要空一个字节，优先级需用英文半角括号确定。若检索词本身含空格或*、+、-、()、/、%、=等特殊符号，进行多词组合运算时，为避免歧义，须将检索词用英文半角单引号或英文半角双引号引起来。",
            "example": "\n（1）题名检索项后输入：神经网络 * 自然语言，可以检索到题名包含“神经网络”及“自然语言”的文献。\n" +
        "\n" +
        "（2）主题检索项后输入：(锻造 + 自由锻) * 裂纹，可以检索到主题为“锻造”或“自由锻”，且有关“裂纹”的文献。\n" +
        "\n" +
        "（3）如果需检索题名包含“digital library”和“information service”的文献，在题名检索项后输入：'digital library' * 'information service'。\n" +
        "\n" +
        "（4）如果需检索题名包含“Fe-Cu”和“制备”的文献，在题名检索项后输入：'Fe-Cu' * 制备。"
        };

    },
    mounted () {

        console.log("hi");
        let i = 1916;
        while (i < 2022){

            this.dateOption.push(i);
            i += 1;

        }

    },
    "methods": {
        onItemClick (index, label, value) {

            if (label === "searchBy")
                this.condition[index].searchBy = value;
            else if (label === "wayWith")
                this.condition[index].wayWith = value;
            else {

                this.condition[index].isAccurate = value === "精确";
                this.condition[index].whichOne = value;

            }

        },
        addDomain (){

            this.condition.push({ "searchBy": "主题", "whichOne": "精确", "isAccurate": true, "wayWith": "AND", "key": "", });

        },
        delDomain (index){

            this.condition.splice(index, 1);

        },
        selectAll (){

            console.log(this.subject);
            /* for(let item of this.subjectList){
        if(this.subject.indexOf(item.value) !== -1)
          this.subject.push(item.value)
      }*/

        },
        onSubmit () {

            if (this.accept !== true) {

                this.$q.notify({
                    "color": "red-5",
                    "textColor": "white",
                    "icon": "warning",
                    "message": "You need to accept the license and terms first"
                });

            } else {

                this.$q.notify({
                    "color": "green-4",
                    "textColor": "white",
                    "icon": "cloud_done",
                    "message": "Submitted"
                });

            }

        },

        onReset () {

            this.name = null;
            this.age = null;
            this.accept = false;

        }
    }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 14px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #b2b2b2;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: none;
}

</style>

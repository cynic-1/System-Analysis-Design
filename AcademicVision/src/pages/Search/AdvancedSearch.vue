<template>
<!--  <NavBar></NavBar>-->
  <div
    class="row bg-white"
    style="min-height: 400px; width: 92%; padding: 24px;margin-left: 8%"
  >
    <div
      id="parent"
      class="fit row wrap justify-start items-start content-start"
      style="overflow: hidden;margin-top: 60px"
    >
      <q-card
        class="q-pa-md row"
        style="width: 66%; margin-left: 10px"
      >
<!--        <q-slide-transition>-->
<!--          <div v-show="expanded">-->
<!--            <q-card-section class=" text-black">-->
<!--              <div style="font-size: large">-->
<!--                文献分类-->
<!--              </div>-->
<!--              <div style="margin-top: 5px;margin-bottom: 5px">-->
<!--                <span style="text-align: right;color:#b2b2b2;font-size: small;cursor: pointer;">全选 </span>-->
<!--                <span-->
<!--                  style="text-align: right;color:#b2b2b2;font-size: small;cursor: pointer;"-->
<!--                  @click="subject = []"-->
<!--                > 清除</span>-->
<!--              </div>-->
<!--              <div style="width: 70px;font-size: 1px;">-->
<!--                <q-option-group-->
<!--                  v-model="subject"-->
<!--                  :options="subjectList"-->
<!--                  type="checkbox"-->
<!--                  dense-->
<!--                  size="xs"-->
<!--                />-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--            <q-separator vertical />-->
<!--          </div>-->
<!--        </q-slide-transition>-->

<!--        <q-btn-->
<!--          flat-->
<!--          :icon="expanded ? 'keyboard_arrow_left' : 'keyboard_arrow_right'"-->
<!--          size="xs"-->
<!--          style="height: 30px"-->
<!--          @click="expanded = !expanded"-->
<!--        />-->

        <q-form
          class="q-gutter-md rounded-borders"
          @submit="onSubmit"
          @reset="onReset"
          style="margin-left: 40px;width: 85%"
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
              style="margin-left: 10px;margin-right: 10px"
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

<!--            <q-btn-dropdown-->
<!--              :label="item.whichOne"-->
<!--              color="white"-->
<!--              style="width: 15%"-->
<!--              text-color="black"-->
<!--              stretch-->
<!--              flat-->
<!--            >-->
<!--              <q-list>-->
<!--                <q-item-->
<!--                  v-for="opt in which"-->
<!--                  :key="opt"-->
<!--                  v-close-popup-->
<!--                  clickable-->
<!--                  @click="onItemClick(index, 'which', opt)"-->
<!--                >-->
<!--                  <q-item-section>-->
<!--                    <q-item-label>{{ opt }}</q-item-label>-->
<!--                  </q-item-section>-->
<!--                </q-item>-->
<!--              </q-list>-->
<!--            </q-btn-dropdown>-->

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

<!--          <div-->
<!--            class="q-gutter-sm"-->
<!--            style="margin-left: 5%"-->
<!--          >-->
<!--            <span style="font-size: large">数据源:</span>-->
<!--            <q-radio-->
<!--              v-for="item in from"-->
<!--              :key="item"-->
<!--              v-model="fromWhere"-->
<!--              name="where"-->
<!--              :val="item"-->
<!--              :label="item"-->
<!--            />-->
<!--          </div>-->

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
<!--            <q-select-->
<!--              v-model="updateDate"-->
<!--              outlined-->
<!--              dense-->
<!--              :options="updateDateOption"-->
<!--              style="width: 20%;margin-left: 30px"-->
<!--              label="更新时间"-->
<!--            />-->
          </div>

          <div
            class="q-gutter-sm row"
            style="margin-left: 5%"
          >
            <span style="font-size: large;margin-right: 10px">文献种类:</span>
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
import NavBar from "components/NavBar";
export default {
    "name": "AdvancedSearch",
  components: {NavBar},
  data () {

        return {
            "list": ["篇名", "摘要", "关键词", "作者", "机构"],
            "which": ["精确", "模糊"],
            "with": ["AND", "NOT"],
            "from": ["总库", "中文", "外文"],
            "fromWhere": "总库",
            "condition": [
                { "searchBy": "篇名", "wayWith": "AND", "key": "", },
                { "searchBy": "关键词", "wayWith": "AND", "key": "", },
                { "searchBy": "作者", "wayWith": "AND", "key": "", },
            ],
            "dateOption": [1915],
            "updateDateOption": ["今年迄今", "上一年度", "最近一年", "最近半年", "最近一月", "最近半月", "不限"],
            "updateDate": "不限",
            "beginDate": "",
            "endDate": "",
            "sourceKind": ["全部", "图书书籍", "学位论文", "学术期刊"],
            "source": ["全部"],
            /*"subjectList": [
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
            "expanded": false,*/
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

            this.condition.push({ "searchBy": "篇名", "wayWith": "AND", "key": "", });

        },
        delDomain (index){
            if(index === 0)
              return alert("至少需要一个条件!")
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
          let s = ["","","","",""]
          let flag = [0,0,0,0,0]
          let index = 0
          let line = ""
          let key = ""
          for(let item of this.condition){
            if(item.searchBy === "摘要")
              index = 0
            else if(item.searchBy === "关键词")
              index = 1
            else if(item.searchBy === "篇名")
              index = 2
            else if(item.searchBy === "作者")
              index = 3
            else
              index = 4
            if(item.wayWith === "AND"){
              if(flag[index] !== -1){
                flag[index]  = 1;
                s[index] = s[index]==="" ? item.key : (s[index] + " " + item.key)
                if(index !== 4)
                  key = key === ""? item.key : (key + " " + item.key)
              }
              else
                return alert("同一个搜索字段在不同条件中不能既AND又NOT！")
            }
            else{
              if(flag[index] !== 1){
                flag[index]  = -1;
                s[index] = s[index]==="" ? item.key : (s[index] + " " + item.key)
              }
              else
                return alert("同一个搜索字段在不同条件中不能既AND又NOT！")
            }
          }
          index = 0
          for(let item in s){
            let symbol = flag[index] === -1?"-":"$"
            line += symbol + s[index] + "_"
            index++
          }
          let from = ""
          if(this.source.length === 0)
            from = "123"
          let source  = JSON.parse(JSON.stringify(this.source))
          //console.log(source)
          index = 0
          while(index < source.length){
            //console.log(source[index])
            if(source[index] === "全部"){
              from = "123"
              break
            }
            if(source[index] === "图书书籍")
              from += "1"
            else if (source[index] === "学位论文")
              from += "2"
            else if (source[index] === "学术期刊")
              from += "3"
            index++
          }
          line += "$" + from +"_"
          if(this.beginDate !== "" && this.endDate === "")
            this.endDate = "2021"
          if(this.beginDate === "" && this.endDate !== "")
            this.beginDate = "1915"
          line += "$" + this.beginDate + this.endDate
          console.log(line)
          console.log(key)
          this.$router.push({ "path": "/search", "query": { "line": line, "key": key, "method" : "2"} });
        },

        onReset () {
          this.condition = [
            { "searchBy": "篇名", "wayWith": "AND", "key": "", },
            { "searchBy": "关键词", "wayWith": "AND", "key": "", },
            { "searchBy": "作者", "wayWith": "AND", "key": "", },
          ]
          this.beginDate = ""
          this.endDate = ""
          this.source = ["全部"]

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

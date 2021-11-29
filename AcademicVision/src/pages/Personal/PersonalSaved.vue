<template>
  <div class="q-pa-md fit row wrap justify-evenly items-start content-start">
    <div class="col-grow q-pa-xl" style="overflow:auto;">
    <div class="q-pa-md" style="max-width: 200px;margin-left: 150px">
    <q-list bordered padding>
      <q-item>
        <q-item-section>
          <q-item-label style="text-align: center">收藏列表</q-item-label>
        </q-item-section>

      </q-item>

      <q-separator spaced />
      <q-tabs
        v-model="tab"
        vertical
      >
        <q-tab name="1" icon="camera" label="文 献 收 藏"/>
        <q-tab name="2" icon="assessment" label="知 贴 收 藏"/>
      </q-tabs>
    </q-list>
    </div>
    </div>
    <div class="gt-md q-pa-xl" style="overflow:auto;">
      <div class="q-pa-md" style="margin-right: 100px">
        <q-table
          v-if="tab==='1'"
          style="height: 400px;width: 800px"
          title="文献列表"
          :rows="rows1"
          :columns="columns1"
          row-key="index"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          :filter="filter1"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter1" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
              </q-td>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  <q-btn push color="white" text-color="primary" label="查看文献详细信息" @click="CheckDocument(props.row.name)"/>
                  <q-btn style="margin-left: 30px" color="primary" label="查看作者详细信息" @click="CheckWriter(props.row.name)"/>
                  <q-btn style="margin-left: 30px" color="red"  label="取消关注" @click="DeleteDocument(props.row.name)"/>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-table
          v-if="tab==='2'"
          style="height: 400px;width: 800px"
          title="知贴列表"
          :rows="rows2"
          :columns="columns2"
          row-key="index"
          virtual-scroll
          :pagination.sync="pagination2"
          :rows-per-page-options="[0]"
          :filter="filter2"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter2" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
              </q-td>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  <q-btn push color="white" text-color="primary" label="查看知贴详细信息" @click="CheckPost(props.row.name2)"/>
                  <q-btn style="margin-left: 30px" color="primary" label="查看作者详细信息" @click="CheckPostWriter(props.row.name2)"/>
                  <q-btn style="margin-left: 30px" color="red"  label="取消关注" @click="DeletePost(props.row.name2)"/>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
const columns1 = [
  {
    name: 'index',
    label: '#',
    field: 'index'
  },
  {
    name: 'name',
    required: true,
    label: '文献名称',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'writer', label: '作者', field: 'writer' },
  { name: 'view', align: 'center', label: '浏览次数', field: 'view', sortable: true },
  { name: 'cited', align: 'center',label: '被引次数', field: 'cited', sortable: true },
  { name: 'date', label: '发布日期', field: 'date' },
]

const seed = [
  {
    name: 'Frozen Yogurt',
    writer: '老王',
    view: 159,
    cited: 24,
    date: '2019-1-13',
  },
  {
    name: 'Ice cream sandwich',
    writer: 'hufkah',
    view: 14514,
    cited: 345,
    date: '2015-10-13',
  },
  {
    name: 'Eclair',
    writer: 'dddd',
    view: 495,
    cited: 34,
    date: '2019-1-13',
  },
  {
    name: 'Cupcake',
    writer: '老王',
    view: 159,
    cited: 24,
    date: '2019-1-13',
  },
  {
    name: 'Gingerbread',
    writer: '老王',
    view: 159,
    cited: 24,
    date: '2019-1-13',
  },
  {
    name: 'Jelly bean',
    writer: 'hkc',
    view: 2221,
    cited: 444,
    date: '2019-1-13',
  },
  {
    name: 'Lollipop',
    writer: '刘子',
    view: 4241,
    cited: 22,
    date: '2002-9-15',
  },
  {
    name: 'Honeycomb',
    writer: 'ss',
    view: 2334,
    cited: 55,
    date: '2020-1-13',
  },
  {
    name: '数据库',
    writer: '黄坚',
    view: 2321,
    cited: 425,
    date: '2019-1-13',
  },
  {
    name: '算法导论',
    writer: '宋友',
    view: 6615,
    cited: 84,
    date: '2012-4-13',
  },
  {
    name: 'KitKat',
    writer: '张三',
    view: 6126,
    cited: 223,
    date: '2017-2-13',
  }
]

let rows1 = []
rows1 = rows1.concat(seed.slice(0).map(r => ({ ...r })))
rows1.forEach((row, index) => {
  row.index = index+1
})
const columns2 = [
  {
    name: 'index',
    label: '#',
    field: 'index'
  },
  {
    name: 'name2',
    required: true,
    label: '帖子主题',
    align: 'left',
    field: row => row.name2,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'writer2', label: '作者', field: 'writer2' },
  { name: 'view2', align: 'center', label: '浏览次数', field: 'view2', sortable: true },
  { name: 'like', align: 'center',label: '获赞数', field: 'like', sortable: true },
  { name: 'date2', label: '发布日期', field: 'date2' },
]

const seed2 = [
  {
    name2: '爱情来的太快就像龙卷风',
    writer2: '周杰伦',
    view2: 159,
    like: 24,
    date2: '2009-1-13',
  },
  {
    name2: 'Ice cream sandwich',
    writer2: 'hufkah',
    view2: 14514,
    like: 345,
    date2: '2015-10-13',
  },
  {
    name2: 'Eclair',
    writer2: 'dddd',
    view2: 495,
    like: 34,
    date2: '2019-1-13',
  },
  {
    name2: 'Cupcake',
    writer2: '老王',
    view2: 159,
    like: 24,
    date2: '2019-1-13',
  },
  {
    name2: 'Jelly bean',
    writer2: 'hkc',
    view2: 2221,
    like: 444,
    date2: '2019-1-13',
  },
  {
    name2: 'Lollipop',
    writer2: '刘子',
    view2: 4241,
    like: 22,
    date2: '2002-9-15',
  },
  {
    name2: 'Honeycomb',
    writer2: 'ss',
    view2: 2334,
    like: 55,
    date2: '2020-1-13',
  },
  {
    name2: '数据库',
    writer2: '黄坚',
    view2: 2321,
    like: 425,
    date2: '2019-1-13',
  },
  {
    name2: '算法导论',
    writer2: '宋友',
    view2: 6615,
    like: 84,
    date2: '2012-4-13',
  },
  {
    name2: 'KitKat',
    writer2: '张三',
    view2: 6126,
    like: 223,
    date2: '2017-2-13',
  }
]

let rows2 = []
rows2 = rows2.concat(seed2.slice(0).map(r => ({ ...r })))
rows2.forEach((row, index) => {
  row.index = index+1
})
export default {
  name: "PersonalSaved",
  setup(){
    return{
      filter1: ref(''),
      filter2: ref(''),
      rows1,
      columns1,
      rows2,
      columns2,

    }
  },

  data() {
    return {
      tab: "1",
      pagination: ref({
        rowsPerPage: 0
      }),
      pagination2: ref({
        rowsPerPage: 0
      }),
    }
  },
  methods: {
    CheckDocument(name){

    },
    CheckWriter(name){

    },
    DeleteDocument(name){

    },
    CheckPost(name){

    },
    CheckPostWriter(name){

    },
    DeletePost(name){

    },
  },
}
</script>

<style lang="sass">

</style>

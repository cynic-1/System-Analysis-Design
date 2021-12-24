<template>
  <left-drawer>
    <template #leftDrawer>
      <q-card>
        <div class="q-pa-md text-h5 text-center">
          管 理 列 表
        </div>
        <q-separator/>
        <q-expansion-item
          expand-separator
          :header-inset-level="1"
          icon="help_center"
          class="text-grey-6 q-py-md"
          label="举报处理"
        >
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
              ripple="false"
              name="1"
              icon="help_center"
              label="帖子举报"
              content-class="q-py-md"
            />
            <q-tab
              ripple="false"
              name="2"
              icon="help_center"
              label="评论举报"
              content-class="q-py-md"
            />
            <q-tab
              ripple="false"
              name="3"
              icon="help_center"
              label="科研认证举报"
              content-class="q-py-md"
            />
          </q-tabs>
        </q-expansion-item>
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
            ripple="false"
            name="4"
            icon="person"
            label="账号管理"
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
      <q-card style="height: 600px">
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
            <q-separator/>
            <br>
            <div v-if="item.name==='1'&& this.rows1.length!==0">
              <q-table
                v-model:pagination="pagination"
                style="height:450px;width: 100%"
                title="举报列表"
                :rows="rows1"
                :columns="columns1"
                virtual-scroll
                row-key="report_id"
                :rows-per-page-options="[0]"
                :filter="filter1"
              >
                <template #top-right>
                  <q-input
                    v-model="filter1"
                    borderless
                    dense
                    debounce="300"
                    placeholder="Search"
                  >
                    <template #append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </template>

                <template #header="props">
                  <q-tr :props="props">
                    <q-th auto-width/>
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>

                <template #body="props">
                  <q-tr :props="props">
                    <q-td auto-width>
                      <q-btn
                        size="sm"
                        color="primary"
                        round
                        dense
                        @click="props.expand = !props.expand"
                        :icon="props.expand ? 'remove' : 'add'"
                      />
                    </q-td>
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      <span v-if="col.name !== 'operation'">{{ col.value }}</span>
                      <span v-else>
                        <q-btn flat color="primary"
                               @click="gotoCheckPost(props.row.post_id,props.row.user_id_r)">前往查看</q-btn>
                        <q-btn-dropdown flat color="red" style="left: 18px" label="处理举报" dropdown-icon="change_history">
                          <q-list>
                            <q-item clickable v-close-popup @click="deletePost(props.row.report_id)">
                              <q-item-section>
                                <q-item-label>删除帖子</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="deletePostReport(props.row.report_id)">
                              <q-item-section>
                                <q-item-label>举报无效</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown>
                      </span>
                    </q-td>
                  </q-tr>
                  <q-tr
                    v-show="props.expand"
                    :props="props"
                  >
                    <q-td colspan="100%">
                      <div class="text-left">
                        举报原因: {{ props.row.reason }}
                      </div>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
            <div v-if="item.name==='1' && this.rows1.length===0">
              <span style="font-size: 50px;font-weight: bold;color: #7f7f7f;margin-left: auto;margin-right: auto;margin-top: 80px">暂无数据</span>
            </div>
            <div v-if="item.name==='2'&& this.rows2.length!==0">
              <q-table
                v-model:pagination="pagination2"
                style="height:450px;width: 100%"
                title="举报列表"
                :rows="rows2"
                :columns="columns2"
                virtual-scroll
                row-key="report_id"
                :rows-per-page-options="[0]"
                :filter="filter2"
              >
                <template #top-right>
                  <q-input
                    v-model="filter2"
                    borderless
                    dense
                    debounce="300"
                    placeholder="Search"
                  >
                    <template #append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </template>

                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th auto-width/>
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
                      <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand"
                             :icon="props.expand ? 'remove' : 'add'"/>
                    </q-td>
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      <span v-if="col.name !== 'operation'">{{ col.value }}</span>
                      <span v-else>
                        <q-btn flat color="primary"
                               @click="gotoCheckPost(props.row.post_id,props.row.user_id_r)">前往查看</q-btn>
                        <q-btn-dropdown flat color="red" style="left: 18px" label="处理举报" dropdown-icon="change_history">
                          <q-list>
                            <q-item clickable v-close-popup @click="deleteComment(props.row.report_id)">
                              <q-item-section>
                                <q-item-label>删除评论</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="deleteCommentReport(props.row.report_id)">
                              <q-item-section>
                                <q-item-label>举报无效</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown>
                      </span>
                    </q-td>
                  </q-tr>
                  <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                      <div class="text-left">举报原因: {{ props.row.reason }}</div>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>

            </div>
            <div v-if="item.name==='2' && this.rows2.length===0">
              <span style="font-size: 50px;font-weight: bold;color: #7f7f7f;margin-left: auto;margin-right: auto;margin-top: 80px">暂无数据</span>
            </div>

            <div v-if="item.name==='3'&& this.rows3.length!==0">
              <q-table
                v-model:pagination="pagination3"
                style="height:450px;width: 100%"
                title="举报列表"
                :rows="rows3"
                :columns="columns3"
                virtual-scroll
                row-key="report_id"
                :rows-per-page-options="[0]"
                :filter="filter3"
              >
                <template #top-right>
                  <q-input
                    v-model="filter3"
                    borderless
                    dense
                    debounce="300"
                    placeholder="Search"
                  >
                    <template #append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </template>

                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th auto-width/>
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
                      <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand"
                             :icon="props.expand ? 'remove' : 'add'"/>
                    </q-td>
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      <span v-if="col.name !== 'operation'">{{ col.value }}</span>
                      <span v-else>
                        <q-btn flat color="primary" @click="gotoCheckUser(props.row.author_user)">前往查看</q-btn>
                        <q-btn-dropdown flat color="red" style="left: 18px" label="处理举报" dropdown-icon="change_history">
                          <q-list>
                            <q-item clickable v-close-popup @click="deleteAuthor(props.row.report_id)">
                              <q-item-section>
                                <q-item-label>删除科研认证</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="deleteAuthorReport(props.row.report_id)">
                              <q-item-section>
                                <q-item-label>举报无效</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown>
                      </span>
                    </q-td>
                  </q-tr>
                  <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                      <div class="text-left">举报原因: {{ props.row.reason }}</div>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
            <div v-if="item.name==='3' && this.rows3.length===0">
              <span style="font-size: 50px;font-weight: bold;color: #7f7f7f;margin-left: auto;margin-right: auto;margin-top: 80px">暂无数据</span>
            </div>
            <div v-if="item.name==='4'">
              <q-table
                v-model:pagination="pagination4"
                style="height:450px;width: 100%"
                title="账号列表"
                :rows="rows4"
                :columns="columns4"
                virtual-scroll
                row-key="id"
                :rows-per-page-options="[0]"
                :filter="filter4"
              >
                <template #top-right>
                  <q-input
                    v-model="filter4"
                    style="margin-right: 80px"
                    borderless
                    dense
                    debounce="300"
                    placeholder="Search"
                  >
                    <template #append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                  <q-btn
                    color="primary"
                    @click="alert = true"
                  >
                    创建账号
                  </q-btn>
                </template>

                <template #body-cell-operation="props">
                  <q-td :props="props">
                    <q-btn flat color="primary" @click="gotoCheckUser(props.row.user_id)">查看</q-btn>
                    <q-btn flat color="red" @click="deleteuser(props.row.user_id)">封禁账号</q-btn>
                  </q-td>
                </template>
              </q-table>
            </div>
            <div v-if="item.name==='3'"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </template>
  </left-drawer>
  <q-dialog v-model="alert">
    <q-card style="width: 650px;height: 520px;padding: 30px 30px;">
      <q-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <q-icon
          size="70px"
          name="person_add"
          style="left: 200px"
        />
        <br>
        <div>
          <q-input
            v-model="id"
            :rules="idRules"
            label="用户名"
            required
          />

          <q-input
            v-model="password"
            :rules="passwordRules"
            label="密码"
            required
          />

          <q-input
            v-model="rePassword"
            :rules="rePasswordRules"
            label="确认密码"
            required
          />

          <q-input
            v-model="Email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <q-btn
            :disabled="!valid"
            class="button"
            large
            style="left: 180px;"
            href="/Login"
            @click="Register"
          >
            <p class="login_">
              创建用户
            </p>
          </q-btn>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="toolbar">
    <q-card style="height: 150px;width: 350px">
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
        </q-avatar>

        <q-toolbar-title><span class="text-weight-bold" style="font-size: 25px">管理员</span><span style="font-size: 25px">信息提示</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup/>
      </q-toolbar>

      <q-card-section>
        <span style="font-size: 20px">举报处理成功</span>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="toolbar1">
    <q-card style="height: 150px;width: 350px">
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
        </q-avatar>

        <q-toolbar-title><span class="text-weight-bold" style="font-size: 25px">管理员</span><span style="font-size: 25px">信息提示</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup/>
      </q-toolbar>

      <q-card-section>
        <span style="font-size: 20px">创建成功</span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineAsyncComponent, ref} from "vue";

const leftDrawer = defineAsyncComponent(() => import("../../layouts/LeftDrawer"));

const columns1 = [
  {
    "name": "report_id",
    "label": "编号",
    "field": "report_id"
  },

  {"name": "user_name_r", "align": "center", "label": "被举报用户", "field": "user_name_r"},
  {"name": "user_name", "align": "center", "label": "举报用户", "field": "user_name"},
  {"name": "time", "align": "center", "label": "举报日期", "field": "time"},
  {"name": "operation", "align": "center", "label": "操作", "field": "operation"},
];
const columns2 = [
  {
    "name": "report_id",
    "label": "编号",
    "field": "report_id"
  },

  {"name": "user_name_r", "align": "center", "label": "被举报用户", "field": "user_name_r"},
  {"name": "user_name", "align": "center", "label": "举报用户", "field": "user_name"},
  {"name": "time", "align": "center", "label": "举报日期", "field": "time"},
  {"name": "operation", "align": "center", "label": "操作", "field": "operation"},
];
const columns3 = [
  {
    "name": "report_id",
    "label": "编号",
    "field": "report_id"
  },

  {"name": "author_name", "align": "center", "label": "被举报门户", "field": "author_name"},
  {"name": "user_name", "align": "center", "label": "举报用户", "field": "user_name"},
  {"name": "time", "align": "center", "label": "举报日期", "field": "time"},
  {"name": "operation", "align": "center", "label": "操作", "field": "operation"},
];
const columns4 = [
  {
    "name": "user_id",
    "label": "编号",
    "field": "user_id"
  },
  {"name": "user_name", "align": "center", "label": "昵称", "field": "user_name"},
  {"name": "email", "align": "center", "label": "邮箱", "field": "email"},
  {"name": "operation", "align": "center", "label": "操作", "field": "operation"},
];
export default {
  "name": "Administrator",
  "components": {
    leftDrawer
  },
  setup() {
    return {
      "filter1": ref(""),
      "filter2": ref(""),
      "filter3": ref(""),
      "filter4": ref(""),
      alert: ref(false),
    };
  },
  data() {

    return {
      toolbar: false,
      toolbar1: false,
      rows1: [],
      columns1,
      rows2: [],
      columns2,
      rows3: [],
      columns3,
      rows4: [],
      columns4,
      "tab": "4",
      "pagination": ref({
        "rowsPerPage": 0
      }),
      "pagination2": ref({
        "rowsPerPage": 0
      }),
      "pagination3": ref({
        "rowsPerPage": 0
      }),
      "pagination4": ref({
        "rowsPerPage": 0
      }),
      "tabsList": [
        {"name": "1", "icon": "help_center", "label": "帖子举报"},
        {"name": "2", "icon": "help_center", "label": "评论举报"},
        {"name": "3", "icon": "help_center", "label": "科研认证举报"},
        {"name": "4", "icon": "person", "label": "账号管理"},
      ],
      "reportList": [],
      "valid": true,
      "id": "",
      "idRules": [(v) => !!v || "ID is required"],
      "password": "",
      "passwordRules": [(v) => !!v || "Password is required"],
      "rePassword": "",
      "rePasswordRules": [
        v => !!v || "Password is required",
        v => v === this.password || "Not equle",
      ],
      "Email": "",
      "emailRules": [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  "mounted": function () {
    this.loadUserTable();
    this.loadPostTable();
    this.loadCommentTable();
    this.loadAuthorTable();
  },
  methods: {
    loadPostTable() {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/get_report_post/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {},
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.data.post_reported_list)
        let info = res.data.data.post_reported_list;
        this.rows1 = info;
        // if(info.briefintroduction !== null)
        //   this.Form.briefintroduction = info.briefintroduction;
      })
    },
    loadCommentTable() {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/get_report_comment/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {},
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.data.comment_reported_list)
        let info = res.data.data.comment_reported_list;
        this.rows2 = info;
        // if(info.briefintroduction !== null)
        //   this.Form.briefintroduction = info.briefintroduction;
      })
    },
    loadUserTable() {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/alluser/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {},
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.list_user)
        let info = res.data.list_user;
        this.rows4 = info;
        // if(info.briefintroduction !== null)
        //   this.Form.briefintroduction = info.briefintroduction;
      })
    },
    loadAuthorTable() {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/get_report_author/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {},
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.data)
        let info = res.data.data.author_reported_list;
        this.rows3 = info;
        // if(info.briefintroduction !== null)
        //   this.Form.briefintroduction = info.briefintroduction;
      })
    },
    deleteAuthor(reportid) {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/handle_report_author/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          report_id: reportid,
          type: 1,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.code);
        this.loadAuthorTable();
        this.toolbar = true;
      })
      this.loadAuthorTable();
    },
    deleteAuthorReport(reportid) {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/handle_report_author/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          report_id: reportid,
          type: 2,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.code);
        this.loadAuthorTable();
        this.toolbar = true;

      })
      this.loadAuthorTable();
    },
    gotoCheckPost(postid, userid) {
      console.log(userid)
      console.log(postid)
      this.$router.push({
        "path": "/posts/view",
        "query": {
          "user_id": userid,
          "post_id": postid,
        }
      })
    },
    gotoCheckUser(userid) {
      console.log(userid)
      window.sessionStorage.setItem('otherpersonid', userid);
      this.$router.push({
        "path": "/otherpersonal",
      })
    },
    deletePost(reportid) {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/handle_report_post/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          report_id: reportid,
          type: 1,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.code);
        this.loadPostTable();
        this.toolbar = true;

      })
      this.loadPostTable();
    },
    deletePostReport(reportid) {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/handle_report_post/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          report_id: reportid,
          type: 2,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.code);
        this.loadPostTable();
        this.toolbar = true;

      })
      this.loadPostTable();
    },
    deleteComment(reportid) {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/handle_report_comment/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          report_id: reportid,
          type: 1,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.code);
        this.loadCommentTable();
        this.toolbar = true;

      })
      this.loadCommentTable();
    },
    deleteCommentReport(reportid) {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/handle_report_comment/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          report_id: reportid,
          type: 2,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.code);
        this.loadCommentTable();
        this.toolbar = true;

      })
      this.loadCommentTable();
    },
    Register() {
      this.validate();
      this.$axios({
        method: 'POST',
        url: 'http://114.116.235.94/register/',
        data: {
          user: this.id,
          pass1: this.password,
          pass2: this.rePassword,
          Email: this.Email
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(response => {
        console.log("注册", response)
        if (response.data.code === "200") {
          this.loadUserTable();
          // alert("创建成功");
          this.toolbar1 = true;
          this.alert = false;
          this.id = "";
          this.password = "";
          this.rePassword = "";
          this.Email = "";
        } else if (response.data.code === "0") {
          alert(response.data.message);
          this.clear();
        }
      })
    },
    validate() {
      this.$refs.form.validate();
    },
    deleteuser(id) {
      this.$axios({
        method: "post",
        url: "http://114.116.235.94/ban_user/",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          user_id: id,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res.data.code);
        this.loadUserTable();
        this.toolbar = true;

      })
      this.loadUserTable();
    },

  }
};
</script>

<style lang="sass" scoped>
.report-card
  width: 100%
  width: 215px
  height: 170px

.login_
  font-size: 20px
  margin-top: 15px

</style>

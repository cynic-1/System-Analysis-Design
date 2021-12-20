<template>
  <left-drawer>
    <template #leftDrawer>
      <q-card>
        <div class="q-pa-md text-h5 text-center">
          管 理 列 表
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
            <q-separator />
            <br>
            <div v-if="item.name==='1'">
              <!--              <div class="q-pa-md row items-start q-gutter-md">-->
              <!--                <div v-for="test in reportList"-->
              <!--                     :key="test">-->
              <!--                  <q-card class="report-card">-->
              <!--                    <q-card-section>-->
              <!--                      <q-scroll-area-->
              <!--                        :thumb-style="thumbStyle"-->
              <!--                        :bar-style="barStyle"-->
              <!--                        style="height: 90px; max-width: 200px;"-->
              <!--                      >-->
              <!--                        <div class="text-subtitle2">类型：{{test.type}}</div>-->
              <!--                        <div class="text-subtitle2">被举报用户：{{test.writer}}</div>-->
              <!--                        <div class="text-subtitle2">举报用户：{{test.reporter}}</div>-->
              <!--                        <div class="text-subtitle2">举报原因：{{test.reason}}</div>-->
              <!--                      </q-scroll-area>-->
              <!--                    </q-card-section>-->

              <!--                    <q-separator />-->

              <!--                    <q-card-actions>-->
              <!--                      <q-btn flat color="primary" @click="gotocheck">前往查看</q-btn>-->
              <!--                      <q-btn-dropdown flat color="red" style="left: 18px" label="处理举报" dropdown-icon="change_history">-->
              <!--                        <q-list>-->
              <!--                          <q-item clickable v-close-popup @click="onItemClick">-->
              <!--                            <q-item-section>-->
              <!--                              <q-item-label>删除{{test.type}}</q-item-label>-->
              <!--                            </q-item-section>-->
              <!--                          </q-item>-->

              <!--                          <q-item clickable v-close-popup @click="onItemClick">-->
              <!--                            <q-item-section>-->
              <!--                              <q-item-label>举报无效</q-item-label>-->
              <!--                            </q-item-section>-->
              <!--                          </q-item>-->

              <!--                        </q-list>-->
              <!--                      </q-btn-dropdown>-->
              <!--                    </q-card-actions>-->
              <!--                  </q-card>-->
              <!--                </div>-->
              <!--              </div>-->
              <q-table
                v-model:pagination="pagination"
                style="height:450px;width: 100%"
                title="举报列表"
                :rows="rows1"
                :columns="columns1"
                virtual-scroll
                row-key="id"
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
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template #header="props">
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
                        <q-btn
                          flat
                          color="primary"
                          @click="gotocheck"
                        >前往查看</q-btn>
                        <q-btn-dropdown
                          flat
                          color="red"
                          style="left: 18px"
                          label="处理举报"
                          dropdown-icon="change_history"
                        >
                          <q-list>
                            <q-item
                              clickable
                              v-close-popup
                              @click="onItemClick"
                            >
                              <q-item-section>
                                <q-item-label>删除{{ props.row.type }}</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              @click="onItemClick"
                            >
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
            <div v-if="item.name==='2'">
              <q-table
                v-model:pagination="pagination2"
                style="height:450px;width: 100%"
                title="账号列表"
                :rows="rows2"
                :columns="columns2"
                virtual-scroll
                row-key="id"
                :rows-per-page-options="[0]"
                :filter="filter2"
              >
                <template #top-right>
                  <q-input
                    v-model="filter2"
                    style="margin-right: 80px"
                    borderless
                    dense
                    debounce="300"
                    placeholder="Search"
                  >
                    <template #append>
                      <q-icon name="search" />
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
                    <q-btn
                      flat
                      color="primary"
                      @click="gotocheck(props.rows.id)"
                    >
                      查看
                    </q-btn>
                    <q-btn
                      flat
                      color="red"
                      @click="deleteuser(props.rows.id)"
                    >
                      删除
                    </q-btn>
                  </q-td>
                </template>
              </q-table>
            </div>
            <div v-if="item.name==='3'" />
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
        /><br>
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
            @click="validate"
          >
            <p class="login_">
              创建用户
            </p>
          </q-btn>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";

const leftDrawer = defineAsyncComponent(() => import("../../layouts/LeftDrawer"));

const columns1 = [
    {
        "name": "id",
        "label": "编号",
        "field": "id"
    },
    {
        "name": "type",
        "required": true,
        "label": "类型",
        "align": "center",
        "field": row => row.type,
        "format": val => `${val}`,
        "sortable": true
    },
    { "name": "writer", "align": "center", "label": "被举报用户", "field": "writer" },
    { "name": "reporter", "align": "center", "label": "举报用户", "field": "reporter" },
    { "name": "date", "align": "center", "label": "举报日期", "field": "date" },
    { "name": "operation", "align": "center", "label": "操作", "field": "operation" },
];
const seed = [
    { "id": "1", "type": "帖子", "reason": "内容涉嫌违法", "reporter": "小王", "writer": "老张", "date": "2021-12-10" },
    { "id": "2", "type": "文献", "reason": "我也不知道为什么要举报，不过为了测试就随便举报一下吧", "reporter": "小王", "writer": "老王", "date": "2021-12-11" },
    { "id": "3", "type": "评论", "reason": "内容涉嫌违法", "reporter": "小王", "writer": "老张", "date": "2021-12-9" },
    { "id": "4", "type": "科研认证", "reason": "我才是该门户的主人，此人盗用我的账户", "reporter": "小王", "writer": "大黄", "date": "2021-12-13" },
];
let rows1 = [];
rows1 = rows1.concat(seed.slice(0).map(r => ({ ...r })));
rows1.forEach((row, index) => {

    row.index = index + 1;

});

const columns2 = [
    {
        "name": "id",
        "label": "编号",
        "field": "id"
    },
    {
        "name": "account",
        "required": true,
        "label": "账号",
        "align": "center",
        "field": row => row.account,
        "format": val => `${val}`,
        "sortable": true
    },
    { "name": "nickname", "align": "center", "label": "昵称", "field": "nickname" },
    { "name": "e-mail", "align": "center", "label": "邮箱", "field": "e-mail" },
    { "name": "date2", "align": "center", "label": "创建日期", "field": "date2" },
    { "name": "operation", "align": "center", "label": "操作", "field": "operation" },
];
const seed2 = [
    { "id": "1", "account": "hkc123456", "e-mail": "123456@qq.com", "nickname": "小王", "date2": "2021-12-10" },
    { "id": "2", "account": "syx123456", "e-mail": "123456@163.com", "nickname": "老张", "date2": "2021-12-11" },
    { "id": "3", "account": "gy123456", "e-mail": "123456@buaa.edu.cn", "nickname": "hhh", "date2": "2021-12-9" },
    { "id": "4", "account": "jxh123456", "e-mail": "123456@qq.com", "nickname": "大黄", "date2": "2021-12-13" },
];
let rows2 = [];
rows2 = rows2.concat(seed2.slice(0).map(r => ({ ...r })));
rows2.forEach((row, index) => {

    row.index = index + 1;

});

export default {
    "name": "Administrator",
    "components": {
        leftDrawer
    },
    setup (){

        return {
            "filter1": ref(""),
            rows1,
            columns1,
            "filter2": ref(""),
            rows2,
            columns2,
            "alert": ref(false),
        };
    
    },
    data () {

        return {
            "tab": "1",
            "pagination": ref({
                "rowsPerPage": 0
            }),
            "pagination2": ref({
                "rowsPerPage": 0
            }),
            "tabsList": [
                { "name": "1", "icon": "help_center", "label": "举报处理" },
                { "name": "2", "icon": "person", "label": "账号管理" },
                { "name": "3", "icon": "description", "label": "数据库管理" },
            ],
            "reportList": [
                { "type": "帖子", "reason": "内容涉嫌违法", "reporter": "小王", "writer": "老张", },
                { "type": "文献", "reason": "我也不知道为什么要举报，不过为了测试就随便举报一下吧", "reporter": "小王", "writer": "老王", },
                { "type": "评论", "reason": "内容涉嫌违法", "reporter": "小王", "writer": "老张", },
                { "type": "科研认证", "reason": "我才是该门户的主人，此人盗用我的账户", "reporter": "小王", "writer": "大黄", },
            ],
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
    "methods": {
        gotocheck (id){

        },
        deleteuser (id){

        },
        validate () {

            this.$refs.form.validate();

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

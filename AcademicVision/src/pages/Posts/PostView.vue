<template>
  <!--查看帖子页面-->
  <br>
  <div style="background: lightgray;padding-top: 10px;padding-bottom: 10px;max-width: 1000px;margin: 0 auto">
    <h3 style="text-align: center;margin-bottom: 10px;margin-top: 10px">帖子标题</h3>
    <h5 style="text-align: center;margin-top: 10px;margin-bottom: 10px">
      <q-icon name="account_circle" color="blue-6"></q-icon>
      作者
    </h5>
    <h6 style="text-align: center;margin-top: 10px;margin-bottom: 0">
      <q-icon name="watch_later" color="blue-6"></q-icon>
      2021/11/11
    </h6>
  </div>
  <br>
  <div style="margin-left: 100px;margin-right: 100px" v-html="context" class="context">
  </div>

  <br>
  <q-separator inset />
  <h4 style="float: left;margin-top: 20px;margin-left: 150px"><q-icon name="textsms" color="blue-6"></q-icon> 写下您的评论</h4>

  <div style="margin: 0 auto">
    <div class="q-pa-md" style="max-width: 600px;margin: 0 auto">
      <q-input
        v-model="text"
        filled
        type="textarea"
      />
    </div>
  </div>
</template>

<script>
import * as res from "core-js";

export default {
  name: "PostView",

  data() {
    return {
      text: '',
      context: 'Before\n' +
        '1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '4. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '5. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '6. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '7. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '8. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '9. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '10. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n'
    }
  },

  methods: {
    change() {
      this.context = this.context.replace(/\n/g, '<br>')

    }

  },

  mounted() {
    this.context = this.context.replace(/\n/g, '<br>')
  }
}
</script>

<style scoped>

</style>

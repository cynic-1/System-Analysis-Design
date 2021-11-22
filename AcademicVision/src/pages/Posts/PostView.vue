<template>
  <!--查看帖子页面-->
  <br>
  <PostDrawer @click="back"></PostDrawer>
  <div>
    <q-card style="background: lightskyblue;padding-top: 10px;padding-bottom: 10px;max-width: 1200px;margin: 0 auto">
      <h3 style="text-align: center;margin-bottom: 10px;margin-top: 10px">帖子标题</h3>
      <h5 style="text-align: center;margin-top: 10px;margin-bottom: 10px">
        <q-icon name="account_circle" color="blue-6"></q-icon>
        作者&nbsp&nbsp&nbsp
        <q-icon name="watch_later" color="blue-6"></q-icon>
        2021/11/11
      </h5>
    </q-card>
    <br>
    {{ context }}
    <div style="margin-left: 200px;margin-right: 200px;" v-html="context" class="test">
    </div>

    <br><br><br>
    <q-separator inset/>
    <br>
    <h4 style="float: left;margin-top: 20px;margin-left: 120px;margin-bottom: 20px">
      <q-icon name="textsms" color="blue-6"></q-icon>
      写下您的评论&nbsp
    </h4>

    <div class="q-pa-md" style="max-width: 1000px;float: right;margin-right: 100px">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <q-input
          v-model="text"
          filled
          type="textarea"
          clearable
          hint="评论字数上限200字"
          label="写一条友善的评论吧~"
          ref="text"
          lazy-rules
          style="float: right;width: 1000px;font-size: 20px"

          :rules="[ val => val && val.length > 0 || '请您输入评论内容',
        val => val && val.length <= 200 || '评论过长']"></q-input>
        <q-btn :loading="loading1" color="blue-6" @click="simulateProgress(1)"
               style="float: left;margin-left: 0;margin-bottom: 0" size="18px" type="submit" ref="name">
          评&nbsp&nbsp&nbsp论
        </q-btn>
        <q-btn label="Reset" type="reset" color="primary" size="18px" flat class="q-ml-sm"/>
      </form>
      <q-dialog v-model="alert">
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">恭喜您</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            提交成功
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="q-pa-md row justify-center" style="width: 1300px;margin-left: 150px">
      <div style="width: 100%; max-width: 1200px" v-for="comment in comments.slice(left,right)">
        <q-chat-message
          :name="comment.name"
          :avatar="comment.avatar"
          :text="[comment.text]"
          :stamp="comment.stamp"
          style="font-size: 23px;width: 1100px"
          bg-color="blue-2"
        />
        <br>
        <div style="float: right;margin-right: 100px">
          &nbsp
          <q-btn icon="thumb_up_off_alt" round size="10px" @click="good(comment.cid)" style="color: deepskyblue"
                 v-show="!comment.isgood"></q-btn>
          <q-btn icon="thumb_up_alt" round color="blue" size="10px" @click="bad(comment.cid)"
                 v-show="comment.isgood"></q-btn>
          &nbsp
          <span>({{ comment.goodnumber }})</span>
          &nbsp
          <q-btn icon="error_outline" round size="10px" style="color: red" @click="prompt = true"></q-btn>
        </div>
        <br><br>
        <q-separator inset style="width: 1200px"/>
        <br>
        <q-dialog v-model="prompt" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">举报理由</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="reason" autofocus @keyup.enter="prompt = false"/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="取消" v-close-popup/>
              <q-btn flat label="举报" v-close-popup @click="jubao(comment.cid)"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>


    <div class="q-pa-lg flex flex-center" style="width: 1000px;margin: 0 auto">
      <q-pagination
        v-model="current"
        color="blue-6"
        :max="length"
        :max-pages="6"
        :boundary-numbers="false"
        @click="left = (current - 1) * 5;right = 5 + (current - 1) * 5"
      />
    </div>

  </div>

</template>

<script>
import PostDrawer from "components/Posts/PostDrawer";
import {marked} from 'marked'

const rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});//基本设置
export default {
  name: "PostView",

  components: {
    PostDrawer,
  },

  data() {
    return {
      prompt: false,
      reason: '',
      length: 0,
      isgood: false,
      current: 1,
      alert: false,
      loading1: false,
      text: '',
      accept: true,
      context: 'Before\n' +
        '1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '4. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '> 5. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n' +
        '### 6. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.\n',
      comments: [{
        name: '周杰伦',
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2485887168-197F1658E5C35C7917B991AB1E993AA8%2F0%3Ffmt%3Djpg%26size%3D246%26h%3D900%26w%3D900%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640135843&t=de793e46679e21a08c9fc364633089a6',
        text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
        stamp: '2021/6/10',
        goodnumber: 300,
        isgood: true,
        cid: 1,
      },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 299,
          isgood: false,
          cid: 2,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 298,
          isgood: false,
          cid: 3,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 4,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 5,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 6,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 7,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 8,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 9,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 10,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 11,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 12,
        }, {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 13,
        }, {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 14,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 15,
        },
        {
          name: '周杰伦',
          avatar: 'https://img2.baidu.com/it/u=4107644900,2951709340&fm=26&fmt=auto',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 297,
          isgood: true,
          cid: 16,
        }, {
          name: '周杰伦',
          avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2485887168-197F1658E5C35C7917B991AB1E993AA8%2F0%3Ffmt%3Djpg%26size%3D246%26h%3D900%26w%3D900%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640135843&t=de793e46679e21a08c9fc364633089a6',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 300,
          isgood: true,
          cid: 17,
        }, {
          name: '周杰伦',
          avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2485887168-197F1658E5C35C7917B991AB1E993AA8%2F0%3Ffmt%3Djpg%26size%3D246%26h%3D900%26w%3D900%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640135843&t=de793e46679e21a08c9fc364633089a6',
          text: '这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦这里是一条评论，哎呦不错哦',
          stamp: '2021/6/10',
          goodnumber: 300,
          isgood: true,
          cid: 18,
        }


      ],
      left: 0,
      right: 5,
    }
  },

  computed: {
    markdownToHtml() {
      this.context = marked(this.context)
    }
  },

  methods: {
    back() {
      this.$router.back();
    },
    jubao(cid) {
      //举报axios请求
      alert("举报成功");
    },
    good(cid) {
      var index = 0;
      for (index = 0; index < this.comments.length; index++) {
        if (this.comments[index].cid === cid) {
          this.comments[index].goodnumber++;
          this.comments[index].isgood = true;
          break;
        }
      }
    },
    bad(cid) {
      var index = 0;
      for (index = 0; index < this.comments.length; index++) {
        if (this.comments[index].cid === cid) {
          this.comments[index].goodnumber--;
          this.comments[index].isgood = false;
          break;
        }
      }
    },
    change() {
      this.context = this.context.replace(/\n/g, '<br>')

    },
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false
      }, 1000)
    },
    onSubmit() {
      this.$refs.text.validate()

      if (this.$refs.text.hasError) {
        this.formHasError = true
      } else {
        this.alert = true;
        this.$refs.text.resetValidation();
        // 调用评论axios请求
        this.comments.splice(0, 0, {
          name: this.$route.params.id,
          avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171208%2Ff1d2aa196b2248abb59d50bff5c7376a.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640140175&t=fbcd874f84cac90de991d827a58808ae',
          text: this.text,
          stamp: '2021/6/10',
          goodnumber: 0,
          isgood: false,
          cid: -1,
        })
        this.text = '';
      }
    },

    onReset() {
      this.text = null
      this.context = marked("# Marked in browser\n" +
        "## 睡觉！" +
        "\nRendered by **marked**.");
      this.$refs.text.resetValidation()
    }
  },


  mounted() {
    this.context = this.context.replace(/\n/g, '<br>');
    if (this.comments / 5 !== 0) {
      this.length = this.comments.length / 5 + 1;
    } else {
      this.length = this.comments.length / 5;
    }
  },

}
</script>

<style scoped>
.test {

}
</style>

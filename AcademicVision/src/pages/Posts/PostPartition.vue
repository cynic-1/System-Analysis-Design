<template>
  <div>
    <div
      v-show="isClick === false"
      class="row"
    >
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff88a70da31437f8df47d5ac2e311377f32b8443ce880a-2T5Koi_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640052753&t=187a9e276762512e33bb434fefa7d38f"
            />

            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="red-6"
                icon="draw"
                size="50px"
                @click="method1"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                文学
              </h5>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.vjshi.com%2F2018-04-03%2Fcb62732ddbc2d5537b8c6edf0db2192a%2F00001.jpg%3Fx-oss-process%3Dstyle%2Fwatermark&refer=http%3A%2F%2Fpic.vjshi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640051702&t=fdb06fae504a2d089025273c6e8ca78c"
            />

            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="blue-6"
                icon="functions"
                size="50px"
                @click="method2"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                数学
              </h5>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.kekenet.com%2F2018%2F0321%2F72871521602242.jpg&refer=http%3A%2F%2Fpic.kekenet.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640053006&t=ca73f1129b7e57630891010d866ad562"
            />

            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="pink-6"
                icon="spellcheck"
                size="50px"
                @click="method3"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                语言
              </h5>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      v-show="isClick === false"
      class="row"
      style="margin-top: 20px"
    >
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="light-blue-6"
                icon="devices"
                size="50px"
                @click="method4"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                计算机
              </h5>
            </q-card-actions>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.huixinkj.com%2Fupload%2F202005%2F1590718779930_2.jpg&refer=http%3A%2F%2Fwww.huixinkj.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640053184&t=cf6c534d65438c4f72182130259aa607"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="purple-6"
                icon="ssid_chart"
                size="50px"
                @click="method5"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                物理
              </h5>
            </q-card-actions>
            <q-img
              class="col"
              src="https://img2.baidu.com/it/u=2635334427,4276527748&fm=26&fmt=auto"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="cyan-6"
                icon="science"
                size="50px"
                @click="method6"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                化学
              </h5>
            </q-card-actions>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.51wendang.com%2Fpic%2F212d4679bda5487fd2a7940f%2F1-519-png_6_0_0_176_170_571_389_892.979_1262.879-761-0-1268-761.jpg&refer=http%3A%2F%2Fwww.51wendang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640054005&t=71c11e7974dba0c89963972a82d16c29"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      v-show="isClick === false"
      class="row"
      style="margin-top: 20px"
    >
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp6.itc.cn%2Fq_70%2Fimages03%2F20200629%2F5734848e412c46a2bc6639051149e61d.jpeg&refer=http%3A%2F%2Fp6.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640054123&t=0e7a4a0c359d6caaf8067ae86510b5cf"
            />

            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="deep-purple-6"
                icon="biotech"
                size="50px"
                @click="method7"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                生物
              </h5>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-img
              class="col"
              src="https://img0.baidu.com/it/u=1101914267,128215637&fm=26&fmt=auto"
            />

            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="teal-6"
                icon="precision_manufacturing"
                size="50px"
                @click="method8"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                自动化
              </h5>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pptjia.com%2Fimage%2F20200701%2F04e4f43de85a17f5c14441ffaef02e6b.jpg&refer=http%3A%2F%2Fimg.pptjia.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640054389&t=f323ddc3dd6c9f2828c3d79bad3a2f30"
            />

            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="indigo-6"
                icon="design_services"
                size="50px"
                @click="method9"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                工程建造
              </h5>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      v-show="isClick === false"
      class="row"
      style="margin-top: 20px"
    >
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="green-6"
                icon="attach_money"
                size="50px"
                @click="method10"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                金融
              </h5>
            </q-card-actions>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181109%2F8ec53d03a3c14101be712263a96d34df.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640054649&t=2dcff86a846175188649d6bb554c0607"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="orange-6"
                icon="flight"
                size="50px"
                @click="method11"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                航空航天
              </h5>
            </q-card-actions>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F2fac4d3b21ca954df0dba8fac0fdbe6554de3b3644e36-BwUDMt_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640054788&t=02b7bc2bd53fab471d0d768f9330a015"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card
          class="my-card"
          flat
          bordered
          style="margin-left: 10px"
        >
          <q-card-section horizontal>
            <q-card-actions
              vertical
              class="justify-around q-px-md"
            >
              <q-btn
                flat
                round
                color="brown-6"
                icon="question_answer"
                size="50px"
                @click="method12"
              />
              <h5 style="text-align:center;margin: 0 0 10px;">
                交流
              </h5>
            </q-card-actions>
            <q-img
              class="col"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F55%2F11%2F581e87ab08ff9_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640054963&t=ec396e866a51a9d5c706fca0ff4fc6b2"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <br>

    <div v-show="isClick">
      <PostPartionView
        :name="name"
        @childevent="childevent"
      />
    </div>
  </div>
</template>

<script>
// import Partition from "components/Posts/Partition";
import PostPartionView from "pages/Posts/PostPartionView";

export default {
    "name": "PostPartition",

    "components": {
        PostPartionView
    },

    data () {

        return {
            "isClick": false,
            "name": ""
        };

    },


    "methods": {
        childevent (data) {

            console.log("改变组件状态");
            this.isClick = false;

        },
        method1 () {

            console.log("点击了文学");
            this.isClick = true;
            this.name = "文学";

        },
        method2 () {

            console.log("点击了数学");
            this.isClick = true;
            this.name = "数学";

        },
        method3 () {

            console.log("点击了语言");
            this.isClick = true;
            this.name = "语言";

        },
        method4 () {

            console.log("点击了计算机");
            this.isClick = true;
            this.name = "计算机";

        },
        method5 () {

            console.log("点击了物理");
            this.isClick = true;
            this.name = "物理";

        },
        method6 () {

            console.log("点击了化学");
            this.isClick = true;
            this.name = "化学";

        },
        method7 () {

            console.log("点击了生物");
            this.isClick = true;
            this.name = "生物";

        },
        method8 () {

            console.log("点击了自动化");
            this.isClick = true;
            this.name = "自动化";

        },
        method9 () {

            console.log("点击了工程建造");
            this.isClick = true;
            this.name = "工程建造";

        },
        method10 () {

            console.log("点击了金融");
            this.isClick = true;
            this.name = "金融";

        },
        method11 () {

            console.log("点击了航空航天");
            this.isClick = true;
            this.name = "航空航天";

        },
        method12 () {

            console.log("点击了交流");
            this.isClick = true;
            this.name = "交流";

        }
    }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

<template>
  <div>
    <div
      class="q-pa-md q-gutter-sm"
      style="padding: 0;margin: 0"
    >
      <q-banner
        class="bg-grey-3"
        @click="viewPost(this.pid)"
      >
        <template #avatar>
          <q-icon
            v-if="rank===1"
            name="leaderboard"
            color="red"
            size="27px"
          />
          <q-icon
            v-else-if="rank===2"
            name="leaderboard"
            color="yellow-10"
            size="27px"
          />
          <q-icon
            v-else-if="rank===3"
            name="leaderboard"
            color="indigo-12"
            size="27px"
          />
          <q-icon
            v-else
            name="leaderboard"
            color="blue-3"
            size="27px"
          />
        </template>
        <strong>{{ rank }}&nbsp;&nbsp;&nbsp;</strong>
        {{ context }}
      </q-banner>
    </div>
  </div>
</template>

<script>
export default {
    "name": "EachRanking",
    "methods": {
        viewPost (post_id) {

            console.log("点击了查看帖子方法", post_id);
            this.$router.push({
                "path": "/posts/view",
                "query": {
                    "user_id": this.$store.state.person.userID,
                    post_id,
                }
            });

        },
    },
    "props": ["rank", "context", "author", "pid"]
};
</script>

<style scoped>

</style>

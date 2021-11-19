<template>
  <div>
    <div class="q-pa-md q-gutter-sm" style="padding: 0;margin: 0">

      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="leaderboard" color="primary" size="25px" />
        </template>
        <strong>{{rank}}&nbsp&nbsp&nbsp</strong>
        {{context}}
      </q-banner>
    </div>
  </div>
</template>

<script>
export default {
  name: "EachRanking",

  props: ['rank', 'context', 'author']
}
</script>

<style scoped>

</style>

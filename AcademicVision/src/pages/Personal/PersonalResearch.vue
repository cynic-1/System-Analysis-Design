<template>
  <div class="q-pa-md fit row wrap justify-evenly items-start content-start">
    <div class="q-pa-lg gt-md q-gutter-y-md" style="width: 400px; overflow:auto;">
      <q-card>
        <q-tabs
          dense
          align="justify"
          class="text-primary"
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab :ripple="false" name="mails" icon="mail" label="Mails" />
          <q-tab :ripple="false" name="alarms" icon="alarm" label="Alarms" />
          <q-tab :ripple="false" name="movies" icon="movie" label="Movies" />
        </q-tabs>
      </q-card>
    </div>
    <div class="q-pa-xl" style="overflow:auto; width: 800px; height: 600px;">
      <q-card>
        sdfasdfsdfsadf
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalResearch",
  data() {
    return {
      tab: 2
    }
  }
}
</script>

<style scoped>

</style>

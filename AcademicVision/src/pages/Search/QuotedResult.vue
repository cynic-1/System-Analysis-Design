<template>
  <div style="height: 100%;width: 100%">
    <q-toolbar
      class="bg-grey-2 shadow-2 rounded-borders"
      style="height: 50px;width: 60%;margin: 20px auto 30px auto;text-align: center"
    >
      <span style="font-size: large">被引文献</span>
      <q-separator
        vertical
        inset
        style="margin-left: 15px"
      />

      <q-input
        v-model="key"
        dark
        dense
        standout
        input-class="text-left"
        class="q-ml-md"
        style="width: 78%"
        bg-color="white"
      >
        <template #append>
          <q-separator
            vertical
            inset
          />
          <q-icon
            name="search"
            class="cursor-pointer"
            @click="key = ''"
          />
        </template>
      </q-input>
      <q-separator
        vertical
        inset
        style="margin-left: 10px"
      />
      <q-btn
        color="grey-3"
        text-color="black"
        flat
        style="margin-left: 10px"
        no-wrap
      >
        检索
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: "QuotedResult",
  data(){
    return {
      "key" : "",
    }
  }
}
</script>

<style scoped>

</style>

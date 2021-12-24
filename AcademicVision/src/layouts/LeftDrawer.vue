<template>
  <div class="q-pa-xl fit row wrap justify-evenly items-start content-start">
    <div
      class="gt-md q-px-lg col q-gutter-y-md left-drawer"
      style="max-width: 400px; overflow:auto;"
    >
      <slot name="leftDrawer">
        <div></div>
      </slot>
    </div>

    <div
      class="lt-lg q-pa-lg row"
      style="overflow:auto; width: 100%;"
    >
      <slot name="navBar4SmallWindow">
        <div></div>
      </slot>
    </div>

    <div
      class="col q-px-lg"
      style="overflow:auto; max-width: 1200px;"
    >
      <slot name="main">
        <div>好像不太对</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
    "name": "LeftDrawer",
};
</script>

<style lang="sass">
.left-drawer .q-tab__content--inline .q-tab__icon + .q-tab__label
  padding-left: 20px
.left-drawer .q-tab__label
  font-size: 20px
</style>


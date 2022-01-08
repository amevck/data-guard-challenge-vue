<template lang="">
  <div
    :class="
      props.checked
        ? 'flex justify-between gradEnabled'
        : 'flex justify-between gradDisabled'
    "
  >
    <div class="pl-5 pb-5">
      <span>{{
        props.checked ? props.titleOnEnable : props.titleOnDisable
      }}</span>
    </div>
    <div class="pr-5 pb-3">
      <Switch
        :checked="props.checked"
        :hideLabel="true"
        @onChangeValue="onChangeValue($event)"
      ></Switch>
    </div>
  </div>
</template>
<script setup>
import Switch from "./Switch.vue";
import { defineProps } from "vue";

const props = defineProps({
  checked: Boolean,
  titleOnEnable: String,
  titleOnDisable: String,
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["onChangeValue"]);

function onChangeValue(e) {
  emit("onChangeValue", e);
}
</script>
<style scoped>
.gradDisabled {
  height: 50px;
  background-image: linear-gradient(
    to bottom,
    rgba(200, 0, 0, 0),
    rgb(230, 175, 175)
  );
}
.gradEnabled {
  height: 50px;
  background-image: linear-gradient(
    to bottom,
    rgba(200, 0, 0, 0),
    rgb(167, 223, 174)
  );
}
</style>

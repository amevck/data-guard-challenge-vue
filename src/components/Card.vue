<template lang="">
  <el-card
    shadow="hover"
    :class="
      props.disabled
        ? 'rounded-lg border-2 border-gray-200 text-gray-400'
        : 'rounded-lg border-2 border-gray-400 '
    "
  >
    <div class="flex justify-between">
      <div>
        <span class="font-medium text-lg">{{ props.title }}</span>
      </div>
      <div>
        <Switch
          :checked="props.checked"
          :disabled="props.disabled"
          @onChangeValue="onChangeValue($event)"
        ></Switch>
      </div>
    </div>
    <div class="pt-5">
      <p class="text-left text-base font-light">{{ props.description }}</p>
    </div>
  </el-card>
</template>
<script setup>
import Switch from "./Switch.vue";
import { defineProps } from "vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(["onChangeValue"]);

const onChangeValue = (e) => {
  emit("onChangeValue", {
    enabled: e,
    tabName: props.tabName,
    pluginName: props.pluginName,
  });
};

const props = defineProps({
  title: String,
  description: String,
  active: String,
  disabled: Boolean,
  tabName: String,
  pluginName: String,
  checked: Boolean,
});
</script>
<style scoped></style>

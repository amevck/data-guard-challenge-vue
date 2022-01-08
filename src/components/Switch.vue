<template>
  <div>
    <el-switch
      v-model="value"
      active-color="#13ce66"
      :disabled="props.disabled"
      inactive-color="#ff4949"
      @change="(e) => onChangeValue(e)"
    />
  </div>
  <div v-if="!hideLabel">
    <div v-if="value" class="text-xs text-green-600">
      <span>Allowed</span>
    </div>
    <div v-else class="text-xs text-red-600">
      <span>Blocked</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  checked: Boolean,
  disabled: Boolean,
  hideLabel: Boolean,
});

const value = ref(props.checked);
// eslint-disable-next-line no-undef
const emit = defineEmits(["onChangeValue"]);

function onChangeValue() {
  emit("onChangeValue", value?.value);
}
</script>
<style lang=""></style>

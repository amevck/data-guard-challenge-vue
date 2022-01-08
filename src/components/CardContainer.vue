<template>
  <div class="flex flex-wrap">
    <div v-for="(value, name) in plugins" v-bind:key="props.name + name">
      <Card
        class="box-card m-5"
        :checked="isPluginChecked(name)"
        :description="plugins[name].description"
        :title="plugins[name].title"
        :disabled="isPluginDisabled(name)"
        :tabName="props.name"
        :pluginName="value.name"
        @onChangeValue="onChangeValue($event)"
      ></Card>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";
import Card from "./Card.vue";

const props = defineProps({
  tabsData: Object,
  plugins: Object,
  name: String,
  allPluginsEnabled: Boolean,
});

const stateAsMap = computed(() => {
  const active = Object.fromEntries(
    props.tabsData?.[props.name]?.active?.map((e) => [e, true]) || []
  );
  const inactive = Object.fromEntries(
    props.tabsData?.[props.name]?.inactive?.map((e) => [e, false]) || []
  );
  const disabled = Object.fromEntries(
    props.tabsData?.[props.name]?.disabled?.map((e) => [e, "disabled"]) || []
  );
  return { ...active, ...inactive, ...disabled };
});

const isPluginDisabled = (key) =>
  stateAsMap.value?.[key] === "disabled" || !props.allPluginsEnabled;

const isPluginChecked = (key) => stateAsMap.value?.[key];

// eslint-disable-next-line no-undef
const emit = defineEmits(["onChangePluginValue"]);

const onChangeValue = (e) => {
  emit("onChangePluginValue", e);
};
</script>
<style scoped>
.box-card {
  margin-top: 20px;
  width: 260px;
  height: 200px;
}
</style>

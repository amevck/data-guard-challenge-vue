<template>
  <div class="home">
    <div class="text-left ml-5">
      <span class="capitalize m-1 font-medium text-xl">{{ path }} Plugins</span>
    </div>
    <CardContainer
      :tabsData="tabsData"
      :name="name"
      :plugins="plugins"
      :allPluginsEnabled="props.allPluginsEnabled"
      @onChangePluginValue="onChangeValue($event)"
    ></CardContainer>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import CardContainer from "../components/CardContainer.vue";
const props = defineProps({
  path: String,
  name: String,
  tabsData: Object,
  allPluginsEnabled: Boolean,
  plugins: Object,
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["onChangePluginValue"]);

const onChangeValue = (e) => {
  emit("onChangePluginValue", e);
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
  width: 300px;
  height: 180px;
}
</style>

<template>
  <div class="h-100 pr-2">
    <div class="relative sidebar overflow-hidden bg-gray-200">
      <div class="p-4">
        <span class="text-4xl">Data</span
        ><span class="text-4xl font-bold">Guard</span>
      </div>
      <el-menu
        default-active="/marketing"
        active-text-color="black"
        background-color="rgb(229 231 235)"
        class="el-menu-vertical-demo h-100 side-bar"
        router="true"
      >
        <el-menu-item index="/marketing">
          <el-icon :size="20"><Grid /></el-icon>
          <span class="font-medium">Marketing</span>
        </el-menu-item>
        <el-menu-item index="/finance">
          <el-icon><Money /></el-icon>
          <span class="font-medium">Finance</span>
        </el-menu-item>
        <el-menu-item index="/personnel" router>
          <el-icon><Cellphone /></el-icon>
          <span class="font-medium">Personnel</span>
        </el-menu-item>
      </el-menu>
      <div class="absolute bottom-0 left-0 w-100">
        <SideBarFooter
          :titleOnEnable="'All plugins enabled'"
          :checked="allPluginsEnabled"
          :titleOnDisable="'All plugins disabled'"
          @onChangeValue="OnChangeAllDisableValue($event)"
        ></SideBarFooter>
      </div>
    </div>
    <div class="content pt-5">
      <router-view
        :tabsData="tabsDataMap"
        :plugins="pluginsDataMap"
        :allPluginsEnabled="allPluginsEnabled"
        @onChangePluginValue="onChangeValue($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { Grid, Money, Cellphone } from "@element-plus/icons-vue";
import { get, put } from "./services/fetch";
import { reactive, ref } from "vue";
import SideBarFooter from "./components/SideBarFooter.vue";

const pluginsDataMap = reactive({});
const tabsDataMap = reactive({});
const allPluginsEnabled = ref(true);

const fetchAllData = async () => {
  const [tabs, plugins] = await Promise.all([get("/tabs"), get("/plugins")]);
  Object.assign(
    tabsDataMap,
    Object.fromEntries(tabs.map((tab) => [tab.name, tab]))
  );
  Object.assign(
    pluginsDataMap,
    Object.fromEntries(plugins.map((plugin) => [plugin.name, plugin]))
  );
};

const OnChangeAllDisableValue = (e) => {
  allPluginsEnabled.value = e;
};

const addPlugin = (data) => {
  const newTabsData = { ...tabsDataMap };

  newTabsData[data.tabName].active = [
    ...tabsDataMap[data.tabName].active,
    data.pluginName,
  ];

  newTabsData[data.tabName].inactive = tabsDataMap[
    data.tabName
  ].inactive.filter((inactive) => inactive !== data.pluginName);

  tabsDataMap.value = newTabsData;
  return newTabsData[data.tabName];
};

const removePlugin = (data) => {
  const newTabsData = { ...tabsDataMap };
  newTabsData[data.tabName].active = tabsDataMap[data.tabName].active.filter(
    (active) => active !== data.pluginName
  );

  newTabsData[data.tabName].inactive = [
    ...tabsDataMap[data.tabName].inactive,
    data.pluginName,
  ];

  tabsDataMap.value = newTabsData;
  return newTabsData[data.tabName];
};

const onChangeValue = async (data) => {
  if (data.enabled) {
    const newTabsData = addPlugin(data);
    await put(`/tabs/${newTabsData.id}`, newTabsData);
  } else {
    const newTabsData = removePlugin(data);
    await put(`/tabs/${newTabsData.id}`, newTabsData);
  }
};

fetchAllData();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.side-bar {
  background-color: #dde0e2;
}
.w-100 {
  width: 100%;
}
.h-100 {
  height: 100%;
}
.overflow-hidden {
  overflow: hidden;
}
.el-menu-item.is-active {
  background-color: white;
  border-left: red solid 5px;
}
.sidebar {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 18%;
}
.content {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 82%;
  overflow: auto;
}
</style>

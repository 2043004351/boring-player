<template>
  <div class="main w-full h-full" flex="~ col">
    <div class="main-content flex-1 overflow-hidden">
      <router-view />
    </div>
    <div class="main-tabs flex-shrink-0">
      <var-bottom-navigation v-model:active="active">
        <var-bottom-navigation-item label="首页" icon="home" name="home" />
      </var-bottom-navigation>
    </div>
  </div>
</template>

<script setup>
import { Themes, StyleProvider } from "@varlet/ui";

StyleProvider(Themes.md3Light);
</script>

<style lang="scss" scoped></style>

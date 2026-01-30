// import { presetVarlet } from "@varlet/preset-uno";
import { defineConfig } from "unocss/vite";
import { presetAttributify, presetIcons, presetWind4 } from "unocss";

export default defineConfig({
  presets: [presetWind4(), presetIcons(), presetAttributify()],
});

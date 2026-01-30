<template>
  <div class="detail" :style="{ backgroundColor: bgColor }">
    <div class="detail-poster">
      <img
        v-if="poster"
        ref="posterImgRef"
        class="detail-poster__img"
        :src="poster"
        crossorigin="anonymous"
        @load="onPosterLoaded"
        @error="onPosterError"
        alt="poster"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, onBeforeUnmount, ref } from "vue";
import { FastAverageColor } from "fast-average-color";

const route = useRoute();

const poster = computed(() => import.meta.env.VITE_POSTER_BASE_URL + route.query.poster || "");
const tmdbid = route.query.tmdbid || "";

const bgColor = ref("#0b0b0b");
const posterImgRef = ref(null);

const fac = new FastAverageColor();

const onPosterLoaded = async () => {
  const imgEl = posterImgRef.value;
  console.log(poster);
  if (!imgEl) return;

  try {
    const color = await fac.getColorAsync(imgEl);
    bgColor.value = color?.hex || color?.rgba || "#0b0b0b";
  } catch (e) {
    // 常见原因：跨域图片没有 CORS 头导致 canvas 被污染
    bgColor.value = "#0b0b0b";
    console.warn("Failed to extract poster color:", e);
  }
};

const onPosterError = () => {
  bgColor.value = "#0b0b0b";
};

onBeforeUnmount(() => {
  fac.destroy();
});
</script>

<style lang="scss" scoped>
.detail {
  min-height: 100vh;
  transition: background-color 240ms ease;
}

.detail-poster {
  display: flex;
  justify-content: center;
}

.detail-poster__img {
  width: 100%;
  height: auto;
  // border-radius: 16px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
}
</style>

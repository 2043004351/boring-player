<template>
  <div class="w-full h-full overflow-hidden" flex="~ col">
    <var-app-bar title="Boring Player" title-position="left" />
    <div class="flex-1 overflow-y-auto box-border p-4" flex="~ col gap-4">
      <var-list :finished="finished" v-model:loading="loading" v-model:error="loadingError" @load="getTopPicks">
        <div class="grid grid-cols-2 gap-2">
          <div class="" v-for="item in list" :key="item.tmdbid">
            <var-badge type="danger" :value="item.vote_average" offset-x="-10" offset-y="10">
              <var-paper :elevation="2" ripple>
                <var-image fit="contain" :src="getImageUrl(item)" />
                <div class="p-x-1 p-y-1" flex="~ col items-start gap-1">
                  <var-ellipsis class="text-left font-600 w-full">{{ item.title }}</var-ellipsis>
                  <span class="color-#666 text-3">{{ item.release_date }}</span>
                </div>
              </var-paper>
            </var-badge>
          </div>
        </div>
      </var-list>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getList } from "@/api/system";

const loading = ref(true);
const loadingError = ref(false);
const finished = ref(false);
const list = ref([]);
const page = ref(1);
const totalPage = ref(1);

function getTopPicks() {
  loading.value = true;
  list.value.push(
    { tmdbid: 123, poster: "/9n1uCqzSb9dj5rbXcX4TkCz305A.jpg", title: "Movie 1", media_type: "movie", release_date: "2011-04-17", vote_average: 8.5 },
    { tmdbid: 456, poster: "/tffa4pHTS5RAhzR4KFX9BfIVn8I.jpg", title: "Movie 2", media_type: "tv", release_date: "2012-05-20", vote_average: 8.5 },
    { tmdbid: 789, poster: "/wijlZ3HaYMvlDTPqJoTCWKFkCPU.jpg", title: "Movie 3", media_type: "movie", release_date: "2011-04-17", vote_average: 8.5 },
  );
  loading.value = false;
  finished.value = true;

  // getList(2142788, { page: page.value })
  //   .then((res) => {
  //     if (res.data.items.length === 0) {
  //       finished.value = true;
  //     } else {
  //       list.value.push(
  //         { tmdbid: 123, poster: "9n1uCqzSb9dj5rbXcX4TkCz305A.jpg" },
  //         { tmdbid: 456, poster: "tffa4pHTS5RAhzR4KFX9BfIVn8I.jpg" },
  //         { tmdbid: 789, poster: "wijlZ3HaYMvlDTPqJoTCWKFkCPU.jpg" },
  //       );
  //       totalPage.value = res.data.total_page;
  //     }
  //   })
  //   .catch((error) => {
  //     loadingError.value = true;
  //     console.error("Failed to fetch top picks:", error);
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //     if (page.value === totalPage.value) {
  //       finished.value = true;
  //       return;
  //     }
  //     page.value += 1;
  //   });
}

const getImageUrl = computed(() => {
  return (item) => {
    return import.meta.env.VITE_POSTER_BASE_URL + item.poster;
  };
});

const getMediaType = computed(() => {
  return (type) => {
    if (type === "movie") {
      return "电影";
    } else if (type === "tv") {
      return "电视剧";
    } else {
      return "未知";
    }
  };
});

onMounted(() => {
  getTopPicks();
});
// const
</script>

<style scoped>
/* 防止 var-paper 的 ripple 覆盖 var-badge 的角标 */
:deep(.var-badge__content) {
  z-index: 10;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineEmits, defineProps } from "vue";
import { useScreens } from "vue-screen-utils";
import { DatePicker } from "v-calendar";
import { useVacancyStore } from "@/stores/vacancy";
import "v-calendar/style.css";

const props = defineProps(["filterRange"]);

const emit = defineEmits(["range"]);
const vacancyStore = useVacancyStore();

const range = ref({
  start: "",
  end: "",
});

watch(range, async (newRange, oldRange) => {
  if (newRange !== oldRange) {
    emit("range", newRange);
  }
});

watch(
  () => props.filterRange,
  (newValue) => {
    range.value = newValue;
  },
  { deep: true }
);

onMounted(async () => {
  await vacancyStore.fetchAll({
    excludeNotAvailable: true,
    excludePast: true,
    itemsPerPage: 100,
  });
});

const vacancies = computed(() => vacancyStore.vacancies);

const { mapCurrent } = useScreens({
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
});

const columns = mapCurrent({ "2xl": 2 }, 1);
const expanded = mapCurrent({ "2xl": false }, true);

const attributes = computed(() => {
  const list = vacancies.value?.["hydra:member"] ?? [];

  return [
    ...list.map((vacancy) => ({
      dates: [vacancy.date],
      dot: {
        color: "blue",
      },
      popover: {
        label: `Wolne miejsca: ${vacancy.free} | Cena: ${vacancy.floatPrice} PLN/os`,
      },
    })),
  ];
});
</script>

<template>
  <DatePicker
    v-model.range="range"
    style="width: 100%"
    :columns="columns"
    :expanded="expanded"
    :attributes="attributes"
    :min-date="new Date()"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import VacancyList from "@/components/Vacancies/VacancyList.vue";
import {fetchVacancies} from '@/api/vacancies'

const filterForm = ref({
  dateFrom: "",
  dateTo: "",
  free: 1,
});
const vacancies = ref([]);

const hasVacancies = computed(() => vacancies.value.length > 0);
async function searchVacancies() {
  try {
    const response = await fetchVacancies(filterForm.value);

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div>
    <div>
      Rezerwacja
      <form @submit.prevent="searchVacancies">
        <div>
          <label for="">Od</label>
          <input v-model="filterForm.dateFrom" type="date" required="true" />
        </div>
        <div>
          <label for="">Do</label>
          <input v-model="filterForm.dateTo" type="date" required="true" />
        </div>
        <div>
          <label for="">Ilość miejsc</label>
          <input v-model="filterForm.free" type="number" min="1" step="1" pattern="\d*" />
        </div>
        <button>Szukaj</button>
      </form>
    </div>
    <!-- Filtered vacancies -->
    <div v-if="hasVacancies">
      <VacancyList v-for="(vacancy, key) in vacancies" :key="key" :vacancy="vacancy" />
    </div>
    <div v-else>Brak wolnych miejsc w podanym przedziale dat.</div>
  </div>
</template>

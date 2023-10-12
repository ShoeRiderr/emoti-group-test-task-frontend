<script setup lang="ts">
const props = defineProps(["reservations"]);
import { formatDate } from "@/utils/dateUtil";

function convertDate(date: string) {
  return formatDate(new Date(date));
}
</script>

<template>
  <table class="w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3">Id</th>
        <th scope="col" class="px-6 py-3">Data rozpoczęcia</th>
        <th scope="col" class="px-6 py-3">Data zakończenia</th>
        <th scope="col" class="px-6 py-3">Cena</th>
        <th scope="col" class="px-6 py-3">Data utworzenia</th>
        <th scope="col" class="px-6 py-3">Data edycji</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(reservation, key) in props.reservations"
        :key="key"
        class="bg-white border-b"
      >
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace">
          {{ reservation.id }}
        </th>
        <td class="px-6 py-4">{{ convertDate(reservation.startDate) }}</td>
        <td class="px-6 py-4">{{ convertDate(reservation.endDate) }}</td>
        <td class="px-6 py-4">{{ reservation.price / 100 }} PLN</td>
        <td class="px-6 py-4">{{ convertDate(reservation.createdAt) }}</td>
        <td class="px-6 py-4">{{ convertDate(reservation.updatedAt) }}</td>
      </tr>
    </tbody>
  </table>
</template>

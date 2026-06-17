<script setup lang="ts">
import {requestApi} from "~/composables/requestApi";

const api = requestApi()
const {data: invoices, pending, error} = api.invoices()

function invoiceDelete(id: string): void {
  api.invoiceDelete(id)
  location.reload()
}

</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      РАХУНКИ-ФАКТУРИ
    </h1>

    <div v-if="pending">
      Завантаження...
    </div>

    <div v-else-if="error">
      Помилка завантаження
      {{ error }}
    </div>

    <div v-else class="overflow-hidden rounded-lg border">
      <div class="px-2 py-2 flex justify-left">
        <NuxtLink
            to="/create"
            class="px-5 py-3 rounded-xl bg-indigo-600 text-white
           shadow-md hover:bg-indigo-700 hover:shadow-lg
           active:scale-95 transition duration-200">
          Створити новий
        </NuxtLink>
      </div>

      <table class="min-w-full">
        <thead class="bg-indigo-300">
        <tr>
          <th class="px-4 py-3 text-left text-white">ID</th>
          <th class="px-4 py-3 text-left text-white">number</th>
          <th class="px-4 py-3 text-left text-white">supplier name</th>
          <th class="px-4 py-3 text-left text-white">gross amount</th>
          <th class="px-4 py-3 text-left text-white">status</th>
          <th class="px-4 py-3 text-left text-white">due date</th>
          <th class="px-4 py-3 text-left text-white">actions</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="invoice in invoices"
            :key="invoice.id"
            class="border-t hover:bg-gray-50"
        >
          <td class="px-4 py-3">
            <NuxtLink :to="`/invoices/${invoice.id}`"
                      class="w-10 h-10 flex items-center justify-center
         rounded-lg bg-indigo-600 text-white
         hover:bg-indigo-700 transition"
            >
              {{ invoice.id }}
            </NuxtLink>
          </td>
          <td class="px-4 py-3">
            {{ invoice.number }}
          </td>

          <td class="px-4 py-3">
            {{ invoice.supplier_name }}
          </td>

          <td class="px-4 py-3">
            {{ invoice.gross_amount }}
          </td>

          <td class="px-4 py-3">

            <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                :class="{
       'bg-yellow-100 text-yellow-800': invoice.status === 'pending',
       'bg-green-100 text-green-800': invoice.status === 'approved',
       'bg-red-100 text-red-800': invoice.status === 'rejected'
        }">{{ invoice.status }}</span>
          </td>
          <td class="px-4 py-3">
            {{ invoice.due_date }}
          </td>
          <td class="px-4 py-3">
            <img @click="invoiceDelete(invoice.id)" class="w-10 h-10 cursor-pointer" src="/delete.png" alt="delete"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>

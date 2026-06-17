<script setup lang="ts">
import {ref, computed} from 'vue'
import {invoiceSchema} from '~/schemas/invoice'
import {calculateGrossAmount} from "~/composables/grossCalc";

type Status = 'pending' | 'approved' | 'rejected'
const errors = ref<Record<string, string>>({})
const api = requestApi()
const form = ref<any>({
  number: '',
  supplier_name: '',
  supplier_tax_id: '',
  net_amount: 0,
  vat_amount: 0,
  gross_amount: 0,
  currency: 'UAH',
  status: 'pending' as Status,
  issue_date: '',
  due_date: ''
})
watch(
    () => [form.value.net_amount, form.value.vat_amount],
    () => {
      form.value.gross_amount = calculateGrossAmount(
          form.value.net_amount,
          form.value.vat_amount
      )
    }
)
const submitForm = async (): Promise<void> => {

  const result = invoiceSchema.safeParse(form.value)
  if (!result.success) {
    errors.value = {}

    result.error.issues.forEach((e: any) => {
      if (e.path[0]) {
        errors.value[e.path[0] as string] = e.message
      }
    })
    return
  }
  errors.value = {}
  try {
    const res = await api.invoiceCreate(form.value)
    console.log(res)
    await navigateTo('/');
  } catch (error: any) {
    const message =
        error?.data?.data?.message ||
        'Something went wrong';
    alert(message)
  }
}


</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">

    <h1 class="text-xl font-bold">Створити</h1>

    <!-- number -->
    <input
        v-model="form.number"
        placeholder="Invoice number"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.number" class="text-red-500 text-sm">
      {{ errors.number }}
    </p>
    <!-- supplier -->
    <input
        v-model="form.supplier_name"
        placeholder="Supplier name"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.supplier_name" class="text-red-500 text-sm">
      {{ errors.supplier_name }}
    </p>
    <input
        v-model="form.supplier_tax_id"
        placeholder="Supplier tax ID"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.supplier_tax_id" class="text-red-500 text-sm">
      {{ errors.supplier_tax_id }}
    </p>

    <!-- amounts -->
    <input
        v-model.number="form.net_amount"
        type="number"
        placeholder="Net amount"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.net_amount" class="text-red-500 text-sm">
      {{ errors.net_amount }}
    </p>
    <input
        v-model.number="form.vat_amount"
        type="number"
        placeholder="VAT amount"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.vat_amount" class="text-red-500 text-sm">
      {{ errors.vat_amount }}
    </p>
    <input
        v-model.number="form.gross_amount"
        type="number"
        placeholder="Gross amount"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.gross_amount" class="text-red-500 text-sm">
      {{ errors.gross_amount }}
    </p>
    <!-- currency -->
    <input
        v-model="form.currency"
        placeholder="Currency (UAH)"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.currency" class="text-red-500 text-sm">
      {{ errors.currency }}
    </p>
    <!-- status -->
    <select
        v-model="form.status"
        class="w-full border p-2 rounded"
    >
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>

    <!-- dates -->
    <input
        v-model="form.issue_date"
        type="date"
        class="w-full border p-2 rounded"
    />

    <input
        v-model="form.due_date"
        type="date"
        class="w-full border p-2 rounded"
    />
    <p v-if="errors.due_date" class="text-red-500 text-sm">
      {{ errors.due_date }}
    </p>
    <!-- submit -->
    <button
        @click="submitForm"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    >
      Створити
    </button>

  </div>
</template>
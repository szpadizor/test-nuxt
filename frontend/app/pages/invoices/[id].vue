<script setup lang="ts">
import {invoiceSchema} from "~/schemas/invoice";
import {requestApi} from "~/composables/requestApi";
import {calculateGrossAmount} from "~/composables/grossCalc";
import {computed} from 'vue'

const route = useRoute()
const api = requestApi()
const id = route.params.id as string
type Status = 'pending' | 'approved' | 'rejected'
const errors = ref<Record<string, string>>({})

const form = ref({
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
const isPending = computed(() => {
      console.log(form.value.status == 'pending');
      return form.value.status == 'pending'
    }
)
const {data: invoice} = await api.invoice(id)
const lastUpdate = new Date(invoice.value.updated_at).toLocaleString();
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

  const res = await api.invoiceUpdate(id, form.value)
  await navigateTo('/');
}
Object.assign(form.value, invoice.value)

watch(
    () => [form.value.net_amount, form.value.vat_amount],
    () => {
      form.value.gross_amount = calculateGrossAmount(
          form.value.net_amount,
          form.value.vat_amount
      )
    }
)

</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">

    <h1 class="text-xl font-bold">Редагувати</h1>
    <h3 class="text-xl font-bold">Останнє оновлення {{lastUpdate}}</h3>
    <h3><span
        class="px-3 py-1 rounded-full text-xs font-medium"
        :class="{
        'bg-yellow-100 text-yellow-800': form.status === 'pending',
        'bg-green-100 text-green-800': form.status === 'approved',
        'bg-red-100 text-red-800': form.status === 'rejected'
      }"
    >
      {{ form.status }}
    </span></h3>
    <!-- number -->
    <input disabled
           v-model="form.number"
           placeholder="Invoice number"
           class="w-full border p-2 rounded"
    />
    <p v-if="errors.number" class="text-red-500 text-sm">
      {{ errors.number }}
    </p>
    <!-- supplier -->
    <input disabled
           v-model="form.supplier_name"
           placeholder="Supplier name"
           class="w-full border p-2 rounded"
    />
    <p v-if="errors.supplier_name" class="text-red-500 text-sm">
      {{ errors.supplier_name }}
    </p>
    <input disabled
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
    <input disabled
           v-model.number="form.gross_amount"
           type="number"
           placeholder="Gross amount"
           class="w-full border p-2 rounded"
    />
    <p v-if="errors.gross_amount" class="text-red-500 text-sm">
      {{ errors.gross_amount }}
    </p>
    <!-- currency -->
    <input disabled
           v-model="form.currency"
           placeholder="Currency (UAH)"
           class="w-full border p-2 rounded"
    />
    <p v-if="errors.currency" class="text-red-500 text-sm">
      {{ errors.currency }}
    </p>
    <!-- status -->
    <select disabled
        v-model="form.status"
        class="w-full border p-2 rounded"
    >
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>


    <!-- dates -->
    <input disabled
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
        :disabled="!isPending"
        :class="{'opacity-50 cursor-not-allowed': !isPending}"
        @click="submitForm"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"> Зберегти
    </button>
  </div>
</template>
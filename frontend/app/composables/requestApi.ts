export const requestApi = () => {

    return {
        invoices: () => useFetch('/api/invoices'),

        invoice: (id: string) =>
            useFetch(`/api/invoices/${id}`),

        invoiceCreate: (data: any) =>
            $fetch('/api/invoices', {
                method: 'POST',
                body: data
            }),
        invoiceUpdate: (id: string, data: any) =>
            $fetch(`/api/invoices/${id}`, {
                method: 'PUT',
                body: data
            }),
        invoiceDelete: (id: string) =>
            $fetch(`/api/invoices/${id}`, {
                method: 'DELETE',
            })
    }
}
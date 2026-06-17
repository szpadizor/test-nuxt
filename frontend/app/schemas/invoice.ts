import {z} from 'zod'

export const invoiceSchema = z.object({
    number: z.string().min(1),

    supplier_name: z.string().min(3),
    supplier_tax_id: z.string().min(1),

    net_amount: z.coerce.number().positive(),
    vat_amount: z.coerce.number().gte(0),
    gross_amount: z.coerce.number(),

    currency: z.string().length(3),

    status: z.enum(['pending', 'approved', 'rejected']),

    issue_date: z.string(),
    due_date: z.string()
}).refine(
    (data) => data.gross_amount === data.net_amount + data.vat_amount,
    {
        message: 'Невірна сума gross_amount',
        path: ['gross_amount']
    }
).refine(
    (data) => new Date(data.due_date) >= new Date(data.issue_date),
    {
        message: 'Невірна due_date',
        path: ['due_date']
    }
)

export type InvoiceForm = z.infer<typeof invoiceSchema>
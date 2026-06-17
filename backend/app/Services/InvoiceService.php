<?php

namespace App\Services;

use App\Http\Requests\StoreInvoiceRequest;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceService
{
    public static function getAll()
    {
        return Invoice::select(['id', 'number', 'supplier_name', 'gross_amount', 'status', 'due_date', 'updated_at'])
            ->orderBy('created_at', 'DESC')->get()->toArray();
    }

    public static function store(StoreInvoiceRequest $request)
    {
        Invoice::create($request->validated());
    }

    public static function update(Request $request, Invoice $invoice)
    {
        $invoice->update($request->all());
    }

    public static function destroy(Invoice $invoice)
    {
        $invoice->delete();
    }
}

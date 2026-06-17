<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Models\Invoice;
use App\Services\InvoiceService;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return response()->json(InvoiceService::getAll());
    }

    public function store(StoreInvoiceRequest $request)
    {
        InvoiceService::store($request);
        return response()->json(201);
    }
    public function show(Invoice $invoice)
    {
        return response()->json($invoice);
    }

    public function update(Request $request, Invoice $invoice)
    {
        InvoiceService::update($request, $invoice);
        return response()->json(200);
    }

    public function destroy(Invoice $invoice)
    {

        return response()->json(200);
    }
}

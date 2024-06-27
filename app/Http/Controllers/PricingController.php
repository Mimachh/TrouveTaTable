<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function __invoke(Request $request)
    {
        $products = new ProductResource(Product::first());   
        return Inertia::render('Pricing', [
            'products' => $products,
        ]);
    }
}

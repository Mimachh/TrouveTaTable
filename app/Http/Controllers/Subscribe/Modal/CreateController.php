<?php

namespace App\Http\Controllers\Subscribe\Modal;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Responses\ApiResponse;
use App\Models\Product;
use Illuminate\Http\Request;

class CreateController extends Controller
{

    public function __invoke(Request $request, Product $product)
    {
        $recurrence = $request->query('recurrence', 'monthly') ?? 'monthly';
        $product_choosen = new ProductResource(Product::where('id', $product->id)->firstOrFail());
        $price = json_decode($product_choosen->price, true)[$recurrence];
        return ApiResponse::ok([
            'product' => $product_choosen,
            'intent' => auth()->user()->createSetupIntent(),
            'stripeKey' => config('stripe.stripe_key'),
            'price' => $price,
            'recurrence' => $recurrence
        ]);

    }
}

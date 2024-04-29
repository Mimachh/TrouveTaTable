<?php

namespace App\Http\Controllers\Subscribe;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

use function Ramsey\Uuid\v1;

class CreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Product $product, Request $request)
    {
        // return view('subscribe.create', [
        //     'intent' => auth()->user()->createSetupIntent()
        // ]);


        $recurrence = $request->query('recurrence', 'monthly') ?? 'monthly';
        
        $product_choosen = Product::where('id', $product->id)->firstOrFail();
        $price = json_decode($product_choosen->price, true)[$recurrence];
       
        $products = Product::all();
            
        return inertia("Subscribe/Index", [
            'product' => $product_choosen,
            'intent' => auth()->user()->createSetupIntent(),
            'stripeKey' => config('stripe.stripe_key'),
            'products' => $products,
            'price' => $price,
            'recurrence' => $recurrence
        ]);
    }
}

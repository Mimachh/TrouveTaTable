<?php

namespace App\Http\Controllers\Subscribe;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
       
        $validated = $request->validate([
            'paymentMethod' => 'required|string',
            'selectedProductId' => 'required|exists:products,id',
            'recurrence' => 'nullable'
        ]);

        
        $recurrence = $validated['recurrence'] ?? 'monthly';
        $product = Product::find($validated['selectedProductId']);
       
        $stripeProductIds = $product->stripe_product_id;
      
        // $data = json_decode($stripeProductIds, true);

        $stripeProductId = $recurrence === 'monthly' ? $stripeProductIds['monthly'] : $stripeProductIds['annually'];
    //    return response()->json($stripeProductId);

        $re = auth()->user()->newSubscription($product->name, $stripeProductId)
        ->create($validated["paymentMethod"]);

        return response()->json($re);


        // if($re->stripe_status === 'active') {
        //     
        // }
        // return response()->json($re);
        // if($re->status === 200) {
        //     return redirect()->intended(route('dashboard', absolute: false));
        // }
    }
}

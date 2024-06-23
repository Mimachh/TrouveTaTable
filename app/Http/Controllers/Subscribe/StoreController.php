<?php

namespace App\Http\Controllers\Subscribe;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Product;
use Illuminate\Http\Request;


class StoreController extends Controller
{
    public function __invoke(Request $request)
    {
       
        $validated = $request->validate([
            'paymentMethod' => 'required|string',
            'selectedProductId' => 'required|exists:products,id',
            'recurrence' => 'nullable'
        ]);

        $user = new UserResource(auth()->user());
        if ($user->isFondator) {
            return response()->json(['message' => 'Vous êtes déjà un fondateur']);
        }

        $recurrence = $validated['recurrence'] ?? 'monthly';
        $product = Product::find($validated['selectedProductId']);
       
        $stripeProductIds = $product->stripe_product_id;
      
        // $data = json_decode($stripeProductIds, true);
        $stripeProductId = $recurrence === 'monthly' ? $stripeProductIds['monthly'] : $stripeProductIds['annually'];


        $re = auth()->user()->newSubscription($product->name, $stripeProductId)
        ->create($validated["paymentMethod"]);
        // ici si je récupère l'id du default payement method du user, et que je n'ai pas crée de nouveau pm côté front (il faut faire une vérif aussi) alors je garde la carte actuelle
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

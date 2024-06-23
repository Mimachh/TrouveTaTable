<?php

namespace App\Http\Controllers\Subscribe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Cashier\Subscription;

class CancelSubscriptionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer|exists:subscriptions',
            'sub_name' => 'required|string',
        ]);

        // $request->user()->subscription($validated['sub_name'])->cancel();
        $subscription = Subscription::find($validated['id']);

        if ($subscription && $subscription->user_id == $request->user()->id) {
            $subscription->cancel();
        } else {
            // Handle the error case where the subscription does not exist or does not belong to the user
        }
    }
}

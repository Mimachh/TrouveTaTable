<?php

namespace App\Http\Controllers\Subscribe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

        $request->user()->subscription($validated['sub_name'])->cancel();
    }
}

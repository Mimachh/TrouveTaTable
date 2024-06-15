<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user()->load('subscriptions');

        $subscriptions = $user->getSubscriptionData();

        $intent = auth()->user()->createSetupIntent();
        $stripeKey = config('stripe.stripe_key');

        return Inertia::render('Profile/Billings/Edit', [
            'subscriptions' => $subscriptions,
            "invoices" => $user->invoices()->take(3),
            'paymentMethods' => $paymentMethods = $user->paymentMethods(),
            'defaultPaymentMethod' => $user->defaultPaymentMethod(),
            'intent' => $intent,
            'stripeKey' => $stripeKey
        ]);
    }

    public function deletePaymentMethod(string $id)
    {
        try {
            $user = auth()->user();
            $paymentMethod = $user->findPaymentMethod($id);
            $user->deletePaymentMethod($id);
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'create' => 'ups, there was an error'
            ]);
        }
    }

    public function updatePaymentMethod(string $id)
    {
        try {
            $user = auth()->user();
            $paymentMethod = $user->findPaymentMethod($id);
            $user->updateDefaultPaymentMethod($id);
            // $user->updateDefaultPaymentMethodFromStripe($id);
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'create' => 'ups, there was an error'
            ]);
        }
    }


    public function storeNewPaymentMethod(Request $request) {
        $validated = $request->validate([
            'paymentMethod' => 'required|string',
        ]);
        $user = $request->user();
        $m = $user->addPaymentMethod($request->paymentMethod);
        $user->updateDefaultPaymentMethod($request->paymentMethod);

    }
}

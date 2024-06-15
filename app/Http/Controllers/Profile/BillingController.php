<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user()->load('subscriptions');
        // dd($user->paymentMethods());

        $subscriptions = $user->getSubscriptionData();
        return Inertia::render('Profile/Billings/Edit', [
            'subscriptions' => $subscriptions,
            "invoices" => $user->invoices()->take(3),
            'paymentMethods' => $paymentMethods = $user->paymentMethods(),
            'defaultPaymentMethod' => $user->defaultPaymentMethod(),
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

    public function addNewPaymentMethod() {
        // $user->addPaymentMethod($paymentMethod);
    }
}

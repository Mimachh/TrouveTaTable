<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Events\WebhookReceived;

class StripeWebhookListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] === 'payment_intent.succeeded') {
            $user = User::where('id', 2)->first();
            $user->name = "Karl";
            $user->save();



            // $user = User::where('stripe_id', $event->payload['data']['object']['customer'])->first();

            // Log::info('Stripe customer ID: ' . $event->payload['data']['object']['customer']);
            // Log::info('User: ', ['user' => $user]);
        }


        if ($event->payload['type'] === 'invoice.payment_succeeded') {
            $user = User::where('id', 2)->first();
            $user->name = "Karl";
            $user->save();

            $user = User::where('stripe_id', $event->payload['data']['object']['customer'])->first();

          


        }
    }
}

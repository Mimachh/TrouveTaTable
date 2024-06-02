<?php

namespace App\Mail\Rating;

use App\Http\Resources\RatingRestaurantResource;
use App\Models\Restaurant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewRatingNotifyRestaurant extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public RatingRestaurantResource $ratingRestaurant;
    public Restaurant $restaurant;
    public function __construct(Restaurant $restaurant, RatingRestaurantResource $ratingRestaurant)
    {

        $this->restaurant = $restaurant;
        $this->ratingRestaurant = $ratingRestaurant;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '1 nouvel avis sur votre restaurant',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mails.rating.new_rating_notify_restaurant',
            with: [
                'level' => 'success',
                'introLines' => [
                    'Suite à son passage un client a laissé un nouvel avis pour votre restaurant : ' . $this->restaurant['name']
                ],
                'actionText' => 'Voir mes avis',
                'actionUrl' => config('app.url') . '/dashboard/' . $this->restaurant->id . '/ratings',
                'outroLines' =>[
                    'Merci de votre confiance !',
                    'A bientôt'
                ]
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

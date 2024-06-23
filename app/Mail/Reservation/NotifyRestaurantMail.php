<?php

namespace App\Mail\Reservation;

use App\Http\Resources\ReservationResource;
use App\Http\Resources\RestaurantResource;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NotifyRestaurantMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public RestaurantResource $restaurant, public ReservationResource $reservation)
    {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '1 nouvelle réservation ! 🎉',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mails.reservation.created',
            with: [
                'level' => 'default',
                'introLines' => [
                    'Vous avez une nouvelle réservation le ' . $this->reservation->reservation_date . '  à ' . $this->reservation->time,
                ],
                'actionText' => 'Voir mes réservations',
                'actionUrl' => config('app.url') . '/dashboard/' . $this->restaurant->id . '/reservation',
                'outroLines' => [
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

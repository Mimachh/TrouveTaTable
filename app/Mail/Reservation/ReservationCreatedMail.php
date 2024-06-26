<?php

namespace App\Mail\Reservation;

use App\Http\Resources\ReservationResource;
use App\Http\Resources\RestaurantResource;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationCreatedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;


    public function __construct(public RestaurantResource $restaurant, public ReservationResource $reservation)
    {
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $defaultAddress = config('mail.from.address');
        return new Envelope(
            from: new Address($defaultAddress, $this->restaurant['name']),
            subject: 'Nouvelle réservation !',
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
                    'Votre réservation au restaurant ' . $this->restaurant['name'] . ' le ' . $this->reservation->reservation_date . '  à ' . $this->reservation->time . ' a bien été enregistrée !',
                    'En cas de besoin, vous pouvez contacter le restaurant en cliquant sur le bouton ci-dessous.'
                ],
                'actionText' => 'Contacter le restaurant',
                'actionUrl' => config('app.url') . '/restaurant/' . $this->restaurant->slug . '/contact',
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

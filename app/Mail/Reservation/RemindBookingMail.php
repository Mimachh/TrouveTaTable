<?php

namespace App\Mail\Reservation;

use App\Actions\FormatTime;
use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RemindBookingMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $reservation;
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Rappel: Votre réservation pour demain 🍽️',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mails.rating.new_rating_to_client',
            with: [
                'greeting' => 'Bonjour ' . $this->reservation->first_name,
                'level' => 'success',
                'introLines' => [
                    "Nous vous rappelons que vous avez une réservation chez " . $this->reservation->table->restaurant->name . " pour demain à " . (new FormatTime())->hoursAndMinutesWithH($this->reservation->time) . ". " . "Nous espérons que vous avez hâte de déguster nos plats !",
                    "Si vous avez des questions ou si vous souhaitez modifier votre réservation, n'hésitez pas à nous contacter en cliquant sur le lien : ",
                ],
                'actionText' => '📧 Contacter le restaurant 📧',
                'actionUrl' => route('restaurant.contact.get', ['slug' => $this->reservation->table->restaurant->slug]),
                'outroLines' =>[
                    "Nous vous remercions pour votre confiance et nous nous réjouissons de vous accueillir demain !",
                ],
                'salutation' => "L'équipe de " . $this->reservation->table->restaurant->name,
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

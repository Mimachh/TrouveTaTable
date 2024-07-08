<?php

namespace App\Mail\Rating;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendRatingMailToClient extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $token;
    public Reservation $reservation;
    public function __construct($token, Reservation $reservation)
    {
        $this->token = $token;
        $this->reservation = $reservation;
    }
  
    public function envelope(): Envelope
    {
        $defaultAddress = config('mail.from.address');
        return new Envelope(
            from: new Address($defaultAddress, $this->token->restaurant->name),
            subject: "Votre avis compte ! 😊",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mails.rating.new_rating_to_client',
            with: [
                'greeting' => 'Bonjour ' . $this->token->reservation->first_name,
                'level' => 'success',
                'introLines' => [
                    "Nous espérons que vous avez passé un agréable moment chez " . $this->token->restaurant->name . " !",
                    "Votre satisfaction est notre priorité, et nous aimerions beaucoup connaître votre avis sur votre récente visite. Si vous avez quelques minutes, pourriez-vous nous laisser une évaluation ? Cela nous aidera à améliorer notre service et à offrir une expérience encore meilleure.",
                    "Vous pouvez laisser votre avis en cliquant sur ce lien :",
                ],
                'actionText' => '✨ Noter le restaurant ✨',
                'actionUrl' => route('rating.index', ['token' => $this->token->token]),
                'outroLines' =>[
                    "Merci d'avance pour votre temps et votre retour. Au plaisir de vous revoir bientôt !",
                    'A bientôt'
                ],
                'salutation' => "L'équipe de " . $this->token->restaurant->name,
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

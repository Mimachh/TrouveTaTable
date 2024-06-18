<?php

namespace App\Mail\Contact;

use App\Models\Restaurant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RestaurantContacted extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public Restaurant $restaurant;
    public function __construct(Restaurant $restaurant)
    {
        $this->restaurant = $restaurant;
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouveau message reçu ! 📬',
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
                'greeting' => 'Bonjour ',
                'level' => 'success',
                'introLines' => [
                    "Un nouveau message à été reçu au restaurant " . $this->restaurant->name . " !",
                    "Nous vous invitons à en prendre connaissance afin de répondre à la demande de votre client.",
                    "Vous pouvez accéder à vos messages en cliquant sur ce lien :",
                ],
                'actionText' => 'Voir les messages',
                'actionUrl' => route('dashboard.messages.index', ['restaurant' => $this->restaurant->id]),
                'outroLines' =>[
                    "Merci de votre confiance !",
                    'A bientôt'
                ],
                'salutation' => "L'équipe de " . config('app.name'),
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

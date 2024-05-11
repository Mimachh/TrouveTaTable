<?php

namespace App\Mail\Reservation;

use App\Enums\ReservationStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ChangeStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $restaurant;
    public $reservation;
    public $status;
    public $subject;
    public $content;

    public function __construct($restaurant, $reservation, $status, $content)
    {
        $this->restaurant = $restaurant;
        $this->reservation = $reservation;
       
        $this->status = $status;
        $this->content = $content;

        

        if($status === ReservationStatus::ACCEPTED->value){
            $this->subject = 'Réservation acceptée !';
        } elseif ($status === ReservationStatus::REJECTED->value) {
            $this->subject = 'Réservation refusée.';
        } elseif ($status === ReservationStatus::CANCELED->value) {
            $this->subject = 'Annulation de votre réservation';
        } else {
            $this->subject = 'Changement de status de votre réservation';
        }

    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->restaurant['email'], $this->restaurant['name']),
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mails.reservation.status-change',
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

<?php

namespace App\Enums; 

enum ReservationStatus: string {
    case ACCEPTED = 'accepté';
    case REJECTED = 'refusé';
    case CANCELED = 'annulé';
}
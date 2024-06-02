<?php

namespace App\Http\Controllers\Public\Rating;

use App\Http\Controllers\Controller;
use App\Http\Resources\RatingRestaurantItemResource;
use App\Models\RatingRestaurantItem;
use App\Models\RatingToken;
use Carbon\Carbon;
use Illuminate\Http\Request;

class IndexRatingFormController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = $request->token;
        $success = $request->success;
        $tokenCheck = RatingToken::where('token', $token)->first();
        $errorMessage = null;
        $successMessage = null;
        $items = [];
        
        if (!$tokenCheck) {
            $errorMessage = 'Token not available';
            $successMessage = null;
        } else {
            $expiresAt = Carbon::parse($tokenCheck->expires_at);
            $now = Carbon::now();
            if ($expiresAt->lt($now)) {
                $errorMessage = 'Token has expired';
                $tokenCheck = null;
            }

            $items= RatingRestaurantItemResource::collection(RatingRestaurantItem::all());
        }

        if($success) {
            $errorMessage = null;
            $successMessage = "Votre avis a bien été pris en compte, merci beaucoup !";
        }


        return inertia('Public/Rating/Index', [
            'successMessage' => $successMessage,
            'token' => $tokenCheck['token'] ?? null,
            'errorMessage' => $errorMessage,
            'items' => $items
        ]);
    }
}

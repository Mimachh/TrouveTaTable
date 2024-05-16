<?php

namespace App\Http\Controllers\Dashboard\Messages;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Responses\ApiResponse;
use App\Models\Message;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class ShowMessageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Restaurant $restaurant, Message $message)
    {
        if (auth()->user()->cannot('view', $message)) {
            return ApiResponse::forbidden();
        }
        $messageResource = new MessageResource($message);
        return ApiResponse::ok(['message' => $messageResource]);
    }
}

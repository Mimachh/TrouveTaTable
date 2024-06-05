<?php

namespace App\Http\Controllers\Public\Rating;

use App\Actions\Ratings\CreateRating;
use App\Http\Controllers\Controller;
use App\Http\Requests\Public\Rating\CreateRatingRequest;

class CreateRatingController extends Controller
{
    public function __invoke(CreateRatingRequest $request)
    {
        $data = $request->validated();
        (new CreateRating())->createRating($data);
    }
}

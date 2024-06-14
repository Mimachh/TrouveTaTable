<?php

namespace App\Http\Controllers\Welcome;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppNewsletterRequest;
use App\Models\AppNewsletter;
use Illuminate\Http\Request;

class AppNewsletterController extends Controller
{
    public function __invoke(AppNewsletterRequest $request)
    {
        $data = $request->validated();
        $newsletter = new AppNewsletter();
        $newsletter->email = $data["email"];
        $newsletter->save();
    }
}

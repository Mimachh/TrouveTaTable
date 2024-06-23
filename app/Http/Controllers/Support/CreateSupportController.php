<?php

namespace App\Http\Controllers\Support;

use App\Http\Controllers\Controller;
use App\Http\Requests\Support\CreateSupportRequest;
use App\Mail\Welcome\ReceivedContactMail;
use App\Models\Support;
use Illuminate\Support\Facades\Mail;

class CreateSupportController extends Controller
{
    public function __invoke(CreateSupportRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $support = Support::create($data);
        Mail::send(new ReceivedContactMail());
    }
}

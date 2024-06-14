<?php

namespace App\Http\Controllers\Welcome;

use App\Http\Controllers\Controller;
use App\Http\Requests\Welcome\CreateContactRequest;
use App\Mail\Welcome\ReceivedContactMail;
use App\Models\AppContact;
use Illuminate\Support\Facades\Mail;

class CreateContactController extends Controller
{
    public function __invoke(CreateContactRequest $request)
    {
        $data = $request->validated();
        $contact = AppContact::create($data);
        Mail::send(new ReceivedContactMail());
    }
}

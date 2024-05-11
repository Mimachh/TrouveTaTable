<x-mail::message>

<h1
style="font-size: 20px;"
>Bonjour {{ $reservation['last_name'] }} {{ $reservation['first_name'] }}</h1>

<p>Information concernant votre réservation au restaurant {{$restaurant->name}} le {{ $reservation["reservation_date"] }} à {{ $reservation->time }} est {{ $status }}</p>

<div>
<h3>Raison du restaurateur : </h3>

<x-mail::submessage
bgcolor='lightblue'
textcolor='darkblue'
>{{ $content }}</x-mail::submessage>
</div>

@if($status === "refusé" || $status === "annulé")
<small>Vous pouvez réserver une nouvelle table sur ce lien :</small>
<x-mail::button :url="config('app.url') . '/book/' . $restaurant->id">
    Choisir une nouvelle date
</x-mail::button>
@endif

</x-mail::message>
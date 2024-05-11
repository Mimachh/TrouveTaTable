@props([
    'bgcolor' => 'black',
    'textcolor' => 'lightgrey',
])

<div
style="padding: 15px; color: {{ $textcolor }}; background-color: {{ $bgcolor }}; border-radius: 5px; margin: 10px 0;"
>
<p>{{ Illuminate\Mail\Markdown::parse($slot) }}</p>
</div>
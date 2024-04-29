<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>MiDocs</title>

    @vite(['resources/css/app.css'])
</head>

<body class="font-poppins antialiased bg-background text-background-foreground">
    <div class="">
        <header class=" w-full">
            <div class="h-[112px] flex items-center mx-auto max-w-7xl">


                <div class="flex items-center gap-12">
                    <img class="w-12 h-[60px] aspect-square bg-cover" src="{{url('svg/LogoShort.svg')}}" />
                    <div class="flex items-center gap-3">
                    <a class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white" href="{{ route('subscribe.create', ['product' => '4f4933c2-b66f-45d6-b6ec-2dee40e796e3', 'recurrence' => 'monthly']) }}">Fonctionnalités</a>
                        <a class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white" href="{{ route('subscribe.create', ['product' => '4f4933c2-b66f-45d6-b6ec-2dee40e796e3', 'recurrence' => 'monthly']) }}">Abonnement</a>

                        <a class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white" href="{{ route('subscribe.create', ['product' => '4f4933c2-b66f-45d6-b6ec-2dee40e796e3', 'recurrence' => 'monthly']) }}">Prix</a>
                    </div>

                </div>
                @if (Route::has('login'))
                <nav class="-mx-3 flex flex-1 gap-3 text-sm justify-end">

                    <a class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900" variant="solid" color="slate" href="/register">
                        M'inscrire
                    </a>

                    @auth
                    <a href="{{ url('/dashboard') }}" class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Dashboard
                    </a>
                    @else
                    <a href="{{ route('login') }}" class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Log in
                    </a>

                    @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Register
                    </a>
                    @endif
                    @endauth
                </nav>
                @endif
            </div>
        </header>
        <x-welcome.landing />
        <x-welcome.get-started />
        <x-welcome.price />
        <x-welcome.roadmap />
    </div>

</body>

</html>
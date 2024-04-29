<div class="bg-white py-24 sm:py-32" id="#price">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
            <h2 class="text-base font-semibold leading-7 text-primaryBlue">Prix</h2>
            <p class="mt-2 text-4xl font-bold tracking-tight text-background-foreground sm:text-5xl">Abonnements</p>
        </div>
        <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
            Choisissez l'abonnement qui vous convient le mieux. Notre offre payante convient à tous types de besoins, des freelances aux grandes entreprises.
        </p>
        <div class="mt-16 flex justify-center">
            <fieldset class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                <legend class="sr-only">Récurrence</legend>
                <label id="monthly" class="cursor-pointer rounded-full px-2.5 py-1">
                    <input type="radio" name="frequency" value="monthly" class="sr-only">
                    <span>Mensuel</span>
                </label>
                <label id="annually" class="cursor-pointer rounded-full px-2.5 py-1">
                    <input type="radio" name="frequency" value="annually" class="sr-only">
                    <span>Annuel</span>
                </label>
            </fieldset>
        </div>
        <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            @foreach($products as $index => $product)

            <div class="card rounded-3xl p-8 xl:p-10 {{ $index === 1 ? 'ring-2 ring-primaryBlue' : 'ring-1 ring-gray-200' }} " data-product-id="{{ $product->id }}">
                <div class="flex items-center justify-between gap-x-4">
                    <h3 id="tier-freelancer" class="text-lg font-semibold leading-8 {{ $index === 1 ? 'text-primaryBlue' : 'text-background-foreground' }}">{{ $product->name }}</h3>
                    @if($index === 1)
                    <p class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">Le plus populaire</p>
                    @endif
                </div>
                <p class="mt-4 text-sm leading-6 text-gray-600">The essentials to provide your best work for clients.</p>
                <p class="mt-6 flex items-baseline gap-x-1">
                    <!-- Price, update based on frequency toggle state -->
                    <span class="product-price text-4xl font-bold tracking-tight text-gray-900"></span>
                    <!-- Payment frequency, update based on frequency toggle state -->
                    <span class="product-price-period text-sm font-semibold leading-6 text-gray-600"></span>
                </p>
                <a href="{{ $index === 1 ? url('/subscribe/' . $product->id) : ($index === 2 ? '/contact' : '/register') }}" aria-describedby="tier-{{ $product->name }}" class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset 
                ring-indigo-200
                hover:ring-indigo-300 {{ $index === 1 ? 'subscribe-link bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 ' : '' }}">
                    {{ $index === 1 ? "S'abonner" : ($index === 2 ? 'Nous contacter 👉' : "Tester gratuitement") }}
                </a>
                <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                    @foreach (json_decode($product->description, true) as $item)
                    <li class="flex gap-x-3">
                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                        </svg>
                        {{ $item }}
                    </li>
                    @endforeach

                </ul>
            </div>


            @endforeach
        </div>
    </div>
</div>


<script>
    var products = @json($products);

    var frequencyInputs = document.querySelectorAll('input[name="frequency"]');
    var monthlyButton = document.querySelector('input[name="frequency"][value="monthly"]').parentElement;
    var annuallyButton = document.querySelector('input[name="frequency"][value="annually"]').parentElement;

    frequencyInputs.forEach(function(input) {
        if(!input.dataset.eventAdded) {
            input.addEventListener('change', function() {
            var isMonthly = this.value === 'monthly';
            products.forEach(function(product) {
                var card = document.querySelector('.card[data-product-id="' + product.id + '"]');
                var priceElement = card.querySelector('.product-price');
                var pricePeriodElement = card.querySelector('.product-price-period');
                var subscribeLink = card.querySelector('.subscribe-link');
                if (product.price) {
                    var price = JSON.parse(product.price);
                    var selectedPrice = isMonthly ? price.monthly : price.annually;
                    if (selectedPrice === -1) {
                        priceElement.textContent = '';
                        pricePeriodElement.textContent = '';
                    } else {
                        priceElement.textContent = selectedPrice.toFixed(2);
                        pricePeriodElement.textContent = ' €/mois';
                    }
                } else {
                    priceElement.textContent = '0';
                    pricePeriodElement.textContent = ' €';
                }

                // Mettre à jour l'URL du lien d'abonnement
                if (subscribeLink) {
                    var recurrence = isMonthly ? "monthly" : "annually";
                    var originalHref = subscribeLink.getAttribute('href');
                    var url = new URL(originalHref);
                    url.searchParams.set('recurrence', recurrence);
                    subscribeLink.setAttribute('href', url.toString());
                }
            });

            if (isMonthly) {
                monthlyButton.classList.add('bg-primaryBlue', 'text-background');
                monthlyButton.classList.remove('text-muted-foreground');

                annuallyButton.classList.add('text-muted-foreground');
                annuallyButton.classList.remove('bg-primaryBlue', 'text-background');
            } else {
                annuallyButton.classList.add('bg-primaryBlue', 'text-background');
                annuallyButton.classList.remove('text-muted-foreground');

                monthlyButton.classList.add('text-muted-foreground');
                monthlyButton.classList.remove('bg-primaryBlue', 'text-background');
            }
        });

        input.dataset.eventAdded = 'true';
        }
    });

 

    // Déclenchez manuellement l'événement change pour le bouton mensuel
    monthlyButton.querySelector('input').dispatchEvent(new Event('change'));
</script>
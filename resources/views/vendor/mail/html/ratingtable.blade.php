@props(['ratingRestaurant'])

<table class="rating-table-container" role="presentation">
    <tr>
        <!-- Première ligne -->
        <td class="rating-table-cell">
            <!-- Première colonne: note globale -->
            <p>Note Globale</p>
            <p class="rating-global-rating">{{ $ratingRestaurant->notes->avg('note') }}</p>
        </td>
        <td class="rating-table-cell">
            <!-- Deuxième colonne: items et notes -->
            <table class="rating-item-rating-table" role="presentation">
                @foreach($ratingRestaurant->notes as $rating)
                <tr>
                    <td class="rating-item-rating-cell">
                        {{ $rating->ratingRestaurantItem->name }}: <strong>{{ $rating->note }}</strong>
                    </td>
                </tr>
                @endforeach
            </table>
        </td>
    </tr>
    <tr>
        <!-- Deuxième ligne -->
        <td class="rating-table-cell" colspan="2">
            <p>Commentaire:</p>
            <p class="rating-comment-cell">
                {{ $ratingRestaurant->comment ?? 'Aucun commentaire'}}
            </p>
        </td>
    </tr>
</table>

    useEffect(() => {
        if (analyticsTrackingId) {
            // Insérer dynamiquement le script de suivi Google Analytics
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsTrackingId}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', analyticsTrackingId);
        }
    }, [analyticsTrackingId]);



    public function show($slug)
{
    $restaurant = Restaurant::where('slug', $slug)->with('analyticsInfo')->firstOrFail();
    $analyticsTrackingId = $restaurant->analyticsInfo->google_analytics_tracking_id ?? null;

    return Inertia::render('RestaurantPage', [
        'restaurant' => $restaurant,
        'analyticsTrackingId' => $analyticsTrackingId,
    ]);
}


// Route dans web.php
Route::get('/restaurant/{id}/analytics', [RestaurantController::class, 'showAnalyticsForm']);
Route::post('/restaurant/{id}/analytics', [RestaurantController::class, 'storeAnalyticsInfo']);


class AnalyticsInfo extends Model
{
    use HasFactory;

    protected $fillable = ['restaurant_id', 'google_analytics_tracking_id'];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}

        Schema::create('analytics_info', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id');
            $table->string('google_analytics_tracking_id');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        });
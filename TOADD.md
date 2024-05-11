dans un service/ repository / action :
if ($question->user_id == auth()->id()) {
throw new \Exception('You are not allowed to vote on your own question');
}

        utiliser throw permet de récupérer dans le controller


            try {
            $voice = $service->store($request->input('question_id'), $request->input('value'));
        } catch (\Exception $e) {
            abort(500, $e->getMessage());
        }



// un service pour convertir la monnaie : 
class CurrencyService
{
    const RATES = [
        'usd' => [
            'eur' => 0.98
        ]
    ];
    public function convert(float $amount, string $fromCurrency, string $toCurrency): float
    {
        $conversionRate = self::RATES[$fromCurrency][$toCurrency] ?? 0;
        return round($amount * $conversionRate, 2);
    }
}

puis le controller 

class CurrencyTest extends TestCase
{
    public function testConversionFromUSDToEUR(): void
    {
        $amountInUSD = 100;
        $expectedAmountInEUR = 98;
        
        $convertedAmount = (new CurrencyService())->convert($amountInUSD, 'usd', 'eur');
        
        $this->assertEquals($expectedAmountInEUR, $convertedAmount);
    }
    public function testConversionFromGBPToEUR(): void
    {
        $amountInGBP = 100;
        
        // This will return 0 because we haven't provided a conversion rate from GBP to EUR in our service
        $convertedAmount = (new CurrencyService())->convert($amountInGBP, 'gbp', 'eur');
        
        $this->assertEquals(0, $convertedAmount);
    }
}
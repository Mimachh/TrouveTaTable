<?php

namespace App\View\Components\Welcome;

use App\Models\Product;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Price extends Component
{
    /**
     * Create a new component instance.
     */
    public $products;
    public function __construct()
    {
        $this->products = Product::orderBy('order')->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.welcome.price', ['products' => $this->products]);
    }
}

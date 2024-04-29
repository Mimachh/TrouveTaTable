<div>
<input id="card-holder-name" type="text">
 
 <!-- Stripe Elements Placeholder -->
 <div id="card-element"></div>
  
 <button id="card-button" data-secret="{{ $intent->client_secret }}">
     Update Payment Method
 </button>
</div>
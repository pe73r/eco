/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

var $jq = jQuery.noConflict();

$jq(document).ready(function() {
  /* Footer */
   $jq(document).on('click', '.Footer__Title', function() {
     var contentToShow = $jq(this).next('.Footer__Block__Inner');
     contentToShow.slideToggle();
   });
  
  /* Page Collection */
  $jq(document).on('click', '.Popover__Value', function() {
  	var sort_value = $jq(this).attr('data-value');
    
    switch (sort_value) { 
	case 'best-selling': 
		window.location = "?sort_by=best-selling";
		break;
	case 'title-ascending': 
		window.location = "?sort_by=title-ascending";
		break;
	case 'price-ascending': 
		window.location = "?sort_by=price-ascending";
		break;		;
	default:
	}
  });
  
  /* Cart Drawer */
  $jq(document).on('click', '.dcodeButton', function() {
    if($jq('.dcodeInput').val()) { // on execute la fonction que si le champ code promo n'est pas vide
      setTimeout(function(){
        if(!$jq('.dcodeErrorMessage').length) { // on execute la fonction que si le code promo est valide
          var originalPrice = $jq('.Button__TotalPriceOriginal').html();
          var originalPriceShort = originalPrice.substring(0, originalPrice.length - 1);
          var originalPriceNumber = originalPriceShort.replace(",", ".");
          var originalPriceValue = Number(originalPriceNumber);
          var discountTotal = $jq('.dcode-discount-value').html();
          var discountTotalValue = Number(discountTotal);
          var discountPrice = originalPriceValue - discountTotalValue;
          $jq('.Button__TotalPrice').html(discountPrice.toFixed(2) + "€");
          $jq('.Button__TotalDiscount').html(discountTotalValue);
        }
      }, 1000);
    }
  });
  
  $jq(document).keyup(function (e) {
   var key = e.which;
    if(key == 13) {  // the enter key code
      if($jq('.dcodeInput').val()) { // on execute la fonction que si le champ code promo n'est pas vide
        setTimeout(function(){
          if(!$jq('.dcodeErrorMessage').length && $jq('.dcode-discount-value').length){ // on execute la fonction que si le code promo est valide
            var originalPrice = $jq('.Button__TotalPriceOriginal').html();
            var originalPriceShort = originalPrice.substring(0, originalPrice.length - 1);
            var originalPriceNumber = originalPriceShort.replace(",", ".");
            var originalPriceValue = Number(originalPriceNumber);
            var discountTotal = $jq('.dcode-discount-value').html();
            var discountTotalValue = Number(discountTotal);
            var discountPrice = originalPriceValue - discountTotalValue;
            $jq('.Button__TotalPrice').html(discountPrice.toFixed(2) + "€");
            $jq('.Button__TotalDiscount').html(discountTotalValue);
          }
        }, 1000);
      }  
    }
  }); 
  
  $jq(document).on('click', '#removeDiscount', function() {
          var discountPrice = $jq('.Button__TotalPrice').html();
          var discountPriceShort = discountPrice.substring(0, discountPrice.length - 1);
          var discountPriceNumber = discountPriceShort.replace(",", ".");
          var discountPriceValue = Number(discountPriceNumber);
          var discountTotal = $jq('.Button__TotalDiscount').html();
          var discountTotalValue = Number(discountTotal);
          var originalPrice = discountPriceValue + discountTotalValue;
    	  var originalPriceValue = originalPrice.toString();
    	  var originalPriceNumber = originalPriceValue.replace(".", ",");
          $jq('.Button__TotalPrice').html(originalPriceNumber + "€");
  });
  
  /* Page Produit */
  $jq( ".template-product .Product__Slideshow" ).removeClass("flickity-enabled");
  var labelContenance = $jq('.template-product .ProductForm__Variants .ProductForm__Label').eq(0);
  if (labelContenance[0].innerText.indexOf("Contenance") > -1) {
  	labelContenance.hide();
  }
  
});

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("Collapsible__Inner");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("Collapsible");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
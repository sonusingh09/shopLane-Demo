$(document).ready(function(){
    $('.center').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
       
    });

    function createProductCard(cardDetails) {


      let mainDiv = $('<div>').addClass('product-card');
      console.log(mainDiv)


      let productLink = $('<a>');
      productLink.attr("href", "./assets/product/product.html?p="+cardDetails.id);
     
      console.log(productLink)
     
      let productImage =  $('<img>').addClass('product-image');
      
      console.log(productImage);
      productImage.attr("src", cardDetails.preview);
      productImage.attr("alt",cardDetails.name);


      productLink.append(productImage);

      let productDescriptionDiv = $('<div>').addClass('product-desc');


      let productName = $('<h4>').text(cardDetails.name);
      

      let productBrand = $('<h5>').text(cardDetails.brand);
      

      let productPrice = $('<p>').text('Rs ' + cardDetails.price);
      
      productDescriptionDiv.append(productName);
      productDescriptionDiv.append(productBrand);
      productDescriptionDiv.append(productPrice);

      mainDiv.append(productLink);
      mainDiv.append(productDescriptionDiv);

      return mainDiv;
    }

    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(data) {

      for(var i=0; i<data.length; i++) {
        if(data[i].isAccessory===true) {
          
          $('#accessory-grid').append(createProductCard(data[i]))
        } else {
          $('#clothing-grid').append(createProductCard(data[i]))
        }
      }
    })
}); 
$(document).ready(function() {
  var SelectedProduuct = window.localStorage.getItem('selected-product');
  SelectedProduuct = (SelectedProduuct === null || SelectedProduuct === '') ? ([]) : (SelectedProduuct) ;
  SelectedProduuct = SelectedProduuct.length > 0 ? JSON.parse(SelectedProduuct) : [];

  var totalCount = 0;
  for(var i=0; i<SelectedProduuct.length; i++) {
      totalCount = totalCount + SelectedProduuct[i].count;
  }

  $('#cart-total').html(totalCount);
})
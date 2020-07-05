$(document).ready(function() {

    //function checkout products

    function selectedProductId(obj) {

        let buyProductCard = $('<div>').addClass('buyProductCard');
        let productThumbnailDiv = $('<div>');
        let productImage = $('<img>').addClass('product-image');
        productImage.attr('src',obj.preview);
        productThumbnailDiv.append(productImage);
        let productDetails = $('<div>');
        let productName = $('<h4>');
        productName.text(obj.name);
        let productCount = $('<p>');
        productCount.html('x'+obj.count);
        console.log(productCount)
        let amountLabel = $('<span>');
        amountLabel.html('Amount: Rs ');
        let amountSpan = $('<span>');
        amountSpan.html(parseInt(obj.count) * parseInt(obj.price));
        let productAmount = $('<p>');
        productAmount.append(amountLabel);
        productAmount.append(amountSpan);
        productDetails.append(productName);
        productDetails.append(productCount);
        productDetails.append(productAmount);
        buyProductCard.append(productThumbnailDiv);
        buyProductCard.append(productDetails);
        return buyProductCard;
    }

        //handling cart
    let selectedProduct = window.localStorage.getItem('selected-product');
    selectedProduct = selectedProduct === null || selectedProduct === '' ? [] : selectedProduct;
    selectedProduct = selectedProduct.length > 0 ? JSON.parse(selectedProduct) : [];
    var grandTotal = 0;
    for(var i=0; i<selectedProduct.length; i++) {
        $('#card-list').append(selectedProductId(selectedProduct[i]));

        var totalForCurrentProduct = parseFloat(selectedProduct[i].count) * parseFloat(selectedProduct[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;
}

    $('#item-count').html(selectedProduct.length);
    $('#total-amount').html(grandTotal);

    $('#btn-order').click(function() {

        var temp = [];
        for(var i=0; i<selectedProduct.length; i++) {
            var prodObj = {
                "id": selectedProduct[i].id,
                "brand": selectedProduct[i].brand,
                "name": selectedProduct[i].name,
                "price": selectedProduct[i].price,
                "preview": selectedProduct[i].preview,
                "isAccessory": selectedProduct[i].isAccessory
            }

            temp.push(prodObj);
        }

  
        var dataObj = {
            amount: grandTotal,
            products: temp
        }
        $.post('https://5eed1a8d4cbc340016330ede.mockapi.io/order', dataObj, function() {
            alert('Order Placed Successfully')
            localStorage.setItem('selected-product', []);
            location.assign('../thankyou/thankyou.html');
        })
    })
})
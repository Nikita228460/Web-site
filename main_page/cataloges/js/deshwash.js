$(document).ready(function(){ 
    $.ajax({
         type: "GET",
         url: "/catalog/data/data.xml",
         dataType: "xml",
         success: function(xml){
             $(xml).find('product').each(function(){
                 var id = $(this).find('id').text();
                 if ([18, 17, 16].includes(parseInt(id))) {
                     var url = $(this).find('url').text();
                     var image = $(this).find('image').text();
                     var name = $(this).find('name').text();
                     var price = $(this).find('price').text();
                     var discountedPrice = $(this).find('discountedPrice').text();
                     var availability = $(this).find('availability').text();

                     var productDiv = $('<div class="card"></div>');
                     productDiv.append(`
                         <a href="${url}">
                             <div><img src="${image}"></div>
                             <div>${name}</div>
                         </a>
                         <div>${price} <span class="discounted-price">${discountedPrice}</span></div>
                         <div>${availability}</div>
                         <button class="Button" onclick="addToCart('${id}')">В корзину</button>
                     `);
                     $('.Stocks').append(productDiv);
                 }
             });
         } 
    });
});

function addToCart(productId) {
    localStorage.setItem('selectedProductId', productId);
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchText = this.value.toLowerCase();

            switch(searchText) {
                case 'стиральные машины':
                    window.location.href = '/main_page/cataloges/html/washmach.html';
                    break;
                case 'холодильники':
                    window.location.href = '/main_page/cataloges/html/frz.html';
                    break;
                case 'посудомоечные машины':
                    window.location.href = '/main_page/cataloges/html/deshwash.html';
                    break;
                case 'микроволновые печи':
                    window.location.href = '/main_page/cataloges/html/micr.html';
                    break;
                case 'кухонные плиты':
                    window.location.href = '/main_page/cataloges/html/plit.html';
                    break;
                case 'пылесосы':
                    window.location.href = '/main_page/cataloges/html/pilesos.html';
                    break;
                case 'кондиционеры':
                    window.location.href = '/main_page/cataloges/html/cond.html';
                    break;
                default:
                    this.value = 'Поиск не распознан';
            }
        }
    });
});
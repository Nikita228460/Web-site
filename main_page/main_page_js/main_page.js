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

var images = document.querySelectorAll('.Billboard .images img');
var currentIndex = 0;

function showImage(index) {
    for (var i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
    }
    images[index].style.display = 'block';
}

function nextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

function previousImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showImage(currentIndex);
}

showImage(0);

document.querySelector('.nextButton').addEventListener('click', nextImage);
document.querySelector('.previousButton').addEventListener('click', previousImage);

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.toggle');

    function toggleList(event) {
        const index = Array.from(buttons).indexOf(event.target);

        const list = document.querySelector(`.info-list${index + 1}`);

        if (list.style.display === 'none') {
            list.style.display = 'block';
            event.target.textContent = '-';
        } else {
            list.style.display = 'none';
            event.target.textContent = '+';
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', toggleList);
    });
});

$(document).ready(function(){ 
    $.ajax({
         type: "GET",
         url: "/main_page/data/data.xml",
         dataType: "xml",
         success: function(xml){
             $(xml).find('product').each(function(){
                 var id = $(this).find('id').text();
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
                     <button class="Button addToCartBtn" data-id="${id}">В корзину</button>
                 `);
                 $('.Stocks').append(productDiv);
             });
         } 
    });
});

$(document).on('click', '.addToCartBtn', function() {
    var productId = $(this).data('id');
    addToCart(productId);
    window.location.href = '/basket/basket_html/basket.html';
});

function addToCart(productId) {
    localStorage.setItem('selectedProductId', productId);
}
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

$(document).ready(function(){
    var productsInCart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        $('.elements').empty();
        var totalAmount = 0;
        productsInCart.forEach(function(product) {
            var productDiv = $('<div class="card"></div>');
            productDiv.append(`
                <a href="${product.url}">
                    <div><img src="${product.image}" alt="Product Image"></div>
                    <div>${product.name}</div>
                </a>
                <div>${product.price}</div>
                <button class="Button">Удалить</button>
            `);

            productDiv.find('.Button').click(function() {
                removeProductFromCart(product.id);
            });

            $('.elements').append(productDiv);
            totalAmount += parseFloat(product.price);
        });

        $('.Num').text(productsInCart.length);
        $('.Price').text(totalAmount.toFixed(2));
    }

    function addProductToCart(product) {
        var existingProduct = productsInCart.find(p => p.id === product.id);
        if (!existingProduct) {
            productsInCart.push(product);
        } else {
            existingProduct.url = product.url;
            existingProduct.image = product.image;
            existingProduct.name = product.name;
            existingProduct.price = product.price;
        }
        localStorage.setItem('cart', JSON.stringify(productsInCart));
        updateCartDisplay();
    }

    function removeProductFromCart(productId) {
        productsInCart = productsInCart.filter(product => product.id!== productId);
        localStorage.setItem('cart', JSON.stringify(productsInCart));
        updateCartDisplay();
    }

    var productId = localStorage.getItem('selectedProductId');
    if (productId) {
        $.ajax({
            type: "GET",
            url: "/main_page/data/data.xml",
            dataType: "xml",
            success: function(xml) {
                var product = $(xml).find('product[id="' + productId + '"]');
                if (product.length > 0) {
                    var url = product.find('url').text();
                    var image = product.find('image').text();
                    var name = product.find('name').text();
                    var price = product.find('price').text();

                    console.log("URL:", url);
                    console.log("Image:", image);
                    console.log("Name:", name);
                    console.log("Price:", price);

                    addProductToCart({id: productId, url: url, image: image, name: name, price: price});
                } else {
                    console.error("Товар с ID " + productId + " не найден.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Ошибка при загрузке данных о товаре: " + error);
            }
        });
    } else {
        console.error("ID продукта не найден в localStorage.");
    }
});

document.querySelector('.but').addEventListener('click', function() {
    window.location.href = "/basket/form/form.html";
});
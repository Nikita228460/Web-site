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

$(document).ready(function() {
    function clearProducts() {
        $('.Stocks').empty();
    }

    function addProductsById(idRange) {
        clearProducts();

        $.ajax({
            type: "GET",
            url: "/catalog/data/data.xml",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('product').each(function() {
                    var id = parseInt($(this).find('id').text());
                    if ($.inArray(id, idRange)!== -1) {
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
                            <div>${price}</div>
                            <div>${availability}</div>
                            <button class="Button">В корзину</button>
                        `);
                        $('.Stocks').append(productDiv);
                    }
                });
            }
        });
    }

    $('.vac,.stir,.micr,.plit,.hol,.pos,.kon').on('change', function() {
        var idRange;
        if ($(this).hasClass('vac')) {
            idRange = [1, 2, 3];
        } else if ($(this).hasClass('stir')){
            idRange = [4, 5, 6];
        } else if ($(this).hasClass('micr')){
            idRange = [7, 8, 9];
        } else if ($(this).hasClass('plit')){
            idRange = [10, 11, 12];
        } else if ($(this).hasClass('hol')){
            idRange = [13, 14, 15];
        } else if ($(this).hasClass('pos')){
            idRange = [16, 17, 18];
        } else if ($(this).hasClass('kon')){
            idRange = [19, 20, 21];
        }

        if ($(this).is(':checked')) {
            addProductsById(idRange);
        } else {
            clearProducts();
            $.ajax({
                type: "GET",
                url: "/catalog/data/data.xml",
                dataType: "xml",
                success: function(xml) {
                    $(xml).find('product').each(function() {
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
                            <div>${price}</div>
                            <div>${availability}</div>
                            <button class="Button">В корзину</button>
                        `);
                        $('.Stocks').append(productDiv);
                    });
                }
            });
        }
    });

    $.ajax({
        type: "GET",
        url: "/catalog/data/data.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('product').each(function() {
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
                    <div>${price}</div>
                    <div>${availability}</div>
                    <button class="Button">В корзину</button>
                `);
                $('.Stocks').append(productDiv);
            });
        }
    });
});

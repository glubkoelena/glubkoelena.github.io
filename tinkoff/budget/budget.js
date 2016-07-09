jQuery(document).ready(function($){

     $('ul').click(function() {

        if($(this).next('div.main-block').toggle().is(':visible')) {

            $(this).find('i').
                removeClass('plus_hidden').addClass('minus_hidden');
        }
        else {

                removeClass('minus_hidden').addClass('plus_hidden');
        }

        recalculate();
    });

});


Number.prototype.format = function(decimals) {
    decimals = ((decimals !== undefined) ? decimals : 0);
    var parts = String(this.toFixed(decimals)).split('.');
    var integer = parts[0];
    var fraction = parts[1];
    var slice, slices = [];
    while (slice = integer.slice(-3)) {
        slices.push(slice);
        integer = integer.substr(0, integer.length - 3);
    }

    var result = slices.reverse().join(' ');
    if (fraction)
        result += '.' + fraction;

    return result;
}

window.resetRunnningFlag = false;


function recalculate() {
    if (window.resetRunnningFlag) return;
    var total = 0;
    var subtotal = [];

    $('#baby-cost div.main-block').each(function() {
        var totalcategory = 0;

        $(this).find('ul.product:not(.product_uncheck)').each(function() {
            var price = parseFloat($(this).find('li.price input').val());
            if (!price) price = 0;
            var quantity = parseInt($(this).find('li.qnt input').val());
            var months = parseInt($(this).find('li.months input').val());
            if (!months) months = 1;
            if (!quantity) quantity = 1;
            var productcost = price * quantity * months;
            $(this).find('li.price-item span b').html(productcost.format(2));
            totalcategory += productcost;
        });
        $(this).prev('ul').find('li').html(totalcategory.format(2));
        var category = $(this).prevAll('div');
        if (category.length) {
            var idcategory = category.find('span').attr('id');
            if (!(idcategory in subtotal)) {
                subtotal[idcategory] = 0;
            }
            subtotal[idcategory] += totalcategory;
        }
        total += totalcategory;
    });
    if (subtotal) {
        for (var id in subtotal)
            $('#' + id).html(subtotal[id].format(2));
    }
    $('#baby-cost div.total span.main-total span').html(total.format(2));
}


function reset() {
    window.resetRunnningFlag = true;
    $('li.check input').each(function() {
        var itemchecked = $(this).data('default');
        if (itemchecked)
            $(this).attr('checked', 'checked');
        else
            $(this).removeAttr('checked');
        $(this).change();
    });
    $('li.price input, li.qnt input, li.months input').each(function() {
        $(this).val( $(this).data('default') );
    });
    window.resetRunnningFlag = false;
}


function setHandlers() {

    $('ul.product li.check input').change(function() {
        var ul = $(this).closest('ul.product');
        if($(this).get(0).checked)
            ul.removeClass('product_uncheck');
        else
            ul.addClass('product_uncheck');
        recalculate()
    });


    $('li.qnt span.minus').click(function() {
        var quantity = $(this).parent().find('input');
        var val = parseInt(quantity.val());
        if(val > 0) {
            quantity.val(val - 1);
            recalculate();
        }
    });


    $('li.qnt span.plus').click(function() {
        var quantity = $(this).parent().find('input');
        quantity.val(parseInt(quantity.val()) + 1);
        recalculate();
    });


    $('li.months span.minus').click(function() {
        var quantity = $(this).parent().find('input');
        var val = parseInt(quantity.val());
        if(val > 1) {
            quantity.val(val - 1);
            recalculate();
        }
    });


    $('li.months span.plus').click(function() {
        var quantity = $(this).parent().find('input');
        var val = parseInt(quantity.val());
        if(val < 12) {
            quantity.val(val + 1);
            recalculate();
        }
    });





    $('li.price input').keyup(function() {
        var val = $(this).val();
        val = val.replace(/[^\d\.]/g, '');
        $(this).val(val);
        recalculate();
    });


    $('li.qnt input').keyup(function() {
        var val = $(this).val();
        val = val.replace(/\D/g, '');
        if(!val || val < 1) val = 1;
        $(this).val(val);
        recalculate();
    });


    $('li.months input').keyup(function() {
        var val = $(this).val();
        val = parseInt(val.replace(/\D/g, ''));
        if(val > 12) val = 12;
        else if(!val || val < 1) val = 1;
        $(this).val(val);
        recalculate();
    });




}



// bootstrap function
function bootstrap() {
    $(function() {
        setHandlers();
        hideCategories();
        recalculate();
    });
}

function checkOrder(){
  var fullsum = 0;
  var quantity = 0;
  var sum = 0;
  var delivery = parseInt($('#delivery-cart option:selected').val());
  var code;
  $('#delivery-order').val(delivery);
  $('.product-line').each(function(i, elem){
    code = $(this).data('code');
    sum = $('#price-'+code).html() * $('input[name='+code+']').val();
    quantity = parseInt(quantity) + parseInt($('input[name='+code+']').val());
    fullsum = fullsum + sum;
    $('#cost-'+code).html(sum);
  });
  if (($('#delivery-cart').val() == '0') && (fullsum < 10000)){
      fullsum = fullsum + 400;
      $('#delivery-cost').html('400');
  }else{
      $('#delivery-cost').html('0');
  }
  $('#fullsum').html(fullsum);
  $('#fullquantity').html(quantity);

    $.ajax({
        type: 'POST',
        url: '/update.php',
        dataType: 'html',
        data: $('form[name=cart]').serializeArray()
    });
  if ($('.product-line').length == 0) {
      $('#middlecontent').html('<h1>Оформление заказа</h1><center>Нет товаров!</center>');
        $.ajax({
            type: 'POST',
            url: '/update.php',
            dataType: 'text',
            data: {delivery: '0'}
        });
  }
}

$('.delete').click(function(elem){
    $('#'+$(this).data('code')).remove();
    $.ajax({
        type: 'GET',
        url: 'remove.php?product='+$(this).data('code')
});
    checkOrder();
});

$('.quantity,#delivery-cart').bind('change paste keyup', function(){checkOrder();});
$('#submit').click(function(){
    if (checkFields()){
       $('#order').submit(function(event){event.preventDefault();});
    }

});

$("#order").validate({
    rules: {
        lname: {
            required: true,
            minlength: 3
        },
        phone: {
            required: true,
            minlength: 7
        }
    },
    messages: {
        lname: {
            required: '',//'Укажите ФИО',
            minlength: ''//'ФИО не может быть меньше 3-х символов'
        },
        phone: {
            required: '',//'Укажите номер телефона',
            minlength: ''//'Укажите <b>правильный</b> номер телефона'
        }
    }
});

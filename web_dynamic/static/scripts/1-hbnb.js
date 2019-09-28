$(document).ready(function () {
  const lista = [];
  const listn = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      lista.push($(this).attr('data-id'));
      listn.push($(this).attr('data-name'));
    } else if ($(this).prop('checked') === false) {
      lista.splice($.inArray($(this).attr('data-id'), lista), 1);
      listn.splice($.inArray($(this).attr('data-name'), listn), 1);
    }
    $('.amenities h4').text(listn);
  });
});

$(document).ready(function () {
  const lista = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      lista.push($(this).attr('data-id'));
    } else if ($(this).prop('checked') === false) {
      lista.splice($.inArray($(this).attr('data-id'), lista), 1);
    }
  });
});

$(document).ready(function () {
  const lista = [];
  const nombres = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      lista.push($(this).attr('data-id'));
      nombres.push($(this).attr('data-name'));
    } else if ($(this).prop('checked') === false) {
      lista.splice($.inArray($(this).attr('data-id'), lista), 1);
      nombres.splice($.inArray($(this).attr('data-name'),nombres), 1);
      }
    console.log(nombres);
    $(".amenities h4").text(nombres);
  });
  let jqxhr = $.get( "http://0.0.0.0:5001/api/v1/status/", function() {
    alert( "success" );
    $("DIV#api_status").addClass("available");
  })
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
    $("DIV#api_status").removeClass("available");
  })
  .always(function() {
    alert( "finished" );
  });
});

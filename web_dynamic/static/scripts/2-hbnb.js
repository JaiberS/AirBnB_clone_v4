$(document).ready(function () {
  const lista = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      lista.push($(this).attr('data-id'));
    } else if ($(this).prop('checked') === false) {
      lista.splice($.inArray($(this).attr('data-id'), lista), 1);
    }
  });
  let jqxhr = $.get( "http://0.0.0.0:5001/api/v1/status/", function() {
    alert( "success" );
    $("api_status").addClass("available");
  })
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
    $("api_status").removeClass("available");
  })
  .always(function() {
    alert( "finished" );
  });
});

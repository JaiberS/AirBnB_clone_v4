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
    $("DIV#api_status").addClass("available");
  })
  .fail(function() {
    $("DIV#api_status").removeClass("available");
  })
  const url = "http://0.0.0.0:5001/api/v1/places_search/";
  console.log("prueba");
  $.ajax({
          type : "POST",
          url : url,
          contentType : "application/json",
          data : "{}",
          success : function(data) {
             $.each(data, function(key, value) {
                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2><div class="price_by_night">' + value.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + value.max_guest + 'Guests </div> <div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />'+ value.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + value.number_bathrooms +'Bathroom </div> </div><div class="description">' + value.description + '</div></article>'); 
              });
            },
          error : function(error) {
            console.log("pruebe");
          },
        });  

});

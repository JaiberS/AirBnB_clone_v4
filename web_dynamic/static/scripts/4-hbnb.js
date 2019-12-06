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
    $(".locations h4").text(nombres);
  });
  let jqxhr = $.get( "http://localhost:5003/api/v1/status/", function() {
    $("DIV#api_status").addClass("available");
  })
  .fail(function() {
    $("DIV#api_status").removeClass("available");
  })
  const url = "http://localhost:5003/api/v1/places_search/";
  $.ajax({
          type : "GET",
          url : url,
          contentType : "application/json",
          success : function(data) {
             $.each(data, function(key, value) {
                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
              });
            },
          error : function(error) {
          },
        });
  $("#b1").click(function() {
      $(".places article").remove();
      $.ajax({
              type : "POST",
              url : "http://localhost:5003/api/v1/places_search/",
              contentType: "application/json",
              data : JSON.stringify({users: lista}),
              success : function(data) {
                $.each(data, function(key, value) {
                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
 
                });
            },
      });
              
});
 $("#b2").click(function() {
      $(".places article").remove();
      for (iter in lista){
      $.ajax({
              type : "DELETE",
              url : "http://localhost:5003/api/v1/users/" + lista[iter],
              success : function(data) {
                $.each(data, function(key, value) {
                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
 
                });
            },
      });
      }       
});
});

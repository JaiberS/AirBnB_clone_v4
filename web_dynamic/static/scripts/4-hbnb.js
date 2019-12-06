$(document).ready(function () {
  const lista = [];
  let nombres = [];
  let listb = [];
    let dictask = {};
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

$(".close").click(function() {
    $("#myModal").hide();
});
 
 $("#b5").click(function() {
     $(".modal-content .tform").remove();
      $.ajax({
              type : "POST",
              url : "http://localhost:5003/api/v1/places_search/",
              contentType: "application/json",
              data : JSON.stringify({users: lista}),
              success : function(data) {
                $.each(data, function(key, value) {            
                      $(".modal-content").append('<div class="tform">Name<br><input type="text" name="name" value=' + value.name + ' id="text' + value.id + '"><br><br></div>')
                });
            },
      });
    $("#myModal").show();
    $("#b6").show();
<<<<<<< HEAD
=======
     $("#b7").hide();
     $("#b8").hide();
>>>>>>> parent of 7d41b1b... [Fixes] Removing old files
 });


  $('#b6').click(function () {
      $(".places article").remove();
      $(".locations h4").text('');
      for (iter in lista){
      $.ajax({
              type : "PUT",
              url : "http://localhost:5003/api/v1/users/" + lista[iter],
              contentType: "application/json",
              data : JSON.stringify({"name": document.getElementById("text" + lista[iter]).value}),
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
    $("#b6").hide();
    $("#myModal").hide();

  });

 $("#b3").click(function() {
     $(".modal-content .tform").remove();
      $.ajax({
              type : "POST",
              url : "http://localhost:5003/api/v1/places_search/",
              contentType: "application/json",
              data : JSON.stringify({users: lista}),
              success : function(data) {
                $.each(data, function(key, value) {        
                      $(".modal-content").append('<div class="tform"></div>')
                    for (iter in value.tasks){
                      $(".modal-content .tform").append('Description<br><input type="text" name="description" value=' + value.tasks[iter].description + ' id="text' + value.tasks[iter].id + '"><br><p><input type="radio" name="state" value=state id="0rad' + value.tasks[iter].id + '" required checked>to_do<br><input type="radio" name="state" value=state id="1rad' + value.tasks[iter].id + '" required>done</p><br>')
                    listb.push(value.tasks[iter].id)
                    }
                });
            },
      });
    $("#myModal").show();
    $("#b7").show();
<<<<<<< HEAD
=======
     $("#b8").hide();
     $("#b6").hide();
>>>>>>> parent of 7d41b1b... [Fixes] Removing old files
 });


  $('#b7').click(function () {
<<<<<<< HEAD
      $(".places article").remove();
      $(".locations h4").text('');
      for (iter in listb){
=======
      $(".locations h4").text('');
      for (iter in listb){
      $(".places article").remove();
>>>>>>> parent of 7d41b1b... [Fixes] Removing old files
      if ($('#0rad' + listb[iter]).is(':checked')){
        dictask = {"description": document.getElementById("text" + listb[iter]).value, "state": "to_do"} 
      } else {
        dictask = {"description": document.getElementById("text" + listb[iter]).value, "state": "done"} 
      }
      $.ajax({
              type : "PUT",
              url : "http://localhost:5003/api/v1/places/" + listb[iter],
              contentType: "application/json",
              data : JSON.stringify(dictask),
              success : function(data) {
<<<<<<< HEAD
=======
            },
      });
      } 
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
    listb = []
     $("#b7").hide();
    $("#myModal").hide();
 });

 $("#b4").click(function() {
     $(".modal-content .tform").remove();
      $.ajax({
              type : "POST",
              url : "http://localhost:5003/api/v1/places_search/",
              contentType: "application/json",
              data : JSON.stringify({users: lista}),
              success : function(data) {
                $.each(data, function(key, value) {        
                      $(".modal-content").append('<div class="tform"></div>')
                      $(".modal-content .tform").append('Description<br><input type="text" name="description" value="description" id="createdesc"><br>User_id<br><input type="text" name="user_id" value=' + value.id + ' id="createuserid"><br><p><input type="radio" name="state" value=state id="0radcreate" required checked>to_do<br><input type="radio" name="state" value=state id="1radcreate" required>done</p><br>')
                });
            },
      });
    $("#myModal").show();
    $("#b8").show();
     $("#b7").hide();
     $("#b6").hide();
 });


  $('#b8').click(function () {
      $(".places article").remove();
      $(".locations h4").text('');
      if ($('#0radcreate').is(':checked')){
        dictask = {"description": document.getElementById("createdesc").value, "state": "to_do", "user_id":  document.getElementById("createuserid").value} 
      } else {
        dictask = {"description": document.getElementById("createdesc").value, "state": "done", "user_id":  document.getElementById("createuserid").value} 
      }
      console.log(dictask)
      $.ajax({
              type : "POST",
              url : "http://localhost:5003/api/v1/places/123",
              contentType: "application/json",
              data : JSON.stringify(dictask),
              success : function(data) {
>>>>>>> parent of 7d41b1b... [Fixes] Removing old files
                $.each(data, function(key, value) {
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
 
                });
            },
      });
<<<<<<< HEAD
      } 
    listb = []
     $("#b7").hide();
    $("#myModal").hide();
 });
=======
    listb = []
     $("#b8").hide();
    $("#myModal").hide();
 });
$

>>>>>>> parent of 7d41b1b... [Fixes] Removing old files
$("#b2").click(function() {
      $(".places article").remove();
      $(".locations h4").text('');
      nombres = []
      for (iter in lista){
      $.ajax({
              type : "DELETE",
              url : "http://localhost:5003/api/v1/users/" + lista[iter],
              success : function(data) {
                $.each(data, function(key, value) {
                 $(".container .filters ." + lista[iter]).remove()                 
                 $(".container .filters .popover ." + lista[iter]).remove()                 
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

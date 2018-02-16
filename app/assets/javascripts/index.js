// var logo = $( "#logo" ).text()
// debugger
// console.log(logo)

$( document ).ready(function() {
    var restaurantDiv = $("#allRestaurants")
    
    // debugger
  
  //alert("what's going on?")
  $.get('/restaurants.json').done(function(json){
    $.each(json, function(index, restaurant) {
      //debugger
      console.log(restaurant.name)
    })
  })
    
});
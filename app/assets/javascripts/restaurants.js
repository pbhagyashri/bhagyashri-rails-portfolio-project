
$(() => {
  bindClickHandlers()
})


    


const bindClickHandlers = () => {
  
  $('#list_restaurants').on('click', (event) => {
    
    event.preventDefault();
    
    $.get('/restaurants.json').done((restaurants) => {
      var restaurantDiv = $("#allRestaurants")
    });
    
  })
  
  
}
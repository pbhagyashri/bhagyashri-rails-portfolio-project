$(document).ready(function() {
 
  bindClickHandlers()
  reloadHomePage()
  
});

const bindClickHandlers = () => {
  
  $('#list_restaurants').on('click', function(event) {
    
    event.preventDefault();
    
    history.pushState(null, null, "restaurants")
    $.get('/restaurants.json').done((restaurants) => {
      $("#restaurant-container").html('')
      restaurants.forEach( (restaurant) => {
        let cookRestaurant = new Restaurant(restaurant)
        
        let seasoneRestaurant = cookRestaurant.addSpices()
    
        $('#restaurant-container').append(seasoneRestaurant)
        debugger
        $('#restaurant-container').append(cookRestaurant.bakeReviews())
        
      })//forEach
    });//get
    
  })//onClick
  
}//bindClickHandler

function Restaurant(restaurant) {
  this.id = restaurant.id
  this.name = restaurant.name
  this.location = restaurant.location
  this.cuisine = restaurant.cuisine
  this.reviews = restaurant.reviews
} //constructor

Restaurant.prototype.addSpices = function() {
  let seasoneRestaurant = `
    <div id="rest_div">
      <h2><b>${this.name}</b></h2>
      <h4><b>Location:</b> ${this.location} </h4>
      <h4><b>cuisine:</b> ${this.cuisine} </h4>
     
    </div>
  `
  return seasoneRestaurant
} // prototype

Restaurant.prototype.bakeReviews = function () {
  let reviews = this.reviews
  
  let reviewsBatch = ''
  
  reviews.forEach((review) => {
    let reviewloaf = `
      <div id="reviewsDiv">
        <h5><b>Taste Rating:</b>${review.taste_rating}</h5>
        <h5><b>Health Rating:</b>${review.health_rating}</h5>
        <h5><b>Cleanliness Rating:</b>${review.cleanliness_rating}</h5>
        <h5><b>Discription:</b>${review.description}</h5>
      </div>
    `
    reviewsBatch += reviewloaf
  })
  
  return reviewsBatch
}

function reloadHomePage() {
  $("#home-button").on("click", (e) => {
    location.reload();
  });
}
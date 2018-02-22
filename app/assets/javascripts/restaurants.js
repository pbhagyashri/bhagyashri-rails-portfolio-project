
$(document).ready(function() {
 
  bindClickHandlers()
  userClickHandlers()

});

const bindClickHandlers = () => {
  
  // Hijack restaurants button to send ajax request
  $('#list_restaurants').on('click', function(event) {
    
    event.preventDefault();
    history.pushState(null, null, "/restaurants")
    
    // send a get request to index action in restaurantsController to load all restaurants.
    $.get('/restaurants.json').done((restaurants) => {
      //clear out the contents of restaurant-container div
      $("#restaurant-container").html('')
      
      //loop over the restaurants loaded by get ajax request
      restaurants.forEach( function (restaurant) {
        
        //create a new restaurant instance from constructor.
        let newRestaurantInstance = new Restaurant(restaurant)
        
        //add fromating by calling prototype formatRestaurant
        let restaurantHtml = newRestaurantInstance.formatRestaurant()
        
        //append formatted restaurants to restaurant-container div
        $('#restaurant-container').append(restaurantHtml)
        
        users = restaurant.users;
        reviews = restaurant.reviews
        
        $('#restaurant-container').append(`<div class="owner_div"><h3>Owner: ${findOwner(restaurant)}</h3></div>`)
        $("#restaurant-container").append(newRestaurantInstance.formatReviews())
    
      })//forEach
    });//get
    
  })//onClick
  
  /////////Hijack learn-more link////////////
  
  $(document).on("click", "#learn-more", (event) => {
    
    event.preventDefault();
    let id = event.currentTarget.dataset.id;
    history.pushState(null, null, `/restaurants/${id}`)
    
    // send ajax get request to show route of restaurantsController
    $.get(`/restaurants/${id}.json`).done((restaurant) => {
      
      $("#restaurant-container").html('')
      
      //create a new restaurant instance from constructor.
      let newRestaurant = new Restaurant(restaurant)
      
      //add fromating by calling prototype formatRestaurant
      let newRestaurantFormat = newRestaurant.formatRestaurant()
      
      //append formatted restaurants to restaurant-container div
      $('#restaurant-container').append(newRestaurantFormat)
       //find and append owner
      $('#restaurant-container').append(`<div class="owner_div"><h3>Owner: ${findOwner(restaurant)}</h3></div>`)
      
      //Append formatted reviews by calling formatReviews prototype function
      $("#restaurant-container").append(newRestaurant.formatReviews())
      
      //hide learn-more button
      $("#learn-more").css("visibility", "hidden");
    })//get
  })//onclick
  
  // Hijack new-reviews form
  $("#new_review").on("submit", function(event) {
    event.preventDefault();
    //send ajax post request to create action of reviewsController
    $.ajax({
      type: "POST",
      url: this.action,
      data: $(this).serialize(),
      success: function(review){
        
        var newReview = new Review(review);
        
        $("#restaurant-container").append(newReview.formatReview())
      }//success
    })//ajax
  })//new_review
}//bindClickHandler

///////////////CONSTRUCTOR///////////////////////

function Restaurant(restaurant) {
  this.id = restaurant.id
  this.name = restaurant.name
  this.location = restaurant.location
  this.cuisine = restaurant.cuisine
  this.reviews = restaurant.reviews
  this.users = restaurant.users
} //constructor

////////////// PROTOTYPE /////////////

Restaurant.prototype.formatRestaurant = function() {
  let restaurantHtml = `
    <div class="rest_div">
      <h2>${this.name}</h2>
      <h4><b>Location:</b> ${this.location} </h4>
      <h4><b>cuisine:</b> ${this.cuisine} </h4>
      <a id="learn-more" data-id="${this.id}" href="/restaurants/${this.id}">Learn More</a>
      <a id="write-review" data-id="${this.id}" href="/restaurants/${this.id}">Write a Review</a>
    </div>
  `
  return restaurantHtml
} // prototype

Restaurant.prototype.formatReviews = function () {
  
  let reviews = this.reviews
  let reviewsBatch = ''

  reviews.forEach((review) => {
    let reviewloaf = `
      <div id="reviews_div">
        <h3>Reviews</h3>
        <h4><b>Taste Rating: ${review.taste_rating}</b></h4>
        <h4><b>Health Rating: ${review.health_rating}</b></h4>
        <h4><b>Cleanliness Rating: ${review.cleanliness_rating}</b></h4>
        <h4><b>Discription: ${review.description}</b></h4>
      </div>
    `
    return reviewsBatch += reviewloaf
  })
  
  return reviewsBatch
}

function findOwner(restaurant) {
  var owner = ""
  restaurant.users.forEach(user => {
    if(user.admin === true) {
      owner = user.username
    }
  })
  return owner
}

function findReviewer(reviews, users) {
  let username = []
  $.each(reviews, function(i, item) {
          
    if(reviews[i].user_id === users[i].id) {
      // var divs = $('#restaurant-container #reviews_div')
      // divs[i].append(users[i].username
      username.push(users[i].username)
    }
          
  })
}

function Review(review) {
  this.id = review.id
  this.health_rating = review.health_rating
  this.taste_rating = review.taste_rating
  this.cleanliness_rating = review.cleanliness_rating
  this.description = review.description
} //constructor

Review.prototype.formatReview = function() {
  
  let newReview = `
    <div id="reviews_div">
      <h3>Reviews</h3>
      <h4><b>Taste Rating: ${this.taste_rating}</b></h4>
      <h4><b>Health Rating: ${this.health_rating}</b></h4>
      <h4><b>Cleanliness Rating: ${this.cleanliness_rating}</b></h4>
      <h4><b>Discription: ${this.description}</b></h4>
    </div>
  `
  return newReview

} // prototype

//////////////////////// User Profile //////////////////

const userClickHandlers = () => {
  $("#user-profile").on("click", function(event) {
  event.preventDefault();
  
  $("#restaurant-container").html('')
  
  $.get(this.href).done(user => {
    
    history.pushState(null, null, `/users/${user.id}`)
    
    user.restaurants.forEach(restaurant => {
      let newRestaurant = new Restaurant(restaurant)
      let formatedRestaurant = newRestaurant.formatRestaurant()
      
      $("#restaurant-container").append(formatRestaurant)
    
    })
  })
})
  
}


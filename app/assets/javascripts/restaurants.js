
$(document).ready(function() {
  
  bindClickHandlers()
  userClickHandlers()

});

const bindClickHandlers = () => {
  let admin = $('#admin').text();
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
        let restaurantHtml = newRestaurantInstance.formatRestaurant(admin)
        
        //append formatted restaurants to restaurant-container div
        $('#restaurant-container').append(restaurantHtml)
        
        if(!restaurant.reviews.length !== 0){
          $("#restaurant-container").append(newRestaurantInstance.writeReview(admin))
        }
      
      })//forEach
    });//get
    
  })//onClick Index Page
  
  /////////Hijack learn-more link Show Page////////////
  
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
      let newRestaurantFormat = newRestaurant.formatRestaurantShow(admin)
      
      //append formatted restaurants to restaurant-container div
      $('#restaurant-container').append(newRestaurantFormat)
      
      //Append formatted reviews by calling formatReviews prototype function
      $("#restaurant-container").append(newRestaurant.formatReviews())
      
      //hide learn-more button
      //$("#learn-more").css("visibility", "hidden");
    })//get
  })//onclick Show Page
  
  $(document).on("click", '.next_restaurant', function(){
    let isAdmin = $('#admin').text();
    $('#restaurant-container').html("")
    let id = this.dataset.id
    $.get(`/restaurants/${id}/next`).done(restaurant => {
      let buildRestaurant = new Restaurant(restaurant)
      let restaurantHtml = buildRestaurant.formatRestaurantShow(isAdmin)
      $('#restaurant-container').append(restaurantHtml)
      $('#restaurant-container').append(buildRestaurant.formatReviews())
    })
  })//next_restaurant button
  
  // Hijack new-reviews form
  $("#new_review").on("submit", function(event) {
    
    event.preventDefault();
    //send ajax post request to create action of reviewsController
    $.ajax({
      type: "POST",
      url: this.action,
      data: $(this).serialize(),
      success: function(review){
        
        let formSelectBoxes = $("#new_review select")
        
        //Empty input fields of the form upon submission
        $.each(formSelectBoxes, function(i, box) {
          box.value = ""
        })
        $("#new_review #review_description").val("")
        $("#new_review #review_fullname").val("")
        
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

Restaurant.prototype.formatRestaurant = function(admin) {

  let restaurantHtml = `
    <div class="rest_div">
      <h2>${this.name}</h2>
      <h4><b>Location:</b> ${this.location} </h4>
      <h4><b>cuisine:</b> ${this.cuisine} </h4>

      <a id="learn-more" data-id="${this.id}" href="/restaurants/${this.id}">Learn More</a>
      ${admin === 'true' ? '' : `<a id="write-review" data-id="${this.id}" href="/restaurants/${this.id}">Write a Review</a>`}
      ${admin === 'true' ? `<a href="/restaurants/${this.id}/edit">Edit Restaurant</a>` : ''}
      ${admin === 'true' ? `<a href="/restaurants/${this.id}" data-method="delete">Delete</a>` : ''}
    </div>
  `
  return restaurantHtml
} // prototype

Restaurant.prototype.formatRestaurantShow = function(admin) {
  
  let restaurantHtml = `
    <div class="rest_div">
      <h2>${this.name}</h2>
      <h4><b>Location:</b> ${this.location} </h4>
      <h4><b>cuisine:</b> ${this.cuisine} </h4>
      <h3><b>Owner:</b> ${this.users[0].username}</h3>
      <a id="learn-more" data-id="${this.id}" href="/restaurants/${this.id}">Learn More</a>
      ${admin === 'true' ? '' : `<a id="write-review" data-id="${this.id}" href="/restaurants/${this.id}">Write a Review</a>`}<br><br>
      <button class="next_restaurant" data-id="${this.id}">Next</button>
    </div>
  `
  return restaurantHtml
} // prototype

Restaurant.prototype.writeReview = function(admin) {
  let review = this.reviews[this.reviews.length - 1]
 
  if(review) {
    
    let reviewHtml = `
      <div id="reviews_div">
        <h3>Reviews</h3>
        <h4><b>Taste Rating: ${review.taste_rating}</b></h4>
        <h4><b>Health Rating: ${review.health_rating}</b></h4>
        <h4><b>Cleanliness Rating: ${review.cleanliness_rating}</b></h4>
        <h4><b>Discription: ${review.description}</b></h4>
        <h4>Reviewer: ${review.fullname} </h4>
        ${admin === 'true' ? '' : `<a href="/reviews/${review.id}/edit">Edit Review</a>`}<br><br>
      </div>
    `
    return reviewHtml
  }  
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
        <h4>Reviewer: ${review.fullname} </h4>
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

function Review(review) {
  this.id = review.id
  this.health_rating = review.health_rating
  this.taste_rating = review.taste_rating
  this.cleanliness_rating = review.cleanliness_rating
  this.description = review.description
  this.user = review.user.username
  this.fullname = review.fullname
} //constructor

Review.prototype.formatReview = function() {

  let newReview = `
    <div id="reviews_div">
      <h3>Reviews</h3>
      <h4><b>Taste Rating: ${this.taste_rating}</b></h4>
      <h4><b>Health Rating: ${this.health_rating}</b></h4>
      <h4><b>Cleanliness Rating: ${this.cleanliness_rating}</b></h4>
      <h4><b>Discription: ${this.description}</b></h4>
      <h4><b>Reviewer: ${this.fullname}</b></h4>
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
    $("#restaurant-container").html("")
    $.get(`/users/${user.id}/restaurants.json`).done(res => {
      
      res.forEach( function (restaurant) {
       
        var createRestaurant = new Restaurant(restaurant)
        var formatRes = createRestaurant.formatRestaurant()
        $("#restaurant-container").append(formatRes)
        
        if(!restaurant.reviews.length !== 0){
          $("#restaurant-container").append(createRestaurant.writeReview())
        }
      })//forEach
      
    });//get users
  })//.done
  })// on click
} //userClickHandlers


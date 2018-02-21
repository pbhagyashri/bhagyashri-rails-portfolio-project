let adminUser = ""

$(document).ready(function() {
 
  bindClickHandlers()
  reloadHomePage()

});

const bindClickHandlers = () => {
  
  $('#list_restaurants').on('click', function(event) {
    
    event.preventDefault();
    
    history.pushState(null, null, "/restaurants")
    $.get('/restaurants.json').done((restaurants) => {
        
      $("#restaurant-container").html('')
      restaurants.forEach( function (restaurant) {
        
        let cookRestaurant = new Restaurant(restaurant)
        let seasoneRestaurant = cookRestaurant.addSpices()
        
        $('#restaurant-container').append(seasoneRestaurant)
        
        this.users = restaurant.users;
        this.reviews = restaurant.reviews
        
        $('#restaurant-container').append(`<div class="owner_div"><h3>Owner: ${findOwner(restaurant)}</h3></div>`)
        
        $("#restaurant-container").append(cookRestaurant.bakeReviews())
    
      })//forEach
    });//get
    
  })//onClick
  

  $(document).on("click", "#learn-more", (event) => {
    
    event.preventDefault();
  
    let id = event.currentTarget.dataset.id;
    history.pushState(null, null, `/restaurants/${id}`)
    
    $.get(`/restaurants/${id}.json`).done((restaurant) => {
      
      $("#restaurant-container").html('')
      
      let newRestaurant = new Restaurant(restaurant)
      let newRestaurantFormat = newRestaurant.writeReview()
      $('#restaurant-container').append(newRestaurantFormat)
       
      $('#restaurant-container').append(`<div class="owner_div"><h3>Owner: ${findOwner(restaurant)}</h3></div>`)
    
      $("#restaurant-container").append(newRestaurant.bakeReviews())

      $("#learn-more").css("visibility", "hidden");
    })//get
  })//onclick
  
  $("#new_review").on("submit", function(event) {
    
    history.pushState(null, null, `/restaurants`)
    
    
    $.ajax({
      type: "POST",
      url: this.action,
      data: $(this).serialize(),
      success: function(review){

        var newReview = new Review(review);
        
        $("#restaurant-container").append(newReview.formatReview())
        
      }
    })
    
    event.preventDefault();
    
  })
  
  
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
    <div class="rest_div">
      <h2>${this.name}</h2>
      <h4><b>Location:</b> ${this.location} </h4>
      <h4><b>cuisine:</b> ${this.cuisine} </h4>
      <a id="learn-more" data-id="${this.id}" href="/restaurants/${this.id}">Learn More</a>
      
    </div>
  `
  return seasoneRestaurant
} // prototype

Restaurant.prototype.writeReview = function() {
  let seasoneRestaurant = `
    <div class="rest_div">
      <h2>${this.name}</h2>
      <h4><b>Location:</b> ${this.location} </h4>
      <h4><b>cuisine:</b> ${this.cuisine} </h4>
      <a id="write-review" data-id="${this.id}" href="/restaurants/${this.id}">Write a Review</a>
      <a id="learn-more" data-id="${this.id}" href="/restaurants/${this.id}">Learn More</a>
    </div>
  `
  return seasoneRestaurant
} // prototype

Restaurant.prototype.bakeReviews = function () {
  
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

function reloadHomePage() {
  $("#home-button").on("click", () => {
    location.reload();
  });
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
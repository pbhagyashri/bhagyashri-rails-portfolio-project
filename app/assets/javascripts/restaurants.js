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
    reviewsBatch += reviewloaf
  })
  
  return reviewsBatch
}

function reloadHomePage() {
  $("#home-button").on("click", () => {
    location.reload();
  });
}


//recursive function

// function multiplyBy10(number) {   
//   console.log(number * 10);
// }

// function multiplesOf10(limit) {
//   for(i = 1; i <= limit; i++) {
//     multiplyBy10(i)
//   }
   
// }
// undefined
// multiplesOf10(4)

function findOwner(restaurant) {
  var owner = ""
  restaurant.users.forEach(user => {
    if(user.admin === true) {
      owner = user.username
    }
  })
  return owner
}

function findReviewer(review) {
  var reviewer = ""
  
  restaurant.users.forEach(user => {
    if(user.id === review.user_id) {
      reviewer = user.username;
    }
  })
  return reviewer
}



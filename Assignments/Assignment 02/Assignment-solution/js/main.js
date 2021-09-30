/*********************************************************************************
 *  WEB422 – Assignment 2
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: SHANI PATEL Student ID: 152243192 Date: 30/09/2021
 *
 *
 ********************************************************************************/

//Restaurant data with empty array
let restaurantData = [];
let currentRestaurant = [];

//For pageNo and NoOfResult per page
let page = 1;
const perPage = 10;

// leaflet Map Obj
let map = null;

//calculate the Avg grades
function avg(grades) {
  let total = 0;
  for (let i = 0; i < grades.length; i++) {
    total += grades[i].score;
  }
  return (total / grades.length).toFixed(2);
}

//lodash template
let tableRows = _.template(
  `<% _.forEach(restaurants, function(restaurant) { %>
        <tr data-id=<%- restaurant._id %>>
        <td><%- restaurant.name %></td>
        <td><%- restaurant.cuisine %></td>
        <td><%- restaurant.address.building %> <%- restaurant.address.street %></td>
        <td><%-avg(restaurant.grades) %></td>
        </tr>
   <% }); %>`
);

// to use API from assignment 01
function loadRestaurantData() {
  fetch(
    `https://web422-shani-assign01.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
  )
    .then((res) => res.json())
    .then((restaurantsData) => {
      restaurantData = restaurantsData;
      let rows = tableRows({ restaurants: restaurantData });
      $("#restaurant-table tbody").html(rows);
      $("#current-page").html(page);
    });
}

//to set data ith the page
$(function () {
  loadRestaurantData();
  $("#restaurant-table tbody").on("click", "tr", function () {
    let dataID = $(this).attr("data-id");

    for (let i = 0; i < restaurantData.length; i++) {
      if (restaurantData[i]._id === dataID) {
        currentRestaurant = _.cloneDeep(restaurantData[i]);
      }
    }
    $("#restaurant-modal .modal-title").html(currentRestaurant.name);
    $("#restaurant-address").html(
      `${currentRestaurant.address.building} ${currentRestaurant.address.street}`
    );
    $("#restaurant-modal").modal("show");
  });

  // previous page
  $("#previous-page").on("click", function () {
    if (page > 1) {
      page--;
      loadRestaurantData();
    }
  });

  // next page
  $("#next-page").on("click", function () {
    page++;
    loadRestaurantData();
  });

  //  model window
  $("#restaurant-modal").on("shown.bs.modal", function () {
    map = new L.Map("leaflet", {
      center: [
        currentRestaurant.address.coord[1],
        currentRestaurant.address.coord[0],
      ],
      zoom: 18,
      layers: [
        new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
      ],
    });
    L.marker([
      currentRestaurant.address.coord[1],
      currentRestaurant.address.coord[0],
    ]).addTo(map);
  });

  // remove the map
  $("#restaurant-modal").on("hidden.bs.modal", function () {
    map.remove();
  });
});

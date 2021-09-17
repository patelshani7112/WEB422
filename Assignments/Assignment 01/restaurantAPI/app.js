"use strict";
const express = require("express");
var cors = require("cors");
const app = express();
const HTTP_PORT = process.env.PORT || 8000;
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB();
const dotenv = require("dotenv").config();

const {
  celebrate,
  Joi,
  errors,
  Segments,
  CelebrateError,
} = require("celebrate");
const { query, validationResult } = require("express-validator");

const mongoLogin = process.env.MONGODB_CONN_STRING;
const connect = db
  .initialize(mongoLogin)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// declare the core
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "API Listening" });
});

// insertData API
app.post("/api/restaurants", (req, res) => {
  {
    db.addNewRestaurant(req.body)
      .then((data) => {
        console.log(data);
        res.status(201).json({
          message: "restaurant is inserted successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "restaurant is not inserted successfully",
        });
      });
  }
});

// delete API
app.delete("/api/restaurants/:id", (req, res) => {
  {
    db.deleteRestaurantById(req.params.id)
      .then((data) => {
        res.status(201).json({
          message: "delete successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "delete unsuccessfully",
        });
      });
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log("there was a problem", err);
    return;
  }
  console.log(`listening on port ${HTTP_PORT}`);
});

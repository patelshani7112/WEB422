1;
/*********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Shani Patel  Student ID: 152243192  Date: 17/09/2021
 *  Heroku Link: _______________________________________________________________
 *
 ********************************************************************************/

("use strict");
const express = require("express");
var cors = require("cors");
const app = express();
const HTTP_PORT = process.env.PORT || 8000;
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB();
const dotenv = require("dotenv").config();
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

// get API with data of page, perPage and borough
app.get(
  "/api/restaurants",
  [
    query(["page", "perPage"]).isInt({ min: 1 }),
    query(["page", "perPage"]).isString(),
  ],
  async (req, res) => {
    {
      const page = req.query.page;
      const perPage = req.query.perPage;
      const borough = req.query.borough;

      if (page != undefined || perPage != undefined) {
        res.json(await db.getAllRestaurants(page, perPage, borough));
      } else {
        res.status(500).json({
          message: "insert valid params of page, perPage and borough",
        });
      }
    }
  }
);

// get API return specific restaurant data
app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "no restaurant data found with id by" + req.params.id,
      });
    });
});

// put API to make changes in specific restaurant data
app.put("/api/restaurants/:id", (req, res) => {
  db.updateRestaurantById(req.body, req.params.id)
    .then((data) => {
      res.status(201).json({
        message: "data is successfully updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "no restaurant data found with id by" + req.params.id,
      });
    });
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

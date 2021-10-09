import React from "react";
import { ListGroupItem } from "react-bootstrap";

function About() {
  return (
    <ListGroupItem>
      <h1>About</h1>
      <br></br>
      <p>
        <strong>Student : </strong> Shani Patel{" "}
      </p>
      <p>
        <strong>Student ID # : </strong> 152243192{" "}
      </p>
      <p>
        <strong>Assignment : </strong> WEB 422 - Assignment 03: my-app
      </p>
      <p>
        <strong>submission Date: </strong> October 14, 2021
      </p>
      <p>
        <strong>submission Due Date: </strong> October 15, 2021
      </p>
    </ListGroupItem>
  );
}

export default About;

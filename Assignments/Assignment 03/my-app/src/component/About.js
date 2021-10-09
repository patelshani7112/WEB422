import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

function About() {
  return (
    <Card>
      <Card.Header as="h3">About</Card.Header>
      <Card.Body>
        <Card.Title>Studet Information</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            Student Name<strong>Shani Patel</strong>
          </ListGroupItem>
          <ListGroupItem>
            Student ID # :<strong>152243192</strong>
          </ListGroupItem>
          <ListGroupItem>
            Assignment : <strong>WEB 422 - Assignment 03: my-app</strong>
          </ListGroupItem>
          <ListGroupItem>
            submission Date:<strong>October 14, 2021</strong>
          </ListGroupItem>
          <ListGroupItem>
            submission Due Date: <strong>October 15, 2021</strong>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default About;

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
            <strong>Student Name:</strong> Shani Patel
          </ListGroupItem>
          <ListGroupItem>
            <strong>Student ID # :</strong> 152243192
          </ListGroupItem>
          <ListGroupItem>
            <strong>Assignment :</strong> WEB 422 - Assignment 03: my-app
          </ListGroupItem>
          <ListGroupItem>
            <strong>submission Date:</strong> October 14, 2021
          </ListGroupItem>
          <ListGroupItem>
            <strong>submission Due Date:</strong> October 15, 2021
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default About;

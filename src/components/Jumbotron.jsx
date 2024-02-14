import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CustomJumbotron = () => {
  return (
    <Container fluid className="p-5 bg-light">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="mb-3">Your Personal Culinary Companion</h1>
          <p className="mb-4">Craft, customize, and enjoy AI-generated recipes tailored just for you.</p>
          <Button variant="primary">Generate Recipe</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomJumbotron;
import './main.css';
import PlainHeaderComponent from "../PlainHeaderComponent";
import ParticlesBg from "particles-bg";
import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Main extends PlainHeaderComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <section className={"main-section"}>
        <ParticlesBg type="" bg={true} color={[]}/>
        <Container fluid={"sm"}>
          <Row className={"justify-content-center mt-5 ml-0 mr-0"}>
            <h1 className={"logo-name-main"}>Halifax Foodie</h1>
          </Row>
          <Row className={"justify-content-center text-center mt-5"}>
            <Col sm={12} className={"mt-4"}>
              <h2>Food Delivery System</h2>
              <br/>
              <Link to={"/login"}>
                <Button variant={"info mt-3 mr-2"}>Login / Register</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Main

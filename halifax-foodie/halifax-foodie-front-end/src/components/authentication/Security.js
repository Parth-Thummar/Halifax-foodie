import {useHistory} from "react-router-dom";
import axios from "axios";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import React from "react";
import ParticlesBg from "particles-bg";

function Security() {
  const history = useHistory();
  let security1 = "";
  let security2 = "";

  function handleChange(event) {
    if (event.target.id === "security1") {
      security1 = event.target.value;
    } else if (event.target.id === "security2") {
      security2 = event.target.value;
    }
  }

  function secondAuthentication(event) {
    event.preventDefault();
    const email = localStorage.getItem("userId").replace(/"/g, "");

    axios
      .get(
        "https://us-central1-serverless-320900.cloudfunctions.net/register/login/" + email
      )
      .then((response) => {
        if (response.data.question1 === security1 && response.data.question2 == security2) {
          history.push("/home");
        } else {
          alert("wrong credentials!! please try again")
          history.push("/login");
        }
      });
  }

  return (
    <section>
      <ParticlesBg type="" bg={true} color={[]}/>
      <Container fluid={"sm"}>
        <Row className={"justify-content-center mt-3"}>
          <Col sm={6}>
            <Card>
              <Row className={"login-row"}>
                <Col sm={12} className={"p-4"}>
                  <Row className={"text-center"}>
                    <Col sm={12}>
                      <h2>Login</h2>
                    </Col>
                  </Row>
                  <Form>
                    <Row className={"text-left mt-4"}>
                      <Col sm={12}>
                        <Form.Group>
                          <Form.Label><strong>What is your favourite food?</strong></Form.Label>
                          <Form.Control type="text" id="security1" placeholder="Enter your answer"
                                        onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>What is your favourite color?</strong></Form.Label>
                          <Form.Control type="text" id="security2" placeholder="Enter your answer"
                                        onChange={handleChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className={"text-left mt-3"}>
                      <Col sm={12}>
                        <Button variant={"primary"} onClick={secondAuthentication}>Login</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Security;

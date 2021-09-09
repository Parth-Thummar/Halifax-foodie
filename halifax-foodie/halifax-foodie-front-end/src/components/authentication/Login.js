import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import ParticlesBg from "particles-bg";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeHandler(event) {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  }

  function onLogin(event) {
    event.preventDefault();
    axios
      .get(
        "https://g23obhivhh.execute-api.us-east-1.amazonaws.com/authentication/login/" +
        email
      )
      .then((response) => {
        if (response.data == password) {
          localStorage.setItem("userId", JSON.stringify(email));
          history.push("/security");
        } else {
          alert("Wrong credentials!! Please try again");
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
                          <Form.Label><strong>Email</strong></Form.Label>
                          <Form.Control type="email" id="email" placeholder="Enter your email" onChange={changeHandler}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>Password</strong></Form.Label>
                          <Form.Control type="password" id="password" placeholder="Password" onChange={changeHandler}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className={"text-left mt-3"}>
                      <Col sm={12}>
                        <Button variant={"primary"} onClick={onLogin}>Login</Button>
                      </Col>
                    </Row>
                    <Row className={"text-left mt-2"}>
                      <Col sm={12}>
                        <span>Don't have an account?</span>
                        <Link to={"/register"} className={"ml-2"}>
                          <span>Register Here</span>
                        </Link>
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

export default Login;

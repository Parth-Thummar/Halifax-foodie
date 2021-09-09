import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import ParticlesBg from "particles-bg";

function RegistrationForm() {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [security1, setSecurity1] = useState("");
  const [security2, setSecurity2] = useState("");
  const [role, setRole] = useState("");

  function emailValidation(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail)) {
      return true;
    } else {
      alert("Please enter valid email id");
    }
  }

  function nameValidation(name, message) {
    let regexName = /^[A-Za-z]+$/i;
    if (name.match(regexName)) {
      return true;
    } else {
      alert("Please enter valid " + message);
    }
  }

  function passwordValidation(password) {
    var length = password.length;
    if (length >= 8) {
      return true;
    } else {
      alert("password's length should be more than 8 character ");
    }
  }

  function confirmPasswordValidation(password, confirmPassword) {
    console.log(password);
    console.log(confirmPassword);
    if (password == confirmPassword) {
      return true;
    } else {
      alert("password and confirm password not matched!");
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "name") {
      setName(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    } else if (event.target.id === "ConfirmPassword") {
      setConfirmPassword(event.target.value);
    } else if (event.target.id === "firstQuestion") {
      setSecurity1(event.target.value);
    } else if (event.target.id === "secondQuestion") {
      setSecurity2(event.target.value);
    } else if (event.target.id === "role") {
      setRole(event.target.value);
    }
  }

  function onRegister(event) {
    event.preventDefault();

    var validation =
      emailValidation(email) &&
      nameValidation(name, "name") &&
      nameValidation(security1, "security question 1") &&
      nameValidation(security2, "security question 2") &&
      passwordValidation(password) &&
      confirmPasswordValidation(password, confirmPassword);

    if (validation) {
      axios
        .post(
          "https://g23obhivhh.execute-api.us-east-1.amazonaws.com/authentication/register",
          {
            email: email,
            password: password,
            role: role,
          }
        )
        .then((response) => {
          axios
            .post(
              "https://us-central1-serverless-320900.cloudfunctions.net/register/register",
              {
                email: email,
                question1: security1,
                question2: security2,
              }
            )
            .then((response) => {
              if (response.data.message === "registered") {
                history.push("/login");
              } else {
                console.log(response.data);
              }
            });
        });
    }
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
                      <h2>Sign Up</h2>
                    </Col>
                  </Row>
                  <Form>
                    <Row className={"text-left mt-4"}>
                      <Col sm={12}>
                        <Form.Group>
                          <Form.Label><strong>Name</strong></Form.Label>
                          <Form.Control type="text" id="name" placeholder="Enter your name" onChange={onSubmit}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>Name</strong></Form.Label>
                          <Form.Control type="email" id="email" placeholder="Enter your email" onChange={onSubmit}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>Sign Up As</strong></Form.Label>
                          <Form.Group>
                            <Form.Check
                              inline
                              label="Customer"
                              type="radio"
                              id="role"
                              name="customer"
                              value="customer"
                              onChange={onSubmit}
                            />
                            <Form.Check
                              inline
                              label="Employee"
                              type="radio"
                              id="role"
                              name="employee"
                              value="employee"
                              onChange={onSubmit}
                            />
                          </Form.Group>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>What is you favorite food?</strong></Form.Label>
                          <Form.Control type="text" id="firstQuestion" placeholder="Enter you answer"
                                        onChange={onSubmit}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>What is you favorite color?</strong></Form.Label>
                          <Form.Control type="text" id="secondQuestion" placeholder="Enter you answer"
                                        onChange={onSubmit}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>Password</strong></Form.Label>
                          <Form.Control type="password" id="password" placeholder="Password" onChange={onSubmit}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label><strong>Confirm Password</strong></Form.Label>
                          <Form.Control type="password" id="ConfirmPassword" placeholder="Password" onChange={onSubmit}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className={"text-left mt-3"}>
                      <Col sm={12}>
                        <Button variant={"primary"} onClick={onRegister}>Register</Button>
                      </Col>
                    </Row>
                    <Row className={"text-left mt-2"}>
                      <Col sm={12}>
                        <span>Already have an account?</span>
                        <Link to={"/login"} className={"ml-2"}>
                          <span>Login Here</span>
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

export default RegistrationForm;

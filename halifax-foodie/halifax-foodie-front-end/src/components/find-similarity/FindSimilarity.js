import React from "react";
import ApplicationContainer from "../ApplicationContainer";
import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";

export default class FindSimilarity extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  setFileName = (event) => {
    this.setState({file: event.target.files[0]})
  }

  refreshData = (event) => {
    axios.get('https://halifax-foodie-file-upload-sioxbmpnbq-uc.a.run.app/get-classification').then((result) => {
      this.setState({classifiedFile: result.data.similarFile})
    })
  }

  onSubmit = () => {
    const formData = new FormData()
    formData.append('file', this.state.file)
    axios.post('https://halifax-foodie-file-upload-sioxbmpnbq-uc.a.run.app/upload', formData).then(() => {
      toast.success("Recipe Classification has started.")
    })
  }

  render() {
    return (
      <section>
        {super.render()}
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Find Similarity</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title>Upload Recipe Files</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Control
                      onChange={this.setFileName}
                      type="file"/>
                  </Form.Group>
                  <Button variant={"primary"} className="mt-3" onClick={this.onSubmit} block>Find</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title>Classification</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>{this.state.classifiedFile}</Form.Label>
                  </Form.Group>
                  <Button variant={"primary"} className="mt-3" onClick={this.refreshData} block>Refresh</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}

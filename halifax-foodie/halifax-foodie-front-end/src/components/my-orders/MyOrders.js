import React from "react";
import ApplicationContainer from "../ApplicationContainer";
import {Button, Card, Col, Modal, Row, Table, Form} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";

export default class MyOrders extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      orders:[],
      feedback: null,
      selectedOrder: {}
    };
  }

  componentDidMount() {
    this.getMyOrders();
  }

  getMyOrders = () => {
    axios.get('https://1zhn9y9jc8.execute-api.us-east-1.amazonaws.com/dev/get-orders')
      .then((result) => {
        const orders = result.data.orders;
        this.setState({orders: orders.Items})
      })
  }

  addFeedback = (order, event) => {
    let state = this.state
    state.selectedOrder = order
    state.showFeedbackModal = true
    this.setState(state)
  }

  closeFeedbackModal = () => {
    let state = this.state
    state.selectedOrder = {}
    state.showFeedbackModal = false
    this.setState(state)
  }

  onReviewChange = (event) => {
    let state = this.state;
    state.feedback = event.target.value;
    this.setState(state)
  }

  saveFeedback = () => {
    let state = this.state;
    const postData = {
      restaurantName: state.selectedOrder.Restaurant_name,
      feedback: state.feedback
    }
    axios.post('https://1zhn9y9jc8.execute-api.us-east-1.amazonaws.com/dev/add-feedback', postData)
      .then((result) => {
        toast.success('Review Added');
        this.closeFeedbackModal();
      })
  }

  render() {
    return (
      <section>
        {super.render()}
        <Row className="m-3">
          <Col sm={12} className={"text-left"}>
            <h2>My Orders</h2>
            <hr/>
          </Col>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Food Items</th>
                    <th>Restaurant</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.orders.map(order => {
                      return <tr key={order.OrderID}>
                        <td>{order.OrderID}</td>
                        <td>{order.Order_items.join()}</td>
                        <td>{order.Restaurant_name}</td>
                        <td>{new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(order.Order_price)}</td>
                        <td>{order.status}</td>
                        <td>
                          <Button variant={"primary"} onClick={this.addFeedback.bind(this, order)}>Add Review</Button>
                        </td>
                      </tr>
                    })
                  }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Modal show={this.state.showFeedbackModal} animation={false} onHide={this.closeFeedbackModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}><strong>Order</strong></Form.Label>
                <Form.Control plaintext readOnly
                              defaultValue={this.state.selectedOrder.OrderID}
                              className={"p-0"}/>
              </Form.Group>
              <Form.Group controlId="feedbackTextarea">
                <Form.Label>Feedback</Form.Label>
                <Form.Control onChange={this.onReviewChange} as="textarea" rows={3}/>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.saveFeedback}>Add</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </section>
    );
  }
}

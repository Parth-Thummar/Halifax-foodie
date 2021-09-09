import React from "react";
import ApplicationContainer from "../ApplicationContainer";
import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
import Select from "react-select";
import WordCloud from "react-d3-cloud/lib/WordCloud";

const fontSizeMapper = word => Math.log2(word.value) * 5;

export default class PlaceOrder extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      wordCloudData: [],
      restaurants: [],
      foodItems: [],
      selectedRestaurant: null,
      selectedFoodItem: null
    };
  }

  componentDidMount() {
    this.getRestaurants()
    this.getFoodItems()
  }

  getRestaurants = () => {
    axios.get('https://1zhn9y9jc8.execute-api.us-east-1.amazonaws.com/dev/get-restaurants')
      .then((result) => {
        const restaurants = result.data.restaurants;
        this.setState({restaurants: restaurants.Items})
      })
  }

  getFoodItems = () => {
    axios.get('https://1zhn9y9jc8.execute-api.us-east-1.amazonaws.com/dev/get-food-items')
      .then((result) => {
        const foodItems = result.data.foodItems;
        this.setState({foodItems: foodItems.Items})
      })
  }

  onRestaurantSelect = (event) => {
    const state = this.state
    state.selectedRestaurant = event
    this.setState(state)
    this.getWordCloud()
  }

  onFoodItemSelect = (event) => {
    const state = this.state
    state.selectedFoodItem = event
    this.setState(state)
  }

  getWordCloud = () => {
    axios.get('https://1zhn9y9jc8.execute-api.us-east-1.amazonaws.com/dev/get-word-cloud/' + this.state.selectedRestaurant.Restaurant_name)
      .then((result) => {
        const reviewsWordCloud = result.data.reviewsWordCloud;
        let wordCloudData = [];
        reviewsWordCloud.forEach(wordCloudObj => {
          wordCloudObj.Entities.forEach(entityObj => {
            wordCloudData.push({text: entityObj.Text, value: entityObj.Score * 100})
          });
        })
        this.setState({wordCloudData: wordCloudData})
      })
  }

  onSubmit = () => {
    let state = this.state;
    const postData = {
      restaurantName: state.selectedRestaurant.Restaurant_name,
      items: [state.selectedFoodItem.FoodItem_name]
    }
    axios.post('https://1zhn9y9jc8.execute-api.us-east-1.amazonaws.com/dev/create-order', postData)
      .then((result) => {
        toast.success('Order Placed');
      })
  }

  render() {
    return (
      <section>
        {super.render()}
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Place Order</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title>Order Details</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Restaurant</Form.Label>
                    <Select
                      isClearable
                      options={this.state.restaurants}
                      getOptionValue={restaurant => restaurant}
                      getOptionLabel={restaurant => `${restaurant.Restaurant_name}`}
                      placeholder="Select Restaurant"
                      onChange={this.onRestaurantSelect}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Food Items</Form.Label>
                    <Select
                      isClearable
                      options={this.state.foodItems}
                      getOptionValue={foodItem => foodItem}
                      getOptionLabel={foodItem => `${foodItem.FoodItem_name}`}
                      placeholder="Select Food Item"
                      onChange={this.onFoodItemSelect}
                    />
                  </Form.Group>
                  <Button variant={"primary"} className="mt-3" onClick={this.onSubmit} block>Place Order</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title>Reviews</Card.Title>
                <Row>
                  <Col sm={12}>
                    <WordCloud
                      fontSizeMapper={fontSizeMapper}
                      data={this.state.wordCloudData}
                      width={600}
                      height={250}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}

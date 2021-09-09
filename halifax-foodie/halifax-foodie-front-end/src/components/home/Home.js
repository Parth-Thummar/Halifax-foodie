import "./home.css";
import React from "react";
import PlainHeaderComponent from "../PlainHeaderComponent";
import {Button, Col, Row} from "react-bootstrap";

class Home extends PlainHeaderComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.links = [
      {name: 'Find Similarity', link: '/find-similarity'},
      {name: 'Virtual Assistant', link: '/chat-bot'},
      {name: 'Customer-care', link: '/customer-care'},
      {name: 'Place Order', link: '/place-order'},
      {name: 'My Orders', link: '/my-orders'}      
    ]
  }

  navigateToRoute = (linkObj, event) => {
    this.props.history.push({
      pathname: linkObj.link
    })
  }

  render() {
    return (
      <section>
        {super.render()}
        <Row className="m-0 pt-5 justify-content-center">
          {
            this.links.map(link => {
              return <Col sm={3} key={link.name}>
                <Button onClick={this.navigateToRoute.bind(this, link)}
                  variant={"outline-primary"} size={"lg"} className={"w-100"}>{link.name}</Button>
              </Col>
            })
          }
        </Row>
      </section>
    )
  }
}

export default Home

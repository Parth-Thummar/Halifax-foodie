import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main/Main";
import Login from "./components/authentication/Login";
import Security from "./components/authentication/Security";
import Register from "./components/authentication/RegistrationForm";
import Home from "./components/home/Home";
import FindSimilarity from "./components/find-similarity/FindSimilarity";
import Chatbot from "./components/chatbot/Chatbot";
import PlaceOrder from "./components/place-order/PlaceOrder";
import MyOrders from "./components/my-orders/MyOrders";
import CustomerCare from "./components/customer-care/CustomerCare"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/security" component={Security}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/find-similarity" component={FindSimilarity}/>
        <Route exact path="/chat-bot" component={Chatbot}/>
        <Route exact path="/place-order" component={PlaceOrder}/>
        <Route exact path="/my-orders" component={MyOrders}/>
        <Route exact path="/customer-care" component={CustomerCare}/>
      </Switch>
    </div>
  );
}

export default App;

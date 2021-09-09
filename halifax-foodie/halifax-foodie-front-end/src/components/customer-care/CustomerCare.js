/*
References:
1. https://www.npmjs.com/package/react-chatbot-kit
2. https://fredrikoseberg.github.io/react-chatbot-kit-docs/
*/

import React from "react";
import ApplicationContainer from "../ApplicationContainer";
import Chatbot from "react-chatbot-kit";
import  './customercare.css';

import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

export default class CustomerCare extends ApplicationContainer{
    render(){
  return (
      <section>{super.render()}
    <div className="CustomerCare">
        <br/><br/><br/><br/>
      <div style={{maxLines:"300px"}}>
        <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div></div></section>
  );
}
}

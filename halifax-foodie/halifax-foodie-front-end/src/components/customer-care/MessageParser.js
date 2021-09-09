/*
References:
1. https://www.npmjs.com/package/react-chatbot-kit
2. https://fredrikoseberg.github.io/react-chatbot-kit-docs/
*/


import React, {useState,useEffect} from "react";
import axios from "axios";

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      var res='';
      console.log(message);
      
    
    return this.actionProvider.checkRequests(message);
    }
  }
  
  export default MessageParser;
/*
References:
1. https://www.npmjs.com/package/react-chatbot-kit
2. https://fredrikoseberg.github.io/react-chatbot-kit-docs/
*/

import axios from "axios";


class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    parseFloat(message){
        console.log(message);       
      
    }

    checkRequests(message) {     
      var res='';
      async function sendQuery(){
          console.log("in")
          await axios.post("https://us-central1-halifax-foodie-320910.cloudfunctions.net/foodie", {
              topic: "halifaxfoodie",
              message: message
          }).then((response) => {
              console.log(response)
              res=response;
              
          }).catch(err => {
              console.log("error occured::"+err)
          });
      }

      sendQuery();

      let message1='';

      var time=setTimeout(() => {
        console.log(res);
        async function waitFrMessage(){   
          console.log("waitig for message")
           await axios.post("https://us-central1-halifax-foodie-320910.cloudfunctions.net/foodie-subscribe", {
            subscriptionName: "customer-care"
          }).then((response) => {
              console.log(response);      
              var arr=response.data.msg;
              for(var x=0;x<arr.length;x++){
                console.log(arr[x])
                console.log(arr[x].message.data.data);
                message1=new TextDecoder("utf-8").decode(new Uint8Array(arr[x].message.data.data));
                console.log("new msg:::"+message1);
              }
                            
          }).catch(err => {
              console.log("error occured::"+err)
          });
        } 
        waitFrMessage();


        },30000); 

        var time1=setTimeout(() => {
          console.log("test::"+message1)
          const text=this.createChatBotMessage(message1);
        this.addMessageToBotState(text);

          },50000); 
      
     
    }

    addMessageToBotState = (messages) => {
      if (Array.isArray(messages)) {
        this.setState((state) => ({
          ...state,
          messages: [...state.messages, ...messages],
        }));
      } else {
        this.setState((state) => ({
          ...state,
          messages: [...state.messages, messages],
        }));
      }
    };
    
  }
  
  
  export default ActionProvider;
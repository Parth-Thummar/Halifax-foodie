import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import {AmplifyTheme, ChatBot} from 'aws-amplify-react';
import ApplicationContainer from "../ApplicationContainer";

Amplify.configure(awsconfig);

const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

class Chatbot extends ApplicationContainer {

  constructor(props) {
    super(props);
  }

  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed')
      return;
    }
    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Place your request';
  }

  render() {
    return (
      <div className="App">
        {super.render()}
        <ChatBot className={"mt-3"}
          title="Halifax Foodie Chat Bot"
          theme={myTheme}
          botName="FoodApp_bot_dev"
          welcomeMessage="Welcome, how can I help you today?"
          onComplete={this.handleComplete.bind(this)}
          clearOnComplete={true}
          conversationModeOn={false}
        />
      </div>
    );
  }


}

export default Chatbot;
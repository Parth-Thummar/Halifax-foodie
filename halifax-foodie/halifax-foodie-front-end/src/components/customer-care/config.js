/*
References:
1. https://www.npmjs.com/package/react-chatbot-kit
2. https://fredrikoseberg.github.io/react-chatbot-kit-docs/
*/
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "Customer-care",
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [createChatBotMessage(`Hi.. Laura here, your customer care assistant. How can I help you?`)]
}

export default config
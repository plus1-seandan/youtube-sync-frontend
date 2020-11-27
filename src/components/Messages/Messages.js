import React from "react";
import "./Messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
//import Message from "../Message/Message.js";
import { ChatFeed, Message, BubbleGroup } from "react-chat-ui";

const Messages = ({ messages, name }) => {
  const handleMessages = (messages) => {
    const messageList = [];
    for (let i = 0; i < messages.length; i++) {
      // let isSentByCurrentUser = 1;
      const currentMessage = messages[i];

      // const trimmedName = name.trim().toLowerCase();

      // if (currentMessage.user === trimmedName) {
      //   isSentByCurrentUser = 0;
      // }
      name = name.trim().toLowerCase();
      const userId = name === currentMessage.user ? 0 : currentMessage.user;
      messageList.push(
        new Message({
          id: userId,
          message: currentMessage.text,
          senderName: currentMessage.user,
        })
      );
    }
    return messageList;
  };

  return (
    <ChatFeed
      messages={handleMessages(messages)} // Array: list of message objects
      isTyping={false} // Boolean: is the recipient typing
      // hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      // bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      maxHeight={250}
      // JSON: Custom bubble styles
      // bubbleStyles={{
      //   text: {
      //     fontSize: 30,
      //   },
      //   chatbubble: {
      //     borderRadius: 70,
      //     padding: 40,
      //   },
      // }}
    />
    // <ScrollToBottom className="messages">
    //   {messages.map((message, i) => (
    //     <div key={i}>
    //       <Message message={message} name={name} />
    //     </div>
    //   ))}
    // </ScrollToBottom>
  );
};
export default Messages;

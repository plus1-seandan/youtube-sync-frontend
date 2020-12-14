import React from "react";
import "./Messages.css";
//import Message from "../Message/Message.js";
import { ChatFeed, Message, BubbleGroup } from "react-chat-ui";
import { useSelector, useDispatch, connect } from "react-redux";

const Messages = (props) => {
  const currUser = useSelector((state) => state.currUserInfo);

  const handleMessages = (messages) => {
    const messagesCopy = [...messages];

    const messageList = [];
    for (let i = 0; i < messages.length; i++) {
      // let isSentByCurrentUser = 1;
      const currentMessage = messagesCopy[i];

      // const trimmedName = name.trim().toLowerCase();

      // if (currentMessage.user === trimmedName) {
      //   isSentByCurrentUser = 0;
      // }
      console.log(messages);
      var messageId = currentMessage.sender.id;
      if (currentMessage.sender.id === currUser.id) {
        messageId = 0;
      }
      messageList.push(
        new Message({
          id: messageId,
          message: currentMessage.message,
          senderName: currentMessage.sender.name,
        })
      );
    }
    return messageList;
  };

  return (
    <ChatFeed
      messages={handleMessages(props.messages)} // Array: list of message objects
      isTyping={false} // Boolean: is the recipient typing
      // hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      // bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      maxHeight={250}
    />
  );
};
export default Messages;

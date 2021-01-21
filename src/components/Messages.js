import React, { useEffect, useState } from "react";
//import Message from "../Message/Message.js";
import { ChatFeed, Message, BubbleGroup } from "react-chat-ui";
import { useSelector, useDispatch, connect } from "react-redux";
import { Input, Box, Spacer } from "@chakra-ui/react";

import { formatMessages } from "../util/message";

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  const roomMessage = state["messages"][ownProps.roomId];
  return {
    messages: roomMessage,
  };
};

const Messages = (props) => {
  const messages = useSelector((state) => state.messages);
  const [formattedMessages, setFormattedMessages] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const msgs = await formatMessages(props.messages);
      console.log({ msgs });
      setFormattedMessages(msgs);
    };
    asyncFunc();
  }, [props.messages]);

  return (
    <ChatFeed
      messages={formattedMessages} // Array: list of message objects
      isTyping={false} // Boolean: is the recipient typing
      // hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      // bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      maxHeight={250}
    />
  );
};
export default connect(mapStateToProps)(Messages);

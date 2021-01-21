import { Message } from "react-chat-ui";
import { getMe } from "./account";

export const formatMessages = async (messages) => {
  if (!messages) {
    return [];
  }
  console.log({ messages });
  const { data } = await getMe();
  console.log({ data });
  const msgs = messages.map((msg) => {
    console.log({ msg });
    let msgId = msg.sender.id;
    if (msgId === data.id) {
      console.log("hit this line");
      msgId = 0;
    }
    const formattedMsg = new Message({
      id: msgId,
      message: msg.message,
      senderName: msg.sender.name,
    });
    return formattedMsg;
  });
  console.log({ msgs });
  return msgs;
};

import { Message } from "react-chat-ui";
import { getMe } from "./account";

export const formatMessages = async (messages) => {
  if (!messages) {
    return [];
  }
  const { data } = await getMe();
  const msgs = messages.map((msg) => {
    let msgId = msg.sender.id;
    if (msgId === data.id) {
      msgId = 0;
    }
    const formattedMsg = new Message({
      id: msgId,
      message: msg.message,
      senderName: msg.sender.name,
    });
    return formattedMsg;
  });
  return msgs;
};

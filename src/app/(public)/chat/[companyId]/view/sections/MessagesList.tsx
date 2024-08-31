"use client";

import {
  Box,
  Flex,
  Text,
} from "@radix-ui/themes";
import React, { useEffect } from "react";
import useChatController from "../../ChatController";
import IMessage from "@/@types/IMessages";
import { chatMessagesStore } from "../../ChatStore";

export default function MessagesList() {
  const { getLastMessages } = useChatController();
  const [messages] = chatMessagesStore(
    (store) => [store.messages]
  );

  useEffect(() => {
    getLastMessages();
  }, []);

  if (!messages) return <></>;

  return (
    <Box className="bg-secondary-light flex-1 p-1 overflow-y-scroll">
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </Box>
  );
}

function Message({
  role,
  id,
  content,
}: IMessage) {
  let dynamicRowStyle;
  let dynamicBoxStyle;

  if (role === "user") {
    dynamicRowStyle = "justify-end";
    dynamicBoxStyle = "bg-primary-main";
  } else {
    dynamicRowStyle = "justify-start";
    dynamicBoxStyle = "bg-primary-dark";
  }

  return (
    <Flex
      key={id}
      className={"py-1 w-full " + dynamicRowStyle}
    >
      <Flex
        style={{ maxWidth: "85%" }}
        className={
          "p-2 rounded-md " + dynamicBoxStyle
        }
      >
        <Text className="text-white">{content}</Text>
      </Flex>
    </Flex>
  );
}

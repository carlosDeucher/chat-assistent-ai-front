"use client";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  IconButton,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import React, {
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import useChatController from "../../ChatController";

export default function Footer() {
  const { sendMessage, requestAnswer, getLastMessages } =
    useChatController();
  const latestChatIdRef = useRef<string>(null) 
  const [isAnswerLoading, setIsAnswerLoading] =
    useState(false);
  const [inactivityTimer, setInactivityTimer] =
    useState(5);
  const timerRef = useRef<NodeJS.Timeout>();
  const hasMessagesWaitingForResponse =
    useRef<boolean>(false);
  const [inputValue, setInputValue] =
    useState("");

  function onChangeInput(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setInputValue(e.target.value);

    if (
      hasMessagesWaitingForResponse.current ===
      false
    )
      return;

    startTimer();
  }

  function startTimer() {
    clearInterval(timerRef.current);

    setInactivityTimer(5);

    const intervalMs = 50;

    const intervalId = setInterval(() => {
      setInactivityTimer((oldTimer) => {
        const nextValue =
          oldTimer - intervalMs / 1000;
        if (nextValue > 0) return nextValue;

        handleRequestResponse();
        clearInterval(intervalId);
        return 0;
      });
    }, intervalMs);

    timerRef.current = intervalId;
  }

  async function onSubmitMessage(e: FormEvent) {
    e.preventDefault();

    hasMessagesWaitingForResponse.current = true;

    setInputValue("");

    const messageCreationDateMocked = new Date()
    const success = await sendMessage(inputValue);

    if(success){
      const chatId = await getLastMessages(messageCreationDateMocked);
      latestChatIdRef.current = chatId

      startTimer()
    } 
  }

  async function handleRequestResponse() {
    try {
      setIsAnswerLoading(true);

      const chatId = latestChatIdRef.current
      if (!chatId)
        throw new Error("No chat pending");

      const messageCreationDateMocked = new Date()
      const success = await requestAnswer(chatId);
      if(success)await getLastMessages(messageCreationDateMocked);
    } finally {
      setIsAnswerLoading(false);
    }
  }

  function handleUserKeyPress(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
    }
  }

  return (
    <Flex className="h-12 border-t-2 border-secondary-main px-2 bg-secondary-light">
      <Flex className="w-full justify-between items-center gap-x-1">
        <form
          className="flex w-full gap-x-1"
          onSubmit={onSubmitMessage}
        >
          <TextField.Root
            className="w-full"
            placeholder="Escreva uma mensagem"
            value={inputValue}
            name="message"
            onKeyDown={handleUserKeyPress}
            onChange={onChangeInput}
          ></TextField.Root>
          <IconButton variant="classic">
            <PaperPlaneIcon
              width="18"
              height="18"
            />
          </IconButton>
        </form>
        <Flex className="w-16 items-center justify-center">
          {isAnswerLoading ? (
            <Spinner />
          ) : (
            inactivityTimer.toFixed(2) + " s"
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

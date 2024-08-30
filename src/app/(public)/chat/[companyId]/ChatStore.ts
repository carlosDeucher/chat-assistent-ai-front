import IMessage from "@/@types/IMessages";
import { create } from "zustand";

interface ChatMessagesState {
  lastMessage?: IMessage;
  setLastMessage: (lastMessage: IMessage) => void;
  messagesAreLoading: boolean;
  setMessagesAreLoading: (
    areLoading: boolean
  ) => void;
  messages: IMessage[] | [];
  addMessages: (messages: IMessage[]) => void;
  messagesError: any;
  setMessagesError: (error: any) => void;
}

export const chatMessagesStore =
  create<ChatMessagesState>((set) => ({
    lastMessage: undefined,
    setLastMessage: (lastMessage) =>
      set(() => ({
        lastMessage,
      })),
    messagesAreLoading: true,
    setMessagesAreLoading: (areLoading) =>
      set(() => ({
        messagesAreLoading: areLoading,
      })),
    messages: [],
    addMessages: (newMessages) =>
      set(({ messages }) => ({
        messages: [...messages, ...newMessages],
      })),
    messagesError: null,
    setMessagesError: (error) =>
      set(() => ({ messagesError: error })),
  }));

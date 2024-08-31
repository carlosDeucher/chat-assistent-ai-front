import ApiService from "@/services/ApiService";
import { chatMessagesStore } from "./ChatStore";
import { useParams } from "next/navigation";
import IMessage from "@/@types/IMessages";

export default function useChatController() {
  const params = useParams();
  const [
    setMessagesAreLoading,
    setMessagesError,
    addMessages,
    setLastMessage,
  ] = chatMessagesStore((store) => [
    store.setMessagesAreLoading,
    store.setMessagesError,
    store.addMessages,
    store.setLastMessage,
  ]);

  const companyId = params.companyId;

  async function getLastMessages(lastMessageCreationDate?: Date ) {
    try {
      setMessagesAreLoading(true);

      // new Date(0) = Unix Epoch January 1st, 1970 at UTC
      const startDate = lastMessageCreationDate ?? new Date(0);
         

      const formattedStartDate =
        encodeURIComponent(
          startDate.toISOString()
        );
      const { data } = await ApiService.get(
        `/messages/${companyId}?startDate=${formattedStartDate}`
      );

      const messages = data.data
        .messages as IMessage[];

      const latestLastMessage =
        messages[messages.length - 1];

      setLastMessage(latestLastMessage);
      addMessages(data.data.messages);

      return latestLastMessage.chatId
    } catch (error) {
      setMessagesError(error);
    } finally {
      setMessagesAreLoading(false);
    }
  }

  async function sendMessage(content: string) {
    try {
      await ApiService.post(
        `/message/${companyId}`,
        {
          data: {
            message: content,
          },
        }
      );

      return true;
    } catch (error) {
      console.error(
        "Falha ao enviar mensagem:",
        error
      );
      return false;
    }
  }

  async function requestAnswer(chatId: string) {
    try {
      await ApiService.post(
        `/chat/${companyId}/${chatId}`
      );

      return true;
    } catch (error) {
      console.error(
        "Falha ao obter resposta:",
        error
      );
      return false;
    }
  }

  return {
    getLastMessages,
    sendMessage,
    requestAnswer,
  };
}

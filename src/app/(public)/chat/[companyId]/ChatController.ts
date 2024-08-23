import { chatStore } from "./ChatStore";

export default function useChatController() {
  const [setCompanyIsLoading] = chatStore((store) => [store.setCompanyIsLoading]);
}

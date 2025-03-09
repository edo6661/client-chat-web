export interface ChatState {
  text: string;
  image: string | null;
}

export const initialChatState: ChatState = {
  text: "",
  image: null,
};

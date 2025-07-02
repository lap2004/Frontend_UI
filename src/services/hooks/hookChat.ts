import { chatAdmin, chatStudent } from "../apis/chat";
import { usePostAPI } from "./hookApi";

const useChatAdmin = () => {
  const {
    loading,
    post: postChatAdmin,
    error,
    setError,
  } = usePostAPI(chatAdmin);
  return {
    loading,
    postChatAdmin,
    error,
    setError,
  };
};

const useChatStudent = () => {
  const {
    loading,
    post: postChatStudent,
    error,
    setError,
  } = usePostAPI(chatStudent);
  return {
    loading,
    postChatStudent,
    error,
    setError,
  };
};

export { useChatAdmin, useChatStudent };

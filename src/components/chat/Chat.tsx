"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import PersonIcon from "@mui/icons-material/Person";
import LoadingDots from "../LoadingDot";

import { api } from "@/src/lib/axios";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text:
        "Xin chào, tôi là trợ lý ảo của trường Đại học Văn Lang. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Gửi câu hỏi đến backend
  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    // Thêm tin nhắn người dùng vào chat
    setChatMessages((prev) => [...prev, { text: trimmed, sender: "user" }]);
    setInputText("");
    setLoading(true);

    try {
      // Gửi câu hỏi đến backend
      // Giả sử user_type là "student" hoặc "guest"
      const userType = "student";// đổi lại user // Hoặc lấy từ context/user state nếu có phân quyền

      const res = await api.post("/chat/admission", {
        question: trimmed,
        // Nếu backend cần thêm trường role/user_type, gửi ở đây
        // user_type: userType,
      });

      setChatMessages((prev) => [
        ...prev,
        { text: res.data.answer, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
      setChatMessages((prev) => [
        ...prev,
        { text: "⚠️ Lỗi khi gửi tin nhắn.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Gửi khi nhấn Enter (không shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative z-20">
      {/* chỉnh sửa họp chat */}
      <div className="fixed bottom-20 right-10">
        <AnimatePresence initial={false}>
          {isVisible && (
            <motion.div
              key="chat-box"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-80 h-120 lg:w-[1200px] lg:h-[600px] rounded-2xl shadow-2xl bg-white flex flex-col"
            >
              {/* Header */}
              <Box
                sx={{
                  backgroundColor: "#B02E35",
                  height: 48,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    VANLANG
                  </Typography>
                  <Typography
                    sx={{
                      backgroundColor: "#4388FF",
                      color: "white",
                      px: 2,
                      borderRadius: 1,
                    }}>BETA
                  </Typography>
                </Box>
                <Button
                  onClick={() => setIsVisible(false)}
                  sx={{ color: "white", minWidth: "auto" }}
                  aria-label="Đóng chat"
                >
                  <CancelIcon />
                </Button>
              </Box>

              {/* Messages */}
              {/* gửi tin nhắn */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  px: 2,
                  py: 1,
                  backgroundColor: "#f5f5f5",
                  marginTop: 1,
                }}
              >
                {chatMessages.map((msg, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                      mb: 1,
                    }}
                  >
                    {msg.sender === "user" ? (
                      <>
                        <Box
                          sx={{
                            backgroundColor: "#C4C4C4",
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            maxWidth: "80%",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",

                            backdropFilter: 'blur(10px)',            
                            WebkitBackdropFilter: 'blur(10px)',         
                            border: '1px solid rgba(255, 255, 255, 0.3)', 
                          }}
                        >
                          <Box>
                          <Typography color={"#EAEAEA"}>You</Typography>
                            <Typography>{msg.text}</Typography>
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            backgroundColor: "#C4C4C4",
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            maxWidth: "80%",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",

                            backdropFilter: 'blur(10px)',            
                            WebkitBackdropFilter: 'blur(10px)',         
                            border: '1px solid rgba(255, 255, 255, 0.3)',  
                          }}
                        >
                          {/* bot */}
                          <Box>
                            <Typography color={"#EAEAEA"}>Bot</Typography>
                            <Typography>{msg.text}</Typography>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
                <div ref={bottomRef} />
                {loading && (
                  <>
                    <Box
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      <LoadingDots />
                    </Box>
                  </>
                )}
              </Box>


              {/* Input box */}
              {/* đưa tin nhắn */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderTop: "1px solid #ddd",
                }}
              >
                <AttachFileIcon
                  sx={{ transform: "rotate(45deg)", cursor: "pointer" }}
                  // atach file
                  onClick={() => alert("Chức năng đính kèm đang phát triển")}
                />

                <TextareaAutosize
                  placeholder="Nhập câu hỏi của bạn..."
                  style={{
                    flex: 1,
                    minHeight: 32,
                    borderRadius: 8,
                    padding: 8,
                    borderColor: "#ddd",
                    resize: "none",
                    fontSize: 14,
                    fontFamily: "Arial, sans-serif",
                  }}
                  minRows={1}
                  maxRows={3}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />

                <Box
                  sx={{
                    backgroundColor: "#B02E35",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (!loading) handleSend();
                  }}
                  aria-label="Gửi câu hỏi"
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    <SendIcon sx={{ color: "white" }} />
                  )}
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nút mở chat */}
      <motion.button
        className="bg-[#B02E35] rounded-full w-12 h-12 fixed bottom-5 right-5 
                    z-30 flex items-center justify-center cursor-pointer"
        onClick={() => setIsVisible((v) => !v)}
        whileTap={{ scale: 0.9 }}
        aria-label="Mở/đóng chat"
      >
        {isVisible ? (
          <CancelIcon sx={{ color: "white" }} />
        ) : (
          <Image src="/chatbot.png" alt="Chatbot Logo" width={60} height={60} />
        )}
      </motion.button>
    </div>
  );
};

export default Chat;
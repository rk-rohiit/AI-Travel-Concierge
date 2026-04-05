import { useState, useEffect, useRef } from "react";
import { sendMessage, uploadFile } from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ Session ID
  const [sessionId] = useState(() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
    }
    return id;
  });

  // ✅ Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ❌ Disable old chat loading (avoids bugs)
  useEffect(() => {
    localStorage.removeItem("chat");
  }, []);

  // =========================
  // 📄 FILE UPLOAD
  // =========================
  const handleFileUpload = async () => {
    if (!file) return alert("Select a file first");

    try {
      setLoading(true);

      await uploadFile(file, sessionId);

      setUploaded(true);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `✅ File **${file.name}** uploaded. You can now ask questions.`,
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 💬 CHAT
  // =========================
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // if (!uploaded) {
    //   alert("📄 Please upload a document first");
    //   return;
    // }

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(input, sessionId);

      const botMsg = {
        sender: "bot",
        text: reply || "⚠️ Empty response",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("CHAT ERROR:", err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "⚠️ " +
            (err?.response?.data?.error ||
              err?.message ||
              "Server error"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} maxWidth="700px" mx="auto">
      {/* ================= CHAT AREA ================= */}
      <Box
        sx={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "12px",
          p: 2,
          mb: 2,
          background: "#fafafa",
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            textAlign={msg.sender === "user" ? "right" : "left"}
          >
            <Box
              display="inline-block"
              sx={{
                bgcolor:
                  msg.sender === "user" ? "primary.main" : "#fff",
                color: msg.sender === "user" ? "#fff" : "#000",
                px: 2,
                py: 1,
                borderRadius: "14px",
                maxWidth: "80%",
                my: 1,
                boxShadow: 1,
              }}
            >
              <ReactMarkdown>
                {msg.text || ""}
              </ReactMarkdown>
            </Box>
          </Box>
        ))}

        {loading && (
          <Typography sx={{ mt: 1 }}>Typing...</Typography>
        )}

        <div ref={chatEndRef} />
      </Box>

      {/* ================= FILE UPLOAD ================= */}
      <Box display="flex" gap={2} mb={2}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button
          variant="outlined"
          onClick={handleFileUpload}
          disabled={loading}
        >
          Upload
        </Button>
      </Box>

      {/* ================= INPUT ================= */}
      <TextField
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          uploaded
            ? "Ask about your document..."
            : "Upload a file first..."
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            handleSend();
          }
        }}
      />

      <Button
        onClick={handleSend}
        variant="contained"
        sx={{ mt: 2 }}
        fullWidth
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </Button>
    </Box>
  );
};

export default ChatBox;
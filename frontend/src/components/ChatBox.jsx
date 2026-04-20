import { useState, useEffect, useRef } from "react";
import { sendMessage, uploadFile } from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  Paper,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { RiRobot2Line, RiUser3Line, RiAttachment2, RiSendPlane2Fill } from "react-icons/ri";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your **Traveya AI**. Upload your flight tickets or just tell me where you want to go!" }
  ]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const chatEndRef = useRef(null);

  const [sessionId] = useState(() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
    }
    return id;
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      setLoading(true);
      await uploadFile(selectedFile, sessionId);
      setUploaded(true);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `✅ **${selectedFile.name}** processed. How can I help with this?` },
      ]);
    } catch (err) {
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(input, sessionId);
      setMessages((prev) => [...prev, { sender: "bot", text: reply || "I'm having trouble connecting." }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Server error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 4, px: 2 }}>
      {/* --- Chat Header --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ bgcolor: "#f6543b", width: 45, height: 45 }}>
          <RiRobot2Line size={24} />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#2d3436" }}>Traveya Concierge</Typography>
          <Typography variant="caption" sx={{ color: "#00b894", fontWeight: 600 }}>● AI Online</Typography>
        </Box>
      </Box>

      {/* --- Message Area --- */}
      <Paper 
        elevation={3} 
        sx={{ 
          height: "450px", 
          overflowY: "auto", 
          p: 3, 
          borderRadius: "24px", 
          bgcolor: "#f8f9fa", 
          border: "1px solid #f0f0f0",
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              alignItems: "flex-end",
              gap: 1.5,
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: msg.sender === "user" ? "#2d3436" : "#f6543b",
                fontSize: '14px' 
              }}
            >
              {msg.sender === "user" ? <RiUser3Line /> : <RiRobot2Line />}
            </Avatar>
            
            <Box
              sx={{
                p: 2,
                borderRadius: msg.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                bgcolor: msg.sender === "user" ? "#2d3436" : "#ffffff",
                color: msg.sender === "user" ? "#ffffff" : "#2d3436",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                maxWidth: "75%",
                "& p": { m: 0 } // Fix markdown margin
              }}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </Box>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 5 }}>
            <CircularProgress size={16} sx={{ color: "#f6543b" }} />
            <Typography variant="caption" sx={{ color: "#636e72" }}>AI is thinking...</Typography>
          </Box>
        )}
        <div ref={chatEndRef} />
      </Paper>

      {/* --- Input Area --- */}
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me to plan your next adventure..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              bgcolor: "#fff",
              pr: 1,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              "& fieldset": { borderColor: "#f0f0f0" },
              "&:hover fieldset": { borderColor: "#f6543b" },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton component="label" sx={{ color: "#636e72" }}>
                  <input hidden type="file" onChange={handleFileUpload} />
                  <RiAttachment2 />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleSend} 
                  sx={{ 
                    bgcolor: "#f6543b", 
                    color: "#fff",
                    "&:hover": { bgcolor: "#e0432c" }
                  }}
                >
                  <RiSendPlane2Fill size={20} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatBox;
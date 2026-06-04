import { useState, useEffect, useRef } from "react";
import { sendMessage, uploadFile } from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  RiRobot2Line,
  RiUser3Line,
  RiAttachment2,
  RiSendPlane2Fill,
  RiDeleteBin6Line,
  RiRefreshLine,
  RiCloseLine,
  RiCheckLine,
  RiUploadCloud2Line,
  RiFilePdfLine,
  RiFileImageLine,
  RiFileTextLine,
} from "react-icons/ri";

// ── session helper ────────────────────────────
function getSessionId() {
  let id = localStorage.getItem("traveya_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("traveya_session_id", id);
  }
  return id;
}

// ── quick suggestions ─────────────────────────
const SUGGESTIONS = [
  "Plan a 7-day trip to Tokyo 🇯🇵",
  "Best beaches under ₹1,500 budget",
  "Hidden gems in Southeast Asia",
  "Family trip to Europe — 2 adults + 2 kids",
];

// ── file upload constants ─────────────────────
const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain", "text/csv"];
const MAX_MB = 10;

function fileIcon(type) {
  if (type === "application/pdf")  return <RiFilePdfLine size={20} />;
  if (type.startsWith("image/"))   return <RiFileImageLine size={20} />;
  return                                  <RiFileTextLine size={20} />;
}

function formatSize(bytes) {
  if (bytes < 1024)         return `₹{bytes} B`;
  if (bytes < 1024 * 1024)  return `₹{(bytes / 1024).toFixed(1)} KB`;
  return                          `₹{(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── typing dots ───────────────────────────────
function TypingDots() {
  return (
    <Box sx={{ display: "flex", gap: "5px", alignItems: "center", py: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 7, height: 7, borderRadius: "50%", bgcolor: "#f6543b",
            animation: "bounce 1.2s infinite",
            animationDelay: `₹{i * 0.2}s`,
            "@keyframes bounce": {
              "0%, 80%, 100%": { transform: "scale(0.7)", opacity: 0.5 },
              "40%":           { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      ))}
    </Box>
  );
}

// ── main component ────────────────────────────
const ChatBox = () => {
  const [sessionId] = useState(getSessionId);
  const [input, setInput]           = useState("");
  const [messages, setMessages]     = useState([
    {
      sender: "bot",
      text: "Hello! I'm your **Traveya AI Concierge** ✈️\n\nTell me where you want to go, upload a flight ticket, or pick a suggestion below!",
      time: now(),
    },
  ]);
  const [loading, setLoading]       = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // file upload state
  const [file, setFile]             = useState(null);
  const [dragging, setDragging]     = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | uploading | success | error
  const [uploadError, setUploadError]   = useState("");

  const chatEndRef  = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  function now() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function addMessage(sender, text) {
    setMessages((prev) => [...prev, { sender, text, time: now() }]);
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `₹{Math.min(el.scrollHeight, 120)}px`;
    }
  }, [input]);

  // ── send message ──────────────────────────
  async function handleSend(text) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    addMessage("user", msg);
    setInput("");
    setLoading(true);
    try {
      const reply = await sendMessage(msg, sessionId);
      addMessage("bot", reply || "I'm having trouble connecting right now.");
    } catch (err) {
      addMessage("bot", `⚠️ ₹{err.message || "Server error. Please try again."}`);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  // ── clear conversation ────────────────────
  function handleClear() {
    localStorage.removeItem("traveya_session_id");
    window.location.reload();
  }

  // ── file upload logic ─────────────────────
  function validateAndSet(selected) {
    setUploadStatus("idle");
    setUploadError("");
    if (!ACCEPTED.includes(selected.type)) {
      setUploadError("Unsupported file type. Use PDF, image, TXT, or CSV.");
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setUploadError(`File too large. Max ₹{MAX_MB} MB.`);
      return;
    }
    setFile(selected);
  }

  function onDragOver(e)  { e.preventDefault(); setDragging(true); }
  function onDragLeave()  { setDragging(false); }
  function onDrop(e) {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSet(f);
  }
  function onBrowse(e) {
    const f = e.target.files[0];
    if (f) validateAndSet(f);
    e.target.value = "";
  }
  function removeFile() {
    setFile(null); setUploadStatus("idle"); setUploadError("");
  }

  async function handleUpload() {
    if (!file || uploadStatus === "uploading") return;
    setUploadStatus("uploading");
    setUploadError("");
    try {
      const result = await uploadFile(file, sessionId);
      setUploadStatus("success");
      setShowUpload(false);
      const summary = result?.summary ? `\n\n> ₹{result.summary}` : "";
      addMessage("bot", `✅ **₹{file.name}** processed.₹{summary}\n\nWhat would you like to know about it?`);
      setFile(null);
      setUploadStatus("idle");
    } catch (err) {
      setUploadStatus("error");
      setUploadError(err.message || "Upload failed. Please try again.");
    }
  }

  const dropBorderColor = () => {
    if (dragging)                   return "#f6543b";
    if (uploadStatus === "error")   return "#e74c3c";
    if (uploadStatus === "success") return "#00b894";
    if (file)                       return "#636e72";
    return "#e0e0e0";
  };

  return (
    <Box sx={{ maxWidth: 780, mx: "auto", mt: 4, px: { xs: 1, sm: 2 } }}>
      {/* ── Header ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "#f6543b", width: 44, height: 44 }}>
            <RiRobot2Line size={22} />
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#2d3436" }}>
              Traveya Concierge
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: "#00b894", fontWeight: 600 }}>
              ● AI Online
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Clear conversation">
          <IconButton onClick={handleClear} size="small" sx={{ color: "#b2bec3", "&:hover": { color: "#e74c3c" } }}>
            <RiDeleteBin6Line size={18} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Messages ── */}
      <Box
        sx={{
          height: 440, overflowY: "auto", p: 2.5,
          borderRadius: "24px", bgcolor: "#f8f9fa",
          border: "1px solid #f0f0f0", mb: 1.5,
          display: "flex", flexDirection: "column",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": { background: "#e0e0e0", borderRadius: 4 },
        }}
      >
        {messages.map((msg, i) => {
          const isUser = msg.sender === "user";
          return (
            <Box
              key={i}
              sx={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", alignItems: "flex-end", gap: 1.5, mb: 1.5 }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: isUser ? "#2d3436" : "#f6543b", fontSize: 14, flexShrink: 0 }}>
                {isUser ? <RiUser3Line /> : <RiRobot2Line />}
              </Avatar>
              <Box
                sx={{
                  p: "10px 14px",
                  borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  bgcolor: isUser ? "#2d3436" : "#ffffff",
                  color: isUser ? "#ffffff" : "#2d3436",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  maxWidth: "75%", fontSize: "0.88rem", lineHeight: 1.6,
                  "& p": { m: 0 }, "& ul,& ol": { pl: 2, m: 0 }, "& li": { mb: 0.5 },
                  "& strong": { fontWeight: 700 },
                  "& a": { color: isUser ? "#74b9ff" : "#f6543b" },
                  "& code": {
                    bgcolor: isUser ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.06)",
                    px: "4px", borderRadius: "4px", fontFamily: "monospace", fontSize: "0.82rem",
                  },
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                <Typography component="div" sx={{ fontSize: "0.68rem", mt: 0.5, opacity: 0.5, textAlign: isUser ? "right" : "left" }}>
                  {msg.time}
                </Typography>
              </Box>
            </Box>
          );
        })}

        {loading && (
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#f6543b", fontSize: 14, flexShrink: 0 }}>
              <RiRobot2Line />
            </Avatar>
            <Box sx={{ p: "10px 16px", borderRadius: "18px 18px 18px 4px", bgcolor: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <TypingDots />
            </Box>
          </Box>
        )}
        <div ref={chatEndRef} />
      </Box>

      {/* ── Suggestion chips (first open only) ── */}
      {messages.length <= 1 && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1.5 }}>
          {SUGGESTIONS.map((s) => (
            <Box
              key={s} component="button" onClick={() => handleSend(s)}
              sx={{
                border: "1px solid #f0e8e6", borderRadius: "20px", bgcolor: "#fff",
                color: "#2d3436", fontSize: "0.78rem", px: 1.5, py: 0.6, cursor: "pointer",
                transition: "all 0.15s", "&:hover": { borderColor: "#f6543b", color: "#f6543b" },
              }}
            >
              {s}
            </Box>
          ))}
        </Box>
      )}

      {/* ── File upload panel (collapsible) ── */}
      <Collapse in={showUpload}>
        <Box sx={{ mb: 1.5, p: 2, border: "1px solid #f0e8e6", borderRadius: "16px", bgcolor: "#fff" }}>
          {/* Drop zone */}
          <Box
            onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
            onClick={() => !file && fileInputRef.current?.click()}
            sx={{
              border: `2px dashed ₹{dropBorderColor()}`,
              borderRadius: "12px", p: 2.5, textAlign: "center",
              cursor: file ? "default" : "pointer", transition: "all 0.2s",
              bgcolor: dragging ? "rgba(246,84,59,0.04)" : "transparent",
              "&:hover": !file ? { borderColor: "#f6543b", bgcolor: "rgba(246,84,59,0.03)" } : {},
            }}
          >
            <input ref={fileInputRef} hidden type="file" accept={ACCEPTED.join(",")} onChange={onBrowse} />

            {!file ? (
              <>
                <RiUploadCloud2Line size={32} color="#f6543b" style={{ marginBottom: 6 }} />
                <Typography sx={{ fontWeight: 600, color: "#2d3436", fontSize: "0.88rem" }}>
                  Drag & drop or <span style={{ color: "#f6543b" }}>browse</span>
                </Typography>
                <Typography sx={{ color: "#b2bec3", fontSize: "0.72rem", mt: 0.5 }}>
                  PDF, PNG, JPG, WEBP, TXT, CSV · Max {MAX_MB} MB
                </Typography>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, textAlign: "left" }}>
                <Box sx={{ color: "#f6543b", flexShrink: 0 }}>{fileIcon(file.type)}</Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.82rem", color: "#2d3436", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {file.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: "#636e72" }}>{formatSize(file.size)}</Typography>
                </Box>
                {uploadStatus === "uploading" && (
                  <Box sx={{ width: 20, height: 20, border: "2px solid #f6543b", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
                )}
                {uploadStatus === "success" && (
                  <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#00b894", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <RiCheckLine size={14} color="#fff" />
                  </Box>
                )}
                {uploadStatus !== "uploading" && (
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); removeFile(); }} sx={{ flexShrink: 0, color: "#b2bec3", "&:hover": { color: "#e74c3c" } }}>
                    <RiCloseLine size={16} />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>

          {uploadError && (
            <Typography sx={{ color: "#e74c3c", fontSize: "0.75rem", mt: 0.75 }}>⚠ {uploadError}</Typography>
          )}

          {file && uploadStatus !== "success" && (
            <Box
              component="button" onClick={handleUpload}
              disabled={uploadStatus === "uploading"}
              sx={{
                mt: 1.25, width: "100%", py: 1, border: "none", borderRadius: "50px",
                bgcolor: uploadStatus === "uploading" ? "#b2bec3" : "#f6543b",
                color: "#fff", fontWeight: 600, fontSize: "0.85rem",
                cursor: uploadStatus === "uploading" ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
                "&:hover": uploadStatus !== "uploading" ? { bgcolor: "#e0432c" } : {},
              }}
            >
              <RiUploadCloud2Line size={16} />
              {uploadStatus === "uploading" ? "Uploading…" : "Upload & Process"}
            </Box>
          )}
        </Box>
      </Collapse>

      {/* ── Input row ── */}
      <Box
        sx={{
          display: "flex", alignItems: "flex-end", gap: 1,
          bgcolor: "#fff", border: "1.5px solid #f0f0f0",
          borderRadius: "20px", px: 1.5, py: 1,
          boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
          transition: "border-color 0.2s",
          "&:focus-within": { borderColor: "#f6543b" },
        }}
      >
        <Tooltip title={showUpload ? "Hide upload" : "Attach file"}>
          <IconButton
            size="small"
            onClick={() => setShowUpload((v) => !v)}
            sx={{ color: showUpload ? "#f6543b" : "#b2bec3", "&:hover": { color: "#f6543b" }, flexShrink: 0 }}
          >
            <RiAttachment2 size={20} />
          </IconButton>
        </Tooltip>

        <Box
          component="textarea"
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask me to plan your next adventure… (Shift+Enter for new line)"
          rows={1}
          sx={{
            flex: 1, border: "none", outline: "none", resize: "none",
            bgcolor: "transparent", fontSize: "0.9rem", color: "#2d3436",
            lineHeight: 1.6, py: 0.5, fontFamily: "inherit",
            "::placeholder": { color: "#b2bec3" },
          }}
        />

        <IconButton
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          sx={{
            bgcolor: !input.trim() || loading ? "#f0f0f0" : "#f6543b",
            color:   !input.trim() || loading ? "#b2bec3" : "#fff",
            width: 36, height: 36, flexShrink: 0,
            transition: "all 0.2s",
            "&:hover": { bgcolor: !input.trim() || loading ? "#f0f0f0" : "#e0432c" },
          }}
        >
          {loading
            ? <RiRefreshLine size={18} style={{ animation: "spin 1s linear infinite" }} />
            : <RiSendPlane2Fill size={18} />
          }
        </IconButton>
      </Box>

      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
    </Box>
  );
};

export default ChatBox;
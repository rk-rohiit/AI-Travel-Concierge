import { useState, useRef } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import {
  RiUploadCloud2Line,
  RiFilePdfLine,
  RiFileImageLine,
  RiFileTextLine,
  RiCloseLine,
  RiCheckLine,
} from "react-icons/ri";
import { uploadFile } from "../api/chatApi";

const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain", "text/csv"];
const MAX_MB = 10;

function fileIcon(type) {
  if (type === "application/pdf") return <RiFilePdfLine size={22} />;
  if (type.startsWith("image/"))  return <RiFileImageLine size={22} />;
  return                                 <RiFileTextLine size={22} />;
}

function formatSize(bytes) {
  if (bytes < 1024)         return `₹{bytes} B`;
  if (bytes < 1024 * 1024)  return `₹{(bytes / 1024).toFixed(1)} KB`;
  return                          `₹{(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const FileUpload = ({ sessionId, onUploadSuccess }) => {
  const inputRef = useRef(null);

  const [file, setFile]         = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus]     = useState("idle"); // idle | uploading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function validateAndSet(selected) {
    setStatus("idle");
    setErrorMsg("");
    if (!ACCEPTED.includes(selected.type)) {
      setErrorMsg("Unsupported file type. Use PDF, image, TXT, or CSV.");
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setErrorMsg(`File too large. Max ₹{MAX_MB} MB.`);
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
    setFile(null); setStatus("idle"); setErrorMsg("");
  }

  async function handleUpload() {
    if (!file || status === "uploading") return;
    setStatus("uploading");
    setErrorMsg("");
    try {
      const result = await uploadFile(file, sessionId);
      setStatus("success");
      onUploadSuccess?.(file, result);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Upload failed. Please try again.");
    }
  }

  const borderColor = () => {
    if (dragging)            return "#f6543b";
    if (status === "error")  return "#e74c3c";
    if (status === "success") return "#00b894";
    if (file)                return "#636e72";
    return "#e0e0e0";
  };

  return (
    <Box mb={3}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#2d3436", mb: 1.5 }}>
        📄 Upload Document
      </Typography>

      {/* Drop Zone */}
      <Box
        onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
        onClick={() => !file && inputRef.current?.click()}
        sx={{
          border: `2px dashed ₹{borderColor()}`,
          borderRadius: "16px", p: 3, textAlign: "center",
          cursor: file ? "default" : "pointer", transition: "all 0.2s",
          bgcolor: dragging ? "rgba(246,84,59,0.04)" : "transparent",
          "&:hover": !file ? { borderColor: "#f6543b", bgcolor: "rgba(246,84,59,0.03)" } : {},
        }}
      >
        <input ref={inputRef} hidden type="file" accept={ACCEPTED.join(",")} onChange={onBrowse} />

        {!file ? (
          <>
            <RiUploadCloud2Line size={36} color="#f6543b" style={{ marginBottom: 8 }} />
            <Typography sx={{ fontWeight: 600, color: "#2d3436", fontSize: "0.95rem" }}>
              Drag & drop your file here
            </Typography>
            <Typography sx={{ color: "#636e72", fontSize: "0.8rem", mt: 0.5 }}>
              or <span style={{ color: "#f6543b", fontWeight: 600 }}>browse</span> to select
            </Typography>
            <Typography sx={{ color: "#b2bec3", fontSize: "0.75rem", mt: 1 }}>
              PDF, PNG, JPG, WEBP, TXT, CSV · Max {MAX_MB} MB
            </Typography>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, textAlign: "left" }}>
            <Box sx={{ color: "#f6543b", flexShrink: 0 }}>{fileIcon(file.type)}</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#2d3436", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {file.name}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#636e72" }}>
                {formatSize(file.size)}
              </Typography>
            </Box>

            {status === "uploading" && (
              <Box sx={{ width: 22, height: 22, border: "2px solid #f6543b", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
            )}
            {status === "success" && (
              <Box sx={{ width: 26, height: 26, borderRadius: "50%", bgcolor: "#00b894", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <RiCheckLine size={16} color="#fff" />
              </Box>
            )}
            {status !== "uploading" && (
              <Tooltip title="Remove file">
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); removeFile(); }} sx={{ flexShrink: 0, color: "#b2bec3", "&:hover": { color: "#e74c3c" } }}>
                  <RiCloseLine size={18} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>

      {/* Error */}
      {errorMsg && (
        <Typography sx={{ color: "#e74c3c", fontSize: "0.78rem", mt: 0.75, ml: 0.5 }}>
          ⚠ {errorMsg}
        </Typography>
      )}

      {/* Upload button */}
      {file && status !== "success" && (
        <Box
          component="button" onClick={handleUpload}
          disabled={status === "uploading"}
          sx={{
            mt: 1.5, width: "100%", py: 1.2, border: "none", borderRadius: "50px",
            bgcolor: status === "uploading" ? "#b2bec3" : "#f6543b",
            color: "#fff", fontWeight: 600, fontSize: "0.9rem",
            cursor: status === "uploading" ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
            transition: "background 0.2s",
            "&:hover": status !== "uploading" ? { bgcolor: "#e0432c" } : {},
          }}
        >
          <RiUploadCloud2Line size={18} />
          {status === "uploading" ? "Uploading…" : "Upload & Process"}
        </Box>
      )}

      {/* Success */}
      {status === "success" && (
        <Typography sx={{ mt: 1, textAlign: "center", fontSize: "0.82rem", color: "#00b894", fontWeight: 600 }}>
          ✅ File processed — you can now ask questions about it!
        </Typography>
      )}

      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
    </Box>
  );
};

export default FileUpload;
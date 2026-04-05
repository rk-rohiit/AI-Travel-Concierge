import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  timeout: 0,
});

// ✅ Chat API
export const sendMessage = async (message, session_id) => {
  try {
    const response = await API.post("/chat", {
      message,
      session_id,
    });

    return response.data.reply; // ✅ FIXED
  } catch (error) {
    console.error("Chat API ERROR:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ File Upload API
export const uploadFile = async (file, session_id) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("session_id", session_id); // 🔥 important for RAG memory

  try {
    const res = await API.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Upload ERROR:", error?.response?.data || error.message);
    throw error;
  }
};
import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { uploadFile } from "../api/chatApi";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    setLoading(true);

    try {
      const res = await uploadFile(file);
      alert("✅ File uploaded & processed");
      console.log(res);
    } catch (err) {
      alert("❌ Upload failed");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Box mb={3}>
      <Typography variant="h6">📄 Upload Document</Typography>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <Button
        variant="contained"
        onClick={handleUpload}
        sx={{ ml: 2 }}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </Box>
  );
};

export default FileUpload;
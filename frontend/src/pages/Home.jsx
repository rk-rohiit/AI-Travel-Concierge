import { Box, Typography } from "@mui/material";
import FileUpload from "../components/FileUpload";
import ChatBox from "../components/ChatBox";

const Home = () => {
  return (
    <Box p={3} maxWidth="800px" mx="auto">
      <Typography variant="h4" mb={3}>
        ✈️ AI Travel Concierge (RAG)
      </Typography>

      <ChatBox />
    </Box>
  );
};

export default Home;
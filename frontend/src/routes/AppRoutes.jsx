import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ChatBox from "../components/ChatBox";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat-bot" element={<ChatBox />} />
    </Routes>
  );
};

export default AppRoutes;
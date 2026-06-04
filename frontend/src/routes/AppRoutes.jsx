import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ChatBox from "../components/ChatBox";
import TravelResults from "../pages/TravelResults";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat-bot" element={<ChatBox />} />
      <Route
  path="/travel-results"
  element={<TravelResults />}
/>
    </Routes>
  );
};

export default AppRoutes;
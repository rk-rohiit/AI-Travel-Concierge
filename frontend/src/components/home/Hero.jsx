import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  InputBase,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from "@mui/material";
import { RiSearchLine, RiMapPin2Line, RiCalendarLine, RiGroupLine, RiArrowRightLine } from "react-icons/ri";
import { getTravelPlan } from "../../api/travelApi";
import { useNavigate } from "react-router-dom";

// ── floating destination cards data ──────────
const FLOAT_CARDS = [
  {
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80",
    city: "Tokyo",
    country: "Japan",
    price: "₹1,850",
    rotate: "-8deg",
    top: "12%",
    left: "4%",
    delay: "0s",
  },
  {
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80",
    city: "Paris",
    country: "France",
    price: "₹2,100",
    rotate: "6deg",
    top: "8%",
    right: "4%",
    delay: "0.4s",
  },
  {
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80",
    city: "Bali",
    country: "Indonesia",
    price: "₹1,200",
    rotate: "4deg",
    bottom: "18%",
    left: "3%",
    delay: "0.8s",
  },
  {
    img: "https://images.unsplash.com/photo-1558369981-f9ca78462e61?w=300&q=80",
    city: "Lisbon",
    country: "Portugal",
    price: "₹1,400",
    rotate: "-5deg",
    bottom: "14%",
    right: "3%",
    delay: "0.6s",
  },
];

const STATS = [
  { value: "150+", label: "Countries" },
  { value: "50K+", label: "Trips planned" },
  { value: "4.9★", label: "Avg rating" },
  { value: "24/7", label: "AI support" },
];

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("7");
  const [travelers, setTravelers] = useState("2");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [travelData, setTravelData] = useState(null);
  const [openResult, setOpenResult] = useState(false);

const handlePlanTrip = async () => {
  if (!destination.trim()) {
    alert("Please enter a destination");
    return;
  }

  try {
    setLoading(true);

    const today = new Date();

    const arrival = today.toISOString().split("T")[0];

    const departure = new Date(
      today.getTime() + Number(duration) * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];

    const data = await getTravelPlan(
      destination,
      arrival,
      departure
    );

    console.log("TRAVEL PLAN:", data);

    // Save API response
    setTravelData(data);

    // Open popup
    setOpenResult(true);

  } catch (error) {
    console.error("Travel Plan Error:", error);

    alert("Failed to generate travel plan.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#fdfcfb",
        pt: { xs: 10, md: 8 },
        pb: { xs: 6, md: 4 },
      }}
    >
      {/* ── Background dot grid ── */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #e0e0e0 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* ── Soft glow blobs ── */}
      <Box sx={{ position: "absolute", top: "10%", left: "20%", width: 400, height: 400, borderRadius: "50%", bgcolor: "rgba(246,84,59,0.07)", filter: "blur(80px)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: "15%", right: "15%", width: 350, height: 350, borderRadius: "50%", bgcolor: "rgba(59,130,246,0.06)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* ── Floating destination cards (desktop only) ── */}
      {FLOAT_CARDS.map((card) => (
        <Box
          key={card.city}
          sx={{
            display: { xs: "none", lg: "block" },
            position: "absolute",
            top: card.top,
            bottom: card.bottom,
            left: card.left,
            right: card.right,
            width: 140,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            transform: `rotate(₹{card.rotate})`,
            animation: "floatCard 4s ease-in-out infinite alternate",
            animationDelay: card.delay,
            zIndex: 1,
          }}
        >
          <Box component="img" src={card.img} alt={card.city} sx={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
          <Box sx={{ bgcolor: "#fff", px: 1.25, py: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "0.78rem", color: "#2d3436", lineHeight: 1.2 }}>{card.city}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.25 }}>
              <Typography sx={{ fontSize: "0.68rem", color: "#636e72" }}>{card.country}</Typography>
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: "#f6543b" }}>{card.price}</Typography>
            </Box>
          </Box>
        </Box>
      ))}

      {/* ── Main content ── */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>

        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            bgcolor: "rgba(246,84,59,0.08)",
            border: "1px solid rgba(246,84,59,0.2)",
            borderRadius: "20px",
            px: 2,
            py: 0.6,
            mb: 3,
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#f6543b", animation: "pulse 2s infinite" }} />
          <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#f6543b" }}>
            AI-powered travel planning
          </Typography>
        </Box>

        {/* Headline */}
        <Typography
          sx={{
            fontSize: { xs: "2.6rem", sm: "3.5rem", md: "4.2rem" },
            fontWeight: 800,
            color: "#2d3436",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            mb: 1,
          }}
        >
          Your personal
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "2.6rem", sm: "3.5rem", md: "4.2rem" },
            fontWeight: 300,
            color: "#636e72",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            fontStyle: "italic",
            mb: 2.5,
          }}
        >
          Travel Agent
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: "#636e72",
            fontSize: { xs: "1rem", md: "1.1rem" },
            maxWidth: 480,
            mx: "auto",
            lineHeight: 1.7,
            mb: 4.5,
          }}
        >
          Tell <strong style={{ color: "#2d3436" }}>Traveya</strong> where you want to go — we handle flights, hotels, itineraries, and budget. Just show up.
        </Typography>

        {/* ── Search bar ── */}
        <Box
          sx={{
            bgcolor: "#fff",
            border: "1.5px solid #f0f0f0",
            borderRadius: "20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 0, sm: 0 },
            overflow: "hidden",
            mb: 2,
          }}
        >
          {/* Destination input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flex: 1,
              px: 2,
              py: { xs: 1.5, sm: 0 },
              borderBottom: { xs: "1px solid #f0f0f0", sm: "none" },
              borderRight: { sm: "1px solid #f0f0f0" },
            }}
          >
            <RiMapPin2Line size={18} color="#f6543b" style={{ flexShrink: 0 }} />
            <InputBase
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              sx={{ flex: 1, fontSize: "0.9rem", "& input": { py: 1.2 } }}
            />
          </Box>

          {/* Duration */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: { xs: 1.5, sm: 0 },
              borderBottom: { xs: "1px solid #f0f0f0", sm: "none" },
              borderRight: { sm: "1px solid #f0f0f0" },
              minWidth: { sm: 140 },
            }}
          >
            <RiCalendarLine size={17} color="#636e72" style={{ flexShrink: 0 }} />
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              variant="standard"
              disableUnderline
              sx={{ fontSize: "0.88rem", color: "#2d3436", minWidth: 90 }}
            >
              {["3", "5", "7", "10", "14", "21"].map((d) => (
                <MenuItem key={d} value={d}>{d} days</MenuItem>
              ))}
            </Select>
          </Box>

          {/* Travelers */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: { xs: 1.5, sm: 0 },
              borderBottom: { xs: "1px solid #f0f0f0", sm: "none" },
              minWidth: { sm: 130 },
            }}
          >
            <RiGroupLine size={17} color="#636e72" style={{ flexShrink: 0 }} />
            <Select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              variant="standard"
              disableUnderline
              sx={{ fontSize: "0.88rem", color: "#2d3436", minWidth: 90 }}
            >
              {["1", "2", "3", "4", "5", "6+"].map((t) => (
                <MenuItem key={t} value={t}>{t} traveler{t !== "1" ? "s" : ""}</MenuItem>
              ))}
            </Select>
          </Box>

          {/* Search button */}
          <Box sx={{ p: { xs: 1, sm: 0.75 } }}>
            <Button
              variant="contained"
              disableElevation
              startIcon={<RiSearchLine size={17} />}
              onClick={handlePlanTrip}
              disabled={loading}
              sx={{
                bgcolor: "#f6543b",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "0.92rem",
                borderRadius: "14px",
                px: 3,
                py: 1.3,
                width: { xs: "100%", sm: "auto" },
                whiteSpace: "nowrap",
                "&:hover": { bgcolor: "#e0432c" },
              }}
            >
              {loading ? "Planning..." : "Plan my trip"}
            </Button>
          </Box>
        </Box>

        {/* Popular quick-links */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: "0.78rem", color: "#b2bec3" }}>Popular:</Typography>
          {["Bali 🌴", "Tokyo 🇯🇵", "Paris 🗼", "New York 🗽"].map((dest) => (
            <Box
              key={dest}
              component="button"
              onClick={() => setDestination(dest.split(" ")[0])}
              sx={{
                border: "1px solid #f0f0f0",
                borderRadius: "20px",
                bgcolor: "#fff",
                color: "#636e72",
                fontSize: "0.78rem",
                px: 1.25,
                py: 0.4,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": { borderColor: "#f6543b", color: "#f6543b" },
              }}
            >
              {dest}
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── Stats strip ── */}
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2, mt: { xs: 5, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            bgcolor: "#fff",
            border: "1px solid #f0f0f0",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {STATS.map((s, i) => (
            <Box
              key={s.label}
              sx={{
                textAlign: "center",
                py: 1.75,
                borderRight: i < STATS.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#2d3436" }}>{s.value}</Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "#b2bec3", mt: 0.25 }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── Scroll cue ── */}
      <Box
        sx={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          opacity: 0.4,
          animation: "floatCard 2s ease-in-out infinite alternate",
        }}
      >
        <Typography sx={{ fontSize: "0.68rem", letterSpacing: 1, color: "#636e72", textTransform: "uppercase" }}>scroll</Typography>
        <RiArrowRightLine size={14} color="#636e72" style={{ transform: "rotate(90deg)" }} />
      </Box>
      <Dialog
  open={openResult}
  onClose={() => setOpenResult(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>
    ✈️ Travel Plan for {travelData?.city}
  </DialogTitle>

  <DialogContent>

    {/* Weather */}

    <Typography variant="h6" sx={{ mt: 2 }}>
      🌦 Weather
    </Typography>

    <Typography>
      Temperature: {travelData?.weather?.temperature}°C
    </Typography>

    <Typography>
      Condition: {travelData?.weather?.condition}
    </Typography>

    <Divider sx={{ my: 2 }} />

    {/* Hotels */}

    <Typography variant="h6">
      🏨 Recommended Hotels
    </Typography>

    {travelData?.hotels?.map((hotel, index) => (
      <Box
        key={index}
        sx={{
          border: "1px solid #eee",
          borderRadius: 2,
          p: 2,
          mt: 1
        }}
      >
        <Typography fontWeight="bold">
          {hotel.name}
        </Typography>

        <Typography>
          ⭐ {hotel.rating}
        </Typography>

        <Typography>
          ₹ {hotel.price}
        </Typography>
      </Box>
    ))}

    <Divider sx={{ my: 2 }} />

    {/* Itinerary */}

    <Typography variant="h6">
      📅 Itinerary
    </Typography>

    <Typography sx={{ mt: 1 }}>
      Day 1
    </Typography>

    <ul>
      {travelData?.itinerary?.day1?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <Typography>
      Day 2
    </Typography>

    <ul>
      {travelData?.itinerary?.day2?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <Typography>
      Day 3
    </Typography>

    <ul>
      {travelData?.itinerary?.day3?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setOpenResult(false)}
      variant="contained"
      sx={{
        bgcolor: "#f6543b"
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes floatCard {
          from { transform: translateY(0) rotate(var(--r, 0deg)); }
          to   { transform: translateY(-10px) rotate(var(--r, 0deg)); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </Box>
  );
};

export default Hero;
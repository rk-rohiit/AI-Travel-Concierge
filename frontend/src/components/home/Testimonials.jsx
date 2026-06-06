import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Avatar,
  Chip,
} from "@mui/material";
import { RiStarFill, RiArrowLeftLine, RiArrowRightLine, RiDoubleQuotesL } from "react-icons/ri";

const TESTIMONIALS = [
  {
    name: "Samantha R.",
    role: "Adventure Seeker",
    location: "Vancouver, CA",
    avatar: "S",
    color: "#f6543b",
    rating: 5,
    trip: "Thailand · 10 days",
    text: "Traveya changed how I travel! I used to spend weeks planning trips, stressing over every detail. This AI not only found me incredible hidden gems in Thailand but also seamlessly managed my bookings. I just showed up and enjoyed the adventure.",
  },
  {
    name: "James K.",
    role: "Digital Nomad",
    location: "Berlin, DE",
    avatar: "J",
    color: "#3b82f6",
    rating: 5,
    trip: "Bali · 14 days",
    text: "I've tried every travel app out there. Nothing comes close to Traveya. It understood exactly what I wanted — remote work-friendly cafés, fast WiFi, and stunning scenery. My Bali trip was perfect down to the last detail.",
  },
  {
    name: "Priya M.",
    role: "Family Traveler",
    location: "Mumbai, IN",
    avatar: "P",
    color: "#10b981",
    rating: 5,
    trip: "Europe · 21 days",
    text: "Planning a family trip with two kids used to be a nightmare. Traveya built a whole 3-week Europe itinerary that kept my 7-year-old and 10-year-old engaged at every stop. The budget tracking alone saved us hundreds of dollars.",
  },
  {
    name: "Marco L.",
    role: "Luxury Traveler",
    location: "Milan, IT",
    avatar: "M",
    color: "#8b5cf6",
    rating: 5,
    trip: "Maldives · 7 days",
    text: "I was skeptical an AI could handle luxury travel preferences. I was wrong. Traveya booked me into overwater villas I didn't even know existed, paired with private dining experiences. Flawless from start to finish.",
  },
  {
    name: "Aisha T.",
    role: "Solo Explorer",
    location: "Lagos, NG",
    avatar: "A",
    color: "#f59e0b",
    rating: 5,
    trip: "Japan · 12 days",
    text: "As a solo female traveler, safety is my top priority. Traveya not only planned an incredible Japan itinerary but flagged safe neighborhoods, recommended women-friendly hostels, and even built in solo-friendly activities. 10/10.",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(() => goTo((active + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [active]);

  function goTo(index) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 200);
  }

  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((active + 1) % TESTIMONIALS.length);

  // visible cards: prev, active, next (desktop)
  const getVisible = () => {
    const p = (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    const n = (active + 1) % TESTIMONIALS.length;
    return [p, active, n];
  };

  const t = TESTIMONIALS[active];

  return (
    <Box id="testimonials" sx={{ py: { xs: 8, md: 11 }, bgcolor: "#f9fafb", overflow: "hidden" }}>
      <Container maxWidth="lg">

        {/* ── Header ── */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Chip
            label="TRAVELER STORIES"
            size="small"
            sx={{
              bgcolor: "rgba(246,84,59,0.08)",
              color: "#f6543b",
              fontWeight: 700,
              fontSize: "0.65rem",
              border: "1px solid rgba(246,84,59,0.2)",
              borderRadius: "6px",
              mb: 1.5,
            }}
          />
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.8rem", md: "2.4rem" },
              color: "#2d3436",
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            What our travelers say
          </Typography>
          <Typography sx={{ color: "#636e72", fontSize: "0.92rem" }}>
            Real stories from real people who trusted Traveya.
          </Typography>
        </Box>

        {/* ── Desktop: 3-card view ── */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2.5, alignItems: "stretch", mb: 4 }}>
          {getVisible().map((idx, pos) => {
            const item = TESTIMONIALS[idx];
            const isCenter = pos === 1;
            return (
              <Box
                key={idx}
                onClick={() => !isCenter && goTo(idx)}
                sx={{
                  flex: isCenter ? 1.15 : 1,
                  bgcolor: isCenter ? "#fff" : "rgba(255,255,255,0.6)",
                  border: `1.5px solid ${isCenter ? item.color + "40" : "#f0f0f0"}`,
                  borderRadius: "24px",
                  p: isCenter ? 4 : 3,
                  cursor: isCenter ? "default" : "pointer",
                  transition: "all 0.35s ease",
                  opacity: isCenter ? 1 : 0.6,
                  transform: isCenter ? "scale(1)" : "scale(0.97)",
                  boxShadow: isCenter ? "0 12px 40px rgba(0,0,0,0.07)" : "none",
                  "&:hover": !isCenter ? { opacity: 0.85 } : {},
                }}
              >
                {/* Quote icon */}
                <Box sx={{ color: isCenter ? item.color : "#e0e0e0", mb: 2, opacity: 0.8 }}>
                  <RiDoubleQuotesL size={isCenter ? 28 : 22} />
                </Box>

                {/* Stars */}
                <Box sx={{ display: "flex", gap: 0.3, mb: 1.5 }}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <RiStarFill key={i} size={13} color="#fbbf24" />
                  ))}
                </Box>

                {/* Text */}
                <Typography
                  sx={{
                    color: "#636e72",
                    fontSize: isCenter ? "0.92rem" : "0.82rem",
                    lineHeight: 1.75,
                    mb: 2.5,
                    display: "-webkit-box",
                    WebkitLineClamp: isCenter ? 4 : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.text}
                </Typography>

                {/* Divider */}
                <Box sx={{ height: "1px", bgcolor: "#f0f0f0", mb: 2 }} />

                {/* Author */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: isCenter ? 42 : 36,
                      height: isCenter ? 42 : 36,
                      bgcolor: item.color + "18",
                      color: item.color,
                      fontWeight: 700,
                      fontSize: isCenter ? "1rem" : "0.85rem",
                    }}
                  >
                    {item.avatar}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#2d3436", lineHeight: 1.2 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.72rem", color: "#636e72" }}>{item.role}</Typography>
                  </Box>
                  {isCenter && (
                    <Box sx={{ ml: "auto" }}>
                      <Box
                        sx={{
                          bgcolor: item.color + "12",
                          color: item.color,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          px: 1.25,
                          py: 0.4,
                          borderRadius: "6px",
                        }}
                      >
                        {item.trip}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* ── Mobile: single card ── */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            bgcolor: "#fff",
            border: `1.5px solid ${t.color}30`,
            borderRadius: "24px",
            p: 3,
            mb: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
            opacity: animating ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          <Box sx={{ color: t.color, mb: 1.5, opacity: 0.8 }}><RiDoubleQuotesL size={24} /></Box>
          <Box sx={{ display: "flex", gap: 0.3, mb: 1.5 }}>
            {Array.from({ length: t.rating }).map((_, i) => <RiStarFill key={i} size={13} color="#fbbf24" />)}
          </Box>
          <Typography sx={{ color: "#636e72", fontSize: "0.9rem", lineHeight: 1.75, mb: 2.5 }}>{t.text}</Typography>
          <Box sx={{ height: "1px", bgcolor: "#f0f0f0", mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: t.color + "18", color: t.color, fontWeight: 700 }}>{t.avatar}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#2d3436" }}>{t.name}</Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "#636e72" }}>{t.role} · {t.location}</Typography>
            </Box>
            <Box sx={{ bgcolor: t.color + "12", color: t.color, fontSize: "0.65rem", fontWeight: 700, px: 1, py: 0.4, borderRadius: "6px" }}>
              {t.trip}
            </Box>
          </Box>
        </Box>

        {/* ── Controls ── */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
          {/* Prev */}
          <Box
            component="button" onClick={prev}
            sx={{
              width: 38, height: 38, borderRadius: "50%",
              border: "1.5px solid #f0f0f0", bgcolor: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
              "&:hover": { borderColor: "#f6543b", color: "#f6543b" },
            }}
          >
            <RiArrowLeftLine size={16} />
          </Box>

          {/* Dots */}
          <Box sx={{ display: "flex", gap: 0.75 }}>
            {TESTIMONIALS.map((_, i) => (
              <Box
                key={i}
                component="button"
                onClick={() => goTo(i)}
                sx={{
                  width: i === active ? 22 : 7,
                  height: 7,
                  borderRadius: "4px",
                  bgcolor: i === active ? "#f6543b" : "#e0e0e0",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  p: 0,
                }}
              />
            ))}
          </Box>

          {/* Next */}
          <Box
            component="button" onClick={next}
            sx={{
              width: 38, height: 38, borderRadius: "50%",
              border: "1.5px solid #f0f0f0", bgcolor: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
              "&:hover": { borderColor: "#f6543b", color: "#f6543b" },
            }}
          >
            <RiArrowRightLine size={16} />
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Testimonials;
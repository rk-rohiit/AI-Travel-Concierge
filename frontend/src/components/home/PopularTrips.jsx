import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Chip,
} from "@mui/material";
import {
  MdOutlineLocationOn,
  MdOutlineTheaterComedy,
  MdOutlineDirectionsRun,
  MdOutlineDirectionsBoat,
  MdOutlineFastfood,
  MdOutlineMuseum,
  MdOutlineNightlife,
} from "react-icons/md";
import { RiArrowLeftLine, RiArrowRightLine, RiHeartLine, RiHeartFill, RiStarFill, RiTimeLine } from "react-icons/ri";

// ── categories ────────────────────────────────
const CATEGORIES = [
  { label: "All",         icon: <MdOutlineLocationOn />,    key: "all" },
  { label: "Culture",     icon: <MdOutlineTheaterComedy />, key: "culture" },
  { label: "Adventure",   icon: <MdOutlineDirectionsRun />, key: "adventure" },
  { label: "Boating",     icon: <MdOutlineDirectionsBoat />,key: "boating" },
  { label: "Fine Dine",   icon: <MdOutlineFastfood />,      key: "finedine" },
  { label: "Sightseeing", icon: <MdOutlineMuseum />,        key: "sightseeing" },
  { label: "Night life",  icon: <MdOutlineNightlife />,     key: "nightlife" },
];

// ── trips data ────────────────────────────────
const TRIPS = [
  {
    id: 1,
    title: "A Night in Tokyo",
    location: "Tokyo, Japan",
    img: "https://images.unsplash.com/photo-1540959733332-e94e270b2d42?auto=format&fit=crop&w=600&q=80",
    category: "nightlife",
    days: 5,
    rating: 4.9,
    price: "$1,850",
    badge: "Trending",
    badgeColor: "#f6543b",
  },
  {
    id: 2,
    title: "Beauties of Cape Town",
    location: "Cape Town, S. Africa",
    img: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=600&q=80",
    category: "sightseeing",
    days: 7,
    rating: 4.8,
    price: "$1,950",
    badge: "Popular",
    badgeColor: "#3b82f6",
  },
  {
    id: 3,
    title: "Endless in New York",
    location: "New York, USA",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80",
    category: "culture",
    days: 6,
    rating: 4.7,
    price: "$2,300",
    badge: "Hot",
    badgeColor: "#f59e0b",
  },
  {
    id: 4,
    title: "History of Sydney",
    location: "Sydney, Australia",
    img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
    category: "culture",
    days: 8,
    rating: 4.8,
    price: "$2,100",
    badge: "New",
    badgeColor: "#10b981",
  },
  {
    id: 5,
    title: "Bali Bliss Retreat",
    location: "Bali, Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    category: "adventure",
    days: 9,
    rating: 4.9,
    price: "$1,200",
    badge: "Best Value",
    badgeColor: "#8b5cf6",
  },
  {
    id: 6,
    title: "Sailing the Amalfi",
    location: "Amalfi Coast, Italy",
    img: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=600&q=80",
    category: "boating",
    days: 7,
    rating: 4.9,
    price: "$3,200",
    badge: "Luxury",
    badgeColor: "#ec4899",
  },
  {
    id: 7,
    title: "Taste of Lisbon",
    location: "Lisbon, Portugal",
    img: "https://images.unsplash.com/photo-1558369981-f9ca78462e61?auto=format&fit=crop&w=600&q=80",
    category: "finedine",
    days: 5,
    rating: 4.7,
    price: "$1,400",
    badge: "Foodie Pick",
    badgeColor: "#f6543b",
  },
  {
    id: 8,
    title: "Kyoto in Bloom",
    location: "Kyoto, Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    category: "culture",
    days: 6,
    rating: 4.8,
    price: "$1,640",
    badge: "Seasonal",
    badgeColor: "#10b981",
  },
];

// ── single trip card ──────────────────────────
const TripCard = ({ trip }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Box
      sx={{
        minWidth: { xs: 220, sm: 240 },
        maxWidth: { xs: 220, sm: 240 },
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "#fff",
        border: "1px solid #f0f0f0",
        flexShrink: 0,
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
          "& .trip-img": { transform: "scale(1.07)" },
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
        <Box
          className="trip-img"
          component="img"
          src={trip.img}
          alt={trip.title}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
        />

        {/* Gradient overlay */}
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />

        {/* Badge */}
        <Box
          sx={{
            position: "absolute", top: 10, left: 10,
            bgcolor: trip.badgeColor, color: "#fff",
            fontSize: "0.65rem", fontWeight: 700,
            px: 1.25, py: 0.4, borderRadius: "6px",
          }}
        >
          {trip.badge}
        </Box>

        {/* Wishlist */}
        <Box
          component="button"
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          sx={{
            position: "absolute", top: 8, right: 8,
            width: 30, height: 30, borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.9)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.15)" },
          }}
        >
          {liked
            ? <RiHeartFill size={15} color="#f6543b" />
            : <RiHeartLine size={15} color="#636e72" />
          }
        </Box>

        {/* Days pill */}
        <Box
          sx={{
            position: "absolute", bottom: 10, left: 10,
            display: "flex", alignItems: "center", gap: 0.5,
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: "20px", px: 1, py: 0.3,
          }}
        >
          <RiTimeLine size={11} color="#636e72" />
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 600, color: "#2d3436" }}>
            {trip.days} days
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: 1.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#2d3436", mb: 0.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {trip.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mb: 1 }}>
          <MdOutlineLocationOn size={12} color="#636e72" />
          <Typography sx={{ fontSize: "0.72rem", color: "#636e72" }}>{trip.location}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <RiStarFill size={12} color="#fbbf24" />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#2d3436" }}>{trip.rating}</Typography>
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", color: "#f6543b" }}>{trip.price}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ── main component ────────────────────────────
const PopularTrips = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollRef = useRef(null);

  const filtered = activeCategory === "all"
    ? TRIPS
    : TRIPS.filter((t) => t.category === activeCategory);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 270, behavior: "smooth" });
    }
  };

  return (
    <Box id="popular-trips" sx={{ py: { xs: 8, md: 10 }, bgcolor: "#fff" }}>
      <Container maxWidth="lg">

        {/* ── Section header ── */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Chip
              label="CURATED BY AI"
              size="small"
              sx={{
                bgcolor: "rgba(246,84,59,0.08)",
                color: "#f6543b",
                fontWeight: 700,
                fontSize: "0.65rem",
                border: "1px solid rgba(246,84,59,0.2)",
                mb: 1,
                borderRadius: "6px",
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#2d3436", letterSpacing: "-0.5px" }}>
              Popular Trips
            </Typography>
            <Typography sx={{ color: "#636e72", fontSize: "0.88rem", mt: 0.5 }}>
              Handpicked destinations loved by thousands of travelers
            </Typography>
          </Box>

          {/* Scroll arrows */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {[{ dir: -1, Icon: RiArrowLeftLine }, { dir: 1, Icon: RiArrowRightLine }].map(({ dir, Icon }) => (
              <Box
                key={dir}
                component="button"
                onClick={() => scroll(dir)}
                sx={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "1.5px solid #f0f0f0",
                  bgcolor: "#fff", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "#f6543b", color: "#f6543b", bgcolor: "rgba(246,84,59,0.04)" },
                }}
              >
                <Icon size={17} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Category tabs ── */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 3.5,
            overflowX: "auto",
            pb: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.key;
            return (
              <Box
                key={cat.key}
                component="button"
                onClick={() => setActiveCategory(cat.key)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  px: 1.75,
                  py: 0.75,
                  borderRadius: "20px",
                  border: `1.5px solid ${active ? "#f6543b" : "#f0f0f0"}`,
                  bgcolor: active ? "#f6543b" : "#fff",
                  color: active ? "#fff" : "#636e72",
                  fontSize: "0.8rem",
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  "& svg": { fontSize: "1rem" },
                  "&:hover": active ? {} : { borderColor: "#f6543b", color: "#f6543b" },
                }}
              >
                {cat.icon}
                {cat.label}
              </Box>
            );
          })}
        </Box>

        {/* ── Horizontal scroll row ── */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 2,
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { height: 4 },
            "&::-webkit-scrollbar-thumb": { background: "#f0f0f0", borderRadius: 4 },
            "& > *": { scrollSnapAlign: "start" },
          }}
        >
          {filtered.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}

          {/* "View all" card */}
          <Box
            sx={{
              minWidth: { xs: 220, sm: 240 },
              maxWidth: { xs: 220, sm: 240 },
              borderRadius: "20px",
              border: "2px dashed #f0f0f0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              flexShrink: 0,
              cursor: "pointer",
              transition: "border-color 0.2s",
              "&:hover": { borderColor: "#f6543b" },
              p: 3,
              textAlign: "center",
              minHeight: 280,
            }}
          >
            <Box
              sx={{
                width: 44, height: 44, borderRadius: "50%",
                bgcolor: "rgba(246,84,59,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <RiArrowRightLine size={20} color="#f6543b" />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#2d3436" }}>
              View all trips
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#b2bec3" }}>
              Browse 500+ curated destinations
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PopularTrips;
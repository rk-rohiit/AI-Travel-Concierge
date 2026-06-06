import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Chip,
} from "@mui/material";
import { RiStarFill, RiMapPin2Line, RiArrowRightLine, RiHeartLine, RiHeartFill } from "react-icons/ri";

const DESTINATIONS = [
  {
    name: "Rajasthan, India",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    tag: "Royal",
    tagColor: "#f59e0b",
    rating: 4.9,
    reviews: 4210,
    from: "₹28,000",
    highlight: "Jaipur · Udaipur · Jodhpur",
  },
  {
    name: "Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    tag: "Tropical",
    tagColor: "#10b981",
    rating: 4.9,
    reviews: 3870,
    from: "₹18,500",
    highlight: "Backwaters · Munnar · Alleppey",
  },
  {
    name: "Goa, India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    tag: "Beaches",
    tagColor: "#3b82f6",
    rating: 4.7,
    reviews: 6120,
    from: "₹15,000",
    highlight: "Baga · Anjuna · Old Goa",
  },
  {
    name: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    tag: "Adventure",
    tagColor: "#8b5cf6",
    rating: 4.8,
    reviews: 2980,
    from: "₹22,000",
    highlight: "Manali · Spiti · Kasol",
  },
  {
    name: "Varanasi, India",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80",
    tag: "Spiritual",
    tagColor: "#ec4899",
    rating: 4.8,
    reviews: 2450,
    from: "₹12,000",
    highlight: "Ghats · Ganga Aarti · Sarnath",
  },
  {
    name: "Andaman Islands",
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80",
    tag: "Island",
    tagColor: "#f6543b",
    rating: 4.9,
    reviews: 1890,
    from: "₹32,000",
    highlight: "Radhanagar Beach · Scuba · Neil Island",
  },
];

const DestCard = ({ d, tall }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Box
      sx={{
        borderRadius: { xs: "16px", md: "20px" },
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        width: "100%",
        height: tall
          ? { xs: 260, sm: 300, md: "100%" }
          : { xs: 220, sm: 250, md: 300 },
        minHeight: tall ? { md: 640 } : "unset",
        boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
        transition: "box-shadow 0.3s ease",
        "&:hover": { boxShadow: "0 16px 48px rgba(0,0,0,0.18)" },
        "&:hover .dest-img": { transform: "scale(1.06)" },
        "&:hover .dest-overlay": { opacity: 1 },
        "&:hover .dest-cta": { transform: "translateY(0)", opacity: 1 },
      }}
    >
      <Box
        className="dest-img"
        component="img"
        src={d.image}
        alt={d.name}
        sx={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          transition: "transform 0.5s ease",
        }}
      />

      {/* Gradient */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)" }} />

      {/* Hover tint */}
      <Box className="dest-overlay" sx={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.10)", opacity: 0, transition: "opacity 0.3s ease" }} />

      {/* Tag + heart */}
      <Box sx={{ position: "absolute", top: 12, left: 12, right: 12, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ bgcolor: d.tagColor, color: "#fff", fontSize: { xs: "0.62rem", md: "0.68rem" }, fontWeight: 700, px: 1.1, py: 0.35, borderRadius: "6px" }}>
          {d.tag}
        </Box>
        <Box
          component="button"
          onClick={(e) => { e.stopPropagation(); setLiked(v => !v); }}
          sx={{ width: { xs: 28, md: 32 }, height: { xs: 28, md: 32 }, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", "&:hover": { transform: "scale(1.15)" } }}
        >
          {liked ? <RiHeartFill size={14} color="#f6543b" /> : <RiHeartLine size={14} color="#636e72" />}
        </Box>
      </Box>

      {/* Bottom info */}
      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: { xs: 1.75, md: 2.5 }, zIndex: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.4 }}>
          <RiMapPin2Line size={11} color="rgba(255,255,255,0.65)" />
          <Typography sx={{ fontSize: { xs: "0.62rem", md: "0.7rem" }, color: "rgba(255,255,255,0.65)" }}>{d.highlight}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.9rem", md: "1.05rem" }, color: "#fff", lineHeight: 1.2 }}>
              {d.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mt: 0.35 }}>
              <RiStarFill size={11} color="#fbbf24" />
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>{d.rating}</Typography>
              <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>({d.reviews.toLocaleString()})</Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "right", flexShrink: 0, ml: 1 }}>
            <Typography sx={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.55)" }}>from</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.85rem", md: "1rem" }, color: "#fff" }}>{d.from}</Typography>
          </Box>
        </Box>

        <Box
          className="dest-cta"
          sx={{ mt: 1.25, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.6, bgcolor: "#f6543b", color: "#fff", borderRadius: "10px", py: { xs: 0.7, md: 0.9 }, fontSize: { xs: "0.75rem", md: "0.8rem" }, fontWeight: 700, transform: "translateY(10px)", opacity: 0, transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          Plan this trip <RiArrowRightLine size={13} />
        </Box>
      </Box>
    </Box>
  );
};

const Destinations = () => {
  return (
    <Box id="features" sx={{ py: { xs: 7, md: 11 }, bgcolor: "#f8f9fa" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 3 } }}>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Chip
            label="AI-RECOMMENDED"
            size="small"
            sx={{ bgcolor: "rgba(59,130,246,0.08)", color: "#3b82f6", fontWeight: 700, fontSize: "0.65rem", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "6px", mb: 1.5 }}
          />
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" }, color: "#2d3436", letterSpacing: "-0.5px", mb: 1 }}>
            Trending India Destinations
          </Typography>
          <Typography sx={{ color: "#636e72", fontSize: { xs: "0.85rem", md: "0.92rem" }, maxWidth: 460, mx: "auto", lineHeight: 1.6 }}>
            AI-curated picks across India — royal forts, tropical coasts, Himalayan peaks, and sacred ghats.
          </Typography>
        </Box>

        {/* ── Mobile: single column ── */}
        <Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column", gap: 2 }}>
          {DESTINATIONS.map((d) => <DestCard key={d.name} d={d} tall={false} />)}
        </Box>

        {/* ── Tablet: 2-column grid ── */}
        <Box sx={{ display: { xs: "none", sm: "grid", md: "none" }, gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {DESTINATIONS.map((d) => <DestCard key={d.name} d={d} tall={false} />)}
        </Box>

        {/* ── Desktop: masonry ── */}
        <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "5fr 7fr", gridTemplateRows: "auto auto", gap: 2.5 }}>
          {/* Tall left card — spans 2 rows */}
          <Box sx={{ gridRow: "1 / 3", gridColumn: "1 / 2" }}>
            <DestCard d={DESTINATIONS[0]} tall />
          </Box>

          {/* Top-right: 2 cards side by side */}
          <Box sx={{ gridRow: "1 / 2", gridColumn: "2 / 3", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
            <DestCard d={DESTINATIONS[1]} tall={false} />
            <DestCard d={DESTINATIONS[2]} tall={false} />
          </Box>

          {/* Bottom-right: 2 cards side by side */}
          <Box sx={{ gridRow: "2 / 3", gridColumn: "2 / 3", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
            <DestCard d={DESTINATIONS[3]} tall={false} />
            <DestCard d={DESTINATIONS[4]} tall={false} />
          </Box>

          {/* Full-width bottom card */}
          <Box sx={{ gridColumn: "1 / 3", height: 240 }}>
            <DestCard d={DESTINATIONS[5]} tall={false} />
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Destinations;
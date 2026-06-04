import { Box, Typography, Container } from "@mui/material";

// ── partners data ─────────────────────────────
// Using SVG text logos for reliability (no broken image links)
const PARTNERS = [
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg",
  },
  {
    name: "Booking.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg",
  },
  {
    name: "Expedia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Expedia_Logo_2023.svg",
  },
  {
    name: "Tripadvisor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Tripadvisor_Logo.svg",
  },
  {
    name: "Trivago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Trivago_logo.svg",
  },
  {
    name: "Skyscanner",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Skyscanner_Logo_LockupHorizontal_SkyBlue_RGB.svg",
  },
  {
    name: "Kayak",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Kayak-logo.svg",
  },
];

// Duplicate for seamless infinite scroll
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS];

const Partners = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 7 },
        bgcolor: "#fafafa",
        borderTop: "1px solid #f0f0f0",
        borderBottom: "1px solid #f0f0f0",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#b2bec3",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Trusted partners
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
              color: "#636e72",
            }}
          >
            We work with the world's best travel platforms
          </Typography>
        </Box>
      </Container>

      {/* ── Marquee strip ── */}
      <Box sx={{ position: "relative" }}>
        {/* Left fade */}
        <Box
          sx={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 1,
            background: "linear-gradient(to right, #fafafa, transparent)",
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <Box
          sx={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 1,
            background: "linear-gradient(to left, #fafafa, transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Scrolling track */}
        <Box
          sx={{
            display: "flex",
            gap: 0,
            animation: "marquee 28s linear infinite",
            width: "max-content",
            "&:hover": { animationPlayState: "paused" },
            "@keyframes marquee": {
              "0%":   { transform: "translateX(0)" },
              "100%": { transform: `translateX(-50%)` },
            },
          }}
        >
          {MARQUEE_ITEMS.map((partner, i) => (
            <Box
              key={`${partner.name}-${i}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 4, md: 6 },
                py: 1,
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={partner.logo}
                alt={partner.name}
                sx={{
                  height: { xs: 22, md: 28 },
                  width: "auto",
                  maxWidth: 120,
                  objectFit: "contain",
                  filter: "grayscale(100%) opacity(0.45)",
                  transition: "filter 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%) opacity(1)",
                    transform: "scale(1.08)",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Bottom trust note ── */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography sx={{ fontSize: "0.78rem", color: "#b2bec3" }}>
          All bookings are secured and verified through our partner network
        </Typography>
      </Box>
    </Box>
  );
};

export default Partners;
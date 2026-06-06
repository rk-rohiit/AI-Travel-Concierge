import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import {
  RiInstagramLine,
  RiFacebookCircleFill,
  RiTwitterXFill,
  RiYoutubeFill,
  RiTiktokFill,
  RiPlaneLine,
  RiSendPlane2Fill,
  RiMapPin2Line,
  RiMailLine,
  RiPhoneLine,
} from "react-icons/ri";

const LINKS = {
  Company: ["About us", "Careers", "Press", "Blog"],
  Product: ["How it works", "Pricing", "Popular Trips", "AI Planner"],
  Support: ["Help Center", "Contact us", "Privacy Policy", "Terms of Service"],
};

const SOCIALS = [
  { Icon: RiInstagramLine,      label: "Instagram" },
  { Icon: RiFacebookCircleFill, label: "Facebook" },
  { Icon: RiTiktokFill,         label: "TikTok" },
  { Icon: RiTwitterXFill,       label: "X" },
  { Icon: RiYoutubeFill,        label: "YouTube" },
];

// Collapsible link section for mobile
const LinkSection = ({ heading, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      {/* Mobile: tappable heading */}
      <Box
        onClick={() => setOpen(v => !v)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: { xs: "pointer", md: "default" },
          mb: { xs: 0, md: 2 },
          pb: { xs: 1.5, md: 0 },
          borderBottom: { xs: "1px solid rgba(255,255,255,0.06)", md: "none" },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.6px",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            transition: "transform 0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "rgba(255,255,255,0.4)",
            fontSize: "1rem",
          }}
        >
          ▾
        </Box>
      </Box>

      {/* Links */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.1,
          maxHeight: { xs: open ? "200px" : "0px", md: "none" },
          overflow: { xs: "hidden", md: "visible" },
          transition: { xs: "max-height 0.3s ease", md: "none" },
          mt: { xs: open ? 1.25 : 0, md: 0 },
        }}
      >
        {items.map((item) => (
          <Typography
            key={item}
            component="a"
            href="#"
            sx={{
              fontSize: { xs: "0.83rem", md: "0.85rem" },
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              transition: "color 0.2s",
              "&:hover": { color: "#f6543b" },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#161616", color: "#fff", pt: { xs: 6, md: 9 }, pb: 3 }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>

        {/* ── Top section ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "4fr 2fr 2fr 2fr 3fr" },
            gap: { xs: 4, sm: 4, md: 5 },
            mb: { xs: 5, md: 7 },
          }}
        >
          {/* Brand */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 34, height: 34, borderRadius: "10px",
                  bgcolor: "#f6543b",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <RiPlaneLine size={18} color="#fff" />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.5px" }}>
                Rave<span style={{ color: "#f6543b" }}>ya</span>
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.45)",
                fontSize: { xs: "0.85rem", md: "0.88rem" },
                lineHeight: 1.7,
                mb: 3,
                maxWidth: 280,
              }}
            >
              Your AI-powered travel concierge. We plan every detail so you can focus on the experience.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { Icon: RiMapPin2Line, text: "Ludhiana, Punjab, India" },
                { Icon: RiMailLine,    text: "hello@raveya.ai" },
                { Icon: RiPhoneLine,   text: "+91 98765 43210" },
              ].map(({ Icon, text }) => (
                <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Icon size={13} color="rgba(255,255,255,0.3)" />
                  <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <LinkSection key={heading} heading={heading} items={items} />
          ))}

          {/* Newsletter */}
          <Box sx={{ gridColumn: { sm: "1 / -1", md: "auto" } }}>
            <Typography
              sx={{
                fontWeight: 700, fontSize: "0.78rem",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.6px", textTransform: "uppercase", mb: 1,
              }}
            >
              Stay inspired
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.82rem", md: "0.83rem" },
                color: "rgba(255,255,255,0.4)",
                mb: 2, lineHeight: 1.65,
              }}
            >
              Weekly destination ideas, travel tips, and exclusive deals.
            </Typography>

            <Box
              sx={{
                display: "flex",
                bgcolor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "border-color 0.2s",
                "&:focus-within": { borderColor: "#f6543b" },
              }}
            >
              <InputBase
                placeholder="Your email address"
                sx={{
                  flex: 1, px: 1.75, py: 0.5,
                  fontSize: "0.83rem",
                  color: "rgba(255,255,255,0.8)",
                  "& input::placeholder": { color: "rgba(255,255,255,0.28)" },
                }}
              />
              <Box
                component="button"
                sx={{
                  border: "none", bgcolor: "#f6543b", color: "#fff",
                  px: 1.75, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                  "&:hover": { bgcolor: "#e0432c" },
                }}
              >
                <RiSendPlane2Fill size={16} />
              </Box>
            </Box>
            <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", mt: 0.75 }}>
              No spam, unsubscribe anytime.
            </Typography>

            {/* App badges */}
            <Box sx={{ display: "flex", gap: 1, mt: 2.5, flexWrap: "wrap" }}>
              {["🍎 App Store", "▶ Google Play"].map((label) => (
                <Box
                  key={label}
                  component="button"
                  sx={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    px: 1.5, py: 0.7,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": { borderColor: "#f6543b", color: "#f6543b" },
                  }}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 3 }} />

        {/* ── Bottom bar ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.25)",
              order: { xs: 2, sm: 1 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            © 2026 Raveya, Inc. All rights reserved. · Made with ❤️ for Indian travelers
          </Typography>

          <Box sx={{ display: "flex", gap: 0.25, order: { xs: 1, sm: 2 } }}>
            {SOCIALS.map(({ Icon, label }) => (
              <IconButton
                key={label}
                aria-label={label}
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.3)",
                  transition: "all 0.2s",
                  "&:hover": { color: "#f6543b", bgcolor: "rgba(246,84,59,0.1)" },
                }}
              >
                <Icon size={17} />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
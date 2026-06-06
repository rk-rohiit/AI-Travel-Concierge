import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import { RiMenuLine, RiCloseLine, RiPlaneLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
const NAV_LINKS = ["Features", "Popular Trips", "Testimonials", "FAQ"];
import { RiRobot2Line } from "react-icons/ri";
import ChatBox from "../ChatBox";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (label) => {
    const id = label.toLowerCase().replace(/\s+/g, "-");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  // const handleMove = () => {
  //   // 1. Perform your authentication logic here...

  //   // 2. Redirect programmatically
  //   navigate("/chat-bot");
  // };

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.35s ease",
          background: scrolled
            ? "rgba(255,255,255,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: { xs: 60, md: 68 },
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  bgcolor: "#f6543b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <RiPlaneLine size={18} color="#fff" />
              </Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "#2d3436",
                  letterSpacing: "-0.5px",
                }}
              >
                Rave<span style={{ color: "#f6543b" }}>ya</span>
              </Typography>
            </Box>

            {/* Desktop nav links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {NAV_LINKS.map((link) => (
                <Box
                  key={link}
                  component="button"
                  onClick={() => scrollTo(link)}
                  sx={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    px: 1.5,
                    py: 0.75,
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: "#636e72",
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "#f6543b",
                      bgcolor: "rgba(246,84,59,0.06)",
                    },
                  }}
                >
                  {link}
                </Box>
              ))}
            </Box>

            {/* CTA buttons */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
              <Button
                onClick={() => setChatOpen(true)}
                startIcon={<RiRobot2Line />}
                sx={{
                  textTransform: "none",
                  color: "#2d3436",
                  fontWeight: 500,
                  fontSize: "0.88rem",
                  px: 2,
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                }}
                // onClick={handleMove}
              >
                AI-Planner
              </Button>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  textTransform: "none",
                  bgcolor: "#f6543b",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  px: 2.5,
                  py: 0.9,
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "#e0432c" },
                }}
              >
                Get started
              </Button>
            </Box>

            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: "#2d3436" }}
            >
              <RiMenuLine size={22} />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 260, pt: 2, px: 2 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2d3436" }}>
            Rave<span style={{ color: "#f6543b" }}>ya</span>
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <RiCloseLine size={20} />
          </IconButton>
        </Box>

        <List disablePadding>
          {NAV_LINKS.map((link) => (
            <ListItem key={link} disablePadding sx={{ mb: 0.5 }}>
              <Box
                component="button"
                onClick={() => scrollTo(link)}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  px: 1.5,
                  py: 1.1,
                  borderRadius: "8px",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  color: "#2d3436",
                  "&:hover": { bgcolor: "rgba(246,84,59,0.06)", color: "#f6543b" },
                }}
              >
                {link}
              </Box>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#e0e0e0",
              color: "#2d3436",
              borderRadius: "8px",
              "&:hover": { borderColor: "#f6543b", color: "#f6543b", bgcolor: "transparent" },
            }}
          >
            Log in
          </Button>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            sx={{
              textTransform: "none",
              bgcolor: "#f6543b",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#e0432c" },
            }}
          >
            Get started
          </Button>
        </Box>
      </Drawer>
      {chatOpen && (
        <ChatBox
          open={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
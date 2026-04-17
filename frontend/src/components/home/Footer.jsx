import { Box, Typography, Grid, Container, Link, IconButton, Divider } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <HiSparkles size={24} color="#3b82f6" />
              <Typography variant="h6" fontWeight="bold">
                TravelAI
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 300 }}>
              The world's first AI-powered travel concierge that understands your vibe and crafts the perfect journey.
            </Typography>
          </Grid>

          {/* Links Column 1 */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>Features</Link>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>Destinations</Link>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>Pricing</Link>
            </Box>
          </Grid>

          {/* Links Column 2 */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>About Us</Link>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>Contact</Link>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>Privacy Policy</Link>
            </Box>
          </Grid>

          {/* Social Column */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <IconButton sx={{ color: "white", "&:hover": { color: "#3b82f6" } }}>
                <FaFacebook size={20} />
              </IconButton>
              <IconButton sx={{ color: "white", "&:hover": { color: "#3b82f6" } }}>
                <FaTwitter size={20} />
              </IconButton>
              <IconButton sx={{ color: "white", "&:hover": { color: "#3b82f6" } }}>
                <FaInstagram size={20} />
              </IconButton>
              <IconButton sx={{ color: "white", "&:hover": { color: "#3b82f6" } }}>
                <FaLinkedin size={20} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            © 2026 TravelAI. Designed by Rohit Sharma.
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>
            Powered by React, MUI & Tailwind
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
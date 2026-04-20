import { Box, Typography, Container, Stack, IconButton } from "@mui/material";
import { 
  RiInstagramLine, 
  RiFacebookCircleFill, 
  RiTwitterXFill, 
  RiYoutubeFill, 
  RiTiktokFill 
} from "react-icons/ri";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "#1a1a1a", // Dark charcoal background from your image
        color: "#ffffff", 
        py: 4,
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems="center" 
          spacing={2}
        >
          {/* Copyright & Links */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}
            >
              © 2026 Traveya
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "rgba(255,255,255,0.6)", 
                fontSize: "0.85rem", 
                cursor: "pointer",
                "&:hover": { color: "#fff" } 
              }}
            >
              Privacy Policy
            </Typography>
          </Box>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={1}>
            <IconButton 
              sx={{ 
                color: "rgba(255,255,255,0.6)", 
                "&:hover": { color: "#f6543b" } // Coral hover effect
              }}
            >
              <RiInstagramLine size={20} />
            </IconButton>
            <IconButton 
              sx={{ 
                color: "rgba(255,255,255,0.6)", 
                "&:hover": { color: "#f6543b" } 
              }}
            >
              <RiFacebookCircleFill size={20} />
            </IconButton>
            <IconButton 
              sx={{ 
                color: "rgba(255,255,255,0.6)", 
                "&:hover": { color: "#f6543b" } 
              }}
            >
              <RiTiktokFill size={20} />
            </IconButton>
            <IconButton 
              sx={{ 
                color: "rgba(255,255,255,0.6)", 
                "&:hover": { color: "#f6543b" } 
              }}
            >
              <RiTwitterXFill size={20} />
            </IconButton>
            <IconButton 
              sx={{ 
                color: "rgba(255,255,255,0.6)", 
                "&:hover": { color: "#f6543b" } 
              }}
            >
              <RiYoutubeFill size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
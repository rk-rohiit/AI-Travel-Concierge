import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // Soft gradient background as per image
        background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f8f9fa 100%)",
        color: "#333",
        px: 2,
        position: "relative",
        overflow: "hidden",
        pt: { xs: 10, md: 0 }
      }}
    >
      {/* --- Floating Decorative Elements (Destination Cards) --- */}
      {/* Top Left */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=600" // Replace with your image paths
        sx={{
          position: "absolute",
          width: { xs: 80, md: 120 },
          top: "15%",
          left: "10%",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          transform: "rotate(-10deg)",
          display: { xs: "none", sm: "block" }
        }}
      />
      {/* Bottom Left */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=600"
        sx={{
          position: "absolute",
          width: { xs: 90, md: 140 },
          bottom: "15%",
          left: "15%",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          transform: "rotate(5deg)",
          display: { xs: "none", sm: "block" }
        }}
      />
      {/* Top Right */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=600"
        sx={{
          position: "absolute",
          width: { xs: 100, md: 150 },
          top: "10%",
          right: "10%",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          transform: "rotate(8deg)",
          display: { xs: "none", sm: "block" }
        }}
      />
      
      {/* Dotted Lines / Plane path (Simplified) */}
      <Box 
        sx={{ 
          position: "absolute", 
          top: "5%", 
          right: "25%", 
          opacity: 0.6,
          display: { xs: "none", md: "block" }
        }}
      >
        <Typography sx={{ color: "#ff4d4d", fontSize: "2rem" }}>✈️</Typography>
      </Box>

      <Container maxWidth="md" sx={{ zIndex: 2 }}>
        {/* Main Heading */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "4rem" },
            color: "#2d3436",
            mb: 1,
          }}
        >
          Your personal
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 300,
            fontSize: { xs: "2.5rem", md: "4rem" },
            color: "#636e72",
            mb: 3,
            fontStyle: "italic"
          }}
        >
          Travel Agent
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: "#636e72",
            maxWidth: 500,
            mx: "auto",
            mb: 5,
            fontSize: "1.1rem",
            lineHeight: 1.6
          }}
        >
          At <strong>Traveya</strong>, we're here to manage a trip fully tailored for you!
        </Typography>

        {/* Call to Action Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#f6543b", // The coral/red color from your design
            color: "white",
            px: 5,
            py: 1.8,
            borderRadius: "50px", // Rounded pill shape
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            boxShadow: "0 8px 20px rgba(246, 84, 59, 0.3)",
            "&:hover": {
              bgcolor: "#e0432c",
              transform: "translateY(-2px)",
            },
          }}
        >
          Get started it
        </Button>

        {/* Quote Section (Matches the second part of your image) */}
        <Box sx={{ mt: 15 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 400, 
              color: "#2d3436",
              fontStyle: "italic",
              maxWidth: 700,
              mx: "auto"
            }}
          >
            "...it's going to plan trips you never thought were possible."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
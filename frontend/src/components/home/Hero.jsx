import { Box, Typography, Button, Container } from "@mui/material";
import { HiSparkles } from "react-icons/hi2"; // AI/Magic icon
import { FiArrowRight } from "react-icons/fi"; // Clean arrow icon

const Hero = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        // Enhanced Gradient with a "glow" center
        background: "radial-gradient(circle at center, #1a1a1a 0%, #000 100%)",
        color: "white",
        px: 3,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative background "blobs" for that AI/Tech look */}
      <Box sx={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(59, 130, 246, 0.15)",
        filter: "blur(100px)",
        top: "20%",
        left: "10%",
        zIndex: 0
      }} />

      <Container maxWidth="md" sx={{ zIndex: 1 }}>
        {/* Small AI Badge */}
        <Box 
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 1, 
            px: 2, 
            py: 0.5, 
            mb: 3, 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <HiSparkles style={{ color: '#60a5fa' }} />
          <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 1 }}>
            POWERED BY GPT-4 & VEO
          </Typography>
        </Box>

        <Typography 
          variant="h2" 
          fontWeight="800"
          sx={{ 
            fontSize: { xs: '2.5rem', md: '4rem' },
            lineHeight: 1.1,
            mb: 2
          }}
        >
          Plan Your Dream Trip <br />
          <span style={{ color: '#3b82f6' }}>with AI Precision.</span>
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '600px',
            mx: 'auto',
            mb: 4,
            fontWeight: 400
          }}
        >
          Personalized itineraries, real-time booking insights, and smart travel suggestions—all in one intuitive concierge.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large"
            endIcon={<FiArrowRight />}
            sx={{ 
              bgcolor: '#3b82f6', 
              px: 4, 
              py: 1.5, 
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1.1rem',
              '&:hover': { bgcolor: '#2563eb' }
            }}
          >
            Get Started
          </Button>

          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5, 
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1.1rem',
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.05)' }
            }}
          >
            View Demo
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
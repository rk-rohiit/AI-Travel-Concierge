import { Box, Typography, Button, Container } from "@mui/material";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";

const CTA = () => {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Blur Glows */}
      <Box sx={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background: "rgba(59, 130, 246, 0.1)",
        filter: "blur(120px)",
        bottom: "-10%",
        right: "-5%",
      }} />

      <Container maxWidth="md">
        <Box
          sx={{
            p: { xs: 6, md: 10 },
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <HiSparkles size={40} color="#3b82f6" />
          </Box>

          <Typography
            variant="h3"
            fontWeight="900"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              lineHeight: 1.2,
              mb: 2,
              color: "white"
            }}
          >
            Ready to Travel <br />
            <span style={{ color: "#3b82f6" }}>Smarter?</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 5,
              fontWeight: 400,
              maxWidth: "500px",
              mx: "auto"
            }}
          >
            Join 10,000+ travelers using AI to discover the world. 
            Create your first itinerary in less than 30 seconds.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<HiArrowRight />}
              sx={{
                bgcolor: "#3b82f6",
                px: 6,
                py: 2,
                borderRadius: "14px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                "&:hover": {
                  bgcolor: "#2563eb",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Planning Now
            </Button>
            
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
              Free to use • No credit card required • AI Powered
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTA;
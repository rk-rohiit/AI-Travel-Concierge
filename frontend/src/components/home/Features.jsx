import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { HiOutlineSparkles, HiOutlineMap, HiOutlineCloud } from "react-icons/hi2";

const features = [
  {
    title: "AI Trip Planner",
    desc: "Generate personalized itineraries in seconds using advanced neural processing tailored to your vibe.",
    icon: <HiOutlineSparkles size={32} color="#3b82f6" />,
  },
  {
    title: "Live Weather & Insights",
    desc: "Stay ahead of the clouds with real-time updates and AI-driven packing suggestions for any climate.",
    icon: <HiOutlineCloud size={32} color="#3b82f6" />,
  },
  {
    title: "Smart Recommendations",
    desc: "Find hidden gems, boutique hotels, and local food spots that aren't on the standard tourist maps.",
    icon: <HiOutlineMap size={32} color="#3b82f6" />,
  },
];

const Features = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#050505", color: "white" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#3b82f6', fontWeight: 'bold', letterSpacing: 2 }}>
            EXPERIENCE THE FUTURE
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ mt: 1, fontSize: { xs: "2rem", md: "3rem" } }}>
            Smart Tools for Modern Travelers
          </Typography>
        </Box>

        {/* The Grid Fix */}
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex' }}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  width: '100%', // Ensures card fills the Grid item width
                  display: 'flex',
                  flexDirection: 'column',
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    borderColor: "#3b82f6",
                    background: "rgba(59, 130, 246, 0.05)",
                  }
                }}
              >
                <Box sx={{ 
                  mb: 3, 
                  width: 'fit-content',
                  p: 1.5, 
                  borderRadius: '12px', 
                  background: 'rgba(59, 130, 246, 0.1)' 
                }}>
                  {f.icon}
                </Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  {f.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  {f.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
import { Box, Typography, Grid, Paper, Container, Avatar, Rating } from "@mui/material";
import { RiDoubleQuotesL } from "react-icons/ri"; // Quote icon

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Digital Nomad",
    text: "This AI travel planner saved me hours! The itinerary it generated for my Japan trip was spot on with hidden gems I wouldn't have found otherwise.",
    avatar: "R", // You can replace with image URLs later
    color: "#3b82f6"
  },
  {
    name: "Anjali Verma",
    role: "Solo Traveler",
    text: "The real-time weather insights and smart recommendations were a lifesaver during my trip to Bali. Best trip planning tool I’ve ever used.",
    avatar: "A",
    color: "#9333ea"
  },
  {
    name: "Amit Singh",
    role: "Business Traveler",
    text: "Highly recommended for frequent travelers. It handles the logistics so I can focus on my meetings and exploring the city.",
    avatar: "AS",
    color: "#10b981"
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#050505", color: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="overline" 
            sx={{ color: "#3b82f6", fontWeight: "bold", letterSpacing: 2 }}
          >
            COMMUNITY FEEDBACK
          </Typography>
          <Typography variant="h3" fontWeight="800" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
            What Our Explorers Say
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((t, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "24px",
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": {
                    borderColor: "#3b82f6",
                    background: "rgba(255, 255, 255, 0.05)",
                  }
                }}
              >
                {/* Quote Icon */}
                <RiDoubleQuotesL size={40} style={{ color: "rgba(59, 130, 246, 0.2)", marginBottom: '-20px' }} />
                
                <Box sx={{ mb: 2, mt: 2 }}>
                  <Rating value={5} readOnly size="small" sx={{ color: "#3b82f6" }} />
                </Box>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontStyle: "italic", 
                    color: "rgba(255,255,255,0.8)", 
                    mb: 4,
                    lineHeight: 1.7 
                  }}
                >
                  "{t.text}"
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: t.color, 
                      fontWeight: 'bold',
                      width: 48,
                      height: 48 
                    }}
                  >
                    {t.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {t.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      {t.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
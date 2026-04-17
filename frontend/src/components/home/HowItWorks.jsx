import { Box, Typography, Grid, Container, Avatar } from "@mui/material";
import { HiOutlineCpuChip, HiOutlineRocketLaunch } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";

const steps = [
  { 
    title: "Search Destination", 
    desc: "Simply enter your dream location and preferred travel dates.",
    icon: <HiOutlineSearch size={28} />
  },
  { 
    title: "AI Generates Plan", 
    desc: "Our neural engine crafts a custom itinerary based on your interests.",
    icon: <HiOutlineCpuChip size={28} />
  },
  { 
    title: "Start Journey", 
    desc: "Pack your bags and head out. Your AI concierge is ready to help.",
    icon: <HiOutlineRocketLaunch size={28} />
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#ffffff", color: "#000" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography 
            variant="overline" 
            sx={{ color: "#3b82f6", fontWeight: "bold", letterSpacing: 2 }}
          >
            THE PROCESS
          </Typography>
          <Typography variant="h3" fontWeight="800" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
            Your Trip in 3 Easy Steps
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ position: "relative" }}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box 
                sx={{ 
                  textAlign: "center", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  px: { md: 2 } 
                }}
              >
                {/* Step Number & Icon Circle */}
                <Box sx={{ position: "relative", mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "rgba(59, 130, 246, 0.1)",
                      color: "#3b82f6",
                      border: "2px solid #3b82f6",
                      mb: 2
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  
                  {/* Step Number Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: -5,
                      width: 28,
                      height: 28,
                      bgcolor: "#3b82f6",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      boxShadow: "0 4px 10px rgba(59, 130, 246, 0.4)"
                    }}
                  >
                    {i + 1}
                  </Box>
                </Box>

                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ color: "text.secondary", maxWidth: "280px", lineHeight: 1.6 }}
                >
                  {step.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
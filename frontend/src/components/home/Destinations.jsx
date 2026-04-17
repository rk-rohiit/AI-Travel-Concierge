import { Box, Typography, Grid, Card, CardMedia, CardContent, Container, Chip } from "@mui/material";
import { HiStar } from "react-icons/hi2";

const destinations = [
  {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tag: "Romantic",
    rating: 4.9
  },
  {
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    tag: "Tropical",
    rating: 4.8
  },
  {
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    tag: "Metropolis",
    rating: 4.7
  },
];

const Destinations = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8f9fa" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography 
            variant="overline" 
            sx={{ color: "#3b82f6", fontWeight: "bold", letterSpacing: 2 }}
          >
            AI-RECOMMENDED
          </Typography>
          <Typography variant="h3" fontWeight="800" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
            Trending Destinations
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {destinations.map((d, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card 
                sx={{ 
                  borderRadius: "20px", 
                  overflow: "hidden", 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    "& .dest-image": { transform: "scale(1.1)" }
                  }
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  {/* Category Chip */}
                  <Chip 
                    label={d.tag} 
                    sx={{ 
                      position: "absolute", 
                      top: 15, 
                      left: 15, 
                      zIndex: 2, 
                      bgcolor: "rgba(255,255,255,0.9)", 
                      fontWeight: "bold",
                      backdropFilter: "blur(4px)" 
                    }} 
                  />
                  
                  <CardMedia
                    className="dest-image"
                    component="img"
                    height="260"
                    image={d.image}
                    alt={d.name}
                    sx={{ transition: "transform 0.5s ease" }}
                  />
                </Box>

                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {d.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Starting from $1,200
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <HiStar color="#fbbf24" />
                    <Typography variant="body2" fontWeight="bold">
                      {d.rating}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Destinations;
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Chip, Stack } from "@mui/material";
import { 
  MdOutlineLocationOn, 
  MdOutlineTheaterComedy, 
  MdOutlineDirectionsRun, 
  MdOutlineDirectionsBoat, 
  MdOutlineFastfood, 
  MdOutlineMuseum, 
  MdOutlineNightlife 
} from "react-icons/md";

const categories = [
  { label: "Destinations", icon: <MdOutlineLocationOn /> },
  { label: "Culture", icon: <MdOutlineTheaterComedy /> },
  { label: "Adventure", icon: <MdOutlineDirectionsRun /> },
  { label: "Boating", icon: <MdOutlineDirectionsBoat /> },
  { label: "Fine Dine", icon: <MdOutlineFastfood /> },
  { label: "Sightseeing", icon: <MdOutlineMuseum /> },
  { label: "Night life", icon: <MdOutlineNightlife /> },
];

const trips = [
  { id: 1, title: "A Night in Tokyo", location: "Coming soon", img: "https://images.unsplash.com/photo-1540959733332-e94e270b2d42?auto=format&fit=crop&w=500" },
  { id: 2, title: "Beauties of Cape Town", location: "Coming soon", img: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=500" },
  { id: 3, title: "Endless in New York", location: "Coming soon", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=500" },
  { id: 4, title: "History of Sydney", location: "Coming soon", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500" },
  { id: 5, title: "History of Cape Town", location: "Coming soon", img: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=500" },
];

const PopularTrips = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Chip 
            label="COMING SOON" 
            size="small" 
            sx={{ 
              bgcolor: "rgba(246, 84, 59, 0.1)", 
              color: "#f6543b", 
              fontWeight: 700, 
              fontSize: "0.7rem",
              border: "1px solid #f6543b",
              mb: 1
            }} 
          />
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#2d3436" }}>
            Popular Trips
          </Typography>
        </Box>

        {/* Category Icons */}
        <Stack 
          direction="row" 
          spacing={4} 
          justifyContent="center" 
          sx={{ mb: 6, overflowX: "auto", pb: 2 }}
        >
          {categories.map((cat, index) => (
            <Box 
              key={index} 
              sx={{ 
                textAlign: "center", 
                cursor: "pointer", 
                color: index === 0 ? "#f6543b" : "#636e72",
                '&:hover': { color: "#f6543b" }
              }}
            >
              <Box sx={{ fontSize: "1.5rem" }}>{cat.icon}</Box>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, mt: 0.5 }}>
                {cat.label}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Horizontal Trip Cards */}
        {/* <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', pb: 4 }}>
          {trips.map((trip) => (
            <Grid item key={trip.id} sx={{ minWidth: { xs: 200, md: 240 } }}>
              <Card sx={{ borderRadius: 4, boxShadow: "none", bgcolor: "transparent" }}>
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="320"
                    image={trip.img}
                    alt={trip.title}
                    sx={{ borderRadius: 4, objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      bgcolor: "#f6543b",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: "4px",
                      fontSize: "0.65rem",
                      fontWeight: 600
                    }}
                  >
                    Coming soon
                  </Box>
                </Box>
                <CardContent sx={{ px: 1, pt: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#2d3436" }}>
                    {trip.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </Box>
  );
};

export default PopularTrips;
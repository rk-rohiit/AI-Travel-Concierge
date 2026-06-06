import React from "react";
import { useLocation } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Paper
} from "@mui/material";

// Importing modern Font Awesome 6 icons from React Icons
// Change FaMapRoute to FaRoute
import { FaCloudSun, FaHotel, FaRoute, FaStar } from "react-icons/fa6";

const TravelResults = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh" 
        backgroundColor="#f8fafc"
      >
        <Typography variant="h5" color="textSecondary" fontWeight="bold">
          No Data Found
        </Typography>
      </Box>
    );
  }

  const days = Object.keys(data.itinerary || {});

  return (
    <Box sx={{ bgcolor: "#f4f6f9", minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        
        {/* Header Section */}
        <Box sx={{ mb: 5, borderBottom: "1px solid #e2e8f0", pb: 3, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={1}>
            Your Destination
          </Typography>
          <Typography variant="h3" component="h1" fontWeight="800" color="text.primary">
            {data.city}
          </Typography>
        </Box>

        {/* Main Content Layout */}
        <Grid container spacing={4}>
          
          {/* Weather Section */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", position: { md: "sticky" }, top: 24 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                  {/* React Icon styled with native color prop */}
                  <FaCloudSun size={22} color="#1976d2" />
                  <Typography variant="h6" fontWeight="bold" color="text.secondary">
                    Weather
                  </Typography>
                </Box>
                <Box display="flex" alignItems="baseline" mt={1}>
                  <Typography variant="h2" fontWeight="900" color="primary">
                    {data.weather?.temperature}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="text.secondary" sx={{ ml: 0.5 }}>
                    °C
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="500" sx={{ textTransform: "capitalize", mt: 1, color: "text.primary" }}>
                  {data.weather?.condition}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Hotels Section */}
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <FaHotel size={20} color="#1976d2" />
              <Typography variant="h6" fontWeight="bold" color="text.secondary">
                Recommended Hotels
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {data.hotels?.map((hotel, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="text.primary" noWrap>
                        {hotel.name}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={0.5} gap={0.5}>
                        <FaStar size={16} color="#faaf00" />
                        <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ ml: 0.5 }}>
                          {hotel.rating}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" justifyContent="space-between" alignItems="baseline">
                        <Typography variant="caption" color="text.secondary" fontWeight="medium">
                          PRICE / NIGHT
                        </Typography>
                        <Typography variant="h6" fontWeight="800" color="text.primary">
                          ₹{hotel.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Itinerary Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 5, border: "1px solid #e2e8f0" }}>
              <Box display="flex" alignItems="center" gap={1.5} mb={4}>
                <FaMapRoute size={20} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold" color="text.secondary">
                  Day-by-Day Itinerary
                </Typography>
              </Box>

              {/* Custom Timeline Layout */}
              <Box sx={{ borderLeft: "2px solid #e3f2fd", ml: 1, pl: { xs: 2, sm: 3 }, position: "relative" }}>
                {days.map((dayKey, index) => (
                  <Box key={dayKey} sx={{ mb: index === days.length - 1 ? 0 : 4, position: "relative" }}>
                    
                    {/* Timeline Node Dot */}
                    <Box sx={{
                      position: "absolute",
                      left: { xs: "-23px", sm: "-31px" },
                      top: 4,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      border: "4px solid #fff",
                      boxShadow: "0 0 0 2px #1976d2"
                    }} />

                    {/* Day Label */}
                    <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ textTransform: "capitalize", mb: 1.5 }}>
                      Day {index + 1}
                    </Typography>

                    {/* Itinerary Items */}
                    <List disablePadding>
                      {data.itinerary[dayKey].map((item, i) => (
                        <ListItem 
                          key={i} 
                          disablePadding 
                          sx={{ 
                            mb: 1, 
                            bgcolor: "#f8fafc", 
                            borderRadius: 2, 
                            border: "1px solid #f1f5f9",
                            p: 1.5
                          }}
                        >
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ variant: "body2", color: "text.primary", lineHeight: 1.6 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default TravelResults;
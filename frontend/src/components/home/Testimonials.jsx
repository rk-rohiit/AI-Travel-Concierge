import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";

const testimonial = {
  name: "Samantha R.",
  role: "Adventure Seeker",
  location: "Vancouver, CA",
  text: "Traveya changed how I travel! I used to spend weeks planning trips, stressing over every detail. This AI not only found me incredible hidden gems in Thailand but also seamlessly managed my bookings. I just showed up and enjoyed the adventure. It's like having a tech-savvy travel agent in my pocket.",
  avatar: "S",
};

const Testimonials = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "#f9fafb" }}>
      <Container maxWidth="lg">
        {/* Header - Matching the minimal style in your design */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              color: "#2d3436",
              mb: 1,
            }}
          >
            What our travelers say
          </Typography>
          <Typography
            sx={{
              color: "#636e72",
              fontSize: "0.9rem",
            }}
          >
            Real stories from real people who trusted Traveya.
          </Typography>
        </Box>

        {/* Testimonial Card - Matching image_0.png single-card layout */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "24px",
            bgcolor: "#ffffff",
            border: "1px solid #f0f0f0", // Light border as seen in the grid earlier
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "#f6543b", // Coral highlight linked to your brand
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
            },
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* User Profile Info (Left Side) */}
            <Grid item xs={12} md={4}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar
                  sx={{
                    bgcolor: "#f1f2f6",
                    color: "#2d3436",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    width: 64,
                    height: 64,
                  }}
                >
                  {testimonial.avatar}
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#2d3436", lineHeight: 1.2 }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#636e72", mt: 0.5 }}
                  >
                    {testimonial.role}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#b2bec3" }}
                  >
                    {testimonial.location}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Vertcal Divider (Hidden on mobile) */}
            <Grid item xs={12} md={1} sx={{ display: { xs: "none", md: "block" } }}>
              <Divider orientation="vertical" flexItem sx={{ height: "80px", mx: "auto" }} />
            </Grid>

            {/* Testimonial Text (Right Side) */}
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  color: "#636e72",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontStyle: "normal",
                  position: "relative",
                  px: { md: 2 }
                }}
              >
                {/* Optional subtle quote graphic */}
                <Box component="span" sx={{ color: "#f6543b", fontSize: '2rem', position: 'absolute', top: -15, left: -10 }}>“</Box>
                {testimonial.text}
                <Box component="span" sx={{ color: "#f6543b", fontSize: '2rem', position: 'absolute', bottom: -25, right: 10 }}>”</Box>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Testimonials;
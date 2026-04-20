import { Box, Typography, Container, Stack } from "@mui/material";

// Placeholder logo data - replace these with your actual SVG/PNG assets
const partners = [
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg" },
  { name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" },
  { name: "Expedia", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Expedia_Logo_2023.svg" },
  { name: "Tripadvisor", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Tripadvisor_Logo.svg" },
  { name: "Trivago", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Trivago_logo.svg" },
];

const Partners = () => {
  return (
    <Box 
      sx={{ 
        py: 6, 
        bgcolor: "#fcfcfc", // Very light gray to distinguish from the section above
        borderTop: "1px solid #f0f0f0",
        borderBottom: "1px solid #f0f0f0"
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            color: "#95a5a6",
            fontWeight: 600,
            mb: 4,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            fontSize: "0.85rem"
          }}
        >
          Our Partners
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 4, md: 8 }}
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          sx={{
            opacity: 0.6, // Makes logos look consistent
            filter: "grayscale(100%)", // Matches the professional aesthetic in your design
            "& img": {
              height: { xs: 25, md: 35 },
              width: "auto",
              transition: "all 0.3s ease",
              "&:hover": {
                filter: "grayscale(0%)", // Adds a nice interaction
                opacity: 1,
              }
            }
          }}
        >
          {partners.map((partner) => (
            <Box key={partner.name} component="img" src={partner.logo} alt={partner.name} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Partners;
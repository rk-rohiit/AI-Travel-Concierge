import {
  Box,
  Typography,
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  { q: "How does Traveya work?", a: "Traveya uses advanced AI to analyze your preferences and curate a complete travel itinerary including flights, hotels, and activities." },
  { q: "What countries are currently supported?", a: "We support over 150 countries worldwide with real-time data for major tourist destinations." },
  { q: "How do I book a planned itinerary?", a: "Once your plan is ready, you can book everything directly through our partner links with one click." },
  { q: "Does Traveya work offline?", a: "Yes, once your itinerary is generated, you can download it as a PDF or access it via our mobile app offline." },
  { q: "Can I customize the itinerary?", a: "Absolutely! You can swap activities, change dates, or ask the AI to find cheaper alternatives at any time." },
  { q: "Is Traveya free?", a: "We offer a free version for basic planning and a Pro version for advanced features and group planning." },
];

const FAQ = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            color: "#2d3436",
            mb: 8,
          }}
        >
          Frequently asked questions
        </Typography>

        <Grid container spacing={2}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Accordion
                elevation={0}
                sx={{
                  borderBottom: "1px solid #f0f0f0",
                  "&:before": { display: "none" },
                  bgcolor: "transparent",
                }}
              >
                <AccordionSummary
                  expandIcon={<FiChevronDown color="#f6543b" />}
                  sx={{ px: 0 }}
                >
                  <Typography sx={{ fontWeight: 500, color: "#2d3436", fontSize: "0.95rem" }}>
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                  <Typography sx={{ color: "#636e72", fontSize: "0.9rem" }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ;
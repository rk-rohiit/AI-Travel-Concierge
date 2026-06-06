import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Chip,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { RiQuestionLine } from "react-icons/ri";

const FAQS = [
  {
    q: "How does Traveya work?",
    a: "Traveya uses advanced AI to analyze your preferences and curate a complete travel itinerary including flights, hotels, and activities — all in seconds.",
  },
  {
    q: "What destinations are supported in India?",
    a: "We cover all major Indian destinations including Rajasthan, Kerala, Goa, Himachal Pradesh, Varanasi, Andaman Islands, and 500+ more cities and towns.",
  },
  {
    q: "How do I book a planned itinerary?",
    a: "Once your plan is ready, you can book everything directly through our partner links with one click — flights, hotels, and activities all in one place.",
  },
  {
    q: "Does Traveya work offline?",
    a: "Yes! Once your itinerary is generated, you can download it as a PDF or access it via our mobile app without an internet connection.",
  },
  {
    q: "Can I customize the itinerary?",
    a: "Absolutely. You can swap activities, change dates, adjust your budget, or ask the AI to find cheaper alternatives at any time.",
  },
  {
    q: "Is Traveya free to use?",
    a: "We offer a free plan for basic trip planning and a Pro plan with advanced features like group planning, budget tracking, and priority support.",
  },
  {
    q: "Can I plan a group or family trip?",
    a: "Yes! Traveya supports group trips of any size. Just select the number of travelers and we'll optimize the itinerary and budget for everyone.",
  },
  {
    q: "Is my payment information secure?",
    a: "All transactions are encrypted and processed through our trusted payment partners. We never store your card details on our servers.",
  },
];

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      onClick={() => setOpen(v => !v)}
      sx={{
        border: `1.5px solid ${open ? "#f6543b" : "#f0f0f0"}`,
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        bgcolor: open ? "rgba(246,84,59,0.02)" : "#fff",
        boxShadow: open ? "0 4px 20px rgba(246,84,59,0.08)" : "none",
        "&:hover": {
          borderColor: open ? "#f6543b" : "#d0d0d0",
        },
      }}
    >
      {/* Question row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: { xs: 2, md: 2.5 },
          py: { xs: 1.75, md: 2 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "8px",
              bgcolor: open ? "#f6543b" : "rgba(246,84,59,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            <RiQuestionLine size={14} color={open ? "#fff" : "#f6543b"} />
          </Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.85rem", md: "0.92rem" },
              color: open ? "#f6543b" : "#2d3436",
              lineHeight: 1.4,
              transition: "color 0.2s",
            }}
          >
            {faq.q}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: `1.5px solid ${open ? "#f6543b" : "#e0e0e0"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <FiChevronDown size={14} color={open ? "#f6543b" : "#636e72"} />
        </Box>
      </Box>

      {/* Answer */}
      <Box
        sx={{
          maxHeight: open ? "200px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <Box
          sx={{
            px: { xs: 2, md: 2.5 },
            pb: { xs: 1.75, md: 2 },
            pl: { xs: "calc(16px + 28px + 12px)", md: "calc(20px + 28px + 12px)" },
          }}
        >
          <Typography
            sx={{
              color: "#636e72",
              fontSize: { xs: "0.82rem", md: "0.88rem" },
              lineHeight: 1.7,
            }}
          >
            {faq.a}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const FAQ = () => {
  return (
    <Box id="faq" sx={{ py: { xs: 7, md: 11 }, bgcolor: "#fff" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Chip
            label="GOT QUESTIONS?"
            size="small"
            sx={{
              bgcolor: "rgba(246,84,59,0.08)",
              color: "#f6543b",
              fontWeight: 700,
              fontSize: "0.65rem",
              border: "1px solid rgba(246,84,59,0.2)",
              borderRadius: "6px",
              mb: 1.5,
            }}
          />
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
              color: "#2d3436",
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            Frequently asked questions
          </Typography>
          <Typography
            sx={{
              color: "#636e72",
              fontSize: { xs: "0.85rem", md: "0.92rem" },
              maxWidth: 420,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about Traveya. Can't find the answer? Chat with us.
          </Typography>
        </Box>

        {/* ── Mobile / Tablet: single column ── */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </Box>

        {/* ── Desktop: 2-column ── */}
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "1fr 1fr",
            gap: 1.5,
          }}
        >
          {/* Left column */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {FAQS.filter((_, i) => i % 2 === 0).map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </Box>
          {/* Right column */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {FAQS.filter((_, i) => i % 2 !== 0).map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </Box>
        </Box>

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: { xs: 5, md: 6 },
            p: { xs: 3, md: 4 },
            borderRadius: "20px",
            bgcolor: "#161616",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.1rem" }, color: "#fff", mb: 0.75 }}>
            Still have questions?
          </Typography>
          <Typography sx={{ fontSize: { xs: "0.82rem", md: "0.88rem" }, color: "rgba(255,255,255,0.5)", mb: 2.5 }}>
            Our team is here to help you plan the perfect trip.
          </Typography>
          <Box
            component="button"
            sx={{
              border: "none",
              borderRadius: "10px",
              bgcolor: "#f6543b",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.88rem",
              px: 3,
              py: 1.1,
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": { bgcolor: "#e0432c" },
            }}
          >
            Chat with us
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
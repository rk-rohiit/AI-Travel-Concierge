import { Box, Typography, Button, Container } from "@mui/material";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";

const CTA = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "#f9fafb",
        position: "relative",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: "24px",
            textAlign: "center",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 🔵 Top Accent Gradient Line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background:
                "linear-gradient(90deg, #3b82f6, #60a5fa, #a78bfa)",
            }}
          />

          {/* Icon */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(59,130,246,0.1)",
              }}
            >
              <HiSparkles size={28} color="#3b82f6" />
            </Box>
          </Box>

          {/* Heading */}
          <Typography
            fontWeight={800}
            sx={{
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              lineHeight: 1.2,
              mb: 2,
              color: "#111827",
            }}
          >
            Ready to Travel{" "}
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(90deg, #3b82f6, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Smarter?
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: "#6b7280",
              mb: 4,
              maxWidth: 500,
              mx: "auto",
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Join thousands of travelers using AI to explore better. Create your
            first itinerary in seconds with smart recommendations.
          </Typography>

          {/* CTA */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              endIcon={<HiArrowRight />}
              sx={{
                bgcolor: "#3b82f6",
                px: 5,
                py: 1.5,
                borderRadius: "10px",
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(59,130,246,0.3)",
                transition: "all 0.25s ease",

                "&:hover": {
                  bgcolor: "#2563eb",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 25px rgba(59,130,246,0.4)",
                },
              }}
            >
              Start Planning
            </Button>

            <Button
              variant="text"
              sx={{
                color: "#374151",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              View Demo
            </Button>
          </Box>

          {/* Footer Note */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 3,
              color: "#9ca3af",
            }}
          >
            Free to use • No credit card required • AI Powered
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CTA;
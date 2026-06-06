import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Box, Chip } from "@mui/material";
import {
  FaCloudSun, FaHotel, FaRoute, FaStar,
  FaDroplet, FaWind, FaArrowLeft,
  FaCalendarDays, FaCircleCheck, FaPlane,
  FaBookmark, FaShareNodes,
} from "react-icons/fa6";
import { RiMapPin2Line, RiTimeLine, RiPlaneLine } from "react-icons/ri";

// ── design tokens ─────────────────────────────
const C = {
  coral: "#f6543b",
  coralD: "#e0432c",
  coralBg: "rgba(246,84,59,0.08)",
  dark: "#1a1a2e",
  charcoal: "#2d3436",
  muted: "#636e72",
  sub: "#95a5a6",
  light: "#f8f9fa",
  white: "#ffffff",
  border: "#eef0f2",
  gold: "#f59e0b",
};

// ── reusable primitives ───────────────────────
const Surface = ({ children, sx = {}, hover = true }) => (
  <Box sx={{
    bgcolor: C.white, border: `1px solid ${C.border}`,
    borderRadius: "18px", overflow: "hidden",
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
    ...(hover && { "&:hover": { boxShadow: "0 12px 40px rgba(0,0,0,0.07)", borderColor: "#e0e0e0" } }),
    ...sx,
  }}>
    {children}
  </Box>
);

const SectionHead = ({ icon, label, sub }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
    <Box sx={{
      width: 40, height: 40, borderRadius: "12px",
      background: `linear-gradient(135deg, ${C.coral} 0%, ${C.coralD} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      boxShadow: "0 4px 12px rgba(246,84,59,0.3)",
    }}>
      {React.cloneElement(icon, { size: 17, color: "#fff" })}
    </Box>
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: C.charcoal, lineHeight: 1.2 }}>{label}</Typography>
      {sub && <Typography sx={{ fontSize: "0.72rem", color: C.sub, mt: 0.15 }}>{sub}</Typography>}
    </Box>
  </Box>
);

// ── fallback sample ───────────────────────────
const SAMPLE = {
  city: "Jaipur, Rajasthan",
  weather: { temperature: 32, condition: "Sunny & Clear", humidity: 28, wind: "12 km/h" },
  hotels: [
    { name: "Rambagh Palace", rating: 4.9, price: "12,500" },
    { name: "ITC Rajputana", rating: 4.7, price: "8,200" },
    { name: "Fairmont Jaipur", rating: 4.8, price: "10,800" },
    { name: "The Oberoi", rating: 4.9, price: "15,000" },
  ],
  itinerary: {
    day1: [
      "9:00 AM — Arrive at Jaipur airport, check-in to hotel",
      "11:00 AM — Visit Amber Fort (UNESCO World Heritage Site)",
      "2:00 PM — Lunch at Chokhi Dhani — authentic Rajasthani thali",
      "4:00 PM — Explore Jal Mahal (Water Palace) from the lakeside",
      "7:00 PM — Evening stroll at MI Road & local market shopping",
    ],
    day2: [
      "8:30 AM — City Palace Museum with royal collections",
      "11:00 AM — Jantar Mantar (UNESCO astronomical observatory)",
      "1:00 PM — Lunch at Lassiwala — famous lassi spot",
      "3:00 PM — Hawa Mahal (Palace of Winds) photography",
      "6:00 PM — Sunset view from Nahargarh Fort",
      "8:00 PM — Dinner with Rajasthani folk dance performance",
    ],
    day3: [
      "9:00 AM — Birla Mandir temple visit",
      "10:30 AM — Albert Hall Museum — arts & crafts",
      "12:30 PM — Johari Bazaar for jewelry & gemstones shopping",
      "3:00 PM — Sisodia Rani Ka Bagh (garden)",
      "5:00 PM — Check-out & transfer to station/airport",
    ],
  },
};

// ─────────────────────────────────────────────
const TravelResults = ({ data: propData, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data =
    propData ||
    location.state ||
    SAMPLE;
  const [activeDay, setActiveDay] = useState(0);

  if (!data) return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", bgcolor: C.light, gap: 2 }}>
      <Typography sx={{ fontSize: "3.5rem" }}>✈️</Typography>
      <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: C.charcoal }}>No trip data found</Typography>
      <Typography sx={{ color: C.muted }}>Go back and search for a destination.</Typography>
      <Box component="button" onClick={() => {
        if (onClose) {
          onClose();
        } else {
          navigate(-1);
        }
      }}
        sx={{ mt: 1, px: 3, py: 1.1, border: "none", borderRadius: "10px", bgcolor: C.coral, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", "&:hover": { bgcolor: C.coralD } }}>
        ← Go Back
      </Box>
    </Box>
  );

  const days = Object.keys(data.itinerary || {});

  const weatherStats = [
    { icon: <FaCloudSun />, label: "Temperature", value: `${data.weather?.temperature}°C`, accent: true },
    { icon: <FaDroplet />, label: "Humidity", value: data.weather?.humidity ? `${data.weather.humidity}%` : "—" },
    { icon: <FaWind />, label: "Wind Speed", value: data.weather?.wind || "—" },
    { icon: <RiTimeLine />, label: "Condition", value: data.weather?.condition || "—", sm: true },
  ];

  return (
    <Box sx={{ bgcolor: "#f2f4f8", minHeight: "100vh", pb: { xs: 8, md: 10 } }}>

      {/* ══════════════ HERO ══════════════ */}
      <Box sx={{
        background: "linear-gradient(150deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b2e 100%)",
        pt: { xs: 5, md: 7 }, pb: { xs: 6, md: 9 },
        px: 2, position: "relative", overflow: "hidden",
      }}>
        {/* dot grid */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
        {/* glows */}
        <Box sx={{ position: "absolute", top: "-30%", right: "-5%", width: 420, height: 420, borderRadius: "50%", bgcolor: "rgba(246,84,59,0.10)", filter: "blur(80px)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: "-20%", left: "-5%", width: 320, height: 320, borderRadius: "50%", bgcolor: "rgba(99,102,241,0.08)", filter: "blur(70px)", pointerEvents: "none" }} />

        <Container maxWidth="lg">
          {/* top bar */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
            <Box
              component="button"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                bgcolor: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: 700,
                cursor: "pointer",
                zIndex: 100,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "scale(1.05)",
                },
              }}
            >
              ✕
            </Box>
            <Box component="button" onClick={() => {
              if (onClose) {
                onClose();
              } else {
                navigate(-1);
              }
            }}
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", fontWeight: 500, px: 1.5, py: 0.7, cursor: "pointer", transition: "all 0.2s", "&:hover": { bgcolor: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" } }}>
              <FaArrowLeft size={11} /> Back to search
            </Box>

            {/* action buttons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {[{ icon: <FaBookmark size={13} />, label: "Save" }, { icon: <FaShareNodes size={13} />, label: "Share" }].map(({ icon, label }) => (
                <Box key={label} component="button"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", fontWeight: 500, px: 1.4, py: 0.7, cursor: "pointer", transition: "all 0.2s", "&:hover": { bgcolor: "rgba(255,255,255,0.12)", color: "#fff" } }}>
                  {icon} {label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* badge */}
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, bgcolor: "rgba(246,84,59,0.15)", border: "1px solid rgba(246,84,59,0.3)", borderRadius: "20px", px: 1.5, py: 0.4, mb: 2.5 }}>
            <RiPlaneLine size={12} color={C.coral} />
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: C.coral, letterSpacing: "0.6px", textTransform: "uppercase" }}>AI-Planned Trip · Traveya</Typography>
          </Box>

          {/* city */}
          <Typography sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" }, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.05, mb: 2 }}>
            {data.city}
          </Typography>

          {/* meta pills */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {[
              { icon: <RiMapPin2Line size={12} />, text: "India" },
              { icon: <FaCalendarDays size={11} />, text: `${days.length} day${days.length !== 1 ? "s" : ""} itinerary` },
              { icon: <FaHotel size={11} />, text: `${data.hotels?.length || 0} hotels` },
              { icon: <FaCloudSun size={11} />, text: `${data.weather?.temperature}°C · ${data.weather?.condition}` },
            ].map(({ icon, text }) => (
              <Box key={text} sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, bgcolor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", px: 1.4, py: 0.45 }}>
                <Box sx={{ color: "rgba(255,255,255,0.45)" }}>{icon}</Box>
                <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══════════════ BODY ══════════════ */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, mt: { xs: 3, md: 4 } }}>

        {/* ── Weather stats ── */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4,1fr)" }, gap: { xs: 1.25, md: 1.75 }, mb: { xs: 3, md: 4 } }}>
          {weatherStats.map(({ icon, label, value, accent, sm }) => (
            <Surface key={label} sx={{ p: { xs: 2, md: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: accent ? C.coralBg : "#f4f6f8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {React.cloneElement(icon, { size: 13, color: accent ? C.coral : C.muted })}
                </Box>
                <Typography sx={{ fontSize: "0.62rem", fontWeight: 600, color: C.sub, textTransform: "uppercase", letterSpacing: "0.6px" }}>{label}</Typography>
              </Box>
              <Typography sx={{ fontWeight: 900, fontSize: sm ? { xs: "0.82rem", md: "0.92rem" } : { xs: "1.3rem", md: "1.6rem" }, color: accent ? C.coral : C.charcoal, lineHeight: 1 }}>
                {value}
              </Typography>
            </Surface>
          ))}
        </Box>

        {/* ── Main grid ── */}
        <Grid container spacing={{ xs: 2, md: 2.5 }}>

          {/* Hotels column */}
          <Grid item xs={12} md={4}>
            <Surface sx={{ p: { xs: 2.25, md: 2.75 }, height: "100%" }}>
              <SectionHead icon={<FaHotel />} label="Hotels" sub={`${data.hotels?.length} options found`} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {data.hotels?.map((hotel, i) => (
                  <Box key={i}
                    sx={{
                      p: { xs: 1.5, md: 1.75 }, borderRadius: "14px",
                      border: `1.5px solid ${i === 0 ? "rgba(246,84,59,0.25)" : C.border}`,
                      bgcolor: i === 0 ? "rgba(246,84,59,0.03)" : C.light,
                      position: "relative", overflow: "hidden",
                      transition: "all 0.2s",
                      "&:hover": { borderColor: C.coral, bgcolor: "rgba(246,84,59,0.04)", transform: "translateX(3px)" },
                      cursor: "pointer",
                    }}
                  >
                    {/* top pick ribbon */}
                    {i === 0 && (
                      <Box sx={{ position: "absolute", top: 0, right: 0, bgcolor: C.coral, color: "#fff", fontSize: "0.55rem", fontWeight: 800, px: 1, py: 0.3, borderBottomLeftRadius: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                        Top Pick
                      </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                          <Box sx={{ width: 20, height: 20, borderRadius: "6px", bgcolor: i === 0 ? C.coral : "#e8ecf0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Typography sx={{ fontSize: "0.58rem", fontWeight: 900, color: i === 0 ? "#fff" : C.muted }}>#{i + 1}</Typography>
                          </Box>
                          <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.82rem", md: "0.88rem" }, color: C.charcoal, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {hotel.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.35, ml: "26px" }}>
                          {[...Array(5)].map((_, s) => (
                            <FaStar key={s} size={10} color={s < Math.floor(hotel.rating) ? C.gold : "#e0e0e0"} />
                          ))}
                          <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: C.charcoal, ml: 0.25 }}>{hotel.rating}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                        <Typography sx={{ fontSize: "0.58rem", color: C.sub, fontWeight: 500, letterSpacing: "0.3px" }}>PER NIGHT</Typography>
                        <Typography sx={{ fontWeight: 900, fontSize: "0.95rem", color: C.coral, lineHeight: 1.1 }}>₹{hotel.price}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Book CTA */}
              <Box component="button"
                sx={{ mt: 2.5, width: "100%", py: 1.15, border: "none", borderRadius: "12px", background: `linear-gradient(135deg, ${C.coral} 0%, ${C.coralD} 100%)`, color: "#fff", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75, boxShadow: "0 6px 20px rgba(246,84,59,0.3)", transition: "all 0.2s", "&:hover": { boxShadow: "0 8px 28px rgba(246,84,59,0.4)", transform: "translateY(-1px)" } }}>
                <FaHotel size={14} /> View All Hotels
              </Box>
            </Surface>
          </Grid>

          {/* Itinerary column */}
          <Grid item xs={12} md={8}>
            <Surface sx={{ p: { xs: 2.25, md: 2.75 } }}>
              <SectionHead icon={<FaRoute />} label="Day-by-Day Itinerary" sub={`${days.length} days · AI-optimised route`} />

              {/* Day tab selector */}
              <Box sx={{ display: "flex", gap: 0.75, mb: 3, flexWrap: "wrap" }}>
                {days.map((_, i) => {
                  const active = activeDay === i;
                  return (
                    <Box key={i} component="button" onClick={() => setActiveDay(i)}
                      sx={{
                        border: `1.5px solid ${active ? C.coral : C.border}`,
                        borderRadius: "10px",
                        background: active ? `linear-gradient(135deg, ${C.coral} 0%, ${C.coralD} 100%)` : "#fff",
                        color: active ? "#fff" : C.muted,
                        fontSize: "0.78rem", fontWeight: 700,
                        px: 1.75, py: 0.65, cursor: "pointer",
                        boxShadow: active ? "0 4px 14px rgba(246,84,59,0.28)" : "none",
                        transition: "all 0.2s",
                        "&:hover": !active ? { borderColor: C.coral, color: C.coral, bgcolor: C.coralBg } : {},
                      }}
                    >
                      Day {i + 1}
                    </Box>
                  );
                })}
              </Box>

              {/* Day header */}
              {days[activeDay] && (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2.5, p: 1.5, borderRadius: "12px", bgcolor: C.coralBg, border: `1px solid rgba(246,84,59,0.15)` }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: "8px", background: `linear-gradient(135deg, ${C.coral}, ${C.coralD})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Typography sx={{ fontWeight: 900, fontSize: "0.75rem", color: "#fff" }}>{activeDay + 1}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", color: C.charcoal, lineHeight: 1.2 }}>Day {activeDay + 1} — {data.city}</Typography>
                      <Typography sx={{ fontSize: "0.68rem", color: C.sub }}>{data.itinerary[days[activeDay]].length} activities planned</Typography>
                    </Box>
                  </Box>

                  {/* Timeline */}
                  <Box sx={{ position: "relative", pl: 3.5 }}>
                    {/* vertical line */}
                    <Box sx={{ position: "absolute", left: "11px", top: 6, bottom: 6, width: 2, borderRadius: "2px", background: `linear-gradient(to bottom, ${C.coral}, rgba(246,84,59,0.1))` }} />

                    {data.itinerary[days[activeDay]].map((item, i, arr) => (
                      <Box key={i} sx={{ position: "relative", mb: i === arr.length - 1 ? 0 : 1.5 }}>
                        {/* node */}
                        <Box sx={{ position: "absolute", left: "-26px", top: "50%", transform: "translateY(-50%)", width: 22, height: 22, borderRadius: "50%", bgcolor: "#fff", border: `2px solid ${C.coral}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(246,84,59,0.2)" }}>
                          <Typography sx={{ fontSize: "0.55rem", fontWeight: 900, color: C.coral }}>{i + 1}</Typography>
                        </Box>

                        <Box sx={{
                          display: "flex", alignItems: "flex-start", gap: 1.25,
                          p: { xs: 1.4, md: 1.6 }, borderRadius: "13px",
                          border: `1px solid ${C.border}`, bgcolor: C.white,
                          transition: "all 0.2s",
                          "&:hover": { borderColor: "rgba(246,84,59,0.25)", bgcolor: "rgba(246,84,59,0.02)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transform: "translateX(3px)" },
                        }}>
                          <Box sx={{ mt: 0.15, flexShrink: 0 }}>
                            <FaCircleCheck size={14} color={C.coral} />
                          </Box>
                          <Typography sx={{ fontSize: { xs: "0.82rem", md: "0.86rem" }, color: C.charcoal, lineHeight: 1.6, fontWeight: 500 }}>
                            {item}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {/* Day nav */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, pt: 2.5, borderTop: `1px solid ${C.border}` }}>
                    <Box component="button" onClick={() => setActiveDay(v => Math.max(0, v - 1))} disabled={activeDay === 0}
                      sx={{ border: `1px solid ${activeDay === 0 ? C.border : C.charcoal}`, borderRadius: "10px", bgcolor: "#fff", color: activeDay === 0 ? "#b2bec3" : C.charcoal, fontSize: "0.8rem", fontWeight: 600, px: 2, py: 0.8, cursor: activeDay === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 0.6, transition: "all 0.2s", "&:hover": activeDay !== 0 ? { borderColor: C.coral, color: C.coral } : {} }}>
                      ← Prev
                    </Box>

                    <Box sx={{ display: "flex", gap: 0.6 }}>
                      {days.map((_, i) => (
                        <Box key={i} component="button" onClick={() => setActiveDay(i)}
                          sx={{ width: i === activeDay ? 22 : 7, height: 7, borderRadius: "4px", bgcolor: i === activeDay ? C.coral : "#e0e0e0", border: "none", cursor: "pointer", transition: "all 0.3s ease", p: 0 }} />
                      ))}
                    </Box>

                    <Box component="button" onClick={() => setActiveDay(v => Math.min(days.length - 1, v + 1))} disabled={activeDay === days.length - 1}
                      sx={{ border: "none", borderRadius: "10px", bgcolor: activeDay === days.length - 1 ? C.border : C.charcoal, color: activeDay === days.length - 1 ? "#b2bec3" : "#fff", fontSize: "0.8rem", fontWeight: 600, px: 2, py: 0.8, cursor: activeDay === days.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 0.6, transition: "all 0.2s", "&:hover": activeDay !== days.length - 1 ? { bgcolor: C.coral } : {} }}>
                      Next →
                    </Box>
                  </Box>
                </>
              )}
            </Surface>
          </Grid>
        </Grid>

        {/* ── CTA strip ── */}
        <Box sx={{
          mt: { xs: 2.5, md: 3 }, p: { xs: 3, md: 4 },
          borderRadius: "20px", overflow: "hidden", position: "relative",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 60%, #2d1b2e 100%)",
        }}>
          {/* glow */}
          <Box sx={{ position: "absolute", top: "-50%", right: "0%", width: 300, height: 300, borderRadius: "50%", bgcolor: "rgba(246,84,59,0.12)", filter: "blur(60px)", pointerEvents: "none" }} />
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2.5 }}>
            <Box>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, bgcolor: "rgba(246,84,59,0.15)", border: "1px solid rgba(246,84,59,0.3)", borderRadius: "20px", px: 1.25, py: 0.3, mb: 1.25 }}>
                <FaPlane size={10} color={C.coral} />
                <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color: C.coral, letterSpacing: "0.5px", textTransform: "uppercase" }}>Ready to travel</Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.05rem", md: "1.25rem" }, color: "#fff", mb: 0.5, lineHeight: 1.3 }}>
                Book your {data.city} adventure
              </Typography>
              <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>
                All itineraries and hotels verified by Traveya AI 🇮🇳
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.25, flexShrink: 0, flexWrap: "wrap" }}>
              <Box component="button"
                sx={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: "11px", bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.75)", fontSize: "0.84rem", fontWeight: 600, px: 2.25, py: 1, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 0.75, "&:hover": { bgcolor: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" } }}>
                <FaBookmark size={12} /> Save Plan
              </Box>
              <Box component="button"
                sx={{ border: "none", borderRadius: "11px", background: `linear-gradient(135deg, ${C.coral} 0%, ${C.coralD} 100%)`, color: "#fff", fontSize: "0.84rem", fontWeight: 700, px: 2.5, py: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: 0.75, boxShadow: "0 6px 20px rgba(246,84,59,0.35)", transition: "all 0.2s", "&:hover": { boxShadow: "0 8px 28px rgba(246,84,59,0.5)", transform: "translateY(-2px)" } }}>
                <FaPlane size={13} /> Book Now
              </Box>
            </Box>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default TravelResults;
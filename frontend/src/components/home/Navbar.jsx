import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
// You can mix and match from different libraries!
import { RiRobot2Line } from "react-icons/ri"; // Remix Icons
import { HiOutlineGlobeAmericas } from "react-icons/hi2"; // Heroicons

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(8px)" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Using react-icons inside MUI Box */}
            <RiRobot2Line size={28} style={{ color: '#3b82f6' }} /> 
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "1px" }}>
              TravelAI
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            <Button color="inherit" sx={{ textTransform: 'none' }}>Home</Button>
            <Button color="inherit" sx={{ textTransform: 'none' }}>Destinations</Button>
            <Button color="inherit" sx={{ textTransform: 'none' }}>AI Concierge</Button>
            
            <Button 
              variant="contained" 
              startIcon={<HiOutlineGlobeAmericas />} // You can use react-icons in startIcon too!
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                backgroundColor: '#3b82f6',
                '&:hover': { backgroundColor: '#2563eb' }
              }}
            >
              Start Planning
            </Button>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
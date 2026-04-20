import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar 
      position="absolute" // Changed to absolute so it sits on top of the hero background
      elevation={0} 
      sx={{ 
        background: "transparent", 
        pt: 1 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Logo Section - Matching "Traveya" */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: "#2d3436", // Darker text for light background
                fontSize: "1.5rem" 
              }}
            >
              Traveya
            </Typography>
            <Box 
              sx={{ 
                width: 8, 
                height: 8, 
                bgcolor: "#f6543b", 
                borderRadius: "50%",
                mt: 1 
              }} 
            />
          </Box>

          {/* Navigation Links - Matching "Login / Sign up" style */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              sx={{ 
                textTransform: 'none', 
                color: "#f6543b", // Matching the coral red in your design
                fontWeight: 500,
                fontSize: "0.9rem",
                '&:hover': { background: 'transparent', opacity: 0.8 }
              }}
            >
              Login
            </Button>
            
            <Button 
              variant="text" 
              sx={{ 
                textTransform: 'none', 
                color: "#f6543b", 
                fontWeight: 500,
                fontSize: "0.9rem",
                '&:hover': { background: 'transparent', opacity: 0.8 }
              }}
            >
              Sign up
            </Button>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
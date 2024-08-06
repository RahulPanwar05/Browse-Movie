import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./Page/HomePage";
import Favorite from "./Page/Favorite";
import { Home, Menu, Search, Star } from "@mui/icons-material";

const drawerWidth = 240;
const navItems = [
  { text: "AllMovies", icon: <Home /> },
  { text: "Favorite", icon: <Star /> },
];

function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "#9c27b0",
        height: "100%",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        TMDB Movies
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ text, icon }) => (
          <ListItem key={text}>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={`/${text.toLowerCase()}`}
            >
              {icon}
              <ListItemText primary={text} sx={{ ml: 1 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" color="secondary" position="fixed" >
        <Toolbar>
          <IconButton
            aria-label="Open navigation drawer"
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TMDB Movies
          </Typography>
          <OutlinedInput
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              borderColor: "#ccc",
              m: 2,
              "&:hover": {
                borderColor: "#000",
              },
              "&.Mui-focused": {
                borderColor: "#000",
              },
            }}
          />
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                component={Link}
                to={`/${item.text.toLowerCase()}`}
                variant="contained"
                color="primary"
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
            <Route
              path="/allmovies"
              element={<HomePage searchTerm={searchTerm} />}
            />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </Typography>
      </Box>
    </Box>
  );
}

export default App;

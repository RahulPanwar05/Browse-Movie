import { useEffect, useState } from "react";
import MovieCard from "../component/MovieCard";
import { Box, Grid, Typography } from "@mui/material";

function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveMovie = (favMovie) => {
    const filteredMovie = favorites.filter((movie) => movie.id !== favMovie.id);
    setFavorites(filteredMovie);
    const stringifyValue = JSON.stringify(filteredMovie);
    localStorage.setItem("favorites", stringifyValue);
  };

  return (
    <Grid container spacing={2} sx={{ minWidth: "100vw" }}>
      {favorites.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Typography variant="h5" color="initial">
            No Favorites Found
          </Typography>
        </Box>
      )}
      {favorites.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard
            movie={movie}
            isFavorite
            handleRemoveMovie={handleRemoveMovie}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Favorite;

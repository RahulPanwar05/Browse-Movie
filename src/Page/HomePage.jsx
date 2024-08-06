import { Alert, Box, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCard from "../component/MovieCard";

function HomePage({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (page < 10) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=9ebd9b09305094c9537df9e24e5770ea&language=en-US&page=${page}`
          );
          const data = await response.json();
          const { results: movieData } = data;

          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            setMovies((prevMovies) => {
              // Combine previous and new movies
              const allMovies = [...prevMovies, ...movieData];
              // Remove duplicates by ID
              const uniqueMovies = Array.from(
                new Map(allMovies.map((movie) => [movie.id, movie])).values()
              );
              return uniqueMovies;
            });
            setOriginalMovies((prevMovies) => {
              // Combine previous and new movies
              const allMovies = [...prevMovies, ...movieData];
              // Remove duplicates by ID
              const uniqueMovies = Array.from(
                new Map(allMovies.map((movie) => [movie.id, movie])).values()
              );
              return uniqueMovies;
            });
          }
        }
      } catch (error) {
        console.log(error, "error in fetching data");
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (searchTerm) {
      const filteredMovie = originalMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMovies(filteredMovie);
    } else {
      setMovies(originalMovies); // Reset to original list if search term is empty
    }
  }, [searchTerm, originalMovies]);

  const handleAddToFavorites = (movie) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setAlertType("success")
      setSnackbarMessage(`${movie.title} added to favorites.`);
      setSnackbarOpen(true);
    } else {
      setAlertType("error")
      setSnackbarMessage(`${movie.title} already added to favorite`);
      setSnackbarOpen(true);
    }
  };

  const handleInfiniteScroll = () => {
    try {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      if (scrollTop + innerHeight + 1 >= scrollHeight) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <Grid container spacing={2} sx={{ minWidth: "100vw" }}>
      {movies.length === 0 && (
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
            No Item found
          </Typography>
        </Box>
      )}
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard movie={movie} onAddToFavorites={handleAddToFavorites} />
        </Grid>
      ))}
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          variant="filled"
          severity={alertType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default HomePage;

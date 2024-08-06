import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const MovieCard = ({
  movie,
  onAddToFavorites,
  isFavorite,
  handleRemoveMovie,
}) => {
  const { title, poster_path, release_date } = movie;
  const releaseYear = release_date?.split("-")[0];
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {releaseYear}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={
            isFavorite
              ? () => handleRemoveMovie(movie)
              : () => onAddToFavorites(movie)
          }
          variant="contained"
          color="secondary"
        >
          {isFavorite ? "Remove" : "Add to Favorites"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

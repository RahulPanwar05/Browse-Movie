import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const MovieCard = ({ movie, onAddToFavorites, isFavorite }) => {
  
  const { title, poster_path, release_date } = movie;
  const releaseYear = release_date?.split("-")[0];
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140px"
        width="200px"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {releaseYear}
        </Typography>
      </CardContent>
      <CardActions>
        {!isFavorite && (
          <Button
            onClick={() => onAddToFavorites(movie)}
            variant="contained"
            color="secondary"
          >
            Add to Favorites
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;

//수업
import { useEffect, useState } from "react";
type Movie = {
  id: number;
  title: string;
  poster: string;
};
type MovieResponse = {
  movies: Movie[];
  count: number; //메타데이터
};
export default function MovieInfo() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/wizard113/ML-Basic/main/movie.json",
      );
      const data: MovieResponse = await res.json();
      setMovies(data.movies);
    };
    load();
  }, []);
  return (
    <div style={container}>
      {movies.map((movie) => (
        <div style={card} key={movie.id}>
          <img src={movie.poster} alt={movie.title} style={image}></img>
          <div style={title}>{movie.title}</div>
        </div>
      ))}
    </div>
  );
}
const container: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#fff",
};
const card: React.CSSProperties = {
  width: "200px",
  height: "400px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "7px 10px 21px -3px rgba(0, 0, 0, 0.15)",
};
const image: React.CSSProperties = {
  width: "100%",
  height: "90%",
  objectFit: "cover",
};
const title: React.CSSProperties = {
  height: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "5px",
};

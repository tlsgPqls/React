import { useEffect, useState } from "react";
interface Movie {
  id: string;
  title: string;
  poster: string;
}
export default function MovieList() {
  // 초기값은 반드시 빈 배열 []
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/wizard113/ML-Basic/main/movie.json",
        );
        const data = await response.json();

        // 중요: data가 아니라 data.movies를 넣어야 함!
        // JSON 구조가 { "movies": [...] } 로 되어 있기 때문입니다.
        setMovies(data.movies);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    getMovies();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {movies &&
        movies.map((movie) => (
          <div
            key={movie.id} // id -> rank
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              width: "200px",
            }}
          >
            <p>{movie.id}위</p>
            <img
              src={movie.poster} // poster -> image
              alt={movie.title} // title -> movieNm
              style={{ width: "100%", height: "auto" }}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
    </div>
  );
}

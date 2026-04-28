import { useFetch } from "./useFetch";
type Movie = {
  id: number;
  title: string;
};
export default function Test() {
  const { data, loading } = useFetch<{ movies: Movie[] }>(
    "https://raw.githubusercontent.com/wizard113/ML-Basic/main/movie.json",
  );
  if (loading) return <p>loading...</p>;
  return (
    <ul>
      {data?.movies.map((m) => (
        <li key={m.id}>{m.title}</li>
      ))}
    </ul>
  );
}

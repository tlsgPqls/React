"use client";

import { useState, useEffect } from "react";
import style from "./genres.module.css";

// 1. 샘플 장르 데이터 정의 (Jikan API의 실제 장르 ID 매칭 가능)
const GENRE_LIST = [
  { id: 0, name: "전체", icon: "🎬" },
  { id: 1, name: "Action (액션)", icon: "⚔️" },
  { id: 2, name: "Adventure (모험)", icon: "🧭" },
  { id: 4, name: "Comedy (코미디)", icon: "😂" },
  { id: 8, name: "Drama (드라마)", icon: "🎭" },
  { id: 10, name: "Fantasy (판타지)", icon: "🧙" },
  { id: 24, name: "Sci-Fi (SF)", icon: "🚀" },
];
const toggleBookmark = (anime: any) => {
  const saved = localStorage.getItem("anime_bookmarks");
  let currentList = saved ? JSON.parse(saved) : [];

  // 이미 찜한 내역에 존재하는지 mal_id로 스캔
  const isExist = currentList.some((item: any) => item.mal_id === anime.mal_id);

  if (isExist) {
    // 이미 있다면 해제(제거)
    currentList = currentList.filter(
      (item: any) => item.mal_id !== anime.mal_id,
    );
    alert("북마크에서 해제되었습니다.");
  } else {
    // 없다면 필요한 정보만 경량화 팩으로 조립하여 푸시
    currentList.push({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.images.webp.large_image_url,
      score: anime.score,
      type: anime.type,
      synopsis: anime.synopsis,
    });
    alert("보관함에 보관되었습니다!");
  }

  localStorage.setItem("anime_bookmarks", JSON.stringify(currentList));
};
export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState(0); // 현재 선택된 장르 ID
  const [animeList, setAnimeList] = useState([]); // API로 받아온 데이터 전체
  const [loading, setLoading] = useState(true);

  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);

  useEffect(() => {
    async function fetchAnime() {
      setLoading(true);
      try {
        // 1. 우선 작품 리스트를 안정적으로 가져옵니다 (인기순 정렬)
        const url = "https://api.jikan.moe/v4/anime";
        const res = await fetch(url);
        const json = await res.json();
        const rawData = json.data || [];

        // 2. [핵심] selectedGenre가 0(전체)이 아니라면 데이터 내부의 genres[].mal_id를 직접 검사하여 필터링
        if (selectedGenre !== 0) {
          const filteredData = rawData.filter((anime: any) =>
            // 작품의 장르 배열 중 하나라도 현재 선택한 장르 ID와 일치하는지 확인
            anime.genres.some((genre: any) => genre.mal_id === selectedGenre),
          );
          setAnimeList(filteredData);
        } else {
          // 전체 선택 시에는 필터링 없이 그대로 저장
          setAnimeList(rawData);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnime();
  }, [selectedGenre]);

  return (
    <div className={style.page_container}>
      <div className={style.page_header}>
        <h2 className={style.page_title}>✨ 장르별 애니메이션</h2>
        <p className={style.page_subtitle}>
          원하는 장르를 선택하여 취향에 맞는 작품을 탐색해 보세요.
        </p>
      </div>

      {/* 필터 구역: 장르 선택 칩 버튼들 */}
      <div className={style.filter_container}>
        {GENRE_LIST.map((genre) => (
          <button
            key={genre.id}
            className={`${style.filter_chip} ${selectedGenre === genre.id ? style.chip_active : ""}`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            <span>{genre.icon}</span> {genre.name}
          </button>
        ))}
      </div>

      <div className={style.list_meta}>
        총 <span className={style.count_text}>{animeList.length}</span>개의 작품
        검색됨
      </div>

      {/* 로딩 스켈레톤 또는 결과 리스트 분기 */}
      {loading ? (
        <div className={style.loading_text}>
          🍿 애니메이션 정보를 불러오는 중...
        </div>
      ) : (
        <div className={style.anime_grid}>
          {animeList.map((anime: any) => (
            <div
              key={anime.mal_id}
              className={style.anime_card}
              onClick={() => setSelectedAnime(anime)}
            >
              <div className={style.image_wrapper}>
                <img
                  src={
                    anime.images.webp.large_image_url ||
                    anime.images.jpg.image_url
                  }
                  alt={anime.title}
                  className={style.anime_image}
                />
                {anime.score && (
                  <div className={style.score_badge}>
                    ⭐ {anime.score.toFixed(2)}
                  </div>
                )}
              </div>
              <div className={style.anime_info}>
                <h3 className={style.anime_name} title={anime.title}>
                  {anime.title}
                </h3>
                <div className={style.meta_info}>
                  <span>{anime.type}</span>
                  <span>{anime.year || "종료/미정"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedAnime && (
        <div
          className={style.modal_overlay}
          onClick={() => setSelectedAnime(null)}
        >
          {/* 부모의 닫기 이벤트를 차단하여 팝업 내부를 클릭해도 안 닫히게 설정 */}
          <div
            className={style.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={style.modal_close}
              onClick={() => setSelectedAnime(null)}
            >
              ✕
            </button>

            <div className={style.modal_body}>
              <div className={style.modal_left}>
                <img
                  src={selectedAnime.images.webp.large_image_url}
                  alt={selectedAnime.title}
                />
              </div>

              <div className={style.modal_right}>
                <span className={style.modal_type_badge}>
                  {selectedAnime.type}
                </span>
                <button
                  onClick={() => toggleBookmark(selectedAnime)}
                  style={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    backgroundColor: "#ff4757",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ⭐ 이 작품 보관함에 찜하기
                </button>
                <h2 className={style.modal_anime_title}>
                  {selectedAnime.title}
                </h2>
                {selectedAnime.title_japanese && (
                  <p className={style.modal_jp_title}>
                    🇯🇵 {selectedAnime.title_japanese}
                  </p>
                )}

                <div className={style.modal_meta_row}>
                  <span>
                    ⭐️ <b>{selectedAnime.score || "평점 없음"}</b>
                  </span>
                  <span>
                    🎬 에피소드: <b>{selectedAnime.episodes || "미정"}화</b>
                  </span>
                  <span>
                    📅 방영: <b>{selectedAnime.year || "정보 없음"}년</b>
                  </span>
                </div>

                <div className={style.modal_synopsis}>
                  <h4>줄거리 (Synopsis)</h4>
                  <p>
                    {selectedAnime.synopsis || "등록된 줄거리 정보가 없습니다."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

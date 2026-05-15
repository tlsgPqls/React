"use client";

import { useState, useEffect } from "react";
import style from "./ranking.module.css";

export default function RankingPage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);

  useEffect(() => {
    async function fetchTopAnime() {
      setLoading(true);
      try {
        // 글로벌 평점 기준 가장 높은 명작들을 정렬하여 가져오는 API
        const url = "https://api.jikan.moe/v4/anime";
        const res = await fetch(url);
        const json = await res.json();
        setAnimeList(json.data || []);
      } catch (error) {
        console.error("명작 랭킹 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTopAnime();
  }, []);

  return (
    <div className={style.page_container}>
      {/* 명작 타이틀 헤더 */}
      <div className={style.page_header}>
        <h2 className={style.page_title}>🏆 역대 명작 TOP 애니 명예의 전당</h2>
        <p className={style.page_subtitle}>
          글로벌 유저 평점과 인기도를 기반으로 엄선된 최고의 작품 리스트
        </p>
      </div>

      {loading ? (
        <div className={style.loading_box}>
          🍿 전 세계 명작 데이터를 집계하는 중...
        </div>
      ) : (
        /* 다른 페이지보다 리스트에 집중할 수 있는 전용 카드 팩 배열 */
        <div className={style.anime_grid}>
          {animeList.map((anime: any, index: number) => {
            const rankNum = index + 1;
            return (
              <div
                key={anime.mal_id}
                className={style.anime_card}
                onClick={() => setSelectedAnime(anime)}
              >
                <div className={style.image_wrapper}>
                  <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    className={style.anime_image}
                  />

                  {/* 🥇 1, 2, 3위는 특별한 순위 배지 부여 */}
                  <div
                    className={`${style.rank_badge} ${style[`rank_${rankNum}`] || ""}`}
                  >
                    {rankNum}위
                  </div>
                </div>

                <div className={style.anime_info}>
                  <h3 className={style.anime_name} title={anime.title}>
                    {anime.title}
                  </h3>

                  {/* 스튜디오(제작사) 정보 바인딩 */}
                  <div className={style.studio_text}>
                    🎬 {anime.studios?.[0]?.name || "제작사 정보 없음"}
                  </div>

                  <div className={style.meta_info}>
                    <span className={style.score_text}>
                      ⭐ {anime.score ? anime.score.toFixed(2) : "N/A"}
                    </span>
                    <span className={style.episode_text}>
                      {anime.type} ({anime.episodes}화)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {selectedAnime && (
        <div
          className={style.modal_overlay}
          onClick={() => setSelectedAnime(null)}
        >
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
                <h2 className={style.modal_anime_title}>
                  {selectedAnime.title}
                </h2>
                <div className={style.modal_meta_row}>
                  <span>
                    ⭐️ 평점: <b>{selectedAnime.score}</b>
                  </span>
                  <span>
                    👥 전세계 명작 서열: <b>{selectedAnime.rank}위</b>
                  </span>
                </div>
                <div className={style.modal_synopsis}>
                  <h4>작품 개요 및 줄거리</h4>
                  <p>{selectedAnime.synopsis || "상세 정보 대기 중"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

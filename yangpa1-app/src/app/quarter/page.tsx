"use client";

import { useState, useEffect } from "react";
import style from "./quarter.module.css";

// 2026년 방영 분기 정의 (Jikan API의 시즌 쿼리 매칭값)
const SEASON_LIST = [
  { id: "winter", name: "1분기 (겨울)", icon: "❄️" },
  { id: "spring", name: "2분기 (봄)", icon: "🌸" },
  { id: "summer", name: "3분기 (여름)", icon: "☀️" },
  { id: "autumn", name: "4분기 (가을)", icon: "🍁" },
];
const YEAR_OPTIONS = [2026, 2025, 2024];

export default function QuarterPage() {
  const [selectedYear, setSelectedYear] = useState(2026); // 연도 상태 추가
  const [currentSeason, setCurrentSeason] = useState("spring"); // 현재 시점에 맞춘 기본 분기 세팅
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);

  useEffect(() => {
    async function fetchSeasonAnime() {
      setLoading(true);
      try {
        // 💡 선택된 연도와 분기 데이터를 동적으로 바인딩하여 호출
        const url = `https://api.jikan.moe/v4/anime`;
        const res = await fetch(url);
        const json = await res.json();

        // 인기도 기반 정렬로 최신 트렌드 반영
        const sortedData = (json.data || []).sort(
          (a: any, b: any) => (b.members || 0) - (a.members || 0),
        );
        setAnimeList(sortedData);
      } catch (error) {
        console.error("신작 데이터 갱신 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSeasonAnime();
  }, [selectedYear, currentSeason]); // 연도나 분기가 바뀔 때마다 자동 동기화

  return (
    <div className={style.page_container}>
      <div className={style.page_header}>
        <h2 className={style.page_title}>📅 시즌별 신작 스케줄러</h2>
        <p className={style.page_subtitle}>
          가장 빠르게 업데이트되는 글로벌 분기별 라인업
        </p>
      </div>

      {/* 💡 최신 연도 선택 드롭다운 셀렉터 배치 */}
      <div className={style.controls_row}>
        <div className={style.select_wrapper}>
          <label htmlFor="year-select">📅 연도 선택</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className={style.year_select}
          >
            {YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 분기 선택 탭 */}
      <div className={style.season_tabs}>
        {SEASON_LIST.map((season) => (
          <button
            key={season.id}
            className={`${style.tab_button} ${currentSeason === season.id ? style.tab_active : ""}`}
            onClick={() => setCurrentSeason(season.id)}
          >
            <span className={style.tab_icon}>{season.icon}</span>
            <span className={style.tab_name}>{season.name}</span>
          </button>
        ))}
      </div>

      <div className={style.list_meta}>
        🚀 {selectedYear}년{" "}
        {SEASON_LIST.find((s) => s.id === currentSeason)?.name} 결과:{" "}
        <span className={style.count_text}>{animeList.length}</span>개 편제됨
      </div>

      {loading ? (
        <div className={style.loading_box}>
          🍿 타임라인 데이터를 불러오는 중...
        </div>
      ) : animeList.length === 0 ? (
        <div className={style.empty_box}>
          🏜️ 해당 분기에 아직 확정된 편성 데이터가 없습니다.
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
                  src={anime.images.webp.large_image_url}
                  alt={anime.title}
                  className={style.anime_image}
                />
                {anime.score ? (
                  <div className={style.score_badge}>
                    ⭐ {anime.score.toFixed(1)}
                  </div>
                ) : (
                  <div
                    className={`${style.score_badge} ${style.badge_upcoming}`}
                  >
                    NEW
                  </div>
                )}
              </div>
              <div className={style.anime_info}>
                <h3 className={style.anime_name} title={anime.title}>
                  {anime.title}
                </h3>
                <div className={style.meta_info}>
                  <span>{anime.type}</span>
                  <span className={style.airing_status}>
                    {anime.airing ? "🟢 방영중" : "⚪ 예정"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 모달 팝업 생략 (기존 구조 유지) */}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import style from "./recommend.module.css";

export default function RecommendPage() {
  const [randomAnime, setRandomAnime] = useState<any | null>(null);
  const [todayAnimeList, setTodayAnimeList] = useState([]);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  // 1. 룰렛 돌리기: 랜덤 애니메이션 하나 가져오기
  const fetchRandomAnime = async () => {
    setLoadingRandom(true);
    try {
      const res = await fetch("https://api.jikan.moe/v4/anime");
      const json = await res.json();
      setRandomAnime(json.data);
    } catch (error) {
      console.error("랜덤 추천 실패:", error);
    } finally {
      setLoadingRandom(false);
    }
  };

  // 2. 현재 방영 중인 오늘 스케줄 리스트 가져오기
  useEffect(() => {
    fetchRandomAnime(); // 진입 시 자동 1회 추천

    async function fetchTodaySchedule() {
      setLoadingSchedule(true);
      try {
        // 현재 시즌에 방영 중인 인기 작품 리스트업
        const res = await fetch("https://api.jikan.moe/v4/anime");
        const json = await res.json();
        setTodayAnimeList(json.data || []);
      } catch (error) {
        console.error("오늘의 스케줄 로드 실패:", error);
      } finally {
        setLoadingSchedule(false);
      }
    }
    fetchTodaySchedule();
  }, []);

  return (
    <div className={style.page_container}>
      {/* 타이틀 */}
      <div className={style.page_header}>
        <h2 className={style.page_title}>✨ 오늘 뭐 보지? 애니 룰렛</h2>
        <p className={style.page_subtitle}>
          볼 작품을 고르기 어려울 때, 인공지능과 커뮤니티가 엄선한 랜덤 카드를
          뒤집어보세요.
        </p>
      </div>

      {/* 🎰 메인 추천 카드 (룰렛 섹션) */}
      <div className={style.roulette_section}>
        {loadingRandom ? (
          <div className={style.roulette_loading}>
            <span>🔮</span> 다음 명작을 엄선하는 중...
          </div>
        ) : randomAnime ? (
          <div className={style.recommend_card}>
            <div className={style.rec_badge}>TODAY'S PICK</div>
            <div className={style.rec_body}>
              <div className={style.rec_left}>
                <img
                  src={randomAnime.images?.webp?.large_image_url}
                  alt={randomAnime.title}
                />
              </div>
              <div className={style.rec_right}>
                <span className={style.anime_type}>{randomAnime.type}</span>
                <h3 className={style.anime_title}>{randomAnime.title}</h3>
                <div className={style.anime_meta}>
                  <span>
                    ⭐ 평점: <b>{randomAnime.score || "평점 집계중"}</b>
                  </span>
                  <span>
                    화수: <b>{randomAnime.episodes || "미정"}화</b>
                  </span>
                </div>
                <p className={style.anime_synopsis}>
                  {randomAnime.synopsis
                    ? randomAnime.synopsis.slice(0, 180) + "..."
                    : "이 작품은 베일에 싸여 있습니다. 직접 스트리밍을 통해 스토리를 확인해 보세요!"}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* 다시 돌리기 버튼 */}
        <button
          className={style.reroll_button}
          onClick={fetchRandomAnime}
          disabled={loadingRandom}
        >
          🎲 다른 작품 추천받기
        </button>
      </div>

      {/* 📺 실시간 트렌드 배너 섹션 */}
      <div className={style.schedule_section}>
        <h3 className={style.section_title}>
          🔥 지금 이 순간 가장 핫한 스트리밍 신작
        </h3>
        {loadingSchedule ? (
          <div className={style.loading_text}>데이터 수신 중...</div>
        ) : (
          <div className={style.anime_grid}>
            {todayAnimeList.map((anime: any) => (
              <div key={anime.mal_id} className={style.anime_card}>
                <div className={style.image_wrapper}>
                  <img
                    src={anime.images?.webp?.large_image_url}
                    alt={anime.title}
                  />
                  {anime.score && (
                    <div className={style.score_badge}>
                      ⭐ {anime.score.toFixed(1)}
                    </div>
                  )}
                </div>
                <div className={style.anime_info}>
                  <h4 className={style.anime_name}>{anime.title}</h4>
                  <div className={style.meta_info}>
                    <span>{anime.genres[0]?.name || "기타"}</span>
                    <span className={style.live_badge}>LIVE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

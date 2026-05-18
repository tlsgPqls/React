"use client";

import { useState, useEffect } from "react";
import style from "./recommend.module.css";

export default function RecommendPage() {
  const [randomAnime, setRandomAnime] = useState<any | null>(null);
  const [todayAnimeList, setTodayAnimeList] = useState<any[]>([]);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  // 1. 🛠️ API를 새로 쏘지 않고 받아온 리스트 배열 내에서 1개씩 꺼내 띄워주기
  const fetchRandomAnime = () => {
    if (todayAnimeList.length === 0) return;

    setLoadingRandom(true);
    // 의도적인 룰렛 로딩 효과 연출 (0.3초 뒤 무작위 선택)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * todayAnimeList.length);
      setRandomAnime(todayAnimeList[randomIndex]);
      setLoadingRandom(false);
    }, 300);
  };

  // 2. 현재 방영 중인 오늘 스케줄 리스트 가져오기
  useEffect(() => {
    // 🛠️ 맨 처음에는 미정으로 가기 위해 fetchRandomAnime() 자동 호출 제거

    async function fetchTodaySchedule() {
      setLoadingSchedule(true);
      try {
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
          /* 기존 UI 마크업 완벽 유지 */
          <div className={style.recommend_card}>
            <div className={style.rec_badge}>TODAY'S PICK</div>
            <div className={style.rec_body}>
              <div className={style.rec_left}>
                <img
                  src={
                    randomAnime.images?.webp?.large_image_url ||
                    randomAnime.images?.jpg?.large_image_url
                  }
                  alt={randomAnime.title}
                />
              </div>
              <div className={style.rec_right}>
                <span className={style.anime_type}>
                  {randomAnime.type || "TV"}
                </span>
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
        ) : (
          /* 🛠️ 맨 처음 미정일 때 뜨는 전용 UI (기존 마크업 형태와 스타일 틀을 동일하게 사용) */
          <div
            className={style.recommend_card}
            style={{ border: "2px dashed #ccc", boxShadow: "none" }}
          >
            <div
              className={style.rec_badge}
              style={{ backgroundColor: "#888" }}
            >
              BEFORE ROLL
            </div>
            <div
              className={style.rec_body}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "250px",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "50px", marginBottom: "10px" }}>❓</span>
              <h3 className={style.anime_title} style={{ margin: 0 }}>
                오늘의 추천 작품: 미정
              </h3>
              <p style={{ color: "#888", fontSize: "14px", marginTop: "5px" }}>
                주목할 만한 신작 리스트에서 랜덤 명작 카드를 뒤집어보세요!
              </p>
            </div>
          </div>
        )}

        {/* 다시 돌리기 버튼 */}
        <button
          className={style.reroll_button}
          onClick={fetchRandomAnime}
          disabled={loadingRandom || todayAnimeList.length === 0}
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
                    src={
                      anime.images?.webp?.large_image_url ||
                      anime.images?.jpg?.large_image_url
                    }
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
                    <span>{anime.genres?.[0]?.name || "기타"}</span>
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

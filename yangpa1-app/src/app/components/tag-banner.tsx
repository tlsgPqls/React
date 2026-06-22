"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./tag-banner.module.css";

interface Anime {
  id: number;
  title: string;
  posterImage: string;
  tags: string[];
}

export default function TagBanner() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [recTag, setRecTag] = useState("🔥 요즘 대세 입덕 추천작");
  const [isLoading, setIsLoading] = useState(true);

  // app/components/tag-banner.tsx 내부의 useEffect 구역 교정
  useEffect(() => {
    const fetchRecommendedAnime = async () => {
      try {
        // 💡 내 로그인 토큰 유무 확인
        const token = localStorage.getItem("accessToken");

        // 백엔드 3001번 맞춤형 라우터 호출
        const response = await fetch("http://localhost:3001/anime/recommend", {
          method: "GET",
          headers: {
            // 토큰이 있으면 실어 보내고, 없으면 공백으로 보냅니다. (백엔드가 유저를 식별할 수 있게 함)
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData && resData.list) {
            setAnimeList(resData.list);
            // 💡 백엔드가 가공해준 맞춤형 태그 이름으로 배너 타이틀 실시간 스위칭!
            if (resData.tag) {
              setRecTag(`✨ 회원님을 위한 #${resData.tag} 취향 저격 추천작`);
            }
          }
        }
      } catch (error) {
        console.error("맞춤 배너 데이터 연동 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedAnime();

    // 💡 로그아웃 버턴을 누르거나 로그인 성공 시 발생하는 이벤트를 감지하여
    // 화면을 새로고침하지 않아도 배너가 즉시 내 취향 레이아웃으로 변경되도록 구독 이벤트 등록
    window.addEventListener("auth-change", fetchRecommendedAnime);
    return () =>
      window.removeEventListener("auth-change", fetchRecommendedAnime);
  }, []);

  if (isLoading || animeList.length === 0) return null;

  // 💡 무한 루프 롤링 끊김 현상을 방지하기 위해 배열을 2번 복사해서 길게 이어 붙입니다.
  const duplicatedList = [...animeList, ...animeList, ...animeList];

  return (
    <div className={style.banner_container}>
      <h3 className={style.banner_title}>{recTag}</h3>

      {/* 트랙 껍데기 */}
      <div className={style.slider_track}>
        <div className={style.slider_animate}>
          {duplicatedList.map((anime, index) => (
            <Link
              href={`/anime/${anime.id}`}
              key={`${anime.id}-${index}`}
              className={style.anime_card}
            >
              <div className={style.image_wrapper}>
                <img
                  src={
                    anime.posterImage ||
                    `https://picsum.photos{anime.id + 10}/200/280`
                  }
                  alt={anime.title}
                  className={style.poster}
                />
                <div className={style.hover_overlay}>
                  <p className={style.view_btn}>상세보기</p>
                </div>
              </div>
              <h4 className={style.anime_title}>{anime.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

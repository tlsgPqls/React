"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import style from "./detail.module.css"; // 💡 전용 스타일 시트 연결

interface AnimeDetail {
  id: number;
  title: string;
  posterImage: string;
  tags?: string | string[]; // 일반 문자열이거나 배열일 때 대응
}

export default function AnimeDetailPage() {
  const params = useParams(); // 💡 주소창의 [id] 번호표 가로채기 (예: /anime/3 -> params.id = 3)
  const router = useRouter();

  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const fetchAnimeDetail = async () => {
      try {
        // 💡 백엔드 진짜 포트인 3001번으로 동적 단건 조회 API 요청
        const response = await fetch(
          `http://localhost:3001/anime/${params.id}`,
        );

        if (response.ok) {
          const resData = await response.json();
          // 백엔드가 { success: true, data: { ... } } 형태로 응답할 때:
          if (resData && resData.data) {
            setAnime(resData.data);
          }
        } else {
          alert("존재하지 않는 작품이거나 삭제된 애니메이션입니다.");
          router.push("/");
        }
      } catch (error) {
        console.error("애니 상세 정보 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [params.id, router]);

  if (isLoading)
    return (
      <div className={style.loading}>
        🎬 애니메이션 상세 정보를 불러오는 중...
      </div>
    );
  if (!anime) return null;

  return (
    <div className={style.detail_container}>
      {/* 뒤로가기 버튼 */}
      <button onClick={() => router.back()} className={style.back_btn}>
        ⬅️ 뒤로가기
      </button>

      <div className={style.content_box}>
        {/* 왼쪽: 포스터 이미지 영역 */}
        <div className={style.poster_section}>
          <img
            src={
              anime.posterImage ||
              `https://picsum.photos{anime.id + 10}/300/420`
            }
            alt={anime.title}
            className={style.main_poster}
          />
        </div>

        {/* 오른쪽: 상세 정보 텍스트 영역 */}
        <div className={style.info_section}>
          <h1 className={style.anime_title}>{anime.title}</h1>

          <div className={style.meta_info}>
            <span className={style.label}>장르 / 태그</span>
            <div className={style.tag_wrapper}>
              {/* 태그가 배열이거나 단일 문자열일 때 유연하게 배지 출력 */}
              {Array.isArray(anime.tags) ? (
                anime.tags.map((tag, i) => (
                  <span key={i} className={style.tag_badge}>
                    #{tag}
                  </span>
                ))
              ) : (
                <span className={style.tag_badge}>
                  #{anime.tags || "기본 추천"}
                </span>
              )}
            </div>
          </div>

          <div className={style.description_box}>
            <h3>📝 작품 소개</h3>
            <p>
              애니대백과가 추천하는 명작 애니메이션 [{anime.title}] 입니다.
              로그인한 사용자 유형에 따라 맞춤형 피드백 태그를 분석 중이며,
              조만간 하단에 댓글(`Comment`) 및 감상평 리스트 연동 단계가 추가될
              예정입니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

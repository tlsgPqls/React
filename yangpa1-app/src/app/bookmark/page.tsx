"use client";

import { useState, useEffect } from "react";
import style from "./bookmark.module.css";

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);

  // 1. 컴포넌트가 마운트될 때 로컬스토리지에서 북마크 리스트 읽어오기
  useEffect(() => {
    const saved = localStorage.getItem("anime_bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // 2. 특정 작품 북마크에서 전면 삭제하는 기능
  const removeBookmark = (malId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭(모달 열기) 이벤트로 번지는 것 차단
    const updated = bookmarks.filter((item) => item.mal_id !== malId);
    setBookmarks(updated);
    localStorage.setItem("anime_bookmarks", JSON.stringify(updated));
  };

  if (!isLoaded) {
    return (
      <div className={style.loading_box}>🍿 저장고를 열고 있습니다...</div>
    );
  }

  return (
    <div className={style.page_container}>
      <div className={style.page_header}>
        <h2 className={style.page_title}>⭐ 내가 찜한 애니메이션</h2>
        <p className={style.page_subtitle}>
          브라우저에 안전하게 보관된 나만의 커스텀 정주행 컬렉션
        </p>
      </div>

      {bookmarks.length === 0 ? (
        /* 북마크한 보관함이 비어있을 때 노출 */
        <div className={style.empty_box}>
          <span className={style.empty_icon}>💨</span>
          <p>아직 보관함에 담긴 작품이 없습니다.</p>
          <p className={style.empty_sub}>
            상세 팝업창에서 찜하기 버튼을 눌러 컬렉션을 채워보세요!
          </p>
        </div>
      ) : (
        <div className={style.anime_grid}>
          {bookmarks.map((anime) => (
            <div
              key={anime.mal_id}
              className={style.anime_card}
              onClick={() => setSelectedAnime(anime)}
            >
              <div className={style.image_wrapper}>
                <img
                  src={anime.image}
                  alt={anime.title}
                  className={style.anime_image}
                />

                {/* ❌ 즉시 삭제 플로팅 버튼 */}
                <button
                  className={style.delete_btn}
                  onClick={(e) => removeBookmark(anime.mal_id, e)}
                  title="삭제"
                >
                  ✕
                </button>
              </div>
              <div className={style.anime_info}>
                <h3 className={style.anime_name} title={anime.title}>
                  {anime.title}
                </h3>
                <div className={style.meta_info}>
                  <span>{anime.type}</span>
                  <span className={style.score_text}>
                    ⭐ {anime.score || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 모달 레이어 상세 팝업 뷰어 */}
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
                <img src={selectedAnime.image} alt={selectedAnime.title} />
              </div>
              <div className={style.modal_right}>
                <h2 className={style.modal_anime_title}>
                  {selectedAnime.title}
                </h2>
                <div className={style.modal_meta_row}>
                  <span>
                    ⭐️ 평점: <b>{selectedAnime.score || "집계중"}</b>
                  </span>
                </div>
                <div className={style.modal_synopsis}>
                  <h4>작품 시놉시스</h4>
                  <p>
                    {selectedAnime.synopsis || "등록된 요약 내용이 없습니다."}
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

import style from "./page.module.css";
import type SaleData from "@/types";
import Image from "next/image";
import { ENV } from "@/env";
// import sales from "@/mock/sales.json";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // 1. 주소창에서 id(예: '20')를 받아옵니다.
  const { id } = await params;
  const targetId = Number(id); // 안전한 비교를 위해 숫자형으로 변환
  const searchTitle = decodeURIComponent(id).toLowerCase();
  // let animeList: any[] = [];

  let currentAnime;

  try {
    // 2. 검색 쿼리로 호출 (jsonResult.data 배열이 반환됨)
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("애니메이션 정보를 가져오는데 실패했습니다.");
    }

    const jsonResult = await response.json();
    currentAnime = jsonResult.data || [];
  } catch (err) {
    console.error("상세페이지 에러:", err);
    return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  // 3. 핵심 수정: item.id가 아니라 API 스펙인 item.mal_id와 정확히 비교합니다.
  // const currentAnime = animeList.find((item: any) => item.mal_id === targetId);
  // console.log(animeList);
  // 데이터 가공 및 일치 항목 미발견 시 안전장치
  if (!currentAnime) {
    return (
      <div>
        존재하지 않거나 목록에서 해당 ID({id}) 정보를 매칭할 수 없습니다.
      </div>
    );
  }

  // 4. 추출한 단일 객체 'currentAnime'에서 필드 분해
  const imgUrl =
    currentAnime.images?.jpg?.large_image_url ||
    currentAnime.images?.jpg?.image_url ||
    null;
  const { title, mal_id, background, score, type, duration } = currentAnime;

  return (
    <div className={style.container}>
      {imgUrl ? (
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${imgUrl}')` }}
        >
          <Image
            src={imgUrl}
            alt={title || "포스터"}
            width={200}
            height={300}
            className={style.cover_img}
            unoptimized
          />
        </div>
      ) : (
        <div className={style.no_image_container}>
          등록된 포스터가 없습니다.
        </div>
      )}

      <div className={style.info_section}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.meta}>고유 번호(ID): {mal_id}</p>
        <p className={style.meta}>
          분류: {type} | 상영 시간: {duration}
        </p>
        <p className={style.score}>평점: ⭐ {score || "정보 없음"}</p>

        <hr className={style.divider} />

        <h3>줄거리</h3>
        <p className={style.description}>
          {background || "등록된 상세 설명 텍스트가 없습니다."}
        </p>
      </div>
    </div>
  );
}

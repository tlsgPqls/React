import style from "./page.module.css";
import type SaleData from "@/types";
import Image from "next/image";
import { ENV } from "@/env";
// import sales from "@/mock/sales.json";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // 1. Next.js 15 규칙: 비동기로 URL 파라미터의 id 추출 (mal_id)
  const { id } = await params;

  let animeDetail: any = null;

  try {
    // 2. Jikan API의 특정 ID 단건 조회 주소 호출
    const response = await fetch(`https://api.jikan.moe/v4/anime/`, {
      cache: "no-store", // 실시간 데이터 반영
    });

    if (!response.ok) {
      throw new Error("애니메이션 상세 정보를 가져오는데 실패했습니다.");
    }

    const jsonResult = await response.json();

    // 3. 단건 조회의 결과는 배열이 아닌 'data' 단일 객체입니다.
    animeDetail = jsonResult.data;
  } catch (err) {
    console.error("상세페이지 에러:", err);
    return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  // 데이터가 없을 때 안전장치
  if (!animeDetail) {
    return <div>존재하지 않거나 정보를 불러올 수 없는 애니메이션입니다.</div>;
  }

  // 4. 앞서 정의한 Jikan API의 깊은 이미지 구조에서 주소 추출
  const imgUrl =
    animeDetail.images?.jpg?.large_image_url ||
    animeDetail.images?.jpg?.image_url ||
    "";

  // 5. 화면에 뿌려줄 데이터 구조 분해 할당
  const { title, mal_id, background, score, type, duration } = animeDetail;

  return (
    <div className={style.container}>
      {/* 고화질 포스터 배경 처리 */}
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
          unoptimized // 외부 cdn 도메인 에러 방지
        />
      </div>

      {/* 정보 출력 구역 */}
      <div className={style.info_section}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.meta}>고유 번호(ID): {mal_id}</p>
        <p className={style.meta}>
          분류: {type} | 상영 시간: {duration}
        </p>
        <p className={style.score}>평점: ⭐ {score || "정보 없음"}</p>

        <hr className={style.divider} />

        <h3>줄거리 / 백그라운드</h3>
        <p className={style.description}>
          {background || "등록된 상세 설명 텍스트가 없습니다."}
        </p>
      </div>
    </div>
  );
}

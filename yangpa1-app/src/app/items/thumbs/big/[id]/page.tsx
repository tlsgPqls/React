import style from "./page.module.css";
import type SaleData from "@/types";
import Image from "next/image";
import { ENV } from "@/env";
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
  // 1. URL 파라미터에서 id 추출 (Next.js 15 필수 규칙)

  const { id } = await params;
  const targetId = Number(id);
  let animeList: any[] = [];

  try {
    // 2. API 호출 (실제 가공할 ID 파라미터가 필요하다면 URL 구조 확인이 필요합니다)
    const response = await fetch(
      `https://laftel.net/api/search/v1/discover/?id=${id}&name&img_url`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          laftel: "TeJava",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("데이터를 가져오는데 실패했습니다.");
    }

    // 3. 핵심: response 바디를 JSON 객체로 파싱
    const data = await response.json();
    console.log(data);

    animeList = data.results || [];
  } catch (err) {
    console.error(err);
    return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  // 4. 안전장치: 결과 배열이 비어있으면 조기 리턴
  if (animeList.length === 0) {
    return <div>조회된 데이터가 없습니다.</div>;
  }

  const currentAnime = animeList.find((item: any) => item.id === targetId);
  if (!currentAnime) {
    return (
      <div>해당 ID({id})의 애니메이션 정보를 목록에서 찾을 수 없습니다.</div>
    );
  }
  const { name: productName, img } = currentAnime;
  const imgUrl = `${img}`;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${imgUrl}')` }}
      >
        <Image
          src={imgUrl}
          alt={productName || "애니 이미지"}
          width={300}
          height={400}
          className={style.cover_img}
          unoptimized
        />
        <div className={style.info_box}>
          <div className={style.title}>상품명: {productName}</div>
          <div className={style.description}>이미지 주소: {img}</div>
        </div>
      </div>
    </div>
  );
}
// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function Page({ params }: PageProps) {
//   // 실제 연동할 데이터 객체 예시 (원래는 fetch나 mock 데이터를 불러와야 합니다)
//   // const mockData = {
//   //   id: 16075,
//   //   productName: "은혼 1기",
//   //   img: "https://thumbnail.laftel.net/items/thumbs/big/13ab0a22-8b65-4b50-ad2a-502a308d3de5.jpg",
//   // };
//   const {id} = await params;
//   let sales: any[] = [];
// const response = await fetch(
//     "https://laftel.net/api/search/v1/discover/?id&name&img_url",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         laftel: "TeJava", // 인증 헤더 주입
//       },
//       cache: "no-store",
//     },
//   );
//   const { productName, img } = response;

//   const imgUrl = `${img}`;

//   return (
//     <div className={style.container}>
//       <Image
//         src={imgUrl}
//         alt={productName}
//         width={100}
//         height={100}
//         className={style.image}
//         unoptimized
//       />
//       <div>
//         <div className={style.title}>상품명: {productName}</div>
//         <div className={style.description}>이미지: {img}</div>
//       </div>
//     </div>
//   );
// }
// export default function SaleItem({ id, productName, img, rating }: SaleData) {
//   const imgUrl = `${img}`;
//   return (
//     <div className={style.container}>
//       <Image
//         src={imgUrl}
//         alt={productName}
//         width={100}
//         height={100}
//         className={style.image}
//         unoptimized
//       />
//       <div>
//         <div className={style.title}>상품명 {productName}</div>
//         <div className={style.description}>이미지 {img}</div>
//         {/* <div className={style.price}>남은갯수: {rating.toLocaleString()} </div> */}
//       </div>
//     </div>
//   );
// }
// import sales from "@/mock/sales.json";
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   let sales: SaleData[];
//   try {
//     const { id } = await params;
//     const response = await fetch(
//       "https://laftel.net/api/search/v1/discover/?id&name&img_url",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           laftel: "TeJava", // 인증 헤더 주입
//         },
//         cache: "no-store",
//       },
//     );

//     if (!response.ok) throw new Error(response.statusText);
//     const data = await response.json();
//     sales = data.documents;
//   } catch (err) {
//     console.error(err);
//     return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
//   }
//   const { id: animeId, name, img, rating } = sales[0] as any;
//   const imgUrl = `${img}`;
//   return (
//     <div className={style.container}>
//       <div
//         className={style.cover_img_container}
//         style={{ backgroundImage: `url('${imgUrl}')` }}
//       >
//         {" "}
//         <Image
//           src={imgUrl}
//           alt=""
//           width={100}
//           height={100}
//           className={style.cover_img}
//         />
//       </div>
//     </div>
//   );
// }

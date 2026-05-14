// "use client";
// import SaleData from "@/types";
// import style from "./page.module.css";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function ItemDetail({
//   initialData,
//   imgUrl,
// }: {
//   initialData: SaleData;
//   imgUrl: string;
// }) {
//   useEffect(() => {
//     if (!initialData) return;
//     // 기존 저장된 데이터 가져오기
//     const savedData = JSON.parse(localStorage.getItem("sales_history") || "{}");
//     // ID를 키값으로 사용해 개별 정보 저장
//     savedData[initialData.id] = initialData;
//     localStorage.setItem("sales_history", JSON.stringify(savedData));
//   }, [initialData]);
//   // ID별로 가져온 단일 정보를 상태에 저장
//   const [saleInfo, setSaleInfo] = useState<SaleData>(initialData);

//   return (
//     <div className={style.container}>
//       <div
//         className={style.cover_img_container}
//         style={{ backgroundImage: `url('${imgUrl}')` }}
//       >
//         <Image
//           src={imgUrl}
//           alt="ani"
//           width={100}
//           height={100}
//           className={style.cover_img}
//         />
//       </div>
//       <div className={style.title}>{saleInfo.productName}</div>
//       <div className={style.description}>{saleInfo.img}</div>
//     </div>
//   );
// }

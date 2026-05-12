import style from "./page.module.css";
import type SaleData from "@/types";
import Image from "next/image";
import { ENV } from "@/env";
// import sales from "@/mock/sales.json";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let sales: SaleData[];
  try {
    const { id } = await params;
    const response = await fetch(`${ENV.API_URL}/sales/${id}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    sales = data.documents;
  } catch (err) {
    console.error(err);
    return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }
  const { productName, description, price, photo } = sales[0];
  const imgUrl = `${ENV.IMAGE_URL}/${photo}`;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${imgUrl}')` }}
      >
        {" "}
        <Image
          src={imgUrl}
          alt=""
          width={100}
          height={100}
          className={style.cover_img}
        />
      </div>
      <div className={style.title}>{productName}</div>
      <div className={style.price}>{price.toLocaleString()}원</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}

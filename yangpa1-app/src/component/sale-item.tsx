import SaleData from "@/types";
import Image from "next/image";
import style from "./sale-item.module.css";
import Link from "next/link";
import { ENV } from "@/env";
export default function SaleItem({ id, productName, img, rating }: SaleData) {
  const imgUrl = `${img}`;
  return (
    <Link href={`/items/thumbs/big/${id}`}>
      <div className={style.container}>
        <Image
          src={imgUrl}
          alt="{productName}"
          width={100}
          height={100}
          className={style.image}
          unoptimized
        />
        <div>
          <div className={style.title}>상품명 {productName}</div>
          <div className={style.description}>이미지 {img}</div>
          <div className={style.price}>
            남은갯수: {rating.toLocaleString()}{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}

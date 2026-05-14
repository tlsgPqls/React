import SaleData from "@/types";
import Image from "next/image";
import style from "./sale-item.module.css";
import Link from "next/link";
import { ENV } from "@/env";
export default function SaleItem({
  mal_id,
  url,
  title,
  type,
  duration,
  score,
  background,
  images,
}: SaleData) {
  const imgUrl = images?.jpg?.image_url || "/placeholder.png";
  return (
    <Link href={`/sale/${mal_id}`}>
      <div className={style.container}>
        <Image
          src={imgUrl}
          alt="image"
          width={100}
          height={100}
          className={style.image}
        />
        <div>
          <div className={style.title}>상품명 {title}</div>
          <div className={style.description}>설명 {background}</div>
          <div className={style.description}>연령가 {score}</div>
        </div>
      </div>
    </Link>
  );
}

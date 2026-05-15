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
  popularity,
  favorites,
  background,
  images,
}: SaleData) {
  const imgUrl = images?.jpg?.image_url || "/placeholder.png";
  const encodedTitle = encodeURIComponent(title);
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
          <div className={style.title}>{title}</div>
          <div className={style.score}>평점: ⭐{score}</div>
          <div className={style.score}>좋아요: ❤️{favorites}</div>
          <div className={style.score}>인지도: {popularity}</div>
          <div className={style.title}>방영시간: {duration}</div>
        </div>
      </div>
    </Link>
  );
}

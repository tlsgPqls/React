import SaleData from "@/types";
import Image from "next/image";
import style from "./sale-item.module.css";
import Link from "next/link";
import { ENV } from "@/env";
export default function SaleItem({
  id,
  productName,
  description,
  price,
  photo,
}: SaleData) {
  const imgUrl = `${ENV.IMAGE_URL}/${photo}`;
  return (
    <Link href={`/sale/${id}`}>
      <div className={style.container}>
        <Image
          src={imgUrl}
          alt=""
          width={100}
          height={100}
          className={style.image}
        />
        <div>
          <div className={style.title}>상품명 {productName}</div>
          <div className={style.description}>설명 {description}</div>
          <div className={style.price}>가격: {price.toLocaleString()} 원</div>
        </div>
      </div>
    </Link>
  );
}

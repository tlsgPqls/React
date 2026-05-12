import SaleItem from "@/component/sale-item";
import Searchbar from "@/component/searchbar";
// import sales from "@/mock/sales.json";
import style from "./page.module.css";
import { ENV } from "@/env";
import type SaleData from "@/types";

export default async function Home() {
  const response = await fetch(`${ENV.API_URL}/sales/recent`, {
    next: { revalidate: 10 },
  });
  const data = await response.json();
  const sales: SaleData[] = data.documents;

  return (
    <div className={style.container}>
      <h3>최근 등록된 상품</h3>
      {sales.map((sale) => {
        return <SaleItem key={sale.id} {...sale} />;
      })}
      {/* <SaleItem {...sales} /> */}
    </div>
  );
}

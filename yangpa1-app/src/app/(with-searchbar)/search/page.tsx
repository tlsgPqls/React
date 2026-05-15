import type SaleData from "@/types";
import SaleItem from "@/component/sale-item";
import { ENV } from "@/env";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  let url = "https://api.jikan.moe/v4/anime";
  if (q) {
    // 공백이나 한글 검색 시 URL이 깨지는 것을 막기 위해 encodeURIComponent 적용
    url += `?q=${encodeURIComponent(q)}`;
  }

  const response = await fetch(url);
  console.log(url);
  const data = await response.json();
  const rawSales: SaleData[] = data.data || [];
  const sales = rawSales.filter(
    (sale, index, self) =>
      self.findIndex((item) => item.mal_id === sale.mal_id) === index,
  );
  //const sales: SaleData[] = data.data;
  return (
    <div>
      <h3>검색페이지</h3>
      {sales.map((sale) => {
        return <SaleItem key={sale.mal_id} {...sale} />;
      })}
    </div>
  );
}

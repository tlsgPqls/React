import type SaleData from "@/types";
import SaleItem from "@/component/sale-item";
import { ENV } from "@/env";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  console.log(q);
  const response = await fetch(`https://api.jikan.moe/v4/anime`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // if (q) {
  //   url += `?q=${q}`;
  // }
  const data = await response.json();
  const sales: SaleData[] = data.results;
  return (
    <div>
      <h3>검색페이지</h3>
      {sales.map((sale) => {
        return <SaleItem key={sale.id} {...sale} />;
      })}
    </div>
  );
}

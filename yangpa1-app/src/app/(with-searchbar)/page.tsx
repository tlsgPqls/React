import SaleItem from "@/component/sale-item";
import Searchbar from "@/component/searchbar";
import style from "./page.module.css";
import type SaleData from "@/types";

export default async function Home() {
  const response = await fetch("https://api.jikan.moe/v4/anime", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return <div className={style.container}>데이터를 불러오지 못했습니다.</div>;
  }

  const jsonResult = await response.json();
  const animeList = jsonResult.data || [];

  return (
    <div className={style.container}>
      <h3>애니리스트</h3>
      <div className={style.grid_layout}>
        {animeList.map((anime: any) => {
          // Jikan API 원본 데이터를 SaleData 타입 규격에 맞춰 안전하게 매핑
          const targetImageUrl = anime.images?.jpg?.image_url || "";
          const saleData: SaleData = {
            mal_id: anime.mal_id,
            url: anime.url,
            images: {
              jpg: {
                image_url: targetImageUrl,
              },
            },
            title: anime.title || anime.title_english || "제목 없음",
            type: anime.type || "TVA",
            duration: anime.duration || "알 수 없음",
            score: anime.score || 0,
            favorites: anime.like || 0,
            popularity: anime.popularity || 0,
            background: anime.background || "",
          };

          // 구조 분해 할당 속성({...saleData})을 통해 컴포넌트에 한 번에 주입
          return <SaleItem key={saleData.mal_id} {...saleData} />;
        })}
      </div>
    </div>
  );
}

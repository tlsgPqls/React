import SaleItem from "@/component/sale-item";
import Searchbar from "@/component/searchbar";
// import sales from "@/mock/sales.json";
import style from "./page.module.css";
import { ENV } from "@/env";
import type SaleData from "@/types";

export default async function Home() {
  const response = await fetch(
    "https://laftel.net/api/search/v1/discover/?id&name&img_url",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        laftel: "TeJava", // 인증 헤더 주입
      },
      cache: "no-store",
    },
  );
  console.log(response);
  if (!response.ok) {
    return <div className={style.container}>데이터를 불러오지 못했습니다.</div>;
  }

  const data = await response.json();

  // 2. 라프텔 API의 결과 배열 Key는 'documents'가 아니라 'results'입니다.
  // 응답 데이터 구조에 맞게 변수를 매핑합니다.
  const sales = data.results || [];

  return (
    <div className={style.container}>
      <h3>방영중인 영화</h3>
      {sales.map((sale: any) => {
        // 3. SaleItem 컴포넌트가 기존 변수명(예: title, thumbnail)을 기대한다면
        // 아래처럼 라프텔 데이터(name, img_url)를 매칭하여 넘겨주어야 깨지지 않습니다.
        return (
          <SaleItem
            key={sale.id}
            id={sale.id}
            productName={sale.name}
            img={sale.img}
            rating={sale.rating}
          />
        );
      })}
    </div>
  );
}

// export default async function Home() {
//   const response = await fetch(`${ENV.API_URL}/sales/recent`, {
//     next: { revalidate: 10 },
//   });
//   const data = await response.json();
//   const sales: SaleData[] = data.documents;

//   return (
//     <div className={style.container}>
//       <h3>최근 등록된 상품</h3>
//       {sales.map((sale) => {
//         return <SaleItem key={sale.id} {...sale} />;
//       })}
//       {/* <SaleItem {...sales} /> */}
//     </div>
//   );
// }

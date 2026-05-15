import Link from "next/link";
import style from "./layout.module.css";
import Sidebar from "./sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={style.body}>
        <div className={style.container}>
          {/* 상단 네비게이션 헤더 */}
          <header className={style.header}>
            <div className={style.header_content}>
              <Link href="/" className={style.title}>
                🙈 애니대백과
              </Link>
            </div>
          </header>

          {/* 3단 카드 레이아웃 본문 */}
          <div className={style.layout_body}>
            {/* [왼쪽 카드] 탐색 및 메뉴 */}
            <aside className={`${style.card_popup} ${style.left_card}`}>
              <h3 className={style.card_title}>📂 카테고리</h3>
              <nav className={style.nav_links}>
                <Link href="/genres">장르별 애니</Link>
                <Link href="/quarter">2026년 신작</Link>
                <Link href="/ranking">역대 명작 TOP</Link>
              </nav>
              <Sidebar />
            </aside>

            {/* [중앙 카드] 메인 콘텐츠 화면 */}
            <main className={style.main_card}>{children}</main>

            {/* [오른쪽 카드] 유틸리티 및 실시간 정보 */}
            <aside className={`${style.card_popup} ${style.right_card}`}>
              <h3 className={style.card_title}>🔥 실시간 검색어</h3>
              <ol className={style.rank_list}>
                <li>
                  <Link
                    href={`/search?q=${encodeURIComponent("Demon Slayer")}`}
                  >
                    <span>1</span> 귀멸의 칼날
                  </Link>
                </li>
                <li>
                  <Link href={`/search?q=${encodeURIComponent("Chainsawman")}`}>
                    <span>2</span> 체인소 맨
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/search?q=${encodeURIComponent("jujutsu kaisen")}`}
                  >
                    <span>3</span> 주술회전
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/search?q=${encodeURIComponent("Attack on Titan")}`}
                  >
                    <span>4</span> 진격의 거인
                  </Link>
                </li>
              </ol>

              <div className={style.ad_card}>
                <div className={style.ad_badge}>AD</div>
                <img
                  src="https://picsum.photos"
                  alt="추천 애니메이션 광고"
                  className={style.ad_image}
                />
                <div className={style.ad_info}>
                  <h4>라프텔 신작 단독 스트리밍!</h4>
                  <p>지금 가입하면 첫 달 무료 보기</p>
                </div>
              </div>
            </aside>
          </div>

          {/* 하단 푸터 */}
          <footer className={style.footer}>
            &copy; 2026 애니대백과 사이트 All right reserved
          </footer>
        </div>
      </body>
    </html>
  );
}

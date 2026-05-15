"use client"; // 이 컴포넌트만 클라이언트 사이드로 지정

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./layout.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={`${style.card_popup} ${style.left_card}`}>
      <h3 className={style.card_title}>📂 카테고리</h3>

      <nav className={style.nav_links}>
        <Link href="/" className={pathname === "/" ? style.active : ""}>
          🏠 홈으로 가기
        </Link>
        <Link
          href="/recommend"
          className={pathname === "/recommend" ? style.active : ""}
        >
          ✨ 오늘 뭐 보지?
        </Link>
        <Link
          href="/bookmark"
          className={pathname === "/bookmark" ? style.active : ""}
        >
          ⭐ 내가 찜한 애니
        </Link>
      </nav>
    </aside>
  );
}

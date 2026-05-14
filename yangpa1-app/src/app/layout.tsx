import Link from "next/link";
import style from "./layout.module.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href="/" className={style.title}>
              🗺️ 애니 포스터 특전 수령 사이트{" "}
            </Link>
          </header>

          <main>{children}</main>
          <footer>&copy; 2026 anime poster market All right reserved</footer>
        </div>
      </body>
    </html>
  );
}

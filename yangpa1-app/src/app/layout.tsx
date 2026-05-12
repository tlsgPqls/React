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
              🙈양파마켓{" "}
            </Link>
          </header>

          <main>{children}</main>
          <footer>&copy; 2026 양파 마켓 All right reserved</footer>
        </div>
      </body>
    </html>
  );
}

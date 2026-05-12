import { fetchSales } from "@/app/util/fetch-sales";
import { InferGetServerSidePropsType } from "next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>헤더입니다.</h1>{" "}
      </header>
      <main>{children}</main>
      <footer>풋터입니다.</footer>
    </div>
  );
}

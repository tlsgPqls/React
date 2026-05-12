import styles from "./[id].module.css";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={styles.title}>
      <h1>{id}번 상품 상세페이지</h1>
    </div>
  );
}

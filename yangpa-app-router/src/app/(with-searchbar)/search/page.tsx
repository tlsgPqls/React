export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div>
      <h1>검색어:{q}의 페이지 입니다.</h1>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <input type="text" placeholder="검색어를 입력하시오." />
      {children}
    </div>
  );
}

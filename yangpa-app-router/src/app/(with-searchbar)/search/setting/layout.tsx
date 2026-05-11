export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <h1>설정 전용 레이아웃</h1>
      </div>
      {children}
    </div>
  );
}

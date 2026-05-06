import { type ReactNode } from "react";
type CardProps = {
  children: ReactNode;
};
function Card({ children }: CardProps) {
  const cardStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    backgroundColor: "#f9f9f9",
  };
  return <div style={cardStyle}>{children}</div>;
}

export default function CardList() {
  return (
    <div>
      <h1>합성 예제</h1>
      <Card>
        <h2>Card 1</h2>
        <p>This is the first card content.</p>
      </Card>
      <Card>
        <h2>Card 2</h2>
        <p>This is the second card content.</p>
        <button>Click me</button>
      </Card>
      <Card>
        <h2>Card 3</h2>
        <img src="https://placehold.co/100" alt="Placeholder" />
        <p></p>
        <button>매도</button>
        <button>매수</button>
      </Card>
    </div>
  );
}

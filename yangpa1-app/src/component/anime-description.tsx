"use client";

import { useState } from "react";
import style from "./page.module.css"; // 필요 시 스타일 연결

interface Props {
  initialText: string;
}

export default function AnimeDescription({ initialText }: Props) {
  const [text, setText] = useState(initialText);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);

  const handleTranslate = async () => {
    if (isTranslating || isTranslated) return;

    setIsTranslating(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: initialText, target: "ko" }),
      });

      if (!response.ok) throw new Error("번역 실패");

      const data = await response.json();

      // 구글 번역 API는 HTML 엔티티(&#39;, &quot; 등)를 반환할 수 있으므로 화면 출력 시 가공 필요
      const decodedText = data.translatedText
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');

      setText(decodedText);
      setIsTranslated(true);
    } catch (err) {
      alert("번역 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className={style.description_box}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <h3>줄거리</h3> */}
        <button
          onClick={handleTranslate}
          disabled={isTranslating || isTranslated}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            cursor: isTranslated ? "default" : "pointer",
            backgroundColor: isTranslated ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {isTranslating
            ? "번역 중..."
            : isTranslated
              ? "번역 완료"
              : "한국어로 번역"}
        </button>
      </div>
      <p className={style.description}>
        {text || "등록된 상세 설명 텍스트가 없습니다."}
      </p>
    </div>
  );
}

// src/app/api/translate/route.ts 수정
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text, target = "ko" } = await request.json();
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      console.error("❌ 에러: GOOGLE_TRANSLATE_API_KEY 환경변수가 없습니다.");
      return NextResponse.json(
        { error: "환경변수 설정 오류" },
        { status: 500 },
      );
    }

    const url = `https://googleapis.com{apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, target: target }),
    });
    console.log(response);
    const data = await response.json();

    if (!response.ok) {
      // 🛠️ 구글이 보낸 원본 에러를 터미널에 상세히 출력합니다.
      console.error(
        "❌ 구글 API 반환 에러 상세:",
        JSON.stringify(data, null, 2),
      );
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json({
      translatedText: data.data.translations[0].translatedText,
    });
  } catch (error) {
    console.error("❌ 서버 내부 에러:", error);
    return NextResponse.json({ error: "서버 내부 에러" }, { status: 500 });
  }
}

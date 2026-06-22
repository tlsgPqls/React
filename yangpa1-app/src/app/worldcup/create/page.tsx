"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./create.module.css";

interface ItemInput {
  name: string;
  imageUrl: string;
}

export default function CreateWorldcupPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // 기본적으로 후보 2명을 입력할 수 있도록 초기화
  const [items, setItems] = useState<ItemInput[]>([
    { name: "", imageUrl: "" },
    { name: "", imageUrl: "" },
  ]);

  // 후보 입력 필드 변경 핸들러
  const handleItemChange = (
    index: number,
    field: keyof ItemInput,
    value: string,
  ) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // 후보 추가 버튼
  const handleAddItem = () => {
    setItems([...items, { name: "", imageUrl: "" }]);
  };

  // 후보 삭제 버튼
  const handleRemoveItem = (index: number) => {
    if (items.length <= 2) {
      alert("이상형 월드컵을 만들려면 최소 2명의 후보가 필요합니다.");
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  // 폼 제출 (백엔드 API 호출)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("월드컵 제목을 입력해 주세요.");
      return;
    }

    // 빈 값이 있는 후보 필터링
    const validItems = items.filter(
      (item) => item.name.trim() && item.imageUrl.trim(),
    );
    if (validItems.length < 2) {
      alert(
        "이름과 이미지 URL이 올바르게 입력된 후보가 최소 2명 이상 필요합니다.",
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/worldcup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          items: validItems,
        }),
      });

      if (response.ok) {
        alert("🎉 나만의 이상형 월드컵이 성공적으로 개설되었습니다!");
        router.push("/worldcup"); // 생성 후 월드컵 목록 홈으로 이동
      } else {
        alert("월드컵 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("생성 에러:", error);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.mainTitle}>🛠️ 나만의 이상형 월드컵 만들기</h1>

      <form onSubmit={handleSubmit} className={style.form}>
        {/* 월드컵 기본 정보 */}
        <div className={style.section}>
          <label className={style.label}>월드컵 제목</label>
          <input
            type="text"
            className={style.input}
            placeholder="예: 2026 최고의 애니메이션 월드컵"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className={style.label}>월드컵 설명</label>
          <textarea
            className={style.textarea}
            placeholder="어떤 월드컵인지 간단하게 소개해 주세요."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* 월드컵 후보 등록 구역 */}
        <div className={style.section}>
          <h2 className={style.sectionTitle}>
            👤 후보 등록 ({items.length}명)
          </h2>

          <div className={style.itemList}>
            {items.map((item, index) => (
              <div key={index} className={style.itemRow}>
                <span className={style.itemBadge}>{index + 1}</span>

                <div className={style.itemInputs}>
                  <input
                    type="text"
                    className={style.input}
                    placeholder="후보 이름 (예: 고죠 사토루)"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className={style.input}
                    placeholder="이미지 절대 경로 주소 (URL)"
                    value={item.imageUrl}
                    onChange={(e) =>
                      handleItemChange(index, "imageUrl", e.target.value)
                    }
                  />
                </div>

                {/* 이미지 미리보기 */}
                <div className={style.previewBox}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="미리보기"
                      className={style.previewImg}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://picsum.photos";
                      }}
                    />
                  ) : (
                    <div className={style.noPreview}>No Image</div>
                  )}
                </div>

                <button
                  type="button"
                  className={style.removeBtn}
                  onClick={() => handleRemoveItem(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={style.addBtn}
            onClick={handleAddItem}
          >
            ➕ 후보 추가하기
          </button>
        </div>

        {/* 하단 제어 버튼 */}
        <div className={style.buttonGroup}>
          <button
            type="button"
            className={style.cancelBtn}
            onClick={() => router.push("/worldcup")}
          >
            취소
          </button>
          <button type="submit" className={style.submitBtn}>
            🚀 월드컵 개설하기
          </button>
        </div>
      </form>
    </div>
  );
}

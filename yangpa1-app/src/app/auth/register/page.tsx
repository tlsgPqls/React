"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from "./register.module.css"; // 💡 전용 스타일 시트 로드

export default function RegisterPage() {
  const router = useRouter();

  // 1. RegisterDto 양식에 맞춘 입력 데이터 상태 관리
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN"); // 기본 ADMIN고정

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 2. 가입하기 버튼 클릭 시 실행할 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      // 💡 백엔드의 AuthController @Post('register') 엔드포인트 호출
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
          role,
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        // 3. 🔄 가입 성공 후 사용자를 방금 고친 로그인 화면으로 리다이렉트
        router.push("/auth/login");
      } else {
        // 백엔드에서 에러를 뱉었을 때 (예: "이미 가입된 이메일 주소입니다.")
        setErrorMsg(
          resData.message ||
            "회원가입에 실패했습니다. 입력 항목을 확인해 주세요.",
        );
      }
    } catch (error) {
      console.error("회원가입 요청 중 에러 발생:", error);
      setErrorMsg("서버와 통신할 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.register_container}>
      <div className={style.register_box}>
        <h2 className={style.register_title}>🌱 애니대백과 회원가입</h2>
        <p className={style.register_subtitle}>
          새로운 계정을 생성하고 다양한 혜택을 누려보세요.
        </p>

        {/* 에러 발생 시 안내 배너 */}
        {errorMsg && <div className={style.error_banner}>⚠️ {errorMsg}</div>}

        <form onSubmit={handleSubmit} className={style.register_form}>
          {/* 이메일 입력 */}
          <div className={style.input_group}>
            <label htmlFor="email">이메일 주소</label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 이름(닉네임) 입력 */}
          <div className={style.input_group}>
            <label htmlFor="name">이름 (닉네임)</label>
            <input
              id="name"
              type="text"
              placeholder="행복한 유저"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className={style.input_group}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 역할(Role) 선택 영역 - ADMIN/USER */}
          <div className={style.input_group}>
            <label>이용자 유형 선택</label>
            <div className={style.role_selector}>
              <label className={role === "ADMIN" ? style.active_role : ""}>
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={role === "ADMIN"}
                  onChange={(e) => setRole(e.target.value)}
                />
                관리자 계정 (ADMIN)
              </label>
              <label className={role === "USER" ? style.active_role : ""}>
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={role === "USER"}
                  onChange={(e) => setRole(e.target.value)}
                />
                일반 유저 (USER)
              </label>
            </div>
          </div>

          {/* 회원가입 완료 버튼 */}
          <button
            type="submit"
            className={style.submit_btn}
            disabled={isLoading}
          >
            {isLoading ? "가입 요청 중..." : "✨ 회원가입 완료"}
          </button>
        </form>

        <div className={style.form_footer}>
          <span>이미 계정이 있으신가요?</span>
          <Link href="/auth/login" className={style.login_link}>
            로그인 하러가기
          </Link>
        </div>
      </div>
    </div>
  );
}

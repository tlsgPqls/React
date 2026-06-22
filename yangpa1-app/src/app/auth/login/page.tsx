"use client"; // 💡 입력 값(State) 관리와 fetch 전송을 위해 클라이언트 컴포넌트로 지정

import { useState } from "react";
import { useRouter } from "next/navigation"; // 💡 로그인 성공 후 메인으로 이동하기 위함
import Link from "next/link";
import style from "./login.module.css"; // 💡 로그인 전용 CSS 스타일 적용 가능

export default function LoginPage() {
  const router = useRouter();

  // 1. 사용자가 입력한 이메일과 비밀번호를 담을 공간(State)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 에러 메시지 및 로딩 상태 관리
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 2. 로그인 버튼을 눌렀을 때 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작(새로고침) 차단
    setErrorMsg("");
    setIsLoading(true);

    try {
      console.log("00000");
      // 💡 본인의 NestJS 백엔드 로그인 엔드포인트 주소로 수정하세요
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      // console.log(11, response);
      console.log("111111", response);

      const resData = await response.json();
      console.log(resData);
      if (response.ok) {
        // 3. 🔑 로그인 성공 시 백엔드가 준 accessToken을 브라우저 보관함에 저장
        // 백엔드 데이터 구조가 { data: { accessToken: "..." } } 형태일 때:
        localStorage.setItem("accessToken", resData.access_token);
        window.location.href = "/";
        if (resData && resData.data && resData.access_token) {
          localStorage.setItem("accessToken", resData.access_token);
          if (resData.user) {
            localStorage.setItem("user_info", JSON.stringify(resData.user));
          }
          alert("로그인에 성공했습니다!");
          // 4. 🔄 메인 화면('/')으로 이동 -> 이동 후 분리된 Header 컴포넌트가 이 토큰을 감지해 프로필로 바뀝니다.
          window.dispatchEvent(new Event("auth-change"));
          router.push("/");
          router.refresh(); // 헤더의 useEffect를 다시 구동하기 위해 화면 새로고침 유도
        }
      } else {
        // 백엔드에서 에러 응답을 준 경우 (예: "비밀번호가 틀렸습니다.")
        setErrorMsg(resData.message || "이메일 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 요청 중 에러 발생:", error);
      setErrorMsg("서버와의 연결이 원활하지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.login_container}>
      <div className={style.login_box}>
        <h2 className={style.login_title}>🙈 애니대백과 로그인</h2>
        <p className={style.login_subtitle}>
          서비스를 이용하려면 로그인을 진행해주세요.
        </p>

        {/* 💡 에러 발생 시 사용자에게 경고 메시지 노출 */}
        {errorMsg && <div className={style.error_banner}>⚠️ {errorMsg}</div>}

        <form onSubmit={handleSubmit} className={style.login_form}>
          {/* 이메일 입력 영역 */}
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

          {/* 비밀번호 입력 영역 */}
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

          {/* 로그인 제출 버튼 */}
          <button
            type="submit"
            className={style.submit_btn}
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "🔑 로그인"}
          </button>
        </form>

        {/* 간단한 회원가입 안내 가이드 */}
        <div className={style.form_footer}>
          <span>아직 회원이 아니신가요?</span>
          {/* 💡 href 주소를 /signup에서 /auth/register로 변경합니다 */}
          <Link href="/auth/register" className={style.signup_link}>
            회원가입 하러가기
          </Link>
        </div>
      </div>
    </div>
  );
}

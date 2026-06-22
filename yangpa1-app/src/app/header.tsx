"use client";

import { useState, useEffect, useRef } from "react"; // 💡 useRef 추가
import Link from "next/link";
import style from "./layout.module.css";
import { useRouter } from "next/navigation"; // 💡 App Router 규칙에 맞는 올바른 router 임포트로 교정

interface ProfileImage {
  id: number;
  userId: number;
  storedName: string;
  url: string;
}

interface AuthUser {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  profileImage?: ProfileImage | null; // 💡 백엔드가 include로 조인해서 보내줄 이미지 테이블 구조 선언
}

export default function Header() {
  const router = useRouter(); // 💡 useRouter 초기화
  const fileInputRef = useRef<HTMLInputElement>(null); // 💡 숨겨진 파일창을 제어할 고리(Ref) 생성

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false); // 💡 업로드 상태 제어용

  // 1. 프로필 이미지 클릭 시 실행될 함수
  const handleImageClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click(); // 💡 숨겨둔 파일 선택창을 강제로 클릭
    }
  };

  // 2. 사진을 선택하는 순간 백엔드 전용 API로 파일 전송
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const targetFile = files[0];
    setIsUploading(true);

    const formData = new FormData();
    // 💡 백엔드 UserController의 FileInterceptor('image') 이름과 일치화
    formData.append("image", targetFile);

    try {
      const token = localStorage.getItem("accessToken");

      // 💡 진짜 백엔드 주소인 3000번 포트로 파일 업로드 발송
      const response = await fetch("http://localhost:3001/user/profile/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰 동봉
        },
        body: formData, // 파일이 든 그릇 전송
      });

      const resData = await response.json();

      if (response.ok) {
        alert("프로필 이미지가 성공적으로 변경되었습니다! ✨");

        // 💡 백엔드 서비스(addProfileImage)가 리턴하는 { url: "..." } 양식에 맞춰 화면 실시간 리플래시
        if (resData && resData.url && user) {
          setUser({
            ...user,
            profileImage: {
              ...user.profileImage,
              id: user.profileImage?.id || 0,
              userId: user.id,
              storedName: user.profileImage?.storedName || "",
              url: resData.url, // 💡 바뀐 새 주소로 덮어쓰기
            },
          });
        }
      } else {
        alert(resData.message || "이미지 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류:", error);
      alert("서버와 통신할 수 없습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      // 💡 백엔드 진짜 포트인 3000번으로 로그아웃 신호 전송
      await fetch("http://localhost:3001/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("서버 로그아웃 요청 실패:", error);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      window.dispatchEvent(new Event("auth-change"));
      router.push("/");
    }
  };

  // 내 정보 조회
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setIsLoading(false);
          return;
        }

        // 💡 백엔드 진짜 포트인 3000번으로 내 정보 API 호출
        const response = await fetch("http://localhost:3001/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const resData = await response.json();
          // 백엔드가 include 구문으로 합쳐 보낸 유저와 ProfileImage 묶음 데이터 적재
          if (resData && resData.data) {
            setUser(resData.data);
          }
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className={style.header}>
      <div className={style.header_content}>
        {/* 왼쪽: 타이틀 로고 */}
        <Link href="/" className={style.title}>
          🙈 애니대백과
        </Link>

        {/* 오른쪽: 유저 정보 및 로그인 구역 */}
        <div className={style.user_zone}>
          {isLoading ? (
            <span className={style.username}>인증 중...</span>
          ) : user ? (
            <div
              className={style.profile_container}
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              {/* 유저 구역 컴포넌트 */}
              <div
                className={style.profile_wrapper}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {/* 💡 이미지에 클릭 이벤트 연결 및 마우스 커서 포인터 부여 */}
                <img
                  /* 💡 조인된 profileImage.url 정보가 있으면 사용하고, 없으면 픽섬 고유 매칭 주소 출력 */
                  src={
                    user.profileImage?.url ||
                    `https://picsum.photos{user.id}/100`
                  }
                  alt="사용자 프로필"
                  className={`${style.profile_image} ${isUploading ? style.image_loading : ""}`}
                  onClick={handleImageClick} // 👈 클릭 시 파일선택창 열기
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  title="클릭하여 프로필 이미지 변경"
                />

                {/* 💡 실제 숨겨져 있는 파일 업로드 선택 인풋창 */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange} // 👈 명칭 통일 완료
                  accept="image/*"
                  style={{ display: "none" }}
                />

                <Link
                  href="/profile"
                  className={style.user_info_link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className={style.username}>
                    {user.email.split("@")[0]}님 ({user.role})
                    <span
                      className={style.role_badge}
                      style={{ marginLeft: "5px" }}
                    >
                      {user.role === "ADMIN" ? "👑 관리자" : "👤 일반"}
                    </span>
                  </span>
                </Link>
              </div>

              <button onClick={handleLogout} className={style.logout_btn}>
                🚪 로그아웃
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className={style.login_btn}>
              🔒 로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";

type GreetingProps = {
  isLoggedIn: boolean;
};
function UserGreeting() {
  return <h1>다시 오셨군요!</h1>;
}
function GuestGreeting() {
  return <h1>회원가입 해주세요.</h1>;
}
function Greeting({ isLoggedIn }: GreetingProps) {
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
}
type ButtonProps = {
  onClick: () => void;
};
function LoginButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}> 로그인 </button>;
}
function LogoutButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}>로그아웃</button>;
}
export default function LoginControl() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <LogoutButton onClick={handleLogoutClick} />
      ) : (
        <LoginButton onClick={handleLoginClick} />
      )}
    </div>
  );
}

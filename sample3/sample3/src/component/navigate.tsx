import { useState } from "react";
import type { Member } from "./member";
import MemberCard from "./MemberCard";

interface NavigationProps {
  index: number;
  onChangeIndex: (newIndex: number) => void;
}
function Navigation({ index, onChangeIndex }: NavigationProps) {
  const handleNext = () => {
    onChangeIndex(index + 1);
  };
  const handlePrev = () => {
    onChangeIndex(index - 1);
  };
  return (
    <div className="button-container">
      <button className="nav" onClick={handlePrev}>
        {" "}
        -이전
      </button>
      <button className="nav" onClick={handleNext}>
        {" "}
        다음-
      </button>
    </div>
  );
}
interface jotaroProps {
  members: Member[];
}
export default function JOJO({ members }: jotaroProps) {
  const [index, setIndex] = useState<number>(0);
  const changeIndex = (newIndex: number): void => {
    const len = members.length;
    setIndex((newIndex + len) % len);
  };
  return (
    <div className="member-container">
      <MemberCard member={members[index]} />
      <Navigation index={index} onChangeIndex={changeIndex} />
    </div>
  );
}

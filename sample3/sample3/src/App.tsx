import JOJO from "./component/navigate.tsx";
import type { Member } from "./component/member.ts";
import MemberCard from "./component/MemberCard.tsx";
import React from "react";
import "./component/Jotaro.css";
const members: Member[] = [
  { image: "image/jotaro.png", nick: "jotaro" },
  { image: "image/jotaro1.png", nick: "jotaro1" },
  { image: "image/jotaro2.png", nick: "jotaro2" },
  { image: "image/jotaro3.png", nick: "jotaro3" },
  { image: "image/jotaro4.png", nick: "jotaro4" },
];

function App() {
  return (
    <>
      {/* <MemberCard member={members[0]}></MemberCard>
      <MemberCard member={members[1]}></MemberCard>
      <MemberCard member={members[2]}></MemberCard>
      <MemberCard member={members[3]}></MemberCard>
      <MemberCard member={members[4]}></MemberCard> */}
      {/* <JOJO members={members} /> */}
      <div>
        {members.map((member) => (
          <React.Fragment key={member.nick}>
            <MemberCard member={member}></MemberCard>
          </React.Fragment>
        ))}
      </div>{" "}
      /* membercard 복사 붙여넣기 할 필요가 없음 */
    </>
  );
}
export default App;

import type { Member } from "./member";
import "./MemberCard.css";
interface MemberCardProps {
  member: Member;
}
function MemberCard({ member }: MemberCardProps) {
  const { image, nick } = member;
  return (
    <div className="member-card">
      <img src={image} alt={nick} className="photo" />
      <h2 className="nick">{nick}</h2>
      <p className="team">Jotaro</p>
    </div>
  );
}
export default MemberCard;

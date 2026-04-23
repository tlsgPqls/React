import type { Member } from "./member";
import "./MemberCard.css";
interface MemberCardProps {
  member: Member;
}
function MemberCard({ member }: MemberCardProps) {
  const { image, nick, author } = member;
  return (
    <div className="member-card">
      <img src={image} alt={nick} className="photo" />
      <h2 className="nick">{nick}</h2>
      <h3 className="author">{author}</h3>
      <p className="team">react</p>
    </div>
  );
}
export default MemberCard;

interface WelcomeProps {
  name: string;
}
function Welcome(props: WelcomeProps) {
  return (
    <>
      <h1>안녕 {props.name}</h1>
    </>
  );
}
export default Welcome;

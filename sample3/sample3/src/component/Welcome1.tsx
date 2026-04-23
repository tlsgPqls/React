interface WelcomePropss {
  name: string;
  job: string;
  stand: string;
}
function Welcome11(props: WelcomePropss) {
  return (
    <>
      <h1>
        내 이름은, {props.name}내 직업은, {props.job}
        나의 스탠드... {props.stand} 이다!!!
      </h1>
    </>
  );
}
export default Welcome11;

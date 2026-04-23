interface SayHelloprops {
  myName: string;
  to: string;
}
export default function SayHello(props: SayHelloprops) {
  return (
    <>
      <p> 안녕하세요 {props.myName}</p>
      <p> Hello {props.to}! </p>
    </>
  );
}

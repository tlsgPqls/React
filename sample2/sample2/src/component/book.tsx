import React from "react";

interface BookProps {
  title: string;
  author: string;
}
function Book(props: BookProps) {
  return (
    <>
      <h1>이 책의 이름은 {props.title} 입니다</h1>
      <h2>이 책의 저자는 {props.author} 입니다</h2>
    </>
  );
}
export default Book;

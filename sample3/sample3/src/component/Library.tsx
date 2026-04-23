import React from "react";
import Book from "./book";
function Library() {
  return (
    <>
      <Book title="한입 크기로 잘라먹는 리액트" author="이정환" />
      <Book title="처음 배우는 애저" author="김도균" />
      <Book title="Node.js 교과서" author="조현영" />
    </>
  );
}
export default Library;

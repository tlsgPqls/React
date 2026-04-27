let hooks: any[] = [];
let currentIndex = 0;
function useState(initialValue: any) {
  const index = currentIndex;
  if (hooks[index] === undefined) {
    hooks[index] = initialValue;
  }
  function setState(newValue: any) {
    hooks[index] = newValue;
    render(); // 다시 렌더링
  }
  currentIndex++;
  return [hooks[index], setState];
}
function render() {
  currentIndex = 0; // 중요! 렌더링 시작 시 인덱스를 초기화해야 함
  console.log("새로고침(렌더링) 중...");
  // 여기에 실제 App()을 호출하거나 DOM을 업데이트하는 로직이 들어갑니다.
}

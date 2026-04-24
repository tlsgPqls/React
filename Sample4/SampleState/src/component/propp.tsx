import { Component } from "react";
type Props = {
  init: number;
};
type State = {
  count: number;
};
export default class ClassCounter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: props.init,
    };
  }
  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  render() {
    return (
      <div>
        <h1>클릭 카운터</h1>
        <p>현재 클릭 수: {this.state.count}</p>
        <button onClick={this.handleClick}>클릭하세요</button>
      </div>
    );
  }
}

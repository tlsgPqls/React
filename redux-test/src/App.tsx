import "./App.css";
import Display from "./Display";
import CounterA from "./CounterA";
import CounterB from "./CounterB";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  return (
    <Provider store={store}>
      <Display />
      <CounterA />
      <CounterB />
    </Provider>
  );
}

export default App;

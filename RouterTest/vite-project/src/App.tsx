import "./App.css";
import App1, {
  Header,
  Main,
  Product,
  NotFound,
  StateForm,
  StateFormUC,
} from "./components";
import {
  BrowserRouter,
  Routes,
  Route,
  UNSAFE_createRouter,
  Outlet,
} from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardList from "./Node";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "product/:id", element: <Product /> },
    ],
  },
  {
    path: "/product/*",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "product/*", element: <Product /> },
    ],
  },
  {
    path: "*",
    element: (
      <>
        {" "}
        <Header />
        <NotFound />{" "}
      </>
    ),
  },
]);
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <BrowserRouter>
        <header>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </header>
        <Header />
      </BrowserRouter>
      <App1 />
      <StateForm />
      <StateFormUC />
      <CardList />
    </div>
  );
}
export default App;

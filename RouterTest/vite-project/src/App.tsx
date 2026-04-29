import "./App.css";
import { Header, Main, Product, NotFound } from "./components";
import {
  BrowserRouter,
  Routes,
  Route,
  UNSAFE_createRouter,
  Outlet,
} from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "product/*", element: <Product /> },
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
    </div>
  );
}
export default App;

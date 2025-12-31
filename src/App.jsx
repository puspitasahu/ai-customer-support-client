import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./componenets/layout/RootLayout";
import Home from "./componenets/home/Home";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // <Route path="/" element ={<RootLayout/>}>
      <Route path="/" element={<Home />}>
        <Route index element={<div>Home Page</div>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

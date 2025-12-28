import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom"
import RootLayout from "./componenets/layout/RootLayout";
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element ={<RootLayout/>}>
       <Route index element ={<div>Home Page</div>}/>       
      </Route>
    )
  );
   return <RouterProvider router ={router}/>
    
}

export default App

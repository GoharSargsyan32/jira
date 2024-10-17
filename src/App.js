import { useState } from "react";
import {Login, Register} from "./pages/auth";
import Header from "./components/global/Header";
// import Register from "./pages/register";
import "./styles/global.css";
// import Login from "./pages/login";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./components/Layouts/Main";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
          <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login/>} />
          <Route path={ROUTE_CONSTANTS.REGISTER} element={<Register/>} />

      </Route>))}
    />
  );
};

export default App;

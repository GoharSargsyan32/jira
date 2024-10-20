import { useState, useEffect } from "react";
import { Login, Register } from "./pages/auth";
import LoadingWrapper from "./components/share/LoadingWrapper";
import MainLayout from "./components/Layouts/Main";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Cabinet from "./pages/cabinet";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import "./styles/global.css";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContex } from "./Context/authContextProvider";


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setIsAuth(Boolean(user));
    });
  }, []);
  return (
    <AuthContex.Provider value={{isAuth, x:10}}>
      <LoadingWrapper>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
              <Route
                path={ROUTE_CONSTANTS.LOGIN}
                element={
                  isAuth ? (
                    <Navigate to={ROUTE_CONSTANTS.CABINET} />
                  ) : (
                    <Login setIsAuth={setIsAuth} />
                  )
                }
              />
              <Route
                path={ROUTE_CONSTANTS.REGISTER}
                element={
                  isAuth ? (
                    <Navigate to={ROUTE_CONSTANTS.CABINET} />
                  ) : (
                    <Register />
                  )
                }
              />
              <Route
                path={ROUTE_CONSTANTS.CABINET}
                element={
                  isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />
                }
              />
            </Route>
          )
        )}
      />
    </LoadingWrapper>
    </AuthContex.Provider>
    
  );
};

export default App;

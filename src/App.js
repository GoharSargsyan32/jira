import { useState, useEffect, useCallback } from "react";
import { Login, Register } from "./pages/auth";
import LoadingWrapper from "./components/share/LoadingWrapper";
import Profile from "./pages/profile";
import MainLayout from "./components/Layouts/Main";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
// import Cabinet from "./pages/cabinet";
import { ROUTE_CONSTANTS, FIRESTORE_PATH_NAMES } from "./core/utils/constants";
import "./styles/global.css";
import { auth, db } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContex } from "./Context/authContextProvider";
import { getDoc, doc } from "firebase/firestore";
import CabinetLayout from "./components/Layouts/Cabinet";


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState({}); 


const handleGetUserData = useCallback(async(uid)=>{
  const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);  
  const response = await getDoc(docRef);

  
  if(response.exists()) {
        setUserProfileInfo(response.data());
      }
     } , []);


   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user?.uid && handleGetUserData(user.uid);
      setLoading(false);
      setIsAuth(Boolean(user));
    });
  }, []);


  return (
    <AuthContex.Provider value={{ isAuth, userProfileInfo, handleGetUserData }}>
      <LoadingWrapper loading={loading}>
        <RouterProvider
           router={
            createBrowserRouter(
              createRoutesFromElements(
                <Route path="/" element={<MainLayout/>}>
                  <Route path={ROUTE_CONSTANTS.LOGIN}
                         element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth}/>}/>
                  <Route path={ROUTE_CONSTANTS.REGISTER}
                         element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register/>}/>


                  {/*  Cabinet Layout Route  */}
                  <Route
                    path={ROUTE_CONSTANTS.CABINET}
                    element={isAuth ?  <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}
                  >
                    <Route
                      path={ROUTE_CONSTANTS.PROFILE}
                      element={<Profile/>}
                    />

                  </Route>
                </Route>
              )
            )
          }
        />
      </LoadingWrapper>
    </AuthContex.Provider>
  );
};

export default App;

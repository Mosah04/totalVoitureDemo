import { Navigate, Outlet, useNavigate, Route, Routes } from "react-router-dom";
import { logOut, userInfosCompleted } from "./config/auth";
import { useAuth } from "./contexts/authContext";
import SideBar from "./components/SideBar";
import { useLayoutContext } from "./contexts/layoutContext";
import NavBar from "./components/NavBar";
import { useEffect } from "react";

const App = () => {
  const { sideVisible } = useLayoutContext();
  const { currentUser, setCurrentUserDB } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    userInfosCompleted(currentUser)
      .then(([user, infosAreCompleted, missingInfos]) => {
        if (!infosAreCompleted) {
          navigate("/tellUsMore", { state: missingInfos, replace: true });
        }
        if (user) setCurrentUserDB(user);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la complétion des informations utilisateur :",
          error
        );
      });
  }, [currentUser]);

  if (!currentUser) return <Navigate to={"/login"} replace={true} />;

  // console.log(currentUser);
  return (
    <main className="flex bg-background min-w-screen h-full font-dm-sans text-font-normal">
      <SideBar
        signOutFunc={() => {
          // setLoggedIn(false);
          try {
            logOut().then(() => navigate("/login"));
          } catch (error) {
            console.log(error);
          }
        }}
        userName={currentUser.displayName}
        userAvatarURL={currentUser.photoURL}
      />
      <div
        className={`w-full min-h-screen transition-margin p-6 duration-300 space-y-8 ${
          sideVisible ? "md:ml-72" : ""
        }`}
      >
        <NavBar userAvatar={currentUser.photoURL} />
        <div className="w-full">
          <Routes>
            <Route index element={<div>AZDDDDDDD</div>} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;

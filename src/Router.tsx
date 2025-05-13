import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/layout/MainLayout";

const Router = () => {
  //   const AuthenticateRoute = ({
  //     isAuthenticated: boolean,
  //   }: {
  //     isAuthenticated: boolean;
  //   }) => {
  //     const token = sessionStorage.getItem("accessToken");

  //     if (isAuthenticated) {
  //       return token ? <Outlet /> : <Navigate to={"/login"} />;
  //     } else {
  //       return token ? <Navigate to={"/"} /> : <Outlet />;
  //     }
  //   };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;

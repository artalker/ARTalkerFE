import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/layout/MainLayout';
import Talk from './pages/Talk';
import Login from './pages/Login';
import TalkList from './pages/TalkList';
import Tip from './pages/Tip';
import MyPage from './pages/MyPage';
import Service from './pages/Service';

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
      <Route path='login' element={<Login />} />
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='talkList' element={<TalkList />} />
        <Route path='tip' element={<Tip />} />
        <Route path='mypage' element={<MyPage />} />
        <Route path='service' element={<Service />} />
      </Route>
      <Route path='talk/:id' element={<Talk />} />
    </Routes>
  );
};

export default Router;

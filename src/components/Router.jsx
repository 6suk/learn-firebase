import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import { useSelector } from 'react-redux';
import Nav from 'components/Nav';
import Profile from 'routes/Profile';

const AppRouter = () => {
  const { isLogin } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {isLogin && <Nav />}
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

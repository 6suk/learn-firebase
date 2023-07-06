import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import { useSelector } from 'react-redux';
import Nav from 'components/Nav';
import Profile from 'routes/Profile';

const AppRouter = ({ refreshUser }) => {
  const { user } = useSelector((state) => state.user);
  const isLogin = Boolean(user);

  return (
    <BrowserRouter>
      {isLogin && <Nav />}
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile refreshUser={refreshUser} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const { isLogin } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>{isLogin ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}</Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

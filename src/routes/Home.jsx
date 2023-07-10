import HomeTab from 'components/Hometab';
import Post from 'components/Post';
import { Outlet, useLocation } from 'react-router-dom';

const Home = () => {
  const { pathname } = useLocation();
  const isMain = pathname === '/';

  return (
    <div className="container">
      <HomeTab />
      {isMain ? <Post /> : <Outlet />}
    </div>
  );
};

export default Home;

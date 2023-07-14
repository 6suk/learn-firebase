import HomeTab from 'components/Hometab';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <HomeTab />
      <Outlet />
    </div>
  );
};

export default Home;

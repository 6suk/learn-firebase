import Nav from 'components/Nav';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import { styled } from 'styled-components';
import Post from './Post/Post';
import HomeTab from './Hometab';

const AppRouter = ({ refreshUser }) => {
  const { user, isLogin } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Nav />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/post/:type" element={<Post />} />
              <Route path="/profile" element={<Profile refreshUser={refreshUser} />} />
            </Route>
            <Route path="/login" element={<Auth isLogin={isLogin} />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Container>
    </>
  );
};

const Container = styled.section`
  width: 100%;
  max-width: 890px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-block: 5rem;
  gap: 3rem;
`;

export default AppRouter;

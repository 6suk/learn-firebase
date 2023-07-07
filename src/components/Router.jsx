import Nav from 'components/Nav';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import { styled } from 'styled-components';
import Post from './Post';

const AppRouter = ({ refreshUser }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user && <Nav />}
      <Container>
        <AnimatePresence>
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Home />}>
                  <Route path="/post/:type" element={<Post />} />
                  <Route path="/profile" element={<Profile refreshUser={refreshUser} />} />
                </Route>
              </>
            ) : (
              <Route path="/" element={<Auth />} />
            )}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Container>
    </>
  );
};

const Container = styled.section`
  max-width: 890px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

export default AppRouter;

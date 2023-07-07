import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import { useSelector } from 'react-redux';
import Nav from 'components/Nav';
import Profile from 'routes/Profile';
import { keyframes, styled } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

const AppRouter = ({ refreshUser }) => {
  const { user } = useSelector((state) => state.user);
  const isLogin = Boolean(user);

  return (
    <BrowserRouter>
      {isLogin && <Nav />}

      <Container>
        <AnimatePresence>
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
        </AnimatePresence>
      </Container>
    </BrowserRouter>
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

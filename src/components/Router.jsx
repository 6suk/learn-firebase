import Nav from 'components/Nav';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import { styled } from 'styled-components';
import PostList from './Post/PostList';
import UserPostList from './Post/UserPostList';

const AppRouter = () => {
  const Layout = lazy(() => import('routes/Layout'));
  const Post = lazy(() => import('components/Post/Post'));
  const Auth = lazy(() => import('routes/Auth'));

  return (
    <>
      <Container>
        <Nav />
        <AnimatePresence>
          <Suspense fallback={<div className="loading">loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Post />} />
                <Route path="/post/:type" element={<Post />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/login" element={<Auth />} />
              <Route path="*" element={<Layout />} />
            </Routes>
          </Suspense>
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

import HomeTab from 'components/Hometab';
import Post from 'components/Post';
import { POST_COLLECTION } from 'fbase';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { setPostList } from 'slice/post';
import { setMyPostList } from 'slice/user';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const isMain = pathname === '/';

  // Read (실시간 post 가져오기)
  useEffect(() => {
    // 전체 리스트
    const allQuery = query(POST_COLLECTION, orderBy('date', 'desc'));
    onSnapshot(allQuery, (querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setPostList(arr));
    });
    if (user) {
      // 내가 작성한 게시물 리스트
      const myQuery = query(POST_COLLECTION, where('uid', '==', user.uid), orderBy('date', 'desc'));
      onSnapshot(myQuery, (snapshop) => {
        const arr = snapshop.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setMyPostList(arr));
      });
    }
  }, []);

  return (
    <div className="container">
      <HomeTab />
      {isMain ? <Post /> : <Outlet />}
    </div>
  );
};

export default Home;

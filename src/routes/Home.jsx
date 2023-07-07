import CreatePost from 'components/CreatePost';
import Post from 'components/Post';
import { POST_COLLECTION } from 'fbase';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';
import { setMyPostList } from 'slice/user';
import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const {
    postList: { data: postList },
    user: { user, myPostList },
  } = useSelector((state) => state);
  const [tab, setTab] = useState(0);
  const [fade, setFade] = useState('');
  const tabContent = [
    {
      id: 0,
      title: '전체',
      content: postList,
    },
    {
      id: 1,
      title: '내가 작성한 게시물',
      content: myPostList,
    },
  ];

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

    // 내가 작성한 게시물 리스트
    const myQuery = query(POST_COLLECTION, where('uid', '==', user.uid), orderBy('date', 'desc'));
    onSnapshot(myQuery, (snapshop) => {
      const arr = snapshop.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setMyPostList(arr));
    });

    setFade('end');
    return () => {
      setFade('');
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade('');
    };
  }, [tab]);

  const curPostList = tabContent[tab].content;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container">
      {user && (
        <nav>
          <ul className="hometab">
            {tabContent.map((tb) => (
              <li onClick={() => setTab(tb.id)} key={tb.id} className={tab === tb.id && 'on'}>
                {tb.title}
              </li>
            ))}
          </ul>
        </nav>
      )}
      <CreatePost />
      <ul style={{ marginTop: 30 }} className={`start ${fade}`}>
        {curPostList.map((post) => (
          <Post post={post} key={post.id} isOwner={user.uid === post.uid} tab={tab} />
        ))}
      </ul>
    </motion.div>
  );
};
export default Home;

import { collection, addDoc, getDoc, getDocs, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from 'fbase';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';
import Post from 'components/Post';

const Home = () => {
  const COLLECTION_NAME = 'nweets';
  const dispatch = useDispatch();
  const {
    postList: { data: postList },
    user: { isLogin, user },
  } = useSelector((state) => state);
  const [post, setPost] = useState('');

  // Read (실시간 가져오기)
  useEffect(() => {
    // 등록된 시간별 정렬 쿼리
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setPostList(arr));
    });
  }, []);

  // Read (1번 가져오기)
  const getPostList = async () => {
    const docs = await getDocs(collection(db, COLLECTION_NAME));
    const arr = [];
    docs.forEach((doc) => {
      const postObj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(postObj);
    });
    dispatch(setPostList(arr));
  };

  // Create
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        date: Date.now(),
        post,
        uid: user.uid,
      });
      setPost('');
    } catch (error) {
      console.log(error.messege);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setPost(value);
  };

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input type="text" name="" id="" placeholder="내용 작성" maxLength={120} onChange={onChange} value={post} />
        <input type="submit" value="Nweet" />
      </form>

      <ul>
        {postList.map((post) => (
          <Post post={post} key={post.id} isOwner={user.uid === post.uid} />
        ))}
      </ul>
    </>
  );
};
export default Home;

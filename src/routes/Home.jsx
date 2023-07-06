import { collection, addDoc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from 'fbase';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';

const Home = () => {
  const COLLECTION_NAME = 'nweets';
  const dispatch = useDispatch();
  const {
    postList: { data: postList },
    user: { isLogin, user },
  } = useSelector((state) => state);
  const [post, setPost] = useState('');

  useEffect(() => {
    onSnapshot(collection(db, COLLECTION_NAME), (querySnapshot) => {
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
          <li key={post.id}>
            <h4>{post.post}</h4>
            <p>{post.date}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Home;

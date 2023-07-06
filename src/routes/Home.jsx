import { collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from 'fbase';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';

const Home = () => {
  const COLLECTION_NAME = 'nweets';
  const dispatch = useDispatch();
  const { data: postList } = useSelector((state) => state.postList);
  const [post, setPost] = useState('');

  useEffect(() => {
    getPostList();
  }, []);

  // Read
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
        post,
        createAt: Date.now(),
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
            <p>{post.createAt}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Home;

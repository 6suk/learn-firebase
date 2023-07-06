import { collection, addDoc } from 'firebase/firestore';
import { db } from 'fbase';
import { useState } from 'react';

const Home = () => {
  const [post, setPost] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const savePost = await addDoc(collection(db, 'nweets'), {
        post,
        createAt: Date.now(),
      });
      setPost('');
      console.log(savePost);
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
    </>
  );
};
export default Home;

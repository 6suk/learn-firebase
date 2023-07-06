import Post from 'components/Post';
import { POST_COLLECTION, auth } from 'fbase';
import { signOut } from 'firebase/auth';
import { getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMyPostList } from 'slice/user';

const Profile = ({ refreshUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { user, myPostList },
  } = useSelector((state) => state);
  const [name, setName] = useState(user.displayName);

  const onLogoutClick = () => {
    signOut(auth);
    navigate('/');
  };

  const getMyPosts = async () => {
    const q = query(POST_COLLECTION, where('uid', '==', user.uid), orderBy('date', 'desc'));
    const docs = await getDocs(q);
    const arr = [];
    docs.forEach((doc) => {
      let postObj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(postObj);
    });
    dispatch(setMyPostList(arr));
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.displayName !== name) {
      await user.updateProfile({
        displayName: name,
      });
      refreshUser();
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={onChange} />
        <input type="submit" value="수정하기" />
      </form>
      <button onClick={onLogoutClick}>Logout</button>
      <ul>
        {myPostList.map((post) => (
          <Post post={post} key={post.id} isOwner={true} />
        ))}
      </ul>
    </>
  );
};
export default Profile;

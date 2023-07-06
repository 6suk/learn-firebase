import { COLLECTION_NAME } from 'Util/util';
import Post from 'components/Post';
import { auth, db } from 'fbase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMyPostList } from 'slice/user';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { user, myPostList },
  } = useSelector((state) => state);

  const onLogoutClick = () => {
    signOut(auth);
    navigate('/');
  };

  const getMyPosts = async () => {
    const q = query(collection(db, COLLECTION_NAME), where('uid', '==', user.uid));
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

  return (
    <>
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

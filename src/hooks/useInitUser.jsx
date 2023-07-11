import { SET_USER_DOC, auth } from 'fbase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setLogout } from 'slice/user';
import { useInitPost } from './useInitPost';

const useInitUser = () => {
  const dispatch = useDispatch();
  const { initPostList, postLoading } = useInitPost();
  const [init, setInit] = useState(false);

  const userInfo = (user) => {
    const userObj = {
      uid: user.uid,
      displayName: user.displayName || '',
      photoURL: user.photoURL,
      email: user.email,
      updateProfile: (args) => updateProfile(user, args),
    };
    return userObj;
  };

  useEffect(() => {
    console.log('use Effect 실행');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogin(userInfo(user)));
      } else {
        dispatch(setLogout());
      }
      initPostList(user);
    });
  }, []);

  useEffect(() => {
    if (!postLoading) setInit(true);
  }, [postLoading]);

  const refreshUser = () => {
    const userObj = userInfo(auth.currentUser);
    console.log(userObj);
    SET_USER_DOC(userObj);
    dispatch(setLogin(userObj));
    // initPostList(userObj);
  };

  return { init, refreshUser };
};

export default useInitUser;

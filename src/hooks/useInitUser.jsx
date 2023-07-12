import { auth } from 'fbase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setLogout } from 'slice/user';

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

const useInitUser = () => {
  const [userLoading, setUserLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogin(userInfo(user)));
      } else {
        dispatch(setLogout());
      }
      setUserLoading(true);
    });
  }, []);

  return [userLoading];
};

export default useInitUser;

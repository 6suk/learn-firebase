import { useDispatch, useSelector } from 'react-redux';
import AppRouter from 'components/Router';
import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from 'fbase';
import { setLogin, setLogout } from 'slice/user';
import { updateProfile } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userObj = setUserObj(user);
        dispatch(setLogin(userObj));
      } else {
        dispatch(setLogout());
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    const userObj = setUserObj(user);
    dispatch(setLogin(userObj));
  };

  // 필요한 정보만 가져오기
  const setUserObj = (user) => {
    const userObj = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      /**
       * @param {object} args - {
       * displayName?: string;
       * photoURL?: string;
       * }
       * @returns Promise<void>
       */
      updateProfile: (args) => updateProfile(user, args),
    };

    return userObj;
  };

  return <>{init && <AppRouter refreshUser={refreshUser} />}</>;
}
export default App;

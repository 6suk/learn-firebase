import AppRouter from 'components/Router';
import { auth, onAuthStateChanged } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setLogout } from 'slice/user';

function App() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  const refreshUser = () => {
    const user = auth.currentUser;
    const userObj = setUserObj(user);
    dispatch(setLogin(userObj));
  };

  // 유저 - 필요한 정보만 가져오기
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

  return <>{init ? <AppRouter refreshUser={refreshUser} /> : <div>loading...</div>}</>;
}
export default App;

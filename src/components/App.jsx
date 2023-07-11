import AppRouter from 'components/Router';
import { GET_USER_BY_UID, POST_COLLECTION, SET_USER_DOC, auth, onAuthStateChanged } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';
import { setLogin, setLogout, setMyPostList } from 'slice/user';
import { isEmpty } from 'utils/util';

function App() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  const refreshUser = () => {
    const user = auth.currentUser;
    const userObj = initUserObj(user);
    dispatch(setLogin(userObj));
    SET_USER_DOC(user);
    initPostList(user);
  };

  // 유저 - 필요한 정보만 가져오기
  const initUserObj = (user) => {
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

  const initPostList = (user) => {
    const allQuery = query(POST_COLLECTION, orderBy('date', 'desc'));
    onSnapshot(allQuery, async (snapshop) => {
      const myArr = [];
      const arr = await Promise.all(
        snapshop.docs.map(async (doc) => {
          const { uid } = doc.data();
          if (!isEmpty(user) && uid === user.uid) {
            myArr.push({
              id: doc.id,
              ...doc.data(),
              displayName: user.displayName || '',
            });
            return {
              id: doc.id,
              ...doc.data(),
              displayName: user.displayName || '',
            };
          } else {
            return {
              id: doc.id,
              ...doc.data(),
              displayName: (await GET_USER_BY_UID(uid).then((v) => v.displayName)) || '',
            };
          }
        })
      );
      dispatch(setPostList(arr));
      dispatch(setMyPostList(myArr));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userObj = initUserObj(user);
        dispatch(setLogin(userObj));
      } else {
        dispatch(setLogout());
      }
      initPostList(user);
      setInit(true);
    });
  }, []);

  return <>{init ? <AppRouter refreshUser={refreshUser} /> : <div className="loading">loading...</div>}</>;
}
export default App;

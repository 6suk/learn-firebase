import { useDispatch, useSelector } from 'react-redux';
import AppRouter from 'components/Router';
import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from 'fbase';
import { setLogin, setLogout } from 'slice/user';

function App() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogin(user));
      } else {
        dispatch(setLogout());
      }
      setInit(true);
    });
  }, []);

  return <>{init && <AppRouter />}</>;
}
export default App;

import { Provider, useDispatch, useSelector } from 'react-redux';
import AppRouter from 'components/Router';
import store from 'slice/store';
import { useEffect, useState } from 'react';
import auth, { onAuthStateChanged } from 'fbase';
import { setLogin } from 'slice/user';

function App() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const TYPE = user ? 'LOGIN' : 'LOGOUT';
      dispatch(setLogin({ type: TYPE }));
      setInit(true);
    });
  }, []);

  return <>{init && <AppRouter />}</>;
}
export default App;

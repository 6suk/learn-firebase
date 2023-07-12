import AppRouter from 'components/Router';
import { useInitPost } from 'hooks/useInitPost';
import useInitUser from 'hooks/useInitUser';
import { useEffect, useState } from 'react';

function App() {
  const [init, setInit] = useState(false);
  const [userLoading] = useInitUser();
  const [postLoading] = useInitPost(userLoading);

  useEffect(() => {
    if (postLoading) {
      setInit(true);
    }
  }, [postLoading]);

  return <>{init ? <AppRouter /> : <div className="loading">loading...</div>}</>;
}
export default App;

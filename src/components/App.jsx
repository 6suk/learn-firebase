import AppRouter from 'components/Router';
import useInitUser from 'hooks/useInitUser';

function App() {
  const { init } = useInitUser();
  return <>{init ? <AppRouter /> : <div className="loading">loading...</div>}</>;
}
export default App;

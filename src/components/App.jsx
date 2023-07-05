import { Provider } from 'react-redux';
import AppRouter from 'components/Router';
import store from 'slice/store';
import { authService } from 'fbase';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
export default App;

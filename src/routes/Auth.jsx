import { useState } from 'react';
import auth, { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'fbase';

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // 로그인
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="email" placeholder="email" name="email" required onChange={onChange} />
        <input type="password" placeholder="password" name="password" required onChange={onChange} />
        <input type="submit" value={newAccount ? 'Join' : 'Login'} />
      </form>
      {error}
      <button onClick={toggleAccount}>{newAccount ? 'Change login' : 'Change Join'}</button>
      <div>
        <button>Google Login</button>
        <button>Github Login</button>
      </div>
    </div>
  );
};
export default Auth;

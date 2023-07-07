import { auth } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const AuthForm = () => {
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
    <form action="" onSubmit={onSubmit} className="container">
      <input type="email" placeholder="email" name="email" required onChange={onChange} className="authInput" />
      <input
        type="password"
        placeholder="password"
        name="password"
        required
        onChange={onChange}
        className="authInput"
      />
      <input type="submit" value={newAccount ? 'Join' : 'Login'} className="authInput authSubmit" />
      <button onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Change login' : 'Change Join'}
      </button>
      {error && <span className="authError">{error}</span>}
    </form>
  );
};

export default AuthForm;

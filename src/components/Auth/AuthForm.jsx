import { auth, set_user_doc } from 'fbase';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';

const AuthForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(false);
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

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // 회원가입
        setPersistence(auth, browserSessionPersistence).then(() => {
          createUserWithEmailAndPassword(auth, email, password).then((res) => {
            set_user_doc(res.user);
          });
        });
      } else {
        // 로그인
        setPersistence(auth, browserSessionPersistence).then(() => {
          signInWithEmailAndPassword(auth, email, password);
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = (type) => setNewAccount(type);

  return (
    <>
      <nav>
        <ul className="hometab auth">
          <li onClick={() => toggleAccount(false)} className={!newAccount ? 'on' : ''}>
            LOGIN
          </li>
          <li onClick={() => toggleAccount(true)} className={newAccount ? 'on' : ''}>
            JOIN
          </li>
        </ul>
      </nav>
      <form action="" onSubmit={onSubmit} className="container">
        <input type="email" placeholder="email" name="email" required onChange={onChange} className="authInput" />
        {/* [DOM] Input elements should have autocomplete attributes (suggested: "current-password"): (More info: https://goo.gl/9p2vKq) 오류로 autoComplete off 추가 */}
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          onChange={onChange}
          className="authInput"
          autoComplete="off"
        />
        <input type="submit" value={newAccount ? 'JOIN' : 'LOGIN'} className="authInput authSubmit" />
      </form>
      {error && <span className="authError">{error}</span>}
    </>
  );
};

export default AuthForm;

import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(true);

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
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="email" placeholder="email" name="email" required onChange={onChange} />
        <input type="password" placeholder="password" name="password" required onChange={onChange} />
        <input type="submit" value={newAccount ? 'Join' : 'Login'} />
      </form>
      <div>
        <button>Google Login</button>
        <button>Github Login</button>
      </div>
    </div>
  );
};
export default Auth;

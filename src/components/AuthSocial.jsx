import { auth } from 'fbase';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthSocial = () => {
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provide;
    switch (name) {
      case 'google':
        provide = new GoogleAuthProvider();
        break;
      case 'github':
        provide = new GithubAuthProvider();
        break;
      default:
        break;
    }
    await signInWithPopup(auth, provide);
  };

  return (
    <div>
      <button name="google" onClick={onSocialClick}>
        Google Login
      </button>
      <button name="github" onClick={onSocialClick}>
        Github Login
      </button>
    </div>
  );
};

export default AuthSocial;

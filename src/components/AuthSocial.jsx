import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className="authBtns">
      <button name="google" onClick={onSocialClick} className="authBtn">
        Google Login <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button name="github" onClick={onSocialClick} className="authBtn">
        Github Login <FontAwesomeIcon icon={faGithub} />
      </button>
    </div>
  );
};

export default AuthSocial;

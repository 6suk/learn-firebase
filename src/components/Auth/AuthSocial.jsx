import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { set_user_doc, auth } from 'fbase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';

const AuthSocial = () => {
  const onSocialClick = (e) => {
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
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, provide).then(({ user }) => {
        const {
          reloadUserInfo: { createdAt, lastLoginAt },
        } = user;
        if (createdAt === lastLoginAt) {
          set_user_doc(user);
        }
      });
    });
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

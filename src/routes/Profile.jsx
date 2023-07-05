import auth from 'fbase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};
export default Profile;

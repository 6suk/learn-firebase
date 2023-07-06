import ProfileForm from 'components/ProfileForm';
import { auth } from 'fbase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = ({ refreshUser }) => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <>
      <ProfileForm refreshUser={refreshUser} />
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};
export default Profile;

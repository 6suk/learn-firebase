import ProfileForm from 'components/ProfileForm';
import { auth } from 'fbase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = ({ refreshUser }) => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container">
      <ProfileForm refreshUser={refreshUser} />
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </motion.div>
  );
};
export default Profile;

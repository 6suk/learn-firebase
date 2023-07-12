import AuthForm from 'components/Auth/AuthForm';
import AuthSocial from 'components/Auth/AuthSocial';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate('/');
  }, [isLogin]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="authContainer">
        <AuthForm />
        <AuthSocial />
      </motion.div>
    </>
  );
};
export default Auth;
